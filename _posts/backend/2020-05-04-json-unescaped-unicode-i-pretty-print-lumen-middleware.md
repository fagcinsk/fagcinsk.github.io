---
layout: post
categories: backend
title: Lumen middleware для UNESCAPED_UNICODE и PRETTY_PRINT
description: Простейший способ возвращать неэкранированный юникод в Lumen посредством middleware.
---

Долго искал правильный способ возвращать `PRETTY_PRINT` и `UNESCAPED_UNICODE` в ответе от API в фреймворке Lumen. 

## Хотелка

В современных реалиях нет нужды экранировать unicode в ответе от JSON API. Ещё хотелось красивый вывод для отладки.
Лазил по интернетам, так и не нашёл решение, наверное не там искал. В голову пришло заюзать middleware для трансформации ответа.

## Реализация

Решение было простым: берём response - ответ и добавляем к нему нужные опции при помощи `setEncodingOptions` как к `json_encode`.
В моей реализации я добавил `JSON_PRETTY_PRINT`, `JSON_UNESCAPED_UNICODE`, `JSON_UNESCAPED_SLASHES`. Последнее может лишнее, но хотелось красивого ответа при отладке.

Вариант "в лоб" выглядит так:

```php
<?php

namespace App\Http\Middleware;

use Closure;

class UnescapedJsonMiddleware
{
    public function handle($request, Closure $next)
    {
        $data = $next($request);
        $data->setEncodingOptions(JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        return $data;
    }
}
```

Его можно доработать для обработки только JSON ответов, но мне этого было достаточно.

Актуальная версия лежит тут: [Laravel / Lumen json options for response using middleware](https://gist.github.com/fagcinsk/f4df62f39b912f819a0e7205541f551e).
