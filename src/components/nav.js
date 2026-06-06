import { CHAPTERS, BRAND } from '../data.js'
import { scrollToY } from '../lib/scroll.js'
import { tipsWordmark } from './logo.js'

// 챕터 시작 y좌표를 반환하는 함수를 주입받음 (씬 레이아웃 이후 계산)
export function buildNav(getChapterY) {
  const nav = document.getElementById('nav')
  nav.innerHTML = `
    <div class="nav__scrim" data-close></div>
    <a class="nav__logo" href="#" aria-label="${BRAND.name}">${tipsWordmark()}</a>
    <button class="nav__toggle" aria-label="Open menu" aria-expanded="false"><span></span></button>
    <aside class="navPanel" aria-hidden="true">
      <p class="navPanel__label">Chapters</p>
      <ul class="navPanel__chapters">
        ${CHAPTERS.map((c, i) => `
          <li class="navPanel__chapter" data-chapter="${i}">
            <span class="navPanel__num">${c.num}</span>
            <span class="navPanel__title">${c.title}</span>
          </li>`).join('')}
      </ul>
      <div class="navPanel__brand">
        <p class="navPanel__slogan navPanel__slogan--en">${BRAND.sloganEn.join('<br>')}</p>
        <p class="navPanel__slogan navPanel__slogan--kr">${BRAND.sloganKr.join(' ')}</p>
      </div>
      <p class="navPanel__copyright">${BRAND.copyright}</p>
    </aside>`

  const toggle = nav.querySelector('.nav__toggle')
  const panel = nav.querySelector('.navPanel')
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    panel.setAttribute('aria-hidden', String(!open))
  }
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')))
  nav.querySelector('[data-close]').addEventListener('click', () => setOpen(false))
  nav.querySelector('.nav__logo').addEventListener('click', (e) => { e.preventDefault(); scrollToY(0); setOpen(false) })

  nav.querySelectorAll('.navPanel__chapter').forEach((li) => {
    li.addEventListener('click', () => {
      const idx = +li.dataset.chapter
      scrollToY(getChapterY ? getChapterY(idx) : 0)
      setOpen(false)
    })
  })

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false) })
}
