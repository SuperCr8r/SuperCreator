---
layout: default
title: "Search"
---

{% include navigation.md %}

# Search the Knowledge Hub

Use the search box below to find:
- books
- ideas
- topics
- summaries
- concepts

<div class="search-box">
  <input
    type="text"
    id="search-input"
    placeholder="Search books, topics, ideas..."
    autocomplete="off"
  />
  <ul id="search-results" class="search-dropdown"></ul>
</div>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>

{% include footer.md %}
