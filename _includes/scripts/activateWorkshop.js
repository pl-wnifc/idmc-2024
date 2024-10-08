


//////////////////////////////
//
// activateWorkshop --
//

function activateWorkshop(wid, wcontent) {
	let workshopDesc = document.querySelector('.abstract');
	for (let i=0; i<workshopDesc.length; i++) {
		if (workshopDesc[i].classList.contains('hidden')) {
			if (workshopDesc[i].id == wcontent) {
				workshopDesc[i].classList.remove('hidden');
			}
		} else {
			workshopDesc[i].classList.add('hidden');
		}
	}

	// let wdescription = document.querySelector(`${wcontent}`);
	// if (wdescription.classList.contains('hidden')) {
	//   console.log("open");
	//   wdescription.classList.remove('hidden');
	// } else {
	//   console.log("close");
	//   wdescription.classList.add('hidden');
	// }

}



