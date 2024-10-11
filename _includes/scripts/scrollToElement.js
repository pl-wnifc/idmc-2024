


//////////////////////////////
//
// scrollToElement -- Actually scrolling to previous sibling of element
//  (the presentation title area rather than the abstract).
//

function scrollToElement(element, topMargin) {
	if (!element) {
		return;
	}
	let prevElement = element.previousElementSibling;
	if (!prevElement) {
		return;
	}

	let elementPosition = prevElement.getBoundingClientRect().top + window.pageYOffset;
	let offsetPosition = elementPosition - topMargin;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}



