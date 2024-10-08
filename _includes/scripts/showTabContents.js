


//////////////////////////////
//
// showTabContents --
//

function showTabContents(tabname) {
	if (tabname == "abstracts" || tabname == "schedule" || tabname == "workshops") {
		let navtabname = "nav-" + tabname;
		let test = document.querySelector(`#${tabname}`);
		activateTab(tabname, navtabname);
	} else {
		activateTab("home", "nav-home")
	}
}



