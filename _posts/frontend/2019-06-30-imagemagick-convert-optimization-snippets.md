---
layout: post
categories: frontend
title: Оптимизация изображений для Веба при помощи ImageMagick
description: >
  Способы оптимизации изображений для Веба при помощи утилиты convert библиотеки ImageMagick
image: photos/imagemagick-convert-optimization.png
---

Часто при работе с изображениями встаёт задача оптимизировать изображения для показа в Веб. Инструментов достаточно много, в том числе и онлайн, однако больше контроля над процессом и более эффективный результат можно получить используя утилиту convert из библиотеки ImageMagick.

Часто нужно сделать так, чтобы изображения подгружались в полном размере, чтобы не плыла вёрстка или не было пустого пространства до полной загрузки изображения. Да и к тому же будет достигнут эффект размытия при загрузке изображения.

Реализовать это очень просто:

``` shell
convert -strip -interlace Plane -quality 85 input-file.jpg output-file.jpg 
```

Подробнее про опции:

`-strip` убирает лишнюю метаинформацию  
`-quality` устанаввливает качество результата в процентах; рекомендуется в диапазоне 75..90  
`-interlace Plane` определяет режим подгрузки изображения, в данном случае всё изображение при загрузке в браузере будет отображаться постепенно из размытого состояния к более чёткому.

При работе с PNG изображениями можно достичь меньшего размера, если урезать палитру до минимально необходимого набора цветов:

``` shell
convert -colors 8 input-file.jpg output-file.jpg 
```

Где:

`-colors 8` указывает на количество цветов в выходном файле.

После поисков на просторах интернетов сделал скрипт, который проходит по всем поддиректориям и оптимизирует картинки для веб с оптимальным качеством при этом на выходе получаются файлы с малым весом:

``` shell
#!/usr/bin/env bash

find . -name '*.jpg' -exec mogrify \
    -filter Triangle \
    -define filter:support=2 \
    -unsharp 0.25x0.25+8+0.065 \
    -dither None \
    -posterize 136 \
    -quality 82 \
    -define jpeg:fancy-upsampling=off \
    -define png:compression-filter=5 \
    -define png:compression-level=9 \
    -define png:compression-strategy=1 \
    -define png:exclude-chunk=all \
    -interlace Plane -colorspace sRGB \
    -strip $1 {} + 
```

Для быстрого создания изображений в формате WebP из JPEG можно воспользоваться этим:

``` shell
for i in *.jpg; do cwebp -q 80 $i -o $i.webp;done
```    

На выходе получим файлы с расширением .jpg.webp.

Бонус для пишущих на PHP &mdash; определение поддержки WebP на стороне сервера:

``` php
$has_webp = strpos($_SERVER['HTTP_ACCEPT'], 'image/webp') !== false || strpos($_SERVER['HTTP_USER_AGENT'], ' Chrome/') !== false;
```
