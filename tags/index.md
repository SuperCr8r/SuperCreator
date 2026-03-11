---
layout: default
title: Explore Topics
---

{% include navigation.md %}

# Explore Topics

Browse books by topic.

<div class="tag-explorer">

{% assign tags = site.pages | map: "tags" | join: "," | split: "," | uniq | sort %}

{% for tag in tags %}

<a class="tag-card" href="{{ '/tags/' | append: tag | append: '.html' | relative_url }}">

<div class="tag-name">{{ tag }}</div>

</a>

{% endfor %}

</div>

{% include footer.md %}
