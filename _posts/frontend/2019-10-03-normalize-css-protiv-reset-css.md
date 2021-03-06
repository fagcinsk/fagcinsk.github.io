---
layout: post
categories: frontend
title: "Битва титанов: normalize.css против reset.css"
description: Чтобы сайт отображался одинаково во всех браузерах используйте normalize.css. Расскажу где скачать полную версию и лайт версию для топовых браузеров =)
image: photos/normalize-css-protiv-reset-css.png?v=1
---

Использовать normalize.css практично и менее затратно. 
Сейчас расскажу почему и что меня подвело к использованию normalize.css вместо reset.css.

## Всё-таки normalize.css это не reset.css

Как бы это не было очевидно, разница большая между сбросом и нормализацией. 
Задача reset.css &mdash; сбросить все возможные стили для переопределения потом в коде.
Почему таки задумался о разнице между двумя способами привести стили к одному виду?

Верстая этот блог понял, что должен снова заморачиваться с типографикой, хотя у браузеров по умолчанию она уже есть какая-то. 
Правда у каждого браузера она своя. 

А normalize.css решает в том числе и эту проблему.
В итоге сделал выбор в сторону normalize.css против reset.css. 
Вместе с [системными шрифтами](/frontend/most-recent-variant-of-css-system-font-families) это решение позволяет меньшими затратами достичь нужного результата и быстрее предоставить пользователю контент.

## Где скачать normalize.css

Известный источник с самым большим комьюнити &mdash; [normalize.css](https://github.com/necolas/normalize.css/) от [Nicolas Gallagher](https://github.com/necolas).
Официальный сайт проекта [necolas.github.io/normalize.css](https://necolas.github.io/normalize.css/).

Так же существует __более лёгкая версия normalize.css__ для топовых браузеров:
[sindresorhus/modern-normalize](https://github.com/sindresorhus/modern-normalize).

