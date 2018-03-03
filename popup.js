const ACTIVE = '__ACTIVE__';
var storage = chrome.storage.local;

document.addEventListener('DOMContentLoaded', () => {
    var changeButton = document.getElementById('change');
    var deleteButton = document.getElementById('delete');
    var listNumbers = document.getElementById('active-numbers');
    fillSelected(listNumbers);
    changeButton.addEventListener('click', saveNumber);
    deleteButton.addEventListener('click', deleteNumber);
    listNumbers.addEventListener('change', () => selectedNewActiveElement(listNumbers)); 
    chrome.storage.onChanged.addListener((changes, areaName) => 
        storageChangeCallback(changes, areaName, listNumbers)
    );
});

function selectedNewActiveElement(listNumbers) {
    var selectedOption = listNumbers.options[listNumbers.selectedIndex].value;
    storage.get(selectedOption, (numbers) => {
        var number = numbers[selectedOption];
        var objForStorage = {};
        objForStorage[ACTIVE] = {
            'name': selectedOption,
            'login': number.login,
            'pass': number.pass
        };
        storage.set(objForStorage, () => {});
    });
};

function storageChangeCallback(changes, areaName, listNumbers) {
    if (areaName !== 'local') {
        return;
    }
    for (var key in changes) {
        if (key === ACTIVE) {
            return;
        }
    }
    fillSelected(listNumbers); 
};

function fillSelected(listNumbers) {
    storage.get(null, (values) => {
        for (var i = listNumbers.length - 1; i >= 0; i--) {
            listNumbers.remove(i);
        }
        var activeObj = values[ACTIVE] || {};
        var activeNumberName = activeObj.name || '';
        for (var key in values) {
            if (key === ACTIVE) {
                continue;
            }
            var number = values[key];
            var optionEl = document.createElement('option');
            optionEl.value = key;
            optionEl.innerHTML = key;
            optionEl.defaultSelected = key === activeNumberName;
            listNumbers.appendChild(optionEl);
        }
    });
};

function deleteNumber() {
    var name = document.getElementById('change-name').value;
    clearFieldArea();
    chrome.storage.local.remove(name, () => {});
};

function saveNumber() {
    var name = document.getElementById('change-name').value;
    var login = document.getElementById('change-login').value;
    var pass = document.getElementById('change-pass').value;
    clearFieldArea();
    var objForStorage = {};
    objForStorage[name] = {
        'login': login,
        'pass': pass
    };
    storage.set(objForStorage, () => {
        storage.get(name, (val) => {
            console.log('value obj is :', val);
        });
    });
};

function clearFieldArea() {
    document.getElementById('change-name').value = '';
    document.getElementById('change-login').value = '';
    document.getElementById('change-pass').value = '';
}

