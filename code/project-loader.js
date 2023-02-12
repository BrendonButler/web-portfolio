// import data.json as data variable, asserting as json type
import data from './res/data.json' assert { type: 'json' };

// clear main placeholder
var main = document.querySelector('main');
main.innerHTML = "";

// create elements
var section = document.createElement("section");
var img = document.createElement("img");
var div = document.createElement("div");
var header = document.createElement("h2");
var ulData = document.createElement("ul");
var liVers = document.createElement("li");
var liType = document.createElement("li");
var ulLinks = document.createElement("ul");
var liDownload = document.createElement("li");
var aDownload = document.createElement("a");
var liSource = document.createElement("li");
var aSource = document.createElement("a");
var description = document.createElement("p");
var ulExtra = document.createElement("ul");
var liDownloads = document.createElement("li");
var liLicense = document.createElement("li");
var aLicense = document.createElement("a");
var liCreated = document.createElement("li");
var liUpdated = document.createElement("li");

var liDevs = document.createElement("li");
var liHelp = document.createElement("li");

var sectionVis = document.createElement("section");
var imgVis = document.createElement("img");
var divVis = document.createElement("div");
var headerVis = document.createElement("h2");
var ulDataVis = document.createElement("ul");
var liVersVis = document.createElement("li");
var liTypeVis = document.createElement("li");
var ulLinksVis = document.createElement("ul");
var liDownloadVis = document.createElement("li");
var aDownloadVis = document.createElement("a");
var liSourceVis = document.createElement("li");
var aSourceVis = document.createElement("a");
var descriptionVis = document.createElement("p");
var ulExtraVis = document.createElement("ul");
var liDownloadsVis = document.createElement("li");
var liLicenseVis = document.createElement("li");
var aLicenseVis = document.createElement("a");
var liCreatedVis = document.createElement("li");
var liUpdatedVis = document.createElement("li");

var liDevsVis = document.createElement("li");
var liHelpVis = document.createElement("li");


// add data to elements
// MODEST
var projectId = data.modest.human_name.toLowerCase().replace(" ", "-");
section.setAttribute("id", projectId);
img.setAttribute("class", "logo");
img.setAttribute("src", "img/" + projectId + "-small.png");
img.setAttribute("alt", data.modest.human_name + " logo");
div.setAttribute("class", "right");
header.innerText = data.modest.human_name;
header.setAttribute("class", "project-name");
ulData.setAttribute("class", "data");
liVers.innerText = "v" + data.modest.version;
liVers.setAttribute("class", "version");
liType.innerText = data.modest.type;
liType.setAttribute("class", "type");
ulLinks.setAttribute("class", "links");
liDownload.setAttribute("class", "download");
aDownload.setAttribute("href", data.modest.download);
aDownload.setAttribute("target", "_blank");
liSource.setAttribute("class", "source");
aSource.setAttribute("href", data.modest.source);
aSource.setAttribute("target", "_blank");
description.innerText = data.modest.description;
description.setAttribute("class", "description");
ulExtra.setAttribute("class", "extra");
liDownloads.innerText = data.modest.downloads + (data.modest.downloads > 1 ? " downloads" : " download");
liDownloads.setAttribute("class", "downloads");
liLicense.setAttribute("class", "license");
aLicense.innerText = data.modest.license.name;
aLicense.setAttribute("href", data.modest.license.link);
aLicense.setAttribute("target", "_blank");
liCreated.innerText = data.modest.created;
liCreated.setAttribute("class", "created");
liUpdated.innerText = data.modest.updated;
liUpdated.setAttribute("class", "updated");

//VISIONLESS
var projectIdVis = data.visionless.human_name.toLowerCase().replace(" ", "-");
sectionVis.setAttribute("id", projectIdVis);
imgVis.setAttribute("class", "logo");
imgVis.setAttribute("src", "img/" + projectIdVis + "-small.png");
imgVis.setAttribute("alt", data.visionless.human_name + " logo");
divVis.setAttribute("class", "right");
headerVis.innerText = data.visionless.human_name;
headerVis.setAttribute("class", "project-name");
ulDataVis.setAttribute("class", "data");
liVersVis.innerText = "v" + data.visionless.version;
liVersVis.setAttribute("class", "version");
liTypeVis.innerText = data.visionless.type;
liTypeVis.setAttribute("class", "type");
ulLinksVis.setAttribute("class", "links");
liDownloadVis.setAttribute("class", "download");
aDownloadVis.setAttribute("href", data.visionless.download);
aDownloadVis.setAttribute("target", "_blank");
liSourceVis.setAttribute("class", "source");
aSourceVis.setAttribute("href", data.visionless.source);
aSourceVis.setAttribute("target", "_blank");
descriptionVis.innerText = data.visionless.description;
descriptionVis.setAttribute("class", "description");
ulExtraVis.setAttribute("class", "extra");
liDownloadsVis.innerText = data.visionless.downloads + (data.visionless.downloads > 1 ? " downloads" : " download");
liDownloadsVis.setAttribute("class", "downloads");
liLicenseVis.setAttribute("class", "license");
aLicenseVis.innerText = data.visionless.license.name;
aLicenseVis.setAttribute("href", data.visionless.license.link);
aLicenseVis.setAttribute("target", "_blank");
liCreatedVis.innerText = data.visionless.created;
liCreatedVis.setAttribute("class", "created");
liUpdatedVis.innerText = data.visionless.updated;
liUpdatedVis.setAttribute("class", "updated");

// build element tree
// MODEST
main.appendChild(section);
section.appendChild(img);
section.appendChild(div);
div.appendChild(header);
div.appendChild(ulData);
div.appendChild(description);
section.appendChild(ulLinks);
section.appendChild(ulExtra);
ulData.appendChild(liVers);
ulData.appendChild(liType);
ulLinks.appendChild(liDownload);
ulLinks.appendChild(liSource);
ulExtra.appendChild(liDownloads);
ulExtra.appendChild(liLicense);
ulExtra.appendChild(liCreated);
ulExtra.appendChild(liUpdated);
liLicense.appendChild(aLicense);
liDownload.appendChild(aDownload);
liSource.appendChild(aSource);

// VISIONLESS
main.appendChild(sectionVis);
sectionVis.appendChild(imgVis);
sectionVis.appendChild(divVis);
divVis.appendChild(headerVis);
divVis.appendChild(ulDataVis);
divVis.appendChild(descriptionVis);
sectionVis.appendChild(ulLinksVis);
sectionVis.appendChild(ulExtraVis);
ulDataVis.appendChild(liVersVis);
ulDataVis.appendChild(liTypeVis);
ulLinksVis.appendChild(liDownloadVis);
ulLinksVis.appendChild(liSourceVis);
ulExtraVis.appendChild(liDownloadsVis);
ulExtraVis.appendChild(liLicenseVis);
ulExtraVis.appendChild(liCreatedVis);
ulExtraVis.appendChild(liUpdatedVis);
liLicenseVis.appendChild(aLicenseVis);
liDownloadVis.appendChild(aDownloadVis);
liSourceVis.appendChild(aSourceVis);