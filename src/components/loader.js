import { gsap } from '../lib/scroll.js'
import { tipsFrame } from './logo.js'

// 로더 회전 시간(초) — 길이 조절은 여기서. (에셋 캐시되면 너무 빨리 끝나서 일부러 길게)
const SPIN_DURATION = 3.6

// 로더: TIPS 회전 정사각 프레임(로고 이미지 2) → 천천히 한 바퀴 돌고 페이드아웃하며 히어로 공개
export function runLoader(onDone) {
  const el = document.getElementById('pageLoader')
  el.innerHTML = tipsFrame()
  const frame = el.querySelector('.tipsFrame')
  document.body.classList.add('is-loading')

  const tl = gsap.timeline({
    onComplete: () => {
      el.classList.add('is-hidden')
      el.style.display = 'none'
      document.body.classList.remove('is-loading')
      onDone && onDone()
    },
  })
  gsap.set(frame, { opacity: 0, scale: 0.9, rotate: -20 })
  tl.to(frame, { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }, 0.15)
    // 핀휠처럼 천천히 한 바퀴(+살짝) 회전 — 로딩 모션
    .to(frame, { rotate: 340, duration: SPIN_DURATION, ease: 'none' }, 0.2)
    .to(frame, { rotate: 360, scale: 1.05, duration: 0.9, ease: 'power2.in' }, '>-0.1')
    .to(el, { opacity: 0, duration: 0.85, ease: 'power2.inOut' }, '<0.2')
  return tl
}
