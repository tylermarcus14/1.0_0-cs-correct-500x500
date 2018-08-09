var variantsWindowId;
var lastVariants;
var lastBaseDomain;

function createVariantsWindow(variants, baseDomain) {
    
    chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 500,
        height: 500,
    }, (returnedWindow) => {
        variantsWindowId = returnedWindow.id;
        lastVariants = variants;
        lastBaseDomain = baseDomain;
    });

} 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.variants) {
        if(!variantsWindowId) {
            createVariantsWindow(message.variants, message.baseDomain);
        }
        else {
            chrome.windows.getAll(windows => {
                const targetedWindows = windows.filter(wdw => wdw.id === variantsWindowId);
                if(targetedWindows.length === 0) {
                    createVariantsWindow(message.variants, message.baseDomain);
                }
            });
        }
    }

    if(message.getLastVariants) {
        sendResponse({lastVariants, lastBaseDomain});
    }
});