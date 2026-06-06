import { gsap, ScrollTrigger, prefersReduced } from '../lib/scroll.js'
import { HERO, HERO_IMAGES, img } from '../data.js'

// 히어로 씬: 떠다니는 인트로 페인팅 + 타이틀 시퀀스
export function createHero({ gl, main }) {
  const length = Math.round(window.innerHeight * 1.5)

  // ── 떠다니는 이미지 (gl 무대) ──
  const stage = document.createElement('div')
  stage.className = 'heroStage'
  stage.style.cssText = 'position:absolute;inset:0;'
  const nodes = HERO_IMAGES.map((d) => {
    const el = document.createElement('div')
    el.className = 'floatImg is-placeholder'
    el.style.cssText = `left:${d.x}%;top:${d.y}%;width:${d.w}vw;aspect-ratio:${d.ar};transform:translate(-50%,-50%);`
    const im = new Image()
    im.alt = ''
    im.decoding = 'async'
    im.loading = 'eager'
    im.style.opacity = '0'
    im.style.transition = 'opacity .8s ease'
    im.onload = () => { el.classList.remove('is-placeholder'); im.style.opacity = '1' }
    im.src = img(d.file)
    el.appendChild(im)
    stage.appendChild(el)
    return { el, d }
  })
  gl.appendChild(stage)

  // ── 히어로 텍스트 ──
  const scene = document.createElement('div')
  scene.className = 'scene hero'
  scene.innerHTML = `
    <div class="scene__inner">
      <p class="hero__overline">${HERO.overline}</p>
      <h1 class="hero__headline">${HERO.headline}</h1>
      <button class="hero__scroll" type="button">
        <svg viewBox="0 0 24 24" class="arrow" aria-hidden="true"><path d="M12 4v15M5 12l7 7 7-7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
        ${HERO.scroll}
      </button>
    </div>`
  main.appendChild(scene)
  scene.querySelector('.hero__scroll').addEventListener('click', () => {
    import('../lib/scroll.js').then((m) => m.scrollToY(length * 0.98))
  })

  function mount(startY, endY) {
    if (prefersReduced) return
    // 이미지 시차 + 페이드
    const tl = gsap.timeline({
      scrollTrigger: { start: startY, end: endY, scrub: 1 },
    })
    nodes.forEach(({ el, d }) => {
      tl.to(el, { yPercent: -d.depth * 120, ease: 'none' }, 0)
    })
    tl.to(stage, { opacity: 0, ease: 'none' }, 0.55)
    tl.fromTo(stage, { opacity: 1 }, { opacity: 1, ease: 'none' }, 0)

    // 텍스트: 살짝 위로 빠지며 페이드
    gsap.timeline({ scrollTrigger: { start: startY, end: startY + length * 0.6, scrub: 1 } })
      .to(scene.querySelector('.scene__inner'), { y: -60, opacity: 0, ease: 'none' }, 0)
  }

  return { name: 'hero', length, mount }
}
