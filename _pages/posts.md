---
layout: page
sitemap: false
title: Список всех постов
permalink: /posts/
sitemap: false
description: >
  Список всех постов
---

# Список постов

{% for category in site.categories %}
{% assign category_name = category | first %}

## {{ site.categoryMap[category_name].name }}

{{ site.categoryMap[category_name].description }}

![](/assets/img/categories/{{ category_name }}.png)

<ul>
{% for post in site.categories[category_name] %}
<li>
{{ post.date | date: '%d.%m.%Y' }}
<a href="https://github.com/fagcinsk/fagcinsk.github.io/blob/master/{{post.path}}" rel="nofollow">
  <span class="iconify" data-icon="mdi-github-box"></span>
</a>
<a class="post-item__link" href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> wc={{ post.content | number_of_words }}
</li>
{% endfor %}
</ul>

{% endfor %}

