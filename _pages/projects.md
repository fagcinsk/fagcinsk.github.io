---
layout: page
title: Веб-разработчик Михаил Юдин &mdash; мои проекты
permalink: /projects/
description: >
  Проекты, над которыми работаю или работал 
projects:
  - category: Web
    repos:
      - name: Михаил Юдин | Персональный блог (этот блог)
        repo: fagcinsk.github.io 
      - name: Multiplyer crafting game
        repo: multiplayer-crafting-game 
      - name: <a href="https://mikhail-yudin.ru/projects/text-layout-change/">Смена раскладки онлайн</a> с английского на русский и наоборот
        repo: text-layout-change
      - name: PHP библиотека для генерации алиасов объектов
        repo: ro-aliaseable-object 
      - name: <a href="https://mikhail-yudin.ru/projects/block-destruction-game/">Игра про уничтожение блоков</a> с использованием HTML5 canvas
        repo: block-destruction-game
      - name: Mixer analyzer
        repo: mixer-analyzer
  - category: Hardware
    repos:
      - name: Реализация ПО для импульсного металлоискателя с графической и звуковой индикацией с системой меню и настройками
        repo: arduino_metal_detector 
      - name: STM32 ILI9341 spi
        repo: stm-ILI9341-spi 
      - name: CLion проект для stm32f103c8t6
        repo: stm32-lcd-sandbox 
  - category: Android
    repos:
      - name: Лаунчер с текстовым интерфейсом, быстрым поиском чего угодно на устройстве и работой с этими объектами
        repo: tui_home 
      - name: Android Bluetooth Low Energy tasker plugin
        repo: ble_tasker_plugin 
  - category: Linux, OS
    repos:
      - name: Начало реализации ОС x86
        repo: fagci_os 
      - name: dotfiles - файлы локальной конфигурации программ ОС Linux
        repo: dotfiles 
---

# Мои проекты


{% for category in page.projects %}

<h2>{{ category.category }}</h2>
<ol>
{% for repo in category.repos %}
<li><a href="https://github.com/fagcinsk/{{ repo.repo }}">{{ repo.repo }}</a>:
{{ repo.name }}
<a class="github-button" href="https://github.com/fagcinsk/{{ repo.repo }}" data-icon="octicon-star" data-show-count="true" aria-label="Star fagcinsk/stm32-lcd-sandbox on GitHub"></a></li>
{% endfor %}
</ol>
{% endfor %}

<script async defer src="https://buttons.github.io/buttons.js"></script>
