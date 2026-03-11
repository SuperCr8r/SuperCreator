/* =====================================================
   FEATURE: Knowledge Hub Search Engine
   FILE: assets/js/search.js
   PURPOSE: Client-side search using Lunr.js
   ===================================================== */

let idx;
let pages = [];

/* Fetch search index using Jekyll baseurl */
fetch(window.location.origin + "/SuperCreator/search.json")
.then(res => res.json())
.then(data => {

pages = data;

/* Build Lunr index */
idx = lunr(function () {

this.ref("url");
this.field("title");
this.field("content");

data.forEach(doc => this.add(doc));

});

});

/* Listen for typing in search box */
document.getElementById("search-input").addEventListener("keyup", function(){

let query = this.value;

if(!query || query.length < 2){
document.getElementById("search-results").innerHTML = "";
return;
}

let results = idx.search(query);

let output = "";

results.forEach(result => {

let page = pages.find(p => p.url === result.ref);

output += `<li><a href="${page.url}">${page.title}</a></li>`;

});

document.getElementById("search-results").innerHTML = output;

});
