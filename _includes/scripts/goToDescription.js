


//////////////////////////////
//
// goToDescription --
//

function goToDescription(tab, navtab, item, desc) {
	activateTab(tab, navtab)
	if (tab == "abstracts") {
		toggleAbstract(desc);
	} else if (tab == "workshops") {
		activateWorkshop(item, desc);
	}
}



