{% include navigation.md %}

# Books

This section contains notes and reflections from books I read!!

<div class="card-container">

{% for page in site.pages %}
  {% if page.section == "books" %}

  <a class="card" href="{{ page.url }}">
    <div class="card-title">{{ page.title }}</div>
    <div class="card-desc">{{ page.description }}</div>
  </a>

  {% endif %}
{% endfor %}

</div>

{% include footer.md %}
