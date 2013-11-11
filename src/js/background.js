/*globals chrome*/
"use strict";

var bigBadImagesShown = false;

chrome.runtime.onMessage.addListener(
	function(request, sender) {
		if (sender.tab && request.bigBadImageCount > 0) {
			chrome.pageAction.show(sender.tab.id);
		}
	});

chrome.pageAction.onClicked.addListener(function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var action;
		if (bigBadImagesShown) {
			action = "hideBigBadImages";
			bigBadImagesShown = false;
		} else {
			action = "showBigBadImages";
			bigBadImagesShown = true;
		}
		chrome.tabs.sendMessage(tabs[0].id, { action: action }, function() {});
	});
});