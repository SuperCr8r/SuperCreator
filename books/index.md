---
layout: default
title: "Books"
---

{% include navigation.md %}

# Books

Explore concise, structured, and practical summaries of high-value books.

Each book page includes:
- TL;DR
- Summary
- Chapter-wise breakdown
- Practical application blogs
- Related books
- Read Aloud support

---

<div class="card-container">
  {% assign books = site.pages | where: "section", "books" | sort: "title" %}

  {% for book in books %}
    {% if book.url != page.url %}
      <a class="card" href="{{ book.url | relative_url }}">
        <div class="card-cover-container">
          <img class="card-cover"
               src="{{ '/assets/images/books/' | append: book.cover | relative_url }}"
               alt="{{ book.title }}">
        </div>

        <div class="card-title">{{ book.title }}</div>

        {% if book.description %}
        <div class="card-desc">{{ book.description }}</div>
        {% endif %}
      </a>
    {% endif %}
  {% endfor %}
</div>

{% include footer.md %}
