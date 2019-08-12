(function (w) {
  function arrayFlip (trans) {
    let key, tmp = {}
    for (key in trans) {
      if (!trans.hasOwnProperty(key)) continue
      tmp[trans[key]] = key
    }
    return tmp
  }

  const d = window.document,
    b = d.body,
    wrongLayoutTextArea = b.querySelector('#badLayoutText'),
    btn = b.querySelector('#convertlayout'),
    mapper = {
      q: 'й',
      w: 'ц',
      e: 'у',
      r: 'к',
      t: 'е',
      y: 'н',
      u: 'г',
      i: 'ш',
      o: 'щ',
      p: 'з',
      '[': 'х',
      ']': 'ъ',
      a: 'ф',
      s: 'ы',
      d: 'в',
      f: 'а',
      g: 'п',
      h: 'р',
      j: 'о',
      k: 'л',
      l: 'д',
      ';': 'ж',
      '\'': 'э',
      z: 'я',
      x: 'ч',
      c: 'с',
      v: 'м',
      b: 'и',
      n: 'т',
      m: 'ь',
      ',': 'б',
      '.': 'ю',
      '/': '.'
    }, mapperReverse = arrayFlip(mapper)

  function convert (text) {
    const textLength = text.length
    let replace, original, lc, result = ''

    for (let i = 0; i < textLength; i++) {
      original = text[i]
      lc = original.toLowerCase()

      if (mapper[lc]) {
        replace = mapper[original]
          ? mapper[original]
          : mapper[lc].toUpperCase()
      } else if (mapperReverse[lc]) {
        replace = mapperReverse[original]
          ? mapperReverse[original]
          : mapperReverse[lc].toUpperCase()
      } else {
        replace = original
      }

      result += replace
    }

    return result
  }

  btn.addEventListener('click', function (e) {
    console.log('click', wrongLayoutTextArea.innerHTML, convert(wrongLayoutTextArea.innerHTML))
    wrongLayoutTextArea.value = convert(wrongLayoutTextArea.value)
  })
})(window)