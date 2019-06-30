---
layout: post
category: android
title: Android shell scripting. Part 1.
---

Если возникло желание развернуть linux shell окружение на Вашем устройстве, можно воспользоваться приёмами, описанными далее.

Подразумеваеется, что root доступ у Вас есть.

Для удобства настройки можно использовать удалённый доступ к устройству по ssh.

По умолчанию в системе используется `/system/bin/sh` бинарник, являющийся ссылкой на mksh.

Чтобы настроить переменные окружения, которые будут установлены при запуске shell (sh), необходимо внести правки в файл /etc/mkshrc. Но перед этим нужно примонтировать файловую систему для записи:

```
mount -o remount,rw /system
```

Пример установки путей для midnight commander:

```
export PATH=/system/xbin:/system/bin
export TERMINFO=/etc/terminfo
export TERM=xterm-256color
export MC_HOME=/system/etc/.mc/
export TMPDIR=/data/local/tmp/

if [ ! -e $TMPDIR ]; then
    mkdir $TMPDIR
fi
```

Прописав это в наш конфиг, мы:

1.  определим пути поиска исполняемых бинарников
2.  укажем пути хранения временных файлов
3.  укажем пути хранения конфигурации midnight commander
4.  установим режим терминала xterm с поддержкой 256 цветов

Установщик midnight commander можно скачать по ссылке: [NativnuxInstaller.apk](https://drive.google.com/open?id=0By7QfrffBV76fkozTGtfMjdER01YWF8tQ3VrNFljVTZLY1VBWGlZV21RbFR2XzRWYVVfSEU)

В следующей части будет описана процедура получения и установки различных linux утилит одним из простых способов.