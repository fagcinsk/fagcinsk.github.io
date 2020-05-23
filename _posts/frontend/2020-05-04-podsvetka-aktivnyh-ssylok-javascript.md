---
layout: post
categories: frontend
title: Подсветка активных ссылок на чистом JavaScript
description: Подсвечиваем активные ссылки на Vanilla JS. Просто и эффективно.
image: photos/javascript-active-links-highlight.jpg
---

Хорошей практикой считается подсвечивать текущую ссылку, чтобы показать пользователю, где он находится в данный момент.

Использовать для этого ресурсы сервера не оправдано. Исключением являются кешируемые на долгое время страницы или статические страницы.
В остальных случаях серверу должно быть наплевать на то, какую страницу отправили пользователю. Как минимум в контент лезть ему не надо, чтоб указать класс активной ссылке.
Это задача клиента, т.к. он сам запросил нужную страницу.

Решение в несколько строчек нисколько не будет нагружать клиента, отработает быстро. Скрипт можно вставлять прямо после навигационного меню например, если другие ссылки не нужно подсвечивать.

```javascript
const doc = window.document
const linksCount = doc.links.length 
for (let i = 0; i < linksCount; i++)
  if(doc.URL.startsWith(doc.links[i].href))
    doc.links[i].classList.add('active') 
```

Останется только назначить стили активным ссылкам с классом `active`.