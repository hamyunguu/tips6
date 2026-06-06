import './styles.css'
import { initSmoothScroll, ScrollTrigger } from './lib/scroll.js'
import { runLoader } from './components/loader.js'
import { buildNav } from './components/nav.js'
import { buildScrollbar } from './components/scrollbar.js'
import { createHero } from './scenes/hero.js'
import { createChapter1 } from './scenes/chapter1.js'
import { createChapter2 } from './scenes/chapter2.js'
import { createChapter3 } from './scenes/chapter3.js'
import { createOutro } from './scenes/outro.js'

const gl = document.getElementById('gl')
const main = document.getElementById('main')
const scrollContent = document.getElementById('scrollContent')

initSmoothScroll()

// ── 씬 등록 (스크롤 순서대로) ──
const ctx = { gl, main }
const scenes = [
  createHero(ctx),
  createChapter1(ctx),
  createChapter2(ctx),
  createChapter3(ctx),
  createOutro(ctx),
]

// ── 레이아웃: 각 씬에 [startY,endY] 배정, 전체 스크롤 높이 설정 ──
const END_PAD = window.innerHeight
let offset = 0
const ranges = []
const chapterStartY = {}
for (const s of scenes) {
  ranges.push({ scene: s, start: offset, end: offset + s.length })
  if (typeof s.chapter === 'number') chapterStartY[s.chapter] = offset + 4  // 챕터 시작 y
  offset += s.length
}
const total = offset + END_PAD
scrollContent.style.height = total + 'px'

// 챕터 시작 y (나브 점프용)
const getChapterY = (idx) => chapterStartY[idx] ?? 0

buildNav(getChapterY)
buildScrollbar()

// ── 씬 마운트 ──
for (const { scene, start, end } of ranges) scene.mount(start, end)

ScrollTrigger.refresh()

// ── 로더 → 공개 ──
let loaderStarted = false
const startLoader = () => { if (loaderStarted) return; loaderStarted = true; runLoader(() => ScrollTrigger.refresh()) }
if (document.readyState === 'complete') startLoader()
else window.addEventListener('load', startLoader)

// 리사이즈 시 높이 재계산은 추후 챕터 길이 vh 의존 → 간단 refresh
let rt
window.addEventListener('resize', () => {
  clearTimeout(rt)
  rt = setTimeout(() => ScrollTrigger.refresh(), 200)
})
