const PREFIX = 'notepad-'
const THEME_PREFIX = PREFIX + 'theme'
const CONTENT_PREFIX = PREFIX + 'content'
const HISTORY_PREFIX = PREFIX + 'history'

const np = document.querySelector('#notepad')
const history = document.querySelector('#history')
const actionButtons = document.querySelectorAll('[data-action]')

const caret = new VanillaCaret(np)

let notepadTheme = !!localStorage.getItem(THEME_PREFIX)

function setTheme(theme) {
  notepadTheme = theme
  if (theme) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
  localStorage.setItem(THEME_PREFIX, theme)
}

setTheme(notepadTheme)

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

function onFormatClear() {
  document.execCommand('removeformat')
}

function onToggle() {
  if (this.classList.contains('open')) {
    this.classList.remove('open')
  } else {
    this.classList.add('open')
  }
}

function onThemeSwitch() {
  setTheme(!notepadTheme)
}

function onRestoreFromHistory() {
  const hData = getHistory()
  let data = hData[this.dataset.key]
  restoreContent(data)
}

function addActionButtonHandler(actionButton) {
  actionButton.addEventListener('mousedown', function (e) {
    e.preventDefault()
    e.stopPropagation()
  })
  actionButton.addEventListener('click', function (e) {
    let action = this.dataset.action
    action = action.charAt(0).toUpperCase() + action.slice(1)
    window['on' + action].bind(this)(e)
    saveContent()
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

np.addEventListener('mousedown', function (e) {
  const opened = document.querySelectorAll('.open')
  for (let i in opened) {
    if (!opened.hasOwnProperty(i)) continue
    opened[i].classList.remove('open')
  }
})

for (let i in actionButtons) {
  if (!actionButtons.hasOwnProperty(i)) continue
  addActionButtonHandler(actionButtons[i])
}

fillHistoryList()
np.focus()
restoreContent(JSON.parse(localStorage.getItem(CONTENT_PREFIX)))