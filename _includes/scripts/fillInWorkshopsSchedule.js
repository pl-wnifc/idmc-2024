


//////////////////////////////
//
// fillInWorkshopsSchedule --
//

function fillInWorkshopsSchedule() {
	let rows = document.querySelectorAll('tr[data-type="workshop"][data-name]');

	for (let i=0; i<rows.length; i++) {
		let id = rows[i].dataset.name;
		let entry = wLookup[id];
		if (!entry) {
			console.error(`Error: cannot find ${id} in pLookup`);
		}
		let output = "";
		output += `
				<td class="hour">${entry.time}</td>
				<td class="event">
		`;
		if (entry.keynote === "true") {
			output += "Keynote: ";
		}
		output += `Workshop: <b class="linkicon" onclick="goToDescription('workshops', 'nav-workshops', '${id}', '${id}-description')">${entry.title}</b>`;
		output += `<br/>`;
		let name = entry.presenter.replace(/<sup>.*?<\/sup>/g, "");
		output += name;
		output += `</td>`;
		rows[i].innerHTML = output;
	}
}
