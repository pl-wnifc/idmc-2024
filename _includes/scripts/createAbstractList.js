


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
		let func = "toggleAbstract(\"" + id + "\")";
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
		let dateString = formatDate(list[i].date);

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



