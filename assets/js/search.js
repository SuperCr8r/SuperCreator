document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  if (!searchInput || !resultsContainer) return;

  let idx;
  let pages = [];

  const searchJsonUrl = "{{ '/search.json' | relative_url }}";

  fetch(searchJsonUrl)
    .then(res => res.json())
    .then(data => {
      pages = data;

      idx = lunr(function () {
        this.ref("url");
        this.field("title", { boost: 10 });
        this.field("author", { boost: 6 });
        this.field("tags", { boost: 5 });
        this.field("description", { boost: 4 });
        this.field("content");

        data.forEach(doc => this.add(doc));
      });
    });

  searchInput.addEventListener("keyup", function () {
    const query = this.value;

    if (query.length < 2) {
      resultsContainer.innerHTML = "";
      return;
    }

    const results = idx.search(query);

    resultsContainer.innerHTML = results.map(r => {
      const page = pages.find(p => p.url === r.ref);

      return `
        <li>
          <a href="${page.url}">
            <strong>${page.title}</strong>
            <div>${page.description || ""}</div>
          </a>
        </li>
      `;
    }).join("");
  });
});
