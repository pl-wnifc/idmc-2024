//get index of presentations:
let presentations;
let workshops;
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/jacekiwaszko1/dmc/refs/heads/main/presentations.json");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
    presentations = data;
    createAbstractList(presentations);
    //createScheadule(presentations);
    //document.getElementById('datastore').innerHTML = JSON.stringify(presentations);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};

const xhr2 = new XMLHttpRequest();
xhr2.open("GET", "https://raw.githubusercontent.com/jacekiwaszko1/dmc/refs/heads/main/workshops.json");
xhr2.send();
xhr2.responseType = "json";
xhr2.onload = () => {
  if (xhr2.readyState == 4 && xhr2.status == 200) {
    const data = xhr2.response;
    console.log(data);
    workshops = data;
    createWorkshopList(workshops);
    //document.getElementById('datastore').innerHTML = JSON.stringify(presentations);
  } else {
    console.log(`Error: ${xhr2.status}`);
  }
};

var originUrl = window.location.href;
//console.log(originUrl);


function activateTab(tabname, navtab, from) {
  console.log(tabname);
  if (/^http/.test(originUrl)) {
    if (tabname == 'home') {
      window.history.pushState(null, null, originUrl);
    } else {
      let newUrl = originUrl + "#" + tabname;
      window.history.pushState(null, null, newUrl);
    }

  }
  //console.log(newUrl);
  //window.history.pushState(null, null, newUrl);
  var tabs = document.getElementsByClassName('content');
  var navtabs = document.getElementsByClassName('tab');
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].classList.contains('hidden')) {

    } else {
      tabs[i].classList.add('hidden');
    }
  }
  for (var j = 0; j < navtabs.length; j++) {
    navtabs[j].classList.remove('active');
  }
  var tab = document.getElementById(tabname);
  tab.classList.remove('hidden');
  var navtab = document.getElementById(navtab);
  navtab.classList.add('active');
}

function activateWorkshop(wid, wcontent) {
  var workshopDesc = document.getElementsByClassName('abstract');
  for (var i = 0; i < workshopDesc.length; i++) {
    if (workshopDesc[i].classList.contains('hidden')) {
      if (workshopDesc[i].id == wcontent) {
        workshopDesc[i].classList.remove('hidden');
      }
    } else {
      workshopDesc[i].classList.add('hidden');
    }
  }

  //var wdescription = document.getElementById(wcontent);
  //if (wdescription.classList.contains('hidden')) {
  //  console.log("open");
  //  wdescription.classList.remove('hidden');
  //} else {
  //  console.log("close");
  //  wdescription.classList.add('hidden');
  //}

}

function createAbstractList(list) {
  let container = document.getElementById("abstract-container");
  const options = {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  };
  console.log("got here");
  for (var i = 0; i < list.length; i++) {
    let id = "abs" + String(i);
    //console.log(id);
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
    isodate = new Date(list[i].date);
    //console.log(date);
    dateString = isodate.toLocaleDateString("en-US", options);

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

    let paragraphs = list[i].abstract.split("\\n");
    for (var j = 0; j < paragraphs.length; j++) {
      let abstractP = document.createElement("p");
      abstractP.classList.add("abstract-content");
      abstractP.innerHTML = paragraphs[j];
      abstract.appendChild(abstractP);
    }





    item.appendChild(abstractHead);
    item.appendChild(abstract);
    container.appendChild(item);
  }
}

function toggleAbstract(id) {
  console.log(id);
  let abstracts = document.getElementsByClassName("abstract");
  for (var a of abstracts) {
    if (a.classList.contains("hidden")) {
      if (a.id == id) {
        a.classList.remove("hidden");
      }
    } else {
      a.classList.add("hidden");
    }
  }
  //elem = document.getElementById(id);
  //if (elem.classList.contains("hidden")) {
  //  elem.classList.remove("hidden");
  //} else {
  //  elem.classList.add("hidden");
  //}
}

function createScheadule(list) {
  let dates = new Set();
  for (var i = 0; i < list.length; i++) {
    dates.add(list[i].date);
  }
  let container = document.getElementById("schedule-container");
  for (d of dates) {
    let day = document.createElement("div");
    day.setAttribute("id", d);
    day.classList.add("day");
    container.appendChild(day);
  }

  for (p of list) {
    let parent = document.getElementById(p.date);
    let hour = document.createElement("p");
    hour.classList.add("hour");
    hour.innerHTML = p.time;
    parent.appendChild(hour);
  }

  //console.log(dates);
}

function createWorkshopList(list) {
  let container = document.getElementById("workshop-container");
  const options = {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  };
  console.log("got here");
  for (var i = 0; i < list.length; i++) {
    let id = "w" + String(i);
    let contentId = "w" + String(i) + "-description";
    //console.log(id);
    let item = document.createElement("div");
    item.classList.add("workshop-item");
    let workshopHead = document.createElement("div");
    workshopHead.classList.add("workshop-header");
    func = "activateWorkshop(\"" + id + "\", \"" + contentId + "\")";
    console.log("w func:" + func);
    workshopHead.setAttribute("onclick", func);
    let title = document.createElement("p");
    title.classList.add('title');
    title.innerHTML = list[i].title;
    let author = document.createElement("p");
    author.classList.add('author');
    author.innerHTML = list[i].presenter;

    //let affiliation = document.createElement("p");
    //affiliation.classList.add("affiliation");
    //affiliation.innerHTML = list[i].affiliation;
    isodate = new Date(list[i].date);
    //console.log(date);
    dateString = isodate.toLocaleDateString("en-US", options);

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
    for (var j = 0; j < paragraphs.length; j++) {
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

function goToDescription(tab, navtab, item, desc) {
  activateTab(tab, navtab)
  if (tab == "abstracts") {
    toggleAbstract(desc);
  } else if (tab == "workshops") {
    activateWorkshop(item, desc);
  }

}
