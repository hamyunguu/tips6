import { ScrollTrigger } from '../lib/scroll.js'

// 우측 커스텀 스크롤바: 진행도에 따라 thumb 이동
export function buildScrollbar() {
  const el = document.getElementById('scrollbarEl')
  el.innerHTML = '<span class="scrollbarEl__thumb"></span>'
  const thumb = el.querySelector('.scrollbarEl__thumb')

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p = max > 0 ? window.scrollY / max : 0
    const track = el.clientHeight - thumb.clientHeight
    thumb.style.transform = `translateX(-50%) translateY(${p * track}px)`
  }
  ScrollTrigger.addEventListener('refresh', update)
  window.addEventListener('scroll', update, { passive: true })
  update()
}
