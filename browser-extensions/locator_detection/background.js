chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "locatorFound") {
        // Forward the locator to the DevTools panel
        chrome.runtime.sendMessage({ action: "addLocator", locator: message.locator });
    }
});
