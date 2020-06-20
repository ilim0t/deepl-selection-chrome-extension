chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse({ selectionText: window.getSelection().toString() });
});