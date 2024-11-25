document.getElementById('start-locator').addEventListener('click', () => {
    // Send a message to content.js to start locator mode
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "startLocator" });
    });
});