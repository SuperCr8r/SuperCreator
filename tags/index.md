---
layout: default
title: "Topics"
---

{% include navigation.md %}

# Topics

Explore the knowledge hub by themes and concepts.

Use topics to discover books and content connected to:
- habits
- productivity
- systems
- behavior
- self-improvement
- and more

---

<div class="tag-explorer">
  {% assign tag_pages = site.pages | where_exp: "item", "item.url contains '/tags/'" | sort: "title" %}

  {% for tag in tag_pages %}
    {% unless tag.url == page.url %}
      {% unless tag.title == nil %}
        <a class="tag-card" href="{{ tag.url | relative_url }}">
          {{ tag.title }}
        </a>
      {% endunless %}
    {% endunless %}
  {% endfor %}
</div>

{% include footer.md %}
