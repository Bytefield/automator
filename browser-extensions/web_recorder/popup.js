document.getElementById("start").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "startRecording" }, (response) => {
            if (response && response.success) {
                alert("Recording started!");
            } else {
                console.error("Failed to start recording");
            }
        });
    });
});

document.getElementById("stop").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "stopRecording" }, (response) => {
            if (response && response.success) {
                alert("Recording stopped!");
            } else {
                console.error("Failed to stop recording");
            }
        });
    });
});