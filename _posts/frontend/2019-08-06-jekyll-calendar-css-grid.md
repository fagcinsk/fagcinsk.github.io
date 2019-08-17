---
layout: post
categories: frontend
title: Jekyll календарь на чистом Liquid template engine
description: Сделал Jekyll календарик с использованием Liquid template engine и CSS grid system
image: photos/jekyll-calendar-css-grid.png
---

Захотел попробовать сделать для своего блога на Jekyll календарь с использованием Liquid template engine. Не хотелось использовать JS библиотеки, решил написать календарик на чистом Liquid.

## Предыстория

Делал календарик для отображения даты публикации постов. Решил не заморачиваться с написанием или поиском плагинов, взялся делать самостоятельно. К тому же, изучая CSS grid system понял, что делая минимум телодвижений заставил отображаться сквозной "список" дней с разбивкой на недели.

## Jekyll календарь на чистом Liquid

Первым делом думал о получении даты начала месяца. Сделать это просто:

```liquid
{% raw %}{{ 'now' | date: '%Y-%m-01' }}{% endraw %}
```

Следующее что стоило сделать &mdash; каким-то образом перебрать все дни. Сделать это можно легко. Благо в сутках 24 часа =)

```liquid
{% raw %}{% for i in (0..30) %}
{% assign day = 86400 | times: i | plus: month_starts_ts %}
{% endfor %}{% endraw %}
```

Оставалась ещё проблемка: выводить нужно дни до первого числа месяца, чтобы правильно отобразить календарь средствами CSS grid. Пришлось оглядываться назад на недельку и вставлять заглушки для дней с прошлого месяца. Можно конечно и отображать, но делать цвет шрифта приглушённым.

```liquid
{% raw %}
{% for i in (-7..30) %}

{% assign day = 86400 | times: i | plus: month_starts_ts %}
{% assign dow = day | date: '%u' %}
{% assign m = day | date: '%m' %}

{% unless fd %}
{% if dow == '7' %}{% assign fd = true %}{% endif %}
{% continue %}
{% endunless %}

{% if month == m %}

{% case dow %}
{% when '6' %}<span class="calendar__we {{ has_posts }} ">
  {% when '7' %}<span class="calendar__we {{ has_posts }}">
  {% else %}<span class="{{ has_posts }}">
{% endcase %}{{ day | date: '%e' }}</span>

{% else %}<span></span>{% endif %}

{% endfor %}
{% endraw %}
```

Таким образом, `fd` сигнализирует о том, что попали на первый день календарного месяца.

Осталось отобразить наличие опубликованных постов в определённый день. С наскоку заюзать фильтр по дате не удалось, сделал через обычное условие.

Итоговый вид скрипта:

```liquid
{% raw %}
{% assign month_starts = 'now' | date: '%Y-%m-01' %}
{% assign month_starts_ts = month_starts | date: "%s" %}
{% assign month = 'now' | date: "%m" %}
{% assign fd = false %}
<div class="calendar">
<b>Пн</b><b>Вт</b><b>Ср</b><b>Чт</b><b>Пт</b>
<b class="calendar__we">Сб</b>
<b class="calendar__we">Вс</b>
{%- for i in (-7..30) %}
{%- assign day = 86400 | times: i | plus: month_starts_ts %}
{%- assign dow = day | date: '%u' %}
{%- assign m = day | date: '%m' %}
{%- assign dayf = day | date: "%Y-%m-%d" %}
{%- unless fd %}
{%- if dow == '7' %}{% assign fd = true %}{% endif %}
{%- continue %}
{%- endunless %}

{%- if month == m %}
{%- assign has_posts = '' %}
{%- for post in site.posts %}
    {%- assign d = post.date | date: "%Y-%m-%d" %}
    {%- if d == dayf %}{% assign has_posts = 'calendar__ext' %}{% break %}{% endif %}
{%- endfor %}
{%- case dow %}
{%- when '6' %}<span class="calendar__we {{ has_posts }} ">
  {%- when '7' %}<span class="calendar__we {{ has_posts }}">
  {%- else %}<span class="{{ has_posts }}">
{%- endcase %}{{ day | date: '%e' }}</span>
{%- else %}<span></span>{% endif %}
{%- endfor %}
</div>
{% endraw %}
```

## Вёрстка календаря средствами CSS grid

С сеткой всё просто, когда знаешь, как пользоваться. Нужно указать ширину и высоту ячеек и их количество в строке.

```scss
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 2rem);
  line-height: 2rem;
  text-align: center;
}
.calendar__we {
  color: #e22;
}
.calendar__ext {
  font-style: normal;
  position: relative;
  &:after{
    content: '•';
    position: absolute;
    top: -.45em;
    right: .125em;
  }
}
```

## Заключение

Такой календарь удобно использовать скорее для бо́льших промежутков времени, т.к. всей картины периодичности постинга не видно. Однако, это мой первый опыт доскональной работы с Jekyll Liquid template engine и реализации календаря с использованием модного и удобного CSS grid.
