let recording = false;

// Listen for commands from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "startRecording") {
        recording = true;
        sendResponse({ success: true });
    } else if (message.type === "stopRecording") {
        recording = false;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "getRecordedActions" }, (response) => {
                console.log("Recorded Actions:", response);
                // Optionally store the data
            });
        });
        sendResponse({ success: true });
    }
});
