let recordedActions = [];
let isRecording = false;

// Function to enable or disable buttons
const toggleButtons = function (disable) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = disable;
    });
}

// Listen for messages from popup.js or background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "startRecording") {
        isRecording = true;
        toggleButtons(true);
        console.log("Recording started in content script");
        sendResponse({ success: true });
    } else if (message.type === "stopRecording") {
        isRecording = false;
        toggleButtons(false);
        console.log("Recording stopped in content script");
        sendResponse({ success: true });
    }
});

const generateXPath = function (element) {
    if (element.id) return `//*[@id="${element.id}"]`;
    const path = [];
    while (element.nodeType === Node.ELEMENT_NODE) {
        const siblings = Array.from(element.parentNode.children).filter(el => el.nodeName === element.nodeName);
        const index = siblings.indexOf(element) + 1;
        const selector = `${element.nodeName.toLowerCase()}[${index}]`;
        path.unshift(selector);
        element = element.parentNode;
    }
    return `/${path.join("/")}`;
}

const generateCssSelector = function (element) {
    return element.tagName.toLowerCase() +
        (element.id ? `#${element.id}` : "") +
        (element.className ? `.${element.className.trim().replace(/\s+/g, ".")}` : "");
}

// Listen for user interactions
document.addEventListener("click", (event) => {
    if (isRecording) {
        event.stopImmediatePropagation();
        const { target } = event;

        // Check if the clicked element is a button or an input[type="submit"]
        if (
            target.tagName.toLowerCase() === "button" ||
            (target.tagName.toLowerCase() === "input" && target.type === "submit") ||
            target.closest("button") ||
            target.closest('input[type="submit"]')
        ) {
            const clickable = target.tagName.toLowerCase() === "button" || target.tagName.toLowerCase() === "input"
                ? target
                : target.closest("button, input[type='submit']");
            recordAction(clickable, "click");
        } else {
            recordAction(target, "click");
        }
    };

});

const recordAction = function (target, actionType) {
    const action = {
        type: "click",
        tagName: target.tagName,
        xpath: generateXPath(target),
        cssPath: generateCssSelector(target),
        timestamp: Date.now()
    };
    recordedActions.push(action);
    console.log("Recorded action:", action);
};

// Listen for messages to send data back to the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getRecordedActions") {
        sendResponse(recordedActions);
    }
});
