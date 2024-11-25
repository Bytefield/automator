document.addEventListener("mouseover", (event) => {
    event.target.style.outline = "2px solid red";
});

document.addEventListener("mouseout", (event) => {
    event.target.style.outline = "";
});

document.addEventListener("click", (event) => {
    event.preventDefault();
    const element = event.target;

    const locators = {
        cssSelector: generateCssSelector(element),
        xpath: generateXPath(element)
    };

    // Send locators to the background script
    chrome.runtime.sendMessage({ action: "locatorFound", locator: locators });
});

function generateXPath(element) {
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

function generateCssSelector(element) {
    return element.tagName.toLowerCase() +
        (element.id ? `#${element.id}` : "") +
        (element.className ? `.${element.className.trim().replace(/\s+/g, ".")}` : "");
}
