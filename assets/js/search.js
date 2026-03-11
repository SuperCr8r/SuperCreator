/* =====================================================
FEATURE: Knowledge Hub Autocomplete Search
FILE: assets/js/search.js
PURPOSE: Real-time search suggestions using Lunr.js
===================================================== */

let idx;
let pages = [];

fetch(window.location.origin + "/SuperCreator/search.json")
.then(res => res.json())
.then(data => {

pages = data;

idx = lunr(function () {

this.ref("url");
this.field("title");
this.field("content");

data.forEach(doc => this.add(doc));

});

});

document.getElementById("search-input").addEventListener("keyup", function(){

let query = this.value.trim();

let resultsContainer = document.getElementById("search-results");

if(query.length < 2){
resultsContainer.innerHTML = "";
return;
}

let results = idx.search(query);

let output = "";

results.slice(0,5).forEach(result => {

let page = pages.find(p => p.url === result.ref);

output += `
<li class="search-item">
<a href="${page.url}">
${page.title}
</a>
</li>
`;

});

resultsContainer.innerHTML = output;

});
