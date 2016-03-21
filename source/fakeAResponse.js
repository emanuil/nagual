function fullRegexMatch(regex, string) {
    var match = string.match(regex);

    return match !== null && string === match[0];
}


function removePortFromHost(host) {
    // cut the port from the host, if it exists
    if(host.indexOf(':') > -1) {
        return host.substring(0, host.indexOf(':'));
    }

    return host;
}


function removeArgumentsFromURL(url) {
    // remove all the arguments from the URL
    if(url.indexOf('?') > -1) {
        return url.substring(0, url.indexOf('?'));
    }

    return url;
}


function locateStubToken(rule, req) {

    var result;

    switch(rule.token.location) {

    case 'headers':
        if (JSON.stringify(req.headers).indexOf(rule.token.string) > -1) {
            result = rule.getResponse(req);
            result.id = req.id;
            return result;
        }
        return false;

    case 'url':
        if (req.url.indexOf(rule.token.string) > -1) {
            result = rule.getResponse(req);
            result.id = req.id;
            return result;
        }
        return false;

    case 'body':
        if (req.body.toString().indexOf(rule.token.string) > -1) {
            result = rule.getResponse(req);
            result.id = req.id;
            return result;
        }

        return false;

    default:
        return false;
    }
}

function fakeAResponse(rawHost, req) {

    var host, rule, i, urlWithoutParameters;

    host = removePortFromHost(rawHost);

    // check if there are no stubs for this host - e.g. run in transparent mode
    if(!global.stubRules[host] || global.stubRules[host].length === 0) {
        return false;
    }

    for (i = 0; i < global.stubRules[host].length; i++) {

        rule = global.stubRules[host][i];

        if (req.method.toLowerCase() === rule.method.toLowerCase()) {

            urlWithoutParameters = removeArgumentsFromURL(req.url);

            // match the URL when the rule URL is string
            if (typeof rule.url === 'string' && rule.url === urlWithoutParameters) {

                return locateStubToken(rule, req);
            }

            // match the URL when the rule URL is string
            if (typeof rule.url === 'object' && fullRegexMatch(rule.url, urlWithoutParameters)) {

                return locateStubToken(rule, req);
            }
        }
    }

    return false;
}


module.exports.fakeAResponse = fakeAResponse;
module.exports.fullRegexMatch = fullRegexMatch;
module.exports.removePortFromHost = removePortFromHost;
module.exports.removeArgumentsFromURL = removeArgumentsFromURL;
