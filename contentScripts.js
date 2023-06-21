/*global chrome*/
// Create an extension icon element
const extensionIcon = document.createElement("img");
chrome.runtime.getURL("../src/assets/ChatGPT-Logo.png", (url) => {
  extensionIcon.src = url;
});
extensionIcon.classList.add("extension-icon");

// Attach click event listener to launch the extension
extensionIcon.addEventListener("click", () => {
  chrome.runtime.sendMessage({ launchExtension: true });
});

// Find all input fields on the page
const inputFields = document.querySelectorAll("input");

// Inject the extension icon into each input field
inputFields.forEach((inputField) => {
  const clonedIcon = extensionIcon.cloneNode(true);
  clonedIcon.addEventListener("click", () => {
    chrome.runtime.sendMessage({ launchExtension: true });
  });
  inputField.parentNode.appendChild(clonedIcon);
});
