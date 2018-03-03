console.log('its background js');
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('background onclick');
});
