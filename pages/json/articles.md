---
layout: null
permalink: /api
pagination:
  permalink: ''
  enabled: true
  extension: .json
  indexpage: 'articles-:num'
---

{
  "pages": [{% for post in paginator.posts %}
    {% if forloop.first != true %},{% endif %}
    {
      "title": "{{ post.title }}",
      "link": "{{ post.link }}",
      "date": "{{ post.date | date: "%d.%m.%Y" }}",
      "image": "{{ post.image }}"
    }{% endfor %}
  ]
  {% if paginator.next_page %}
  ,"next": "{{ paginator.next_page_path }}"
  {% endif %}
  {% if paginator.last_page %}
  ,"prev": "{{ paginator.last_page_path }}"
  {% endif %}
  {% if paginator.first_page %}
  ,"first": "{{ paginator.first_page_path }}"
  {% endif %}
}
