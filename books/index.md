{% include navigation.md %}

# Books

This section contains notes and reflections from books I read!!

<div class="card-container">

{% assign books = site.pages | where: "section", "books" | sort: "title" %}

{% for page in books %}

<a class="card" href="{{ site.baseurl }}{{ page.url }}">
  <div class="card-title">{{ page.title }}</div>
  <div class="card-desc">{{ page.description }}</div>
</a>

{% endfor %}

</div>

{% include footer.md %}
