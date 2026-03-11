---
layout: default
title: Search
permalink: /search/
---

{% include navigation.md %}

# Search Knowledge Hub

<!-- =========================================
FEATURE: Search Autocomplete UI
PURPOSE: Enables dropdown suggestions while typing
FILE: search.md
========================================= -->

<div class="search-box">

<input
type="text"
id="search-input"
placeholder="Search books, ideas, topics..."
autocomplete="off"
/>

<ul id="search-results" class="search-dropdown"></ul>

</div>

{% include footer.md %}

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="{{ '/assets/js/search.js' | relative_url }}"></script>
