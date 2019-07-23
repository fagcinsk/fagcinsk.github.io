---
layout: post
categories: trip
title: Путешествие на Мультинские озёра
description: Чистейшие горные озёра, большие медведи, резкие перепады температур, шумные водопады, летний снег.
---

Чистейшие горные озёра, большие медведи, резкие перепады температур, шумные водопады, летний снег.

## Сборы

## Приехали

{% include image.html url="/photos/multa-lake-trip/IMG_20190710_043935.jpg" description="Раннее утро в Горно-Алтайске" %}

{% capture lat %}
{{- 'photos/multa-lake-trip/IMG_20190710_043935.jpg' | exif: 'gps.latitude' -}}
{% endcapture %}

{% capture lng %}
{{- 'photos/multa-lake-trip/IMG_20190710_043935.jpg' | exif: 'gps.longitude' -}}
{% endcapture %}

{{lat}}, {{lng}}

![Рождение маршрутов](/photos/multa-lake-trip/IMG_20190710_052534.jpg)
![В горах значительно холоднее](/photos/multa-lake-trip/IMG_20190712_152402.jpg)
![Чем дальше, тем выше горы](/photos/multa-lake-trip/IMG_20190712_161407.jpg)
![Пещера Усть-Кан](/photos/multa-lake-trip/IMG_20190712_173829.jpg)


{% google_map
   zoom="10"
   latitude: lat
   longitude: lng
   marker_title="Boo"
   marker_url="https://en.wikipedia.org/wiki/Madrid" %}

