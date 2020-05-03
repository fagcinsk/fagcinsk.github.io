(function (window) {
  const d = window.document,
    goTop = d.querySelector('#goTop'),
    maxScroll = window.innerHeight / 2
  let isWasShown = false

  goTop.addEventListener('click', function () {
    window.scrollTo(0, 0)
  })

  function onScroll (e) {
    if(window.scrollY > maxScroll === isWasShown) return;
    isWasShown = !isWasShown
    if (isWasShown) {
      goTop.classList.add('show')
    } else {
      goTop.classList.remove('show')
    }
  }

  window.addEventListener('scroll', onScroll, {
    capture: true,
    passive: true
  })

  requestAnimationFrame(onScroll)

  if (!d.body.querySelector('.codehilite')) return
  const link = d.createElement('link')
  link.rel = 'stylesheet'
  link.href = '//cdn.jsdelivr.net/npm/pygments-css@1.0.0/default.css'
  d.getElementsByTagName('head')[0].appendChild(link)
})(window)
