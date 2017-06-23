chrome.runtime.onInstalled.addListener(function (object) {
    if(object.reason === 'install')
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });

    // chrome.tabs.create({url: "http://yoursite.com/"}, function (tab) {
    //     console.log("New tab launched with http://yoursite.com/");
    // });
});