var esprima = require('esprima');
var assert = require('chai').assert;

var fs = require('fs');
var path = require('path');

var walk = function(dir, done) {

    var results = [], pending;

    fs.readdir(dir, function(readError, list) {
        if (readError) {
            return done(readError);
        }
        pending = list.length;

        if (!pending) {
            return done(null, results);
        }
        list.forEach(function(fullFilename) {

            var file = path.resolve(dir, fullFilename);

            fs.stat(file, function(statError, stat) {

                if (stat && stat.isDirectory()) {

                    walk(file, function(fileError, res) {
                        results = results.concat(res);

                        if (!--pending) {
                            done(null, results);
                        }
                    });
                } else {
                    // we're only interested in JS files
                    if(file.slice(-3) === '.js') {
                        results.push(file);
                    }

                    if (!--pending) {
                        done(null, results);
                    }
                }
            });
        });
    });
};


function checkTheReturnStatement(expression, file) {
    var hasBodyProperty = false, headersType;
    var line = expression.loc.start.line;

    expression.argument.properties.forEach(function (returnProperties) {

        if (returnProperties.key.value === 'body') {
            hasBodyProperty = true;
        }

        headersType = returnProperties.value.type;
        if (returnProperties.key.value === 'headers') {
            assert.equal(
                headersType,
                'ObjectExpression',
                'Returned headers should be an object' +
                ' not a ' + headersType + ', line: ' + line + ' ' + file);
        }

    });

    assert.isTrue(
        hasBodyProperty,
        'The stub result must have a body defined, line: ' + line + ' ' + file);
}


function checkForFileReadOperations(expression, line, file) {
    // check for readFileSync()
    if (expression.type === 'VariableDeclaration') {
        expression.declarations.forEach(function (declaration) {
            if (declaration.init && declaration.init.callee &&
                declaration.init.callee.property) {
                assert.notEqual(
                    declaration.init.callee.property.name,
                    'readFileSync',
                    'Read files during initialization only, line: ' + line + ' ' + file);
            }
        });
    }

    // check for readFile()
    if (expression.type === 'ExpressionStatement') {
        if (expression.expression.callee) {
            if (expression.expression.callee.object.name === 'fs') {
                assert.notEqual(
                    expression.expression.callee.property.name,
                    'readFile',
                    'Read files during initialization only, line: ' + line + ' ' + file);
            }
        }
    }
}


function checkGetResponseFunction(currentExpression, file) {

    var expression, expr;
    var line = currentExpression.expression.left.property.loc.start.line;

    for (expr in currentExpression.expression.right.body.body) {

        if (!currentExpression.expression.right.body.body.hasOwnProperty(expr)) {
            continue;
        }

        expression = currentExpression.expression.right.body.body[expr];


        if (expression.type === 'ReturnStatement') {
            checkTheReturnStatement(expression, file);
        }

        checkForFileReadOperations(expression, line, file);
    }
}


function checkTokenProperties(currentExpression, file) {

    var hasTokenLocation = false;
    var hasTokenString = false;
    var line;

    currentExpression.expression.right.properties.forEach(function (property) {

        line = property.key.loc.start.line;
        if (property.key.name === 'location') {
            hasTokenLocation = true;
            assert.include(
                ['url', 'headers', 'body'],
                property.value.value.toLowerCase(),
                'Unsupported token location, line: ' + line + ' ' + file);
        }

        if (property.key.name === 'string') {
            hasTokenString = true;
            assert.isString(
                property.value.value,
                'The token should be a string, line: ' + line + ' ' + file);
        }
    });

    assert.isTrue(hasTokenLocation, 'The stub must have token location defined: ' + file);
    assert.isTrue(hasTokenString, 'The stub must have token string defined: ' + file);
}


walk('stubs', function(error, files) {

    var body, i, j, stubBody, hasURL, hasMethod;
    var propertyName, propertyValue, line, hasReturnFunction, currentExpression;

    files.forEach(function (file) {
        fs.readFile(file, function (err, data) {

            if (err) {
                return console.log(err);
            }

            body = esprima.parse(data, {loc: true}).body;

            for(i = 0; i < body.length; i++) {
                if(body[i].type === 'ExpressionStatement') {

                    stubBody = body[i].expression.right.body.body;
                    hasURL = false;
                    hasMethod = false;
                    hasReturnFunction = false;


                    for(j = 0; j < stubBody.length; j++) {

                        currentExpression = stubBody[j];
                        propertyName = currentExpression.expression.left.property.name;
                        propertyValue = currentExpression.expression.right.value;

                        line = currentExpression.expression.left.property.loc.start.line;


                        if(propertyName === 'getResponse') {
                            checkGetResponseFunction(currentExpression, file);
                        }

                        // check the token
                        if(propertyName === 'token') {
                            checkTokenProperties(currentExpression, file);
                        }

                        // check the URL
                        if(propertyName === 'url') {
                            hasURL = true;
                            assert.include(
                                ['[object String]', '[object RegExp]'],
                                Object.prototype.toString.call(propertyValue),
                                'The URL should be a string or regex, line: ' + line + ' '+ file);
                        }

                        // check the HTTP method
                        if(propertyName === 'method') {
                            hasMethod = true;
                            assert.include(
                                ['get', 'post', 'head', 'put', 'delete'],
                                propertyValue.toLowerCase(),
                                'Unsupported HTTP method, line: ' + line + ' '+ file);
                        }

                        // check if getResponse() exists
                        if(propertyName === 'getResponse') {
                            hasReturnFunction = true;
                        }
                    }

                    assert.isTrue(hasURL, 'The stub must have URL defined: ' + file);
                    assert.isTrue(hasMethod, 'The stub must have HTTP method defined: ' + file);

                    assert.isTrue(hasReturnFunction, 'The stub must have a getResponse() function defined: ' + file);
                }
            }
        });
    });
});



