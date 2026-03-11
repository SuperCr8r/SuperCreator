---
# =====================================
# FEATURE: Knowledge Hub Search Page
# PURPOSE: Enables Lunr.js full-site search
# URL: /search/
# =====================================
layout: default
title: Search
permalink: /search/
---

{% include navigation.md %}

# Search Knowledge Hub

<input type="text" id="search-input" placeholder="Search books, ideas, topics..." />

<ul id="search-results"></ul>

{% include footer.md %}

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
