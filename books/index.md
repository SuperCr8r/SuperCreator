{% include navigation.md %}

# Books

This section contains notes and reflections from books I read!!

<div class="card-container">

{% assign books = site.pages | where: "section", "books" | sort: "title" %}

{% for page in books %}

<a class="card" href="{{ page.url | relative_url }}">

<img class="card-cover"
src="{{ '/assets/images/books/' | append: page.cover | relative_url }}"
alt="{{ page.title }}">

  <div class="card-title">{{ page.title }}</div>

  <div class="card-desc">{{ page.description }}</div>

</a>

{% endfor %}

</div>

{% include footer.md %}
