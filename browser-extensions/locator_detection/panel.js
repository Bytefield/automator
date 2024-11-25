const locatorList = document.getElementById("locator-list");
const clearButton = document.getElementById("clear-locators");

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "addLocator" && message.locator) {
        displayLocator(message.locator);
    }
});

// Display a locator in the panel
function displayLocator(locator) {
    const listItem = document.createElement("li");
    listItem.textContent = `CSS: ${locator.cssSelector} | XPath: ${locator.xpath}`;
    locatorList.appendChild(listItem);
}

// Clear the locator list
clearButton.addEventListener("click", () => {
    locatorList.innerHTML = "";
});