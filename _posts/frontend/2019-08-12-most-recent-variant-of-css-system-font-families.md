---
layout: post
categories: frontend
title: Системные шрифты для веб 2019
description: Собрал подборку системных семейств шрифтов CSS. Системные семейства шрифтов ускоряют загрузку страницы и делают шрифты более привычными для глаз.
image: photos/most-recent-variant-of-css-system-font-families.png
---

Собрал подборку системных семейств шрифтов CSS. Системные семейства шрифтов ускоряют загрузку страницы и делают шрифты привычными для глаз.

## Системные шрифты &mdash; что это такое

Системные шрифты &mdash; это шрифты, предустановленные в операционной системе по умолчанию. Для каждой версии операционной системы свой список системных шрифтов по умолчанию, вот краткий список:

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

[Источник](https://www.granneman.com/webdev/coding/css/fonts-and-formatting/default-fonts)

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

[Источник](https://www.granneman.com/webdev/coding/css/fonts-and-formatting/default-fonts)

### Linux

...

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

[Источник](https://www.granneman.com/webdev/coding/css/fonts-and-formatting/default-fonts)

### Android

|Версия|Шрифт|
|---|---|
| 4.3 и ниже   | Droid |
| 5.0 Lollipop и выше | Roboto |

[Источник](https://en.wikipedia.org/wiki/Roboto)

## Зачем использовать вместо веб-шрифтов

Да, используя веб-шрифты, например [Google Fonts](https://fonts.google.com/), получится очень красивая типографика. Здесь есть большой простор для фантазии, многообразие шрифтов и их бесплатность порадует каждого. Но не всегда пользователя.

Дело в том, что веб шрифты в любом случае нужно дополнительно загружать по сети, загружать в память, что уже вносит дополнительную задержку в отображение контента.

Помимо этого, прописываются дополнительные атрибуты, чтобы веб-шрифты подгружались как нужно. Другое дело системные семейства шрифтов.

## Что такое эти системные семейства шрифтов

Ещё такие шрифты называют веб-безопасными. Список системных шрифтов на [W3C Schools](https://www.w3schools.com/cssref/css_websafe_fonts.asp). Так же смотрите запись в [блоге Scott Granneman](https://www.granneman.com/webdev/coding/css/fonts-and-formatting/default-fonts).

Если интересуют надёжные источники &mdash; в блоге Scott Granneman перечислены ссылки.

После того, как выявлены шрифты, присутствующие в каждой из операционных систем, выбираются из них те, что похожи друг на друга в семействе.

В посте это опущу, оставлю пару ссылок:

[Using UI System Fonts In Web Design: A Quick Practical Guide](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)
[System Fonts in CSS](https://furbo.org/2018/03/28/system-fonts-in-css/)

## Мой вариант

Полазив по GitHub, Medium и некоторым другим ресурсам, пришёл к такому виду стека системных шрифтов 2019 года:

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

[GitHub Gist](https://gist.github.com/fagcinsk/b4a2409a52551a148405a4b65b20b6c5)
