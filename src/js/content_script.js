/*globals chrome,$*/

"use strict";

var images = document.getElementsByTagName("img"),
badImages = [];

function getImageIndicator(img) {
	var badImageEl = $('<span class="big-bad-image"></span>');
	badImageEl.append('<span class="big-bad-image-label">BIG BAD IMAGE!</span>');
	badImageEl.append('<span class="big-bad-image-details">CSS size: ' + img.clientW + ' x ' + img.clientH + '<br />Actual size: ' + img.naturalW + ' x ' + img.naturalH + '</span>');
	badImageEl.append('<a href="' + img.el.attr("src") + '" class="big-bad-image-link" target="_new">open</a>');
	badImageEl.css({
		width: img.clientW + "px",
		height: img.clientH + "px"
	});
	return badImageEl;
}

function positionImageIndicator(img) {
	img.indicator.css({
		left: img.el.offset().left,
		top: img.el.offset().top
	});
}

function addBadImage(img) {
	img.indicator = getImageIndicator(img);
	badImages.push(img);
}

function isBad(img) {
	return (img.clientW > 0 && img.clientH > 0 && (img.naturalW > img.clientW || img.naturalH > img.clientH));
}

function getBadImages() {
	for (var c=0, l=images.length; c<l ;c++) {
		var img = {
			el: $(images[c]),
			clientW: images[c].clientWidth,
			clientH: images[c].clientHeight,
			naturalW: images[c].naturalWidth,
			naturalH: images[c].naturalHeight
		};
		if (isBad(img)) {
			addBadImage(img);
		}
	}
}

function showBigBadImages() {
	var body = $(document.body);
	badImages.forEach(function (img) {
		body.append(img.indicator);
		positionImageIndicator(img);
	});
}

function hideBigBadImages() {
	$('.big-bad-image').remove();
}

function scrollToBadImage(n) {
	var img = badImages[n];
	if (img) {
		$('html, body').stop().animate({
            scrollTop: img.el.offset().top - 10
        }, 1000);
	}
}

getBadImages();

chrome.runtime.sendMessage({bigBadImageCount: badImages.length}, function() {});

chrome.runtime.onMessage.addListener(function(request) {
	if (request.action === "showBigBadImages") {
		showBigBadImages();
		scrollToBadImage(0);
	} else if (request.action === "hideBigBadImages") {
		hideBigBadImages();
	}
});

$(window).on("resize", function() {
	for (var c=0, l=badImages.length; c<l ;c++) {
		positionImageIndicator(badImages[c]);
	}
});