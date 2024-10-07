---
vim: ts=3
---

let Presentations = `{% include presentations/main.aton %}`;
let Workshops     = `{% include workshops/main.aton %}`;
let pLookup  = {};
let wLookup  = {};



//////////////////////////////
//
// DOMContentLoaded event listener -- fill in abstract and workshop tabs and
//   open the webpage to the given tab.
//

document.addEventListener("DOMContentLoaded", function (event) {
	Presentations = parsePresentations(Presentations);
	Workshops = parseWorkshops(Workshops);

	createAbstractList(Presentations);
	createWorkshopList(Workshops);
	fillInPresentationsSchedule(Presentations);

	let originUrl = window.location.href;
	let target;
	if (/#/.test(originUrl)) {
		target = originUrl.match(/#.*$/)[0];
		target = target.replace("#", "");
		// console.log(target);
		originUrl = originUrl.replace(/#.*$/, '');
		// console.log(originUrl);
	}

	if (target == "abstracts" || target == "schedule" || target == "workshops") {
		let navtabname = "nav-" + target;
		let test = document.querySelector(`#${target}`);
		activateTab(target, navtabname);
	} else {
		activateTab("home", "nav-home")
	}

});



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



//////////////////////////////
//
// createAbstractList -- Fill in the contenst of the Abstracts tab.
//

function createAbstractList(list) {
	let container = document.querySelector("#abstract-container");
	let options = {
		weekday: 'long',
		year: 'numeric',
		day: 'numeric',
		month: 'long',
	};
	for (let i=0; i<list.length; i++) {
		//let id = "abs" + String(i);
    let id = list[i].id;
		let item = document.createElement("div");
		item.classList.add("abstract-item");
		let abstractHead = document.createElement("div");
		abstractHead.classList.add("abstract-header");
		func = "toggleAbstract(\"" + id + "\")";
		abstractHead.setAttribute("onclick", func);
		let title = document.createElement("p");
		title.classList.add('title');
		title.innerHTML = list[i].title;
		let author = document.createElement("p");
		author.classList.add('author');
		author.innerHTML = list[i].presenter;

		let affiliation = document.createElement("p");
		affiliation.classList.add("affiliation");
		affiliation.innerHTML = list[i].affiliation;
		dateString = formatDate(list[i].date);

		let date = document.createElement("p");
		date.classList.add("date");
		date.innerHTML = dateString + ", " + list[i].time

		abstractHead.appendChild(title);
		abstractHead.appendChild(author);
		abstractHead.appendChild(affiliation);
		abstractHead.appendChild(date);

		let abstract = document.createElement("div");
		abstract.setAttribute("id", id);
		abstract.classList.add('abstract');
		abstract.classList.add('hidden');
		abstract.innerHTML = list[i].abstract;

//  let paragraphs = list[i].abstract.split("\\n");
//  for (let j=0; j<paragraphs.length; j++) {
//    let abstractP = document.createElement("p");
//    abstractP.classList.add("abstract-content");
//    abstractP.innerHTML = paragraphs[j];
//    abstract.appendChild(abstractP);
//  }

		item.appendChild(abstractHead);
		item.appendChild(abstract);
		container.appendChild(item);
	}
}



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



//////////////////////////////
//
// createSchedule -- Not used.
//

function createSchedule(list) {
	let dates = new Set();
	for (let i=0; i<list.length; i++) {
		dates.add(list[i].date);
	}
	let container = document.querySelector("#schedule-container");
	for (let d of dates) {
		let day = document.createElement("div");
		day.setAttribute("id", d);
		day.classList.add("day");
		container.appendChild(day);
	}

	for (let p of list) {
		let parent = document.querySelector(`${p.date}`);
		let hour = document.createElement("p");
		hour.classList.add("hour");
		hour.innerHTML = p.time;
		parent.appendChild(hour);
	}
}



//////////////////////////////
//
// createWorkshopList --
//

function createWorkshopList(list) {
	let container = document.querySelector("#workshop-container");
	let options = {
		weekday: 'long',
		year: 'numeric',
		day: 'numeric',
		month: 'long',
	};
	for (let i=0; i<list.length; i++) {
		let id = "w" + String(i);
		let contentId = "w" + String(i) + "-description";
		let item = document.createElement("div");
		item.classList.add("workshop-item");
		let workshopHead = document.createElement("div");
		workshopHead.classList.add("workshop-header");
		func = "activateWorkshop(\"" + id + "\", \"" + contentId + "\")";
		workshopHead.setAttribute("onclick", func);
		let title = document.createElement("p");
		title.classList.add('title');
		title.innerHTML = list[i].title;
		let author = document.createElement("p");
		author.classList.add('author');
		author.innerHTML = list[i].presenter;

		dateString = formatDate(list[i].date);

		let date = document.createElement("p");
		date.classList.add("date");
		date.innerHTML = dateString + ", " + list[i].time

		workshopHead.appendChild(title);
		workshopHead.appendChild(author);
		//abstractHead.appendChild(affiliation);
		workshopHead.appendChild(date);

		let abstract = document.createElement("div");
		abstract.setAttribute("id", contentId);
		abstract.classList.add('abstract');
		abstract.classList.add('hidden');

		let paragraphs = list[i].abstract.split("\\n");
		for (let j=0; j<paragraphs.length; j++) {
			let abstractP = document.createElement("p");
			abstractP.classList.add("abstract-content");
			abstractP.innerHTML = paragraphs[j];
			abstract.appendChild(abstractP);
		}

		item.appendChild(workshopHead);
		item.appendChild(abstract);
		container.appendChild(item);
	}
}



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



//////////////////////////////
//
// formatDate --
//

function formatDate(inputDate) {
	// Create a Date object from the input string (YYYY-MM-DD)
	let date = new Date(inputDate);

	// Define arrays for the day names and month names
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	// Extract the necessary parts from the Date object
	let dayName = days[date.getUTCDay()]; // Get the day of the week (using UTC to avoid localization)
	let monthName = months[date.getUTCMonth()]; // Get the month (using UTC)
	let day = date.getUTCDate(); // Get the day of the month (using UTC)
	let year = date.getUTCFullYear(); // Get the year

	// Return the formatted string
	return `${dayName}, ${monthName} ${day}, ${year}`;
}


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
