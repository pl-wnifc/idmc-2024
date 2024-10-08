


//////////////////////////////
//
// activateTab --
//

function activateTab(tabname, navtab, from) {
	let originUrl = window.location.href;
  if (/#/.test(originUrl)) {
    originUrl = originUrl.replace(/#.*$/, "");
  }
	if (/^http/.test(originUrl)) {
		if (tabname == 'home') {
			window.history.pushState(null, null, originUrl);
		} else {
			let newUrl = originUrl + "#" + tabname;
			window.history.pushState(null, null, newUrl);
		}
	}

	//window.history.pushState(null, null, newUrl);
	let tabs = document.querySelectorAll('.content');
	let navtabs = document.querySelectorAll('.tab');
	for (let i=0; i<tabs.length; i++) {
		if (tabs[i].classList.contains('hidden')) {

		} else {
			tabs[i].classList.add('hidden');
		}
	}
	for (let j=0; j<navtabs.length; j++) {
		navtabs[j].classList.remove('active');
	}

	let tabElement = document.querySelector(`#${tabname}`);
	tabElement.classList.remove('hidden');
	let navtabElement = document.querySelector(`#${navtab}`);
	navtabElement.classList.add('active');
}



