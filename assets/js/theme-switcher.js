(function () {
  window.THEME_PREFIX = window.THEME_PREFIX || 'theme-switcher-theme'

  window.setTheme = function (theme) {
    theme = theme || 'default'
    const themeClass = 'theme-' + theme
    localStorage.setItem(window.THEME_PREFIX, theme)
    const newClass = document.body.className.replace(/theme-\w+/g, '')
    document.body.className = newClass + (newClass ? ' ' : '') + themeClass
  }

  window.getTheme = function () {
    const matches = document.body.className.match(/(\btheme-\w+\b)/g)
    return matches ? matches[matches.length - 1].replace('theme-', '') : undefined
  }

  setTheme(localStorage.getItem(window.THEME_PREFIX))
  console.log(getTheme())
})()