/* =====================================================
FEATURE: Knowledge Hub Autocomplete Search (Hardened)
- Safe async loading
- No-result state
- Baseurl-safe
- Prevents errors before Lunr is ready
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  if (!searchInput || !resultsContainer) return;

  let idx = null;
  let pages = [];
  let searchReady = false;

  const searchJsonUrl = `${window.location.origin}${window.location.pathname.includes("/SuperCreator") ? "/SuperCreator" : ""}/search.json`;

  fetch(searchJsonUrl)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load search index");
      return res.json();
    })
    .then(data => {
      pages = data;

      idx = lunr(function () {
        this.ref("url");
        this.field("title");
        this.field("content");

        data.forEach(doc => this.add(doc));
      });

      searchReady = true;
    })
    .catch(err => {
      console.error("Search init failed:", err);
      resultsContainer.innerHTML = `<li class="search-item">Search unavailable right now.</li>`;
    });

  searchInput.addEventListener("keyup", function () {
    const query = this.value.trim();

    if (query.length < 2) {
      resultsContainer.innerHTML = "";
      return;
    }

    if (!searchReady || !idx) {
      resultsContainer.innerHTML = `<li class="search-item">Loading search…</li>`;
      return;
    }

    let results = [];

    try {
      results = idx.search(query);
    } catch (e) {
      resultsContainer.innerHTML = `<li class="search-item">No results found.</li>`;
      return;
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = `<li class="search-item">No results found.</li>`;
      return;
    }

    const output = results.slice(0, 6).map(result => {
      const page = pages.find(p => p.url === result.ref);
      if (!page) return "";

      return `
        <li class="search-item">
          <a href="${page.url}">
            ${page.title}
          </a>
        </li>
      `;
    }).join("");

    resultsContainer.innerHTML = output;
  });

  // Optional: clear results when clicking outside
  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
      resultsContainer.innerHTML = "";
    }
  });
});
