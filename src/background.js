chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "deeplTranslateContextMenu",
        "title": "DeepL 翻訳",
        "contexts": ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    const { id: tabId } = tab;
    let text;

    if (tabId > 0) {
        text = await new Promise(resolve => chrome.tabs.sendMessage(tabId, {}, resolve))
            .then(({ selectionText }) => {
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
                // if (alignedText.length > 5000) {
                // do sometiong.
                // }
                return alignedText;
            });
    } else {
        text = info.selectionText;
    }
    chrome.tabs.create({ url: `https://www.deepl.com/translator#ja/en/${encodeURIComponent(text)}` });
});