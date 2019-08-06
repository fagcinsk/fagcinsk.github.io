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

<ul>
{% for post in site.posts %}
<li>
{{ post.date | date: '%d.%m.%Y' }}
<a href="https://github.com/fagcinsk/fagcinsk.github.io/blob/master/{{post.path}}" rel="nofollow">
  <span class="iconify" data-icon="mdi-github-box"></span>
</a>
<a class="post-item__link" href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> wc={{ post.content | number_of_words }}
</li>
{% endfor %}
</ul>