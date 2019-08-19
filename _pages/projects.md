---
layout: page
title: Веб-разработчик Михаил Юдин &mdash; мои проекты
permalink: /projects/
description: >
  Проекты, над которыми работаю или работал 
---

# Мои проекты
{% assign projects_by_category = site.data.projects | group_by: 'category' %} 
{% for category in projects_by_category %}
<h2>{{ category.name }}</h2>
{% for repo in category.items %}
<div class="tile">
<div class="tile__text">
<h3><a href="https://github.com/fagcinsk/{{ repo.repo }}">
<span class="iconify" data-icon="mdi-github-circle"></span> {{ repo.repo }}</a>
</h3>
{{ repo.name }}</div></div><hr>

{% endfor %}
{%- endfor %}