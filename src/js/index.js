var base64 = require('js-base64').Base64;
var sha1sum = require('sha1sum');

var doc = document;

function init () {
    var form = doc.querySelector('.form');
    form.addEventListener('submit', onSubmit);
}

function getInputValue (type) {
    return doc.getElementById(type).value;
}

function onSubmit (event) {
    event.preventDefault();
    var values = [
        'username',
        'domain',
        'password',
        'count'
    ].map(getInputValue);
    renderPassword.apply(null, values);
}

function renderPassword (username, domain, password, limit) {
    var text = username + domain + password;
    var passwd = base64.encode(sha1sum(text)).substr(0, limit);

    var digits = /\d/;
    if (!digits.test(passwd)) {
        passwd = limit + passwd.slice(1);
    }

    var outputEl = doc.querySelector('.output');
    outputEl.innerHTML = '<input type="text" value="' + passwd + '">';

    setTimeout(function () {
        outputEl.innerHTML = '';
    }, 10000);
}

if (doc.readyState !== 'loading') {
    init();
} else {
    window.addEventListener('DOMContentLoaded', init);
}
