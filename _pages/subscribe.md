---
layout: default
title: Подписаться на E-mail рассылку
permalink: /subscribe/
description: Можете подписаться на E-mail рассылку, чтобы быть в курсе последних записей
---

<form action="https://feedburner.google.com/fb/a/mailverify" method="post" target="popupwindow" 
  onsubmit="window.open('https://feedburner.google.com/fb/a/mailverify?uri=github/FbSs', 'popupwindow', 'scrollbars=yes,width=550,height=520');return true">
  <h1>Подписаться на email рассылку</h1>
  <div class="input">
    <label>email</label>
    <input type="email" name="email" required/>
  </div>
  <input type="hidden" value="github/FbSs" name="uri"/>
  <input type="hidden" name="loc" value="ru_RU"/>
  <div class="text-right">
    <input type="submit" value="Подписаться" />
  </div>
  <small>Delivered by <a href="https://feedburner.google.com" target="_blank">FeedBurner</a></small>
</form>
