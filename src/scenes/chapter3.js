import { gsap, prefersReduced } from '../lib/scroll.js'
import { CH3, BOOKS, img } from '../data.js'

// Chapter 3 — "Paper, Press and Method"
// 원본 네트워크 data-viz 각색: 책 썸네일 방사형 군집 + 가장자리 노드 라벨 + 좌측 내러티브
export function createChapter3({ gl, main }) {
  const length = Math.round(window.innerHeight * 6)

  // 6개 노드 방향(도)
  const nodeAngle = { 'top': -90, 'right-top': -32, 'right-bottom': 32, 'bottom': 90, 'left-bottom': 148, 'left-top': -148 }
  const nodePos = {
    'top': { x: 50, y: 7 }, 'right-top': { x: 88, y: 28 }, 'right-bottom': { x: 88, y: 72 },
    'bottom': { x: 50, y: 93 }, 'left-bottom': { x: 12, y: 72 }, 'left-top': { x: 12, y: 28 },
  }

  // 썸네일 생성 (방사형 6엽 + 중심부)
  const N = 72
  const thumbs = []
  for (let i = 0; i < N; i++) {
    const lobe = i % CH3.nodes.length
    const baseA = (nodeAngle[CH3.nodes[lobe].pos] || 0) * Math.PI / 180
    const central = i % 5 === 0
    const a = central ? Math.random() * Math.PI * 2 : baseA + (Math.random() - 0.5) * 1.2
    const r = central ? Math.random() * 16 : 14 + Math.sqrt(Math.random()) * 30
    thumbs.push({
      x: 50 + Math.cos(a) * r,
      y: 50 + Math.sin(a) * r,
      s: 4 + Math.random() * 4.5,
      book: BOOKS[i % BOOKS.length].file,
      delay: Math.random(),
    })
  }

  const scene = document.createElement('div')
  scene.className = 'scene ch3'
  scene.innerHTML = `
    <div class="ch3__intro">
      <p class="ch1__label">${CH3.label}</p>
      <h2 class="ch1__title">${CH3.title}</h2>
      <p class="ch1__introtext">${CH3.intro}</p>
    </div>
    <div class="ch3__net">
      ${thumbs.map((t) => `<span class="ch3__thumb" style="left:${t.x}%;top:${t.y}%;width:${t.s}%"><img alt="" decoding="async" src="${img(t.book)}"></span>`).join('')}
    </div>
    <ul class="ch3__nodes">
      ${CH3.nodes.map((n) => `<li class="ch3__node ch3__node--${n.pos}" style="left:${nodePos[n.pos].x}%;top:${nodePos[n.pos].y}%">
        <span class="ch3__nodename">${n.name}</span><span class="ch3__nodesub">${n.sub}</span></li>`).join('')}
    </ul>
    <div class="ch3__beats">
      ${CH3.beats.map((b) => `<p class="ch3__beat textBeat">${b}</p>`).join('')}
    </div>
    <p class="ch3__closing textBeat">${CH3.closing}</p>`
  main.appendChild(scene)

  const net = scene.querySelector('.ch3__net')
  const thumbEls = [...scene.querySelectorAll('.ch3__thumb')]
  const nodeEls = [...scene.querySelectorAll('.ch3__node')]
  const beats = [...scene.querySelectorAll('.ch3__beat')]

  function mount(startY, endY) {
    gsap.set(scene, { autoAlpha: 0 })
    gsap.set(scene.querySelector('.ch3__intro'), { autoAlpha: 0, y: 30 })
    gsap.set(net, { autoAlpha: 0, scale: 0.7, rotate: -8 })
    gsap.set(thumbEls, { autoAlpha: 0, scale: 0.4 })
    gsap.set(nodeEls, { autoAlpha: 0, y: 8 })
    gsap.set(beats, { autoAlpha: 0, y: 24 })
    gsap.set(scene.querySelector('.ch3__closing'), { autoAlpha: 0, y: 24 })

    if (prefersReduced) {
      gsap.set([scene, scene.querySelector('.ch3__intro'), net, ...thumbEls, ...nodeEls, beats[0]], { autoAlpha: 1, scale: 1, rotate: 0, y: 0 })
      return
    }

    const tl = gsap.timeline({ scrollTrigger: { start: startY, end: endY, scrub: 1 } })
    tl.to(scene, { autoAlpha: 1, duration: 2 }, 0)

    // 인트로
    tl.to(scene.querySelector('.ch3__intro'), { autoAlpha: 1, y: 0, duration: 5, ease: 'power2.out' }, 2)
      .to(scene.querySelector('.ch3__intro'), { autoAlpha: 0, y: -24, duration: 4, ease: 'power2.in' }, 12)

    // 네트워크 등장 + 썸네일 스태거
    tl.to(net, { autoAlpha: 1, scale: 1, rotate: 0, duration: 18, ease: 'power2.out' }, 14)
    thumbEls.forEach((el, i) => {
      tl.to(el, { autoAlpha: 1, scale: 1, duration: 8, ease: 'power2.out' }, 15 + thumbs[i].delay * 14)
    })
    // 노드 라벨
    nodeEls.forEach((el, i) => tl.to(el, { autoAlpha: 1, y: 0, duration: 6 }, 22 + i * 1.5))
    // 군집 미세 회전(스크롤 내내)
    tl.fromTo(net, { rotate: 0 }, { rotate: 10, ease: 'none', duration: 70 }, 20)

    // 좌측 내러티브 비트 크로스페이드 (28 → 86)
    const B0 = 30, span = 56, each = span / beats.length
    beats.forEach((b, i) => {
      const t = B0 + i * each
      tl.fromTo(b, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: each * 0.4, ease: 'power2.out' }, t)
      if (i < beats.length - 1) tl.to(b, { autoAlpha: 0, y: -20, duration: each * 0.4, ease: 'power2.in' }, t + each * 0.6)
    })

    // 클로징
    tl.to([net, ...nodeEls, beats[beats.length - 1]], { autoAlpha: 0, duration: 5, ease: 'power2.in' }, 90)
      .fromTo(scene.querySelector('.ch3__closing'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 4, ease: 'power2.out' }, 92)
      .to(scene.querySelector('.ch3__closing'), { autoAlpha: 0, y: -18, duration: 3, ease: 'power2.in' }, 99)
  }

  return { name: 'chapter3', chapter: 2, length, mount }
}
