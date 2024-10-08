
let Presentations = `{% include presentations/main.aton %}`;
let Workshops     = `{% include workshops/main.aton %}`;
let pLookup  = {};
let wLookup  = {};


//////////////////////////////
//
// DOMContentLoaded event listener -- fill in abstract and workshop tabs and
//   open the webpage to the given tab.
//

document.addEventListener("DOMContentLoaded", function (event) {
	Presentations = parsePresentations(Presentations);
	Workshops     = parseWorkshops(Workshops);

	createAbstractList(Presentations);
	createWorkshopList(Workshops);
	fillInPresentationsSchedule(Presentations);

	let originUrl = window.location.href;
	let target;
	if (/#/.test(originUrl)) {
		target = originUrl.match(/#.*$/)[0];
		target = target.replace("#", "");
		originUrl = originUrl.replace(/#.*$/, '');
	}

	showTabContents(target);

});



