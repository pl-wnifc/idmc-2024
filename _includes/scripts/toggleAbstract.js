


//////////////////////////////
//
// toggleAbstract --
//

function toggleAbstract(id) {
	let abstracts = document.querySelectorAll(".abstract");
	for (let a of abstracts) {
		if (a.classList.contains("hidden")) {
			if (a.id == id) {
				a.classList.remove("hidden");
			}
		} else {
			a.classList.add("hidden");
		}
	}
	//elem = document.querySelector(`${id}`);
	//if (elem.classList.contains("hidden")) {
	//  elem.classList.remove("hidden");
	//} else {
	//  elem.classList.add("hidden");
	//}
}



