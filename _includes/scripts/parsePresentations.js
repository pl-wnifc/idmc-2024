


//////////////////////////////
//
// parsePresentations -- Convert Presentations data from ATON to JSON.
//

function parsePresentations(presentations) {
	let aton = new ATON;
	presentations = aton.parse(presentations).PRESENTATION;

	let urlPattern = /https?:\/\/[^\s)><]+/g;
	for (let i=0; i<presentations.length; i++) {
		let a = presentations[i].abstract;

		// Convert URLs to hyperlinks
		a = a.replace(/<div class="comma"><\/div>/gs, "ZZZZZ");
		a = a.replace(urlPattern, function (url) {
			return `<a target="_blank" href="${url}">${url}</a>`;
		});

		// Replace blank lines (only blank or whitespace-only lines) with paragraph separators
		a = a.replace(/^\s*$/gm, "</p><p class='abstract-content'>");

		// Ensure that the content starts and ends with paragraph tags
		a = `<p class='abstract-content'>${a}</p>`;

		a = a.replace(/ZZZZZ/g, `<span class="comma"></span>`);
		// Store the processed abstract back into presentations
		presentations[i].abstract = a;

		// Create ID lookup for presentations (by presenters' last name)
		let id = presentations[i].id;
		pLookup[id] = presentations[i];
	}


	return presentations;
}



