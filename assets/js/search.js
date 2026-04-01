document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  if (!searchInput || !resultsContainer) return;

  let idx;
  let pages = [];

  // ✅ FIX: correct base path handling
  const baseUrl = window.location.pathname.includes("/SuperCreator") ? "/SuperCreator" : "";
  const searchJsonUrl = baseUrl + "/search.json";

  fetch(searchJsonUrl)
    .then(res => res.json())
    .then(data => {
      pages = data;

      idx = lunr(function () {
        this.ref("url");
        this.field("title", { boost: 10 });
        this.field("author");
        this.field("tags");
        this.field("description");
        this.field("content");

        data.forEach(doc => this.add(doc));
      });
    })
    .catch(err => {
      console.error("Search load error:", err);
    });

  searchInput.addEventListener("keyup", function () {
    const query = this.value.trim();

    if (query.length < 2 || !idx) {
      resultsContainer.innerHTML = "";
      return;
    }

    let results = [];

    try {
      results = idx.search(query);
    } catch {
      resultsContainer.innerHTML = "<li>No results</li>";
      return;
    }

    resultsContainer.innerHTML = results.slice(0, 6).map(r => {
      const page = pages.find(p => p.url === r.ref);

      return `
        <li class="search-item">
          <a href="${page.url}">
            <strong>${page.title}</strong>
            ${page.description ? `<div>${page.description}</div>` : ""}
          </a>
        </li>
      `;
    }).join("");
  });
});
