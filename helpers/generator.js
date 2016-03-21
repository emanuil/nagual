var faker = require('faker');
var dateFormat = require('dateformat');

function getInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getString(length) {
    return Math.random().toString(36).substr(2, length);
}

function getCurrentDate() {
    return new Date().toString();
}

function getTwitterDate() {
    return dateFormat(new Date(), 'ddd mmm dd HH:MM:ss Z yyyy');
}

function getFacebookDate() {
    var day = dateFormat(new Date(), 'yyyy-mm-dd');
    var hour = dateFormat(new Date(), 'HH:MM:ss');
    return day + 'T' + hour + '+0000';
}

function getCurrentTimestamp() {
    return Date.now();
}

function getUsername() {
    return faker.internet.userName();
}

function getName() {
    return faker.name.findName();
}

function getSentence() {
    return faker.lorem.sentence();
}

function getImageUrl() {
    return faker.image.imageUrl();
}


function getUrl() {
    return faker.internet.url();
}

module.exports.getInteger = getInteger;
module.exports.getString = getString;
module.exports.getCurrentDate = getCurrentDate;
module.exports.getTwitterDate = getTwitterDate;
module.exports.getFacebookDate = getFacebookDate;
module.exports.getCurrentTimestamp = getCurrentTimestamp;
module.exports.getUsername = getUsername;
module.exports.getName = getName;
module.exports.getSentence = getSentence;
module.exports.getImageUrl = getImageUrl;
module.exports.getUrl = getUrl;





