import { gsap, prefersReduced } from '../lib/scroll.js'
import { CH2, img } from '../data.js'

// Chapter 2 — "Many Ways to Bind"
// 원본 'Artists as Collectors' 각색: 책 + 거대 제본방식 이름(textH1) + 배경 틴트 크로스페이드
export function createChapter2({ gl, main }) {
  const length = Math.round(window.innerHeight * 6)

  const bg = document.createElement('div')
  bg.className = 'ch2__bg'
  bg.style.cssText = 'position:absolute;inset:0;background:#ffffff;opacity:0;'
  gl.appendChild(bg)

  const scene = document.createElement('div')
  scene.className = 'scene ch2'
  scene.innerHTML = `
    <div class="ch2__intro">
      <p class="ch1__label">${CH2.label}</p>
      <h2 class="ch1__title">${CH2.title}</h2>
      <p class="ch1__introtext">${CH2.intro}</p>
    </div>
    ${CH2.methods.map((m) => `
      <div class="ch2__panel">
        <figure class="ch2__book" style="aspect-ratio:${m.ar}"><img alt="" decoding="async" src="${img(m.book)}"></figure>
        <p class="ch2__caption">${m.desc}</p>
        <h3 class="ch2__name textH1">${m.name}</h3>
        <span class="ch2__kr">${m.kr}</span>
      </div>`).join('')}
    <p class="ch2__closing textBeat">${CH2.closing}</p>`
  main.appendChild(scene)

  const panels = [...scene.querySelectorAll('.ch2__panel')]

  function mount(startY, endY) {
    gsap.set(scene, { autoAlpha: 0 })
    gsap.set(scene.querySelector('.ch2__intro'), { autoAlpha: 0, y: 30 })
    panels.forEach((p) => {
      gsap.set(p, { autoAlpha: 0 })
      gsap.set(p.querySelector('.ch2__book'), { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.9, y: 18 })
      gsap.set(p.querySelector('.ch2__name'), { xPercent: -50, yPercent: -50, autoAlpha: 0, y: 56 })
      gsap.set([p.querySelector('.ch2__kr'), p.querySelector('.ch2__caption')], { autoAlpha: 0 })
    })
    gsap.set(scene.querySelector('.ch2__closing'), { autoAlpha: 0, y: 24 })

    if (prefersReduced) {
      gsap.set([scene, scene.querySelector('.ch2__intro')], { autoAlpha: 1, y: 0 })
      gsap.set(bg, { opacity: 1, backgroundColor: CH2.methods[0].tint })
      const p0 = panels[0]
      gsap.set([p0, p0.querySelector('.ch2__book'), p0.querySelector('.ch2__name'), p0.querySelector('.ch2__kr'), p0.querySelector('.ch2__caption')], { autoAlpha: 1, scale: 1, yPercent: 0 })
      return
    }

    const tl = gsap.timeline({ scrollTrigger: { start: startY, end: endY, scrub: 1 } })
    tl.to(scene, { autoAlpha: 1, duration: 2 }, 0)
      .to(bg, { opacity: 1, duration: 4 }, 0)

    // 인트로
    tl.to(scene.querySelector('.ch2__intro'), { autoAlpha: 1, y: 0, duration: 5, ease: 'power2.out' }, 2)
      .to(scene.querySelector('.ch2__intro'), { autoAlpha: 0, y: -24, duration: 4, ease: 'power2.in' }, 12)

    // 메소드 패널 크로스페이드 (14 → 90)
    const M0 = 14, span = 76, each = span / panels.length
    panels.forEach((p, i) => {
      const m = CH2.methods[i]
      const t = M0 + i * each
      const book = p.querySelector('.ch2__book'), name = p.querySelector('.ch2__name')
      const kr = p.querySelector('.ch2__kr'), cap = p.querySelector('.ch2__caption')
      tl.to(bg, { backgroundColor: m.tint, duration: each * 0.5, ease: 'sine.inOut' }, t)
      tl.to(p, { autoAlpha: 1, duration: each * 0.3 }, t)
        .to(book, { autoAlpha: 1, scale: 1, y: 0, duration: each * 0.42, ease: 'power3.out' }, t)
        .to(name, { autoAlpha: 1, y: 0, duration: each * 0.5, ease: 'power3.out' }, t + each * 0.06)
        .to([kr, cap], { autoAlpha: 1, duration: each * 0.35 }, t + each * 0.12)
      if (i < panels.length - 1) {
        tl.to([book, name, kr, cap], { autoAlpha: 0, duration: each * 0.32, ease: 'power2.in' }, t + each * 0.66)
          .to(name, { y: -42, duration: each * 0.32, ease: 'power2.in' }, t + each * 0.66)
          .to(p, { autoAlpha: 0, duration: each * 0.2 }, t + each * 0.8)
      }
    })

    // 클로징
    tl.to(panels[panels.length - 1].querySelectorAll('.ch2__book,.ch2__name,.ch2__kr,.ch2__caption'),
        { autoAlpha: 0, duration: 4 }, 90)
      .to(bg, { backgroundColor: '#ffffff', duration: 5 }, 90)
      .fromTo(scene.querySelector('.ch2__closing'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 4, ease: 'power2.out' }, 92)
      .to(scene.querySelector('.ch2__closing'), { autoAlpha: 0, y: -18, duration: 3, ease: 'power2.in' }, 99)
  }

  return { name: 'chapter2', chapter: 1, length, mount }
}
