import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

export function initSmoothScroll() {
  if (prefersReduced) {
    // reduced-motion: 부드러운 스크롤 끄고 네이티브 스크롤만
    ScrollTrigger.defaults({ scroller: window })
    return null
  }
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  if (import.meta.env.DEV) { window.__lenis = lenis; window.__ST = ScrollTrigger }
  return lenis
}

export function scrollToY(y, opts = {}) {
  if (lenis) lenis.scrollTo(y, { duration: 1.2, ...opts })
  else window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' })
}

export function getLenis() { return lenis }
export { gsap, ScrollTrigger }
