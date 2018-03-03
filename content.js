const ACTIVE = '__ACTIVE__';
var storage = chrome.storage.local;

var login = document.getElementsByName("j_username")[0];
var pass = document.getElementsByName("j_password")[0];
storage.get(ACTIVE, (value) => {
    var obj = value[ACTIVE] || {};
    login.value = obj.login || '';
    pass.value = obj.pass || '';
    login.fireEvent('onchange');
    pass.fireEvent('onchange');
});
