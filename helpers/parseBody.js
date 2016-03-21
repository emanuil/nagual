function parseBody(request) {

    var filteredInputs = {}, i, temp;
    var boundary = request.headers['content-type'].split('boundary=')[1];
    var inputs = request.body.toString().split('--' + boundary);

    // remove the first and the last element in the array
    inputs.shift();
    inputs.pop();


    for(i = 0; i < inputs.length; i++) {
        temp = inputs[i].split('name=')[1].split('\r\n').filter(function(n){ return n !== ''; });

        filteredInputs[temp[0].replace(/"/g,'').split(';')[0]] = temp[1];
    }

    return filteredInputs;
}

module.exports = parseBody;




