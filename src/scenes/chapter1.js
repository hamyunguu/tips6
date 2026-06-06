import { gsap, prefersReduced } from '../lib/scroll.js'
import { CH1, BOOKS, img } from '../data.js'

// Chapter 1 — "Binding a Book, Step by Step"
// Getty Ch1 인터랙션 각색: 중앙 포컬 + 스크롤 스테이지 비트 + 하단 타임라인 + 떠다니는 책 필드 + 콜로폰 줌
export function createChapter1({ gl, main }) {
  const length = Math.round(window.innerHeight * 5.2)

  // ── 배경: 떠다니는 책 필드 ──
  const field = document.createElement('div')
  field.className = 'ch1Field'
  field.style.cssText = 'position:absolute;inset:0;opacity:0;'
  // 중앙(텍스트/포컬) 피해 가장자리에 배치
  const layout = [
    { x: 9,  y: 16, w: 8,  d: 0.5 }, { x: 90, y: 20, w: 7, d: 0.8 },
    { x: 16, y: 44, w: 9,  d: 1.1 }, { x: 85, y: 50, w: 8, d: 0.6 },
    { x: 7,  y: 74, w: 8,  d: 0.9 }, { x: 92, y: 78, w: 7, d: 1.2 },
    { x: 24, y: 90, w: 9,  d: 1.0 }, { x: 76, y: 90, w: 8, d: 0.7 },
    { x: 33, y: 12, w: 7,  d: 0.6 }, { x: 67, y: 13, w: 8, d: 0.9 },
    { x: 13, y: 92, w: 7,  d: 1.3 }, { x: 95, y: 40, w: 6, d: 0.5 },
  ]
  const pool = BOOKS.filter((b) => b.file !== CH1.focal.img)
  const fieldNodes = layout.map((p, i) => {
    const b = pool[i % pool.length]
    const el = document.createElement('div')
    el.className = 'floatImg floatImg--field is-placeholder'
    el.style.cssText = `left:${p.x}%;top:${p.y}%;width:${p.w}vw;aspect-ratio:${b.ar};transform:translate(-50%,-50%);`
    const im = new Image()
    im.alt = ''; im.decoding = 'async'; im.style.opacity = '0'; im.style.transition = 'opacity .7s ease'
    im.onload = () => { el.classList.remove('is-placeholder'); im.style.opacity = '1' }
    im.src = img(b.file)
    el.appendChild(im)
    field.appendChild(el)
    return { el, d: p.d }
  })
  gl.appendChild(field)

  // ── 씬 콘텐츠 ──
  const scene = document.createElement('div')
  scene.className = 'scene ch1'
  scene.innerHTML = `
    <div class="ch1__dim"></div>
    <div class="ch1__intro">
      <p class="ch1__label">${CH1.label}</p>
      <h2 class="ch1__title">${CH1.title}</h2>
      <p class="ch1__introtext">${CH1.intro}</p>
    </div>

    <figure class="ch1__focal">
      <div class="ch1__focalimg" style="aspect-ratio:${BOOKS.find(b=>b.file===CH1.focal.img)?.ar||0.7}">
        <img alt="" decoding="async" src="${img(CH1.focal.img)}">
      </div>
      <figcaption class="ch1__caption">
        <span class="ch1__captitle">${CH1.focal.title}</span>, ${CH1.focal.sub}
        <span class="ch1__credit">${CH1.focal.credit}</span>
      </figcaption>
    </figure>

    <div class="ch1__beats">
      ${CH1.beats.map((b) => `<p class="ch1__beat textBeat">${b.text}</p>`).join('')}
    </div>

    <div class="ch1__timeline">
      <div class="ch1__track"><span class="ch1__dot"></span></div>
      <ul class="ch1__stages">
        ${CH1.stages.map((s) => `<li class="ch1__stage">${s}</li>`).join('')}
      </ul>
    </div>

    <aside class="ch1__colophon">
      <button class="ch1__zoomout" aria-label="zoom out">−</button>
      <h3 class="ch1__colhead">${CH1.colophon.heading}</h3>
      <dl class="ch1__rows">
        ${CH1.colophon.rows.map((r, i) => `
          <div class="ch1__row ${i === CH1.colophon.highlight ? 'is-highlight' : ''}">
            <dt>${r[0]}</dt><dd>${r[1]}</dd>
          </div>`).join('')}
      </dl>
      <p class="ch1__colnote">${CH1.colophon.note}</p>
    </aside>

    <p class="ch1__closing textBeat">${CH1.closing}</p>
    <div class="artTooltip ch1__tip">Click on a book to learn more.</div>`
  main.appendChild(scene)

  const q = (s) => scene.querySelector(s)
  const beats = [...scene.querySelectorAll('.ch1__beat')]
  const stages = [...scene.querySelectorAll('.ch1__stage')]

  function mount(startY, endY) {
    // 초기 상태
    gsap.set(scene, { autoAlpha: 0 })
    gsap.set([q('.ch1__intro')], { autoAlpha: 0, y: 30 })
    gsap.set(q('.ch1__focal'), { autoAlpha: 0, scale: 0.94 })
    gsap.set(beats, { autoAlpha: 0, y: 24 })
    gsap.set(q('.ch1__timeline'), { autoAlpha: 0, y: 16 })
    gsap.set(stages, { opacity: 0.38 })
    gsap.set(q('.ch1__colophon'), { autoAlpha: 0, scale: 0.9 })
    gsap.set(q('.ch1__dim'), { autoAlpha: 0 })
    gsap.set(q('.ch1__closing'), { autoAlpha: 0, y: 24 })
    gsap.set(q('.ch1__tip'), { autoAlpha: 0 })

    if (prefersReduced) {
      gsap.set([scene, q('.ch1__intro'), q('.ch1__focal'), q('.ch1__timeline'), beats[0]], { autoAlpha: 1, scale: 1, y: 0 })
      gsap.set(field, { opacity: 0.5 })
      return
    }

    const tl = gsap.timeline({ scrollTrigger: { start: startY, end: endY, scrub: 1 } })

    // 씬/필드 등장
    tl.to(scene, { autoAlpha: 1, duration: 2 }, 0)
      .to(field, { opacity: 0.5, duration: 8, ease: 'none' }, 2)
    fieldNodes.forEach(({ el, d }) => tl.to(el, { yPercent: -d * 42, ease: 'none', duration: 100 }, 0))

    // 챕터 인트로 타이틀
    tl.to(q('.ch1__intro'), { autoAlpha: 1, y: 0, duration: 5, ease: 'power2.out' }, 2)
      .to(q('.ch1__intro'), { autoAlpha: 0, y: -24, duration: 4, ease: 'power2.in' }, 12)

    // 포컬 책 + 타임라인 등장
    tl.to(q('.ch1__focal'), { autoAlpha: 1, scale: 1, duration: 5, ease: 'power2.out' }, 14)
      .to(q('.ch1__timeline'), { autoAlpha: 1, y: 0, duration: 4 }, 16)
      .to(q('.ch1__tip'), { autoAlpha: 1, duration: 3 }, 18)

    // 스테이지 비트 크로스페이드 (16 → 76)
    const B0 = 18, span = 58, each = span / beats.length
    beats.forEach((b, i) => {
      const t = B0 + i * each
      tl.fromTo(b, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: each * 0.42, ease: 'power2.out' }, t)
      if (i < beats.length - 1) tl.to(b, { autoAlpha: 0, y: -20, duration: each * 0.42, ease: 'power2.in' }, t + each * 0.58)
      // 스테이지 라벨 강조
      tl.to(stages[i], { opacity: 1, duration: each * 0.3 }, t)
      if (i < beats.length - 1) tl.to(stages[i], { opacity: 0.38, duration: each * 0.4 }, t + each * 0.6)
    })
    // 타임라인 점 이동
    tl.fromTo(q('.ch1__dot'), { left: '0%' }, { left: '100%', ease: 'none', duration: span }, B0)

    // 마지막 비트 페이드아웃 + 콜로폰 줌 (76 → 90)
    tl.to(beats[beats.length - 1], { autoAlpha: 0, y: -20, duration: 4 }, 76)
      .to(q('.ch1__timeline'), { autoAlpha: 0, y: 12, duration: 4 }, 76)
      .to(q('.ch1__tip'), { autoAlpha: 0, duration: 3 }, 76)
      .to(q('.ch1__dim'), { autoAlpha: 1, duration: 6 }, 76)
      .to(q('.ch1__focal'), { scale: 2.6, filter: 'brightness(.22) blur(3px)', autoAlpha: 0.5, duration: 10, ease: 'power2.in' }, 76)
      .fromTo(q('.ch1__colophon'), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 6, ease: 'power3.out' }, 80)

    // 콜로폰 → 닫고 클로징 (90 → 100)
    tl.to([q('.ch1__colophon'), q('.ch1__dim')], { autoAlpha: 0, duration: 5, ease: 'power2.in' }, 90)
      .to(q('.ch1__focal'), { autoAlpha: 0, duration: 4 }, 90)
      .to(field, { opacity: 0, duration: 5 }, 90)
      .fromTo(q('.ch1__closing'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 4, ease: 'power2.out' }, 92)
      .to(q('.ch1__closing'), { autoAlpha: 0, y: -18, duration: 3, ease: 'power2.in' }, 99)

    // zoom-out 버튼: 콜로폰 보일 때 클릭 시 앞 구간으로
    q('.ch1__zoomout').addEventListener('click', () => {
      import('../lib/scroll.js').then((m) => m.scrollToY(startY + length * 0.66))
    })
  }

  return { name: 'chapter1', chapter: 0, length, mount }
}
