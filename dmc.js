function activateTab(tabname, navtab, from) {
  console.log(tabname);
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
  console.log(wid);
  //var workshopDesc = document.getElementsByClassName('workshop-description');
  //for (var i = 0; i < workshopDesc.length; i++) {
  //  if (workshopDesc[i].classList.contains('hidden')) {
  //
  //  } else {
  //    workshopDesc[i].classList.add('hidden');
  //  }
  //}
  var wdescription = document.getElementById(wcontent);
  if (wdescription.classList.contains('hidden')) {
    wdescription.classList.remove('hidden');
  } else {
    wdescription.classList.add('hidden');
  }

}
