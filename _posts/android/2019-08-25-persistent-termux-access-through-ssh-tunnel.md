---
layout: post
categories: android
title: Постоянный доступ к Termux через ssh тоннель
description: Хочется постоянный доступ к Termux по ssh, но нет прямого доступа к смартфону или планшету по сети? Задачу решим используя домашний сервер или сервиса для создания ssh тоннелей.
image: photos/persistent-termux-access-through-ssh-tunnel.png
---

Хочется постоянный доступ к Termux по ssh, но нет прямого доступа к смартфону или планшету по сети? Задачу решим используя домашний сервер или сервис для создания ssh тоннелей.

# Подготавливаем Termux

Если Termux только что установлен, делаем `pkg update` для обновления утилит и списка пакетов.

Для разворачивания нужно:

- openssh &mdash; для доступа к Termux;
- autossh &mdash; для поддержания тоннеля;
- termux-services &mdash; для автозапуска autossh.

Установим пакеты разом:

```shell
pkg install openssh autossh termux-services
```

# Создание сервера ssh в Termux

Сначала зададим пароль для доступа к Termux серверу ssh.

```shell
passwd
```

Пропишем порт для сервера в файле `~/../usr/etc/ssh/sshd_config`:
```config
Port 2222
PrintMotd no
PasswordAuthentication yes
PubkeyAcceptedKeyTypes +ssh-dss
Subsystem sftp /data/data/com.termux/files/usr/libexec/sftp-server
```

Перезапустим сервер ssh:
```shell
sv down sshd
sv up sshd
```

Для запуска сервера при старте устройства делаем:
```shell
sv-enable sshd
```

Перейдём к настройке соединения.

# Создание ssh тоннеля

Допустим, что есть сервер ssh например `myserver`. Это или домашний сервер, или сервис, который предоставляет доступ к ssh серверу. Как пример &mdash; [Free Linux shell server](http://bitcoinshell.mooo.com).

Чтобы не прописывать каждый раз имя хоста, порт и прочее при соединении с ssh сервером для создания тоннеля, пропишем конфиг `~/.ssh/config`. Пример:

```config
Host srv_rev
User username
Port 22
HostName myserver.ru
RemoteForward 3022 localhost:2222
ServerAliveInterval 30
ServerAliveCountMax 1
ExitOnForwardFailure yes
```

Как создавать ключ для беспарольного входа по ssh расскажу в отдельной статье.

Проверим, корректно ли настроили: должно отобразиться приглашение шелла, иначе придётся каждый раз вводить пароль при создании тоннеля. В случае с сервисом ввести пароль будет невозможно.

```shell
ssh srv_rev
```

Если просит пароль &mdash; создайте ключ для входа.

# Сервис подключения к тоннелю

Так как на предыдущем шаге в конфиге указали `RemoteForward`, остаётся только подключиться к серверу, используя параметры конфигурации.

Воспользуемся `termux-services`, чтобы каждый раз не вводить команду для соединения, . Утилита запускает приложения сразу при создании сессии Termux (насколько сам понял).

Сервисы добавлять очень просто: создаём папку с названием сервиса, внутри файл `run` с правами на запуск и shebang который указывает на шелл `/bin/sh`.

Итак, по шагам:

- создаём папку
```shell
mkdir ~/../usr/var/service/autossh/
```
- создаём файл
```shell
echo '#!/bin/sh' > ~/../usr/var/service/autossh/run
echo 'exec autossh -M 20022 -NT -f srv_rev' >> ~/../usr/var/service/autossh/run
```
- фиксим shebang для Termux
```shell
termux-fix-shebang ~/../usr/var/service/autossh/run
```
- даём права на исполнение
```shell
chmod +x ~/../usr/var/service/autossh/run
```
- запускаем сервис
```shell
sv up autossh
```

После этого установится ssh тоннель для доступа к Termux с удалённого сервера, если настроено верно.

# Подключаемся к Termux

Соединяемся с удалённым сервером по ssh. Затем подключаемся к ssh в Termux, который затоннелирован на порт 3022:

```shell
ssh 127.0.0.1 -p 3022
```

# Что получили в итоге

Теперь после запуска Termux на удалённом сервере появится доступ по тоннелю к терминалу на смартфоне. Так как соединение на смартфоне может обрываться время от времени по разным причинам, autossh поможет переустанавливать соединение к удалённому серверу ssh и восстанавливать тоннель. Желательно, чтобы порт 20022 на удалённой машине был открыт для быстрого реагирования autossh на разрыв соединения.