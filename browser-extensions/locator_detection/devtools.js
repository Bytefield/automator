chrome.devtools.panels.create(
    "Locator Finder",             // Tab title
    "icons/icon48.png",           // Icon for the tab
    "panel.html",                 // HTML file for the panel content
    function (panel) {
        console.log("DevTools panel created!");
    }
);