document.addEventListener("DOMContentLoaded", function () {

const sections = document.querySelectorAll("h2");
const nav = document.getElementById("section-nav");

sections.forEach(section => {

if (!section.id) {
section.id = section.textContent
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-");
}

let li = document.createElement("li");
let a = document.createElement("a");

a.href = "#" + section.id;
a.textContent = section.textContent;

li.appendChild(a);
nav.appendChild(li);

});

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {
const sectionTop = section.offsetTop;

if (window.scrollY >= sectionTop - 120) {
current = section.getAttribute("id");
}
});

document.querySelectorAll("#section-nav a").forEach(link => {

link.classList.remove("active");

if (link.getAttribute("href") === "#" + current) {
link.classList.add("active");
}

});

});

});
