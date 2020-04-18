---
layout: post
categories: linux
title: Работаем удалённо по SSH на карантине
description: Способы облегчить себе жизнь работая по SSH на удалёнке. Настраиваем удалённый доступ через постоянный реверс тоннель, монтируем файловую систему через SSHfs.
---

Работать удалённо начнём в последнюю пятницу перед карантином пока ещё никто не готов.
Кто-то не желает переводить сотрудников на удалённую работу, кто-то не умеет или боится этого.
А дядя Миша уже всё сделал. =)

## Первая попытка настроить удалённый доступ

К тому времени у меня уже давно имелся домашний сервер с доступом по SSH. Очень удобно проворачивать всякие штуки.
Например обеспечивал [постоянный доступ к Termux через ssh тоннель](/blog/android/persistent-termux-access-through-ssh-tunnel).

Начинать всегда стоит с [быстрого способа создать и залить SSH ключ на сервер](/blog/linux/zalit-ssh-klyuch-na-server).

Как это сделали, возвращаемся к посту про [постоянный доступ к Termux через ssh тоннель](/blog/android/persistent-termux-access-through-ssh-tunnel), только на этот раз делаем то же самое на рабочей машине.

Чтобы предусмотреть потерю соединения из-за отключения сети или других причин, советую поставить autossh в автозагрузку при старте системы или поднятию сети любым удобным для вас способом.
В своём Arch Linux добавил в systemd сервис:

```ini
[Unit]
Description=AutoSSH service for a reverse tunnel
After=network.target

[Service]
ExecStart=/usr/bin/autossh -M 0 -q -N -o "ServerAliveInterval 60" -o "ServerAliveCountMax 3" myserver

[Install]
WantedBy=multi-user.target
```

Таким образом, autossh запустится после поднятия сети. Флаг `-M 0` говорит о том что я не хочу использовать дополнительный порт для проверки живости соединения.
Пускай об этом позаботится ssh (`ServerAliveInterval`, `ServerAliveCountMax`). Далее указан алиас `myserver`, который ранее определяли в `~/.ssh/config`.

Далее произведём тестовый запуск службы:

```shell
sudo systemctl start autossh.service
```

Если не было ошибок, добавим службу в автозапуск:

```shell
sudo systemctl start autossh.service
```

Ещё советую протестировать соединение через наш обратный (reverse) SSH тоннель и поставить на выполнение что-то простое типа: `watch ps`. Это предотвратит "залипание" соединения. Такое происходит когда соединение установлено, а пакетов нет. И как понял, такое случается по специфике работы NAT: он убирает связь между хостами, а соединение об этом ничего не знает.

Сделав это, был доволен как слон собственно настроенному удалённому доступу к рабочей машине.

Однако, что-то пошло не так и примерно через неделю соединение отвалилось.
Пришлось доставать админа, чтобы получить доступ к внутренней сети хоть каким-нибудь способом. На помощь опять же пришёл SSH!

## Настраиваем проброс портов через промежуточный сервер

Самым быстрым способом оказалось использование прямого доступа по SSH к удалённой машине. Только пробросили порт не напрямую к рабочему компу, а к одному из внутренних серверов. Что же делать дальше? Ведь я хочу получить доступ к development серверу, а корячиться через всякие serveo или ngrok не кошерно...

На помощь пришла одна из возможностей ssh туннелирования. Эта штука называется ProxyJump. Настраивается это там же, в `~/.ssh/config` и очень просто:
```sshconfig
### Доступен напрямую
Host betajump
  HostName jumphost1.example.org
 
### Будет доступен через jumphost1.example.org (betajump)
Host behindbeta
  HostName behindbeta.example.org
  ProxyJump  betajump
```

Для behindbeta из примера проброс портов с него настраивается так же, как для обычного хоста.

Всё было круто. Но редактировать файлы по ssh как? Правда, надо. Хотя можно работать через репозиторий, но иногда хочется поковырять файлы на удалённой машине. Можно `vim`, `nano` или `mcedit` накрайняк. Но не так удобно. На помощь приходит утилита sshfs!

## Получаем доступ к удалённой файловой системе через sshfs

Сначала ставим утилиту если не установлена. Затем создаём директорию, куда будем монтировать. Например
```shell
sudo mkdir /mnt/remote_work
```
ну или как удобнее и привычнее.
Затем монтируем как любую другую файловую систему:
```shell
sudo sshfs behindbeta:/var/www /mnt/remote_work
```
После двоеточия идёт путь к монтируемой директории на удалённой машине из примера с ProxyJump.

## В заключение

Таким образом я работаю удалённо уже почти месяц на момент написания поста. Немного медленно правда, зато работа идёт.