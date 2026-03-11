let idx;
let pages = [];

fetch("/SuperCreator/search.json")
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

let query = this.value;

let results = idx.search(query);

let output = "";

results.forEach(result => {

let page = pages.find(p => p.url === result.ref);

output += `<li><a href="${page.url}">${page.title}</a></li>`;

});

document.getElementById("search-results").innerHTML = output;

});
