---
layout: post
categories: frontend
title: Актуальный набор системных CSS семейств шрифтов
description: Собрал небольшую подборку системных семейств шрифтов CSS. Системные семейства шрифтов ускоряют загрузку страницы и делают шрифты более привычными для глаз.
---

Собрал небольшую подборку системных семейств шрифтов CSS. Системные семейства шрифтов ускоряют загрузку страницы и делают шрифты более привычными для глаз.

## Системные шрифты?

Системные шрифты &mdash; это шрифты, имеющиеся в операционной системе по умолчанию. Можно найти списки системных шрифтов для каждой операционной системы, вот краткий список:

### Windows

|Версия|Шрифт|
|---|---|
| 10                      | Segoe UI1      |
| 8.1                     | Segoe UI1      |
| 8                       | Segoe UI1      |
| 7                       | Segoe UI1      |
| Vista                   | Segoe UI1      |
| XP                      | Tahoma2        |
| Me (Millennium Edition) | MS Sans Serif3 |
| 2000                    | Tahoma2        |
| 98 Second Edition       | MS Sans Serif3 |
| 98                      | MS Sans Serif3 |
| NT 4                    | MS Sans Serif3 |
| 95                      | MS Sans Serif3 |
| NT 3.5                  | MS Sans Serif3 |
| NT 3.1                  | MS Sans Serif3 |
| 3.1                     | MS Sans Serif3 |
| 3                       | Helv3          |
| 2                       | Helv3          |
| 1                       | Helv3          |
|---|---|

### Mac OS

|Версия|Шрифт|
|---|---|
| 10.15              | San Francisco  |
| 10.14 Mojave       | San Francisco  |
| 10.13 High Sierra  | San Francisco  |
| 10.12 Sierra       | San Francisco  |
| 10.11 El Capitan   | San Francisco  |
| 10.10 Yosemite     | Helvetica Neue |
| 10.9 Mavericks     | Lucida Grande  |
| 10.8 Mountain Lion | Lucida Grande  |
| 10.7 Lion          | Lucida Grande  |
| 10.6 Snow Leopard  | Lucida Grande  |
| 10.5 Leopard       | Lucida Grande  |
| 10.4 Tiger         | Lucida Grande  |
| 10.3 Panther       | Lucida Grande  |
| 10.2 Jaguar        | Lucida Grande  |
| 10.1 Puma          | Lucida Grande  |
| 10.0 Cheetah       | Lucida Grande  |

### Linux

### iOS

|Версия|Шрифт|
|---|---|
| 12          | San Francisco  |
| 11          | San Francisco  |
| 10          | San Francisco  |
| 9           | San Francisco  |
| 8           | Helvetica Neue |
| 7           | Helvetica Neue |
| 6           | Helvetica Neue |
| 5           | Helvetica Neue |
| 4           | Helvetica Neue |
| iPhone OS 3 | Helvetica      |
| iPhone OS 2 | Helvetica      |
| iPhone OS 1 | Helvetica      |

## Зачем их использовать, если есть красивые веб-шрифты?

Да, используя веб-шрифты, например [Google Fonts](https://fonts.google.com/), можно сверстать очень красивую типографику. Здесь есть большой простор для фантазии, многообразие шрифтов и их бесплатность порадует каждого. Но не всегда пользователя.

Дело в том, что веб шрифты в любом случае нужно дополнительно загружать по сети, загружать в память, что уже вносит дополнительную задержку в отображение контента.

Помимо этого, нужно прописывать дополнительные стили, чтобы веб-шрифты подгружались как нужно. Другое дело системные семейства шрифтов.

## Что такое эти системные семейства шрифтов

Их ещё называют веб-безопасными шрифтами. Небольшой список системных шрифтов на [W3C Schools](https://www.w3schools.com/cssref/css_websafe_fonts.asp). Так же можно посмотреть запись в [блоге Scott Granneman](https://www.granneman.com/webdev/coding/css/fonts-and-formatting/default-fonts).

Если интересуют более надёжные источники &mdash; в блоге Scott Granneman перечислены ссылки.

После того, как выявлены шрифты, присутствующие в каждой из операционных систем, нужно выбрать из них те, что похожи друг на друга в рамках семейств.

В данном посте я это опущу, оставлю лишь несколько ссылок:

[Using UI System Fonts In Web Design: A Quick Practical Guide](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)
[System Fonts in CSS](https://furbo.org/2018/03/28/system-fonts-in-css/)

## Мой вариант

Полазив по крупным ресурсам: GitHub, Medium и некоторым другим, пришёл к такому виду актуального набора системных CSS семейств шрифтов:

```scss
$font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
$font-family-sans-serif-condensed: "DINNextW01-CondensedMed", "AvenirNextCondensed-Bold", "Futura-CondensedExtraBold", HelveticaNeue-CondensedBold, "Ubuntu Condensed", "Liberation Sans Narrow", "Franklin Gothic Demi Cond", "Arial Narrow", "Roboto Condensed", sans-serif-condensed, Arial, "Trebuchet MS", "Lucida Grande", Tahoma, sans-serif;
$font-family-serif: Georgia, Times, Times New Roman, serif;
$font-family-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;

.condensed {
  font-family: $font-family-sans-serif-condensed;
  font-stretch: condensed;
}
```

[Актуальный GitHub Gist](https://gist.github.com/fagcinsk/b4a2409a52551a148405a4b65b20b6c5)
