/*global chrome*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.launchExtension) {
    // Handle the launch request here
    console.log("Extension launched!");
  }
});
