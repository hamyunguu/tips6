import { gsap, prefersReduced } from '../lib/scroll.js'
import { OUTRO } from '../data.js'
import { tipsWordmark } from '../components/logo.js'

// Outro — About TIPS (원본 'About the Getty Provenance Index' 각색)
export function createOutro({ gl, main }) {
  const length = Math.round(window.innerHeight * 3)

  // 강조 키워드를 span으로 감싼 statement
  const stmt = OUTRO.statement
    .map((line) => line === OUTRO.highlight ? `<span class="outro__hl">${line}</span>` : line)
    .join(' ')

  const scene = document.createElement('div')
  scene.className = 'scene outro'
  scene.innerHTML = `
    <div class="outro__top">
      <p class="outro__overline">${OUTRO.overline}</p>
      <h2 class="outro__statement textH2">${stmt}</h2>
    </div>
    <div class="outro__about">
      <p class="outro__aboutlabel">About TIPS</p>
      <div class="outro__abouttext">
        ${OUTRO.aboutKr.map((p) => `<p>${p}</p>`).join('')}
      </div>
    </div>
    <div class="outro__foot">
      <a class="outro__mark" href="#" aria-label="TIPS">${tipsWordmark()}</a>
      <p class="outro__copy">${OUTRO.copyright}</p>
    </div>`
  main.appendChild(scene)

  const top = scene.querySelector('.outro__top')
  const about = scene.querySelector('.outro__about')
  const foot = scene.querySelector('.outro__foot')

  function mount(startY, endY) {
    gsap.set(scene, { autoAlpha: 0 })
    gsap.set(top, { autoAlpha: 0, y: 36 })
    gsap.set(about, { autoAlpha: 0, y: 28 })
    gsap.set(foot, { autoAlpha: 0, y: 20 })

    if (prefersReduced) {
      gsap.set([scene, top, about, foot], { autoAlpha: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ scrollTrigger: { start: startY, end: endY, scrub: 1 } })
    tl.to(scene, { autoAlpha: 1, duration: 2 }, 0)
      .to(top, { autoAlpha: 1, y: 0, duration: 10, ease: 'power2.out' }, 4)
      .to(about, { autoAlpha: 1, y: 0, duration: 12, ease: 'power2.out' }, 28)
      .to(foot, { autoAlpha: 1, y: 0, duration: 10, ease: 'power2.out' }, 58)
  }

  return { name: 'outro', length, mount }
}
