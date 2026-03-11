---
layout: default
title: Search
---

{% include navigation.md %}

# Search Knowledge Hub

<input type="text" id="search-input" placeholder="Search books, ideas, topics..." />

<ul id="search-results"></ul>

{% include footer.md %}

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
