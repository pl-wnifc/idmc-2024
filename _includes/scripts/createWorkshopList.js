


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
		//let id = "w" + String(i);
    let id = list[i].id;
		let contentId = id + "-description";
		let item = document.createElement("div");
		item.classList.add("workshop-item");
		let workshopHead = document.createElement("div");
		workshopHead.classList.add("workshop-header");
		let func = "activateWorkshop(\"" + id + "\", \"" + contentId + "\")";
		workshopHead.setAttribute("onclick", func);
		let title = document.createElement("p");
		title.classList.add('title');
		title.innerHTML = list[i].title;
		let author = document.createElement("p");
		author.classList.add('author');
		author.innerHTML = list[i].presenter;

		let dateString = formatDate(list[i].date);

		let date = document.createElement("p");
		date.classList.add("date");
		date.innerHTML = dateString + ", " + list[i].time

		workshopHead.appendChild(title);
		workshopHead.appendChild(author);
		//abstractHead.appendChild(affiliation);
		workshopHead.appendChild(date);

		let abstractElement = document.createElement("div");
		abstractElement.setAttribute("id", contentId);
		abstractElement.classList.add('abstract');
		abstractElement.classList.add('hidden');

		let paragraphs = list[i].abstract.split("\\n");
		for (let j=0; j<paragraphs.length; j++) {
			let abstractP = document.createElement("p");
			abstractP.classList.add("abstract-content");
			abstractP.innerHTML = paragraphs[j];
			abstractElement.appendChild(abstractP);
		}

		if (list[i].slides) {
			let slidesElement = document.createElement("p");
			slidesElement.classList.add("abstract-content");
			abstractElement.appendChild(slidesElement);
			let slides = `<a class="slides" target="_blank" href="${list[i].slides}">slides</a>`;
			slidesElement.innerHTML = slides;
		}

		item.appendChild(workshopHead);
		item.appendChild(abstractElement);
		container.appendChild(item);
	}
}
