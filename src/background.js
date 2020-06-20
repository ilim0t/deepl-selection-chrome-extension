chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "deeplTranslateContextMenu",
        "title": "DeepL 翻訳",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const { id: tabId } = tab;
    if (tabId > 0) {
        chrome.tabs.sendMessage(tabId, {});

    } else {
        const { selectionText } = info;
        chrome.tabs.create({ url: `https://www.deepl.com/translator#ja/en/${encodeURIComponent(selectionText)}` });
    }

});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { selectionText } = message;

    const lines = selectionText.split("\n");
    // const undesiredLineBreak = lines.map(line => line.length < 10 && line.split(" ").length === 1);

    // const alignedText = lines.reduce((accumulator, currentValue, index, array) => {
    //     if (undesiredLineBreak[index - 1] || undesiredLineBreak[index]) {
    //         return accumulator + currentValue;
    //     }
    //     return accumulator + "\n" + currentValue;
    // });

    const alignedText = lines.reduce((accumulator, currentValue) => {
        if (currentValue === "") {
            return accumulator + "\n\n";
        }
        return accumulator + currentValue;
    });
    if (alignedText.length > 5000) {
        // do sometiong.
    }
    chrome.tabs.create({ url: `https://www.deepl.com/translator#ja/en/${encodeURIComponent(alignedText)}` });
})