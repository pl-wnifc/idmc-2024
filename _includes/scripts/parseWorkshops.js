


//////////////////////////////
//
// parseWorkshops -- Convert Workshops data from ATON to JSON.
//

function parseWorkshops(workshops) {
	let aton = new ATON;
	workshops = aton.parse(workshops).WORKSHOP;

	for (let i=0; i<workshops.length; i++) {
		// Create ID lookup for workshops (such as workshop1)
		let id = workshops[i].id;
		wLookup[id] = workshops[i];
	}
	return workshops;
}
