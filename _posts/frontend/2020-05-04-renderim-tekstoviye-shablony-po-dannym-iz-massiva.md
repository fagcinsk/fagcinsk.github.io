---
layout: post
categories: frontend
title: Рендер текстовых шаблонов по данным из массива PHP
description: Работая с текстовыми шаблонами для SEO например, встаёт задача использовать шаблоны строк, данные которых должны браться из массива.
---

Работая с текстовыми шаблонами для SEO например, встаёт задача использовать шаблоны строк, данные которых должны браться из массива.

## Задача

Задача проста &mdash; воспользоваться шаблонами строк для отображения данных из массива. Сделать это можно несколькими способами:

- сгенерировать текста в самом PHP
- воспользоваться готовыми шаблонизаторами например Twig, Blade, Smarty, ...
- написать небольшую функцию для преобразования определённой подстроки в текст по данным из ассоциативного массива

## Решение

Я предпочёл последний вариант, несмотря на подключенный Twig в проекте.

Первый вариант решения задачи выглядит следующим образом:

```php
<?php

/**
 * PHP function to render string path template using nested array.
 * Renders template string like "Nested array item value: {data.some.nested.item.value}"
 * @param string $template
 * @param array $data
 * @return string
 */
public static function renderDataTemplate(string $template, array $data): string
{
    return preg_replace_callback('/{([^}]+?)}/', static function ($v) use ($data) {
        $temp = &$data;
        foreach (explode('.', $v[1]) as $key) {
            $temp = &$temp[$key] ?? null;
            if ($temp === null) {
                return null;
            }
        }
        return $temp;
    }, $template);
}
```

Актуальная версия функции PHP для рендера шаблона по данным из ассоциативного массива: [PHP function to render string path template using nested array](https://gist.github.com/fagcinsk/5c189856f00f4e3c4329858db19b5841).