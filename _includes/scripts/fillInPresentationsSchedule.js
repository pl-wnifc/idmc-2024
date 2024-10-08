


//////////////////////////////
//
// fillInPresentationsSchedule --
//

function fillInPresentationsSchedule() {
	let rows = document.querySelectorAll('tr[data-type="presentation"][data-name]');

	for (let i=0; i<rows.length; i++) {
		let nameid = rows[i].dataset.name;
		let entry = pLookup[nameid];
		if (!entry) {
			console.error(`Error: cannot find ${nameid} in pLookup`);
		}
		let output = "";
		output += `
				<td class="hour">${entry.time}</td>
				<td class="event">
		`;
		if (entry.keynote === "true") {
			output += "Keynote: ";
		}
		output += `<b class="linkicon" onclick="goToDescription('abstracts', 'nav-abstracts', '', '${nameid}')">${entry.title}</b>`;
		output += `<br/>`;
		let name = entry.presenter.replace(/<sup>.*?<\/sup>/g, "");
		output += name;
		output += `</td>`;
		rows[i].innerHTML = output;
	}
}


