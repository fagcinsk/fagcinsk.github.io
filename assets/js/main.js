(function (window) {
  const d = window.document,
    goTop = d.querySelector('.go-top')

  goTop.addEventListener('click', function () {
    window.scrollTo(0, 0)
  })

  goTop.title = 'Наверх'

  function onScroll (e) {
    if (window.scrollY > window.innerHeight) {
      goTop.classList.add('show')
    } else {
      goTop.classList.remove('show')
    }
  }

  window.addEventListener('scroll', onScroll, {
    capture: true,
    passive: true
  })
  if (!d.body.querySelector('.codehilite')) return
  const link = d.createElement('link')
  link.rel = 'stylesheet'
  link.href = '//cdn.jsdelivr.net/npm/pygments-css@1.0.0/monokai.css'
  d.getElementsByTagName('head')[0].appendChild(link)
})(window)
