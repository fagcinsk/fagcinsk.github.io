---
layout: post
categories: frontend
title: "CSS ищет баги в SEO: картинки без alt и внешние ссылки"
description: В 2015 году писал CSS стиль для stylish, для подсчёта изображений без атрибута alt, чтобы видеть где и сколько забыл проставить.
image: photos/css-noalt-external-link-counter.png
---

В 2015 году писал CSS стиль для stylish, для подсчёта изображений без атрибута alt, чтобы видеть где и сколько забыл проставить.

## Да, считать средствами css уже давно можно

Посмотрев в доки на mozilla.org, увидим что в [спецификации CSS 2.1](https://www.w3.org/TR/CSS21/generate.html#counters), а это аж в [середине 2011 года](https://ru.wikipedia.org/wiki/CSS), появилась возможность использовать счётчики для их инкрементирования через свойства CSS.
Кто не знает, как и что &mdash; привожу краткий пример для нумерации заголовков.

```css
article {
  counter-reset: h;
}
article h2 {
  counter-increment: h;
}
article h2:before {
  content: counter(h) '. ';
}
```

В этом примере для каждого материала article сбрасывается счётчик `h`, который будет хранить количество заголовков второго уровня.
Затем для каждого встречающегося тега h2 увеличиваем значение счётчика и потом приписываем в начало заголовков значение счётчика. 

## Что я сделал

Реализация старая, оставлю как есть.

```css
body {
	counter-reset: noalt extLinks;
}

img:not([alt]) {
  counter-increment: noalt;
}

a[href ^= 'http'] {
	counter-increment: extLinks;
}

body:after {
  content: 'noalt: ' counter(noalt) ', external links: ' counter(extLinks);
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1000000;
  padding: 2px 16px;
  background: rgba(0,0,0,0.75);
  color: #0f0;
  font-size: 11px;
  line-height: normal;
}
```

В коде выше помимо подсчёта изображений без атрибута alt ещё считал количество внешних ссылок. Критерием было наличие http в начале ссылки, что недостоверно, т.к. отслеживает только абсолютные ссылки. Доработайте сами. Тут показал только пример.