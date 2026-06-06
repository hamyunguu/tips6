import { BRAND } from '../data.js'

// 세리프 T · 이탤릭 i · 볼드 산세리프 PS 글리프
const glyphs = () =>
  BRAND.logo.map((g) => `<span class="tips__${g.cls}">${g.ch}</span>`).join('')

// 가로 워드마크 (내브/푸터)
export function tipsWordmark(extraClass = '') {
  return `<span class="tipsLogo ${extraClass}" aria-label="${BRAND.name}">${glyphs()}</span>`
}

// 세로 스택 (T 위, iPS 아래) — 로고 이미지 1
export function tipsStacked(extraClass = '') {
  return `<span class="tipsLogo tipsLogo--stacked ${extraClass}" aria-label="${BRAND.name}">
    <span class="tips__t">T</span>
    <span class="tipsLogo__row"><span class="tips__i">i</span><span class="tips__ps">P</span><span class="tips__ps">S</span></span>
  </span>`
}

// 회전 정사각 프레임 (로고 이미지 2) — 네 변에 TiPS 배치
export function tipsFrame() {
  const side = (rot) =>
    `<span class="tipsFrame__side" style="transform:translate(-50%,-50%) rotate(${rot}deg) translateY(calc(var(--tf) * -1))">${tipsWordmark()}</span>`
  return `<span class="tipsFrame" aria-hidden="true">${[0, 90, 180, 270].map(side).join('')}</span>`
}
