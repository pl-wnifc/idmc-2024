


//////////////////////////////
//
// toggleAbstract --
//

function toggleAbstract(id) {
	let abstracts = document.querySelectorAll(".abstract");
	let target;
	for (let a of abstracts) {
		if (a.classList.contains("hidden")) {
			if (a.id == id) {
				a.classList.remove("hidden");
				target = a;
			}
		} else {
			a.classList.add("hidden");
		}
	}
	if (target) {
		scrollToElement(target, 80);
	}

}



