/**
 * Simple notepad with history using localstorage
 * @author fagci https://github.com/fagcinsk/
 * @copyright Mikhail Yudin aka fagci (https://mikhail-yudin.ru)
 */

const PREFIX = 'notepad-'
const THEME_PREFIX = PREFIX + 'theme'
const CONTENT_PREFIX = PREFIX + 'content'
const HISTORY_PREFIX = PREFIX + 'history'

const np = document.querySelector('#notepad')
const history = document.querySelector('#history')
const actionButtons = document.querySelectorAll('[data-action]')

const caret = new VanillaCaret(np)

function getSnapshot() {
  return {content: np.innerHTML, pos: caret.getPos()}
}

function saveContent() {
  localStorage.setItem(CONTENT_PREFIX, JSON.stringify(getSnapshot()))
}

function restoreContent(data) {
  data = data || {content: '', pos: 0}
  np.innerHTML = data.content
  caret.setPos(data.pos)
}

function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_PREFIX)) || {}
}

function setHistory(data) {
  return localStorage.setItem(HISTORY_PREFIX, JSON.stringify(data))
}

function fillHistoryList() {
  history.innerHTML = ''
  const hData = getHistory()
  for (let i in hData) {
    if (!hData.hasOwnProperty(i)) continue
    let hItem = document.createElement('li')
    hItem.classList.add('h__item')
    hItem.dataset['action'] = 'restoreFromHistory'
    hItem.dataset['key'] = i
    hItem.innerText = i
    history.appendChild(hItem)
    addActionButtonHandler(hItem)
  }
}

function onHistoryAdd() {
  const hData = getHistory()
  hData[new Date().toLocaleString()] = getSnapshot()
  setHistory(hData)
  fillHistoryList()
}

function onHistoryClear() {
  if (!confirm('Remove ALL records from history?')) return
  setHistory({})
  fillHistoryList()
}

function onFormat() {
  const cmd = this.dataset['command']
  if (cmd === 'removeformat') {
    document.execCommand('removeformat', false, '')
    return
  }
  document.execCommand(cmd)
}

function onToggle() {
  if (this.classList.contains('open')) {
    this.classList.remove('open')
  } else {
    this.classList.add('open')
  }
}

function onThemeSwitch() {
  if (getTheme() === 'dark') {
    setTheme('default')
  } else {
    setTheme('dark')
  }
}

function onToggleFullScreen() {
  const element = document.documentElement
  let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false
  element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () {
    return false
  }
  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {
    return false
  }
  isFullscreen ? document.cancelFullScreen() : element.requestFullScreen()
}

function onRestoreFromHistory() {
  const hData = getHistory()
  let data = hData[this.dataset.key]
  restoreContent(data)
}

function addActionButtonHandler(actionButton) {
  actionButton.addEventListener('mousedown', function (e) {
    e.preventDefault()
  })
  actionButton.addEventListener('click', function (e) {
    e.stopPropagation()
    let action = this.dataset.action
    action = action.charAt(0).toUpperCase() + action.slice(1)
    window['on' + action].bind(this)(e)
  })
}


function debounce(func, wait) {
  let timeout
  return function () {
    let ctx = this
    let args = arguments
    let later = function () {
      timeout = null
      func.apply(ctx, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const debouncedSave = debounce(saveContent, 500)

np.addEventListener('input', debouncedSave)
np.addEventListener('click', debouncedSave)

np.addEventListener('mousedown', function hideOpenedMenus(e) {
  const opened = document.querySelectorAll('.open:not(.no-close)')
  for (let i in opened) {
    if (opened.hasOwnProperty(i)) opened[i].classList.remove('open')
  }
})

for (let i in actionButtons) {
  if (actionButtons.hasOwnProperty(i)) addActionButtonHandler(actionButtons[i])
}

fillHistoryList()
np.focus()
restoreContent(JSON.parse(localStorage.getItem(CONTENT_PREFIX)))
