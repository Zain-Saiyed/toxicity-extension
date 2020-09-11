console.log('background started!');

// import * as tf from '@tensorflow/tfjs';

// When performing browser click do this
chrome.browserAction.onClicked.addListener(buttonClickEvent)
function buttonClickEvent(tab) {
    let messageResponse = {
        response:"From background"
    }
    chrome.tabs.sendMessage(tab.id,messageResponse);
}




// "default_popup"  : "popup.html",
// "default_title" : "Toxicity Level",