// 콘텐츠 데이터 — 원본 Getty "Tracing Art" 텍스트/에셋 매핑

// 상대경로(앞 슬래시 X)로 — GitHub Pages 서브경로에서도 동작. '@' ','는 그대로, 공백/악센트만 인코딩
export const img = (rel) => import.meta.env.BASE_URL + encodeURI(rel)
const book = (p) => `images/books/${p}`

// 히어로에 떠다니는 책 이미지 (워크룸 프레스 portrait 표지 + 6699프레스 landscape 북샷)
// 위치=뷰포트 중심 기준 %, w=vw, ar=가로/세로 비율(박스가 이미지 비율과 일치 → crop 없음), depth=시차
export const HERO_IMAGES = [
  { file: book('workroom/VOLODINE-5-COVER-1.jpg'),            x: 57,  y: 11, w: 7,   ar: 0.60, depth: 0.45 },
  { file: book('workroom/KBW-COVER-web.jpg'),                 x: 21,  y: 50, w: 7.5, ar: 0.63, depth: 1.10 },
  { file: book('6699/6699-05.jpg'),                           x: 11.5,y: 38, w: 11,  ar: 1.50, depth: 0.70 },
  { file: book('workroom/SCORE-8-COVER-1.jpg'),               x: 88,  y: 38, w: 7.5, ar: 0.72, depth: 0.80 },
  { file: book('6699/6699-02.jpg'),                           x: 77,  y: 64, w: 12,  ar: 1.50, depth: 1.25 },
  { file: book('workroom/DD-COVER3.jpg'),                     x: 72,  y: 36, w: 7,   ar: 0.66, depth: 0.55 },
  { file: book('workroom/BEFORE-MUSIC-COVER3.jpg'),           x: 29,  y: 79, w: 8,   ar: 0.71, depth: 0.95 },
  { file: book('6699/6699-06.jpg'),                           x: 6,   y: 96, w: 13,  ar: 1.50, depth: 1.35 },
  { file: book('workroom/Fever-Eye-cover-1.jpg'),             x: 50.5,y: 98, w: 8,   ar: 0.77, depth: 1.15 },
  { file: book('6699/6699-10.jpg'),                           x: 93,  y: 97, w: 10,  ar: 1.41, depth: 1.30 },
  { file: book('workroom/LeTemoinJusquauBout-Cover-Front.jpg'),x: 17, y: 4,  w: 6.5, ar: 0.66, depth: 0.60 },
]

export const HERO = {
  overline: 'Three Idiots Paper Service',
  headline: 'Experiment for Many Ways to Bind Paper',
  scroll: 'Scroll down',
  tooltip: 'Click on a book to learn more.',
}

export const CHAPTERS = [
  { num: '1', title: 'Binding a Book, Step by Step' },
  { num: '2', title: 'Many Ways to Bind' },
  { num: '3', title: 'Paper, Press and Method' },
]

export const COPYRIGHT = '© J. Paul Getty Trust'

// 떠다니는 책 필드용 전체 책 목록 (file, ar=가로/세로)
export const BOOKS = [
  { file: book('workroom/SCORE-8-COVER-1.jpg'), ar: 0.72 },
  { file: book('workroom/Fever-Eye-cover-1.jpg'), ar: 0.77 },
  { file: book('workroom/BEFORE-MUSIC-COVER3.jpg'), ar: 0.71 },
  { file: book('workroom/DD-COVER3.jpg'), ar: 0.66 },
  { file: book('workroom/VOLODINE-5-COVER-1.jpg'), ar: 0.60 },
  { file: book('workroom/KBW-COVER-web.jpg'), ar: 0.63 },
  { file: book('workroom/LeTemoinJusquauBout-Cover-Front.jpg'), ar: 0.66 },
  { file: book('workroom/Sasa-AR-Rehab-2014-cover1.jpg'), ar: 0.71 },
  { file: book('6699/6699-01.jpg'), ar: 1.26 },
  { file: book('6699/6699-02.jpg'), ar: 1.50 },
  { file: book('6699/6699-03.jpg'), ar: 0.71 },
  { file: book('6699/6699-04.jpg'), ar: 1.50 },
  { file: book('6699/6699-05.jpg'), ar: 1.50 },
  { file: book('6699/6699-06.jpg'), ar: 1.50 },
  { file: book('6699/6699-07.jpg'), ar: 1.50 },
  { file: book('6699/6699-08.jpg'), ar: 1.50 },
  { file: book('6699/6699-09.png'), ar: 1.25 },
  { file: book('6699/6699-10.jpg'), ar: 1.41 },
  { file: book('6699/6699-11.jpg'), ar: 1.46 },
  { file: book('6699/6699-12.jpg'), ar: 1.26 },
]

// ── TIPS 브랜드 (Three Idiots Paper Service) ────────────────
// 전체 시스템/컨셉은 Getty Tracing Art 유지, 로고·설명은 부분 반영
export const BRAND = {
  name: 'TIPS',
  full: 'Three Idiots Paper Service',
  // 로고 글리프: 세리프 T · 이탤릭 i · 볼드 산세리프 PS
  logo: [
    { ch: 'T', cls: 't' },
    { ch: 'i', cls: 'i' },
    { ch: 'P', cls: 'ps' },
    { ch: 'S', cls: 'ps' },
  ],
  sloganEn: ['Experiment for', 'Many Ways to', 'BIND PAPER'],
  sloganKr: ['종이를 엮는', '수많은 방법을', '실험하다'],
  aboutLabel: 'About TIPS',
  aboutKr: [
    '책을 만들 때, 우리는 늘 많은 선택 앞에 놓입니다. 어떤 종이에 인쇄할지, 어떤 방식으로 출력할지, 어떻게 엮어낼지. 그리고 우리는 늘 같은 선택 앞에서 멈춰 섭니다.',
    'TIPS는 반복되는 선택에서 벗어나려는 시도입니다. 다양한 방법을 실험하며, 종이 속 단어와 맥락을 제본이라는 매개를 통해 전달합니다.',
  ],
  copyright: '© TIPS — Three Idiots Paper Service',
}

// ── Chapter 1: 한 권이 제본되기까지 (TIPS 각색) ──────────────
export const CH1 = {
  label: 'Chapter 1',
  title: 'Binding a Book, Step by Step',
  intro: 'Follow a single volume as it travels from a flat printed sheet to a bound book.',
  focal: {
    title: 'One Volume',
    sub: 'from flat sheet to bound book',
    img: book('workroom/Sasa-AR-Rehab-2014-cover1.jpg'),
    credit: 'TIPS — Three Idiots Paper Service',
  },
  stages: ['Print', 'Fold', 'Gather', 'Sew', 'Case', 'Bound'],
  beats: [
    { stage: 'Print',  text: 'Every book begins as flat sheets — printed, stacked, and waiting to be folded.' },
    { stage: 'Fold',   text: 'Each sheet is folded into a signature, the basic unit from which the book is built.' },
    { stage: 'Gather', text: 'Signatures are gathered in order, slowly building the full body of the text.' },
    { stage: 'Sew',    text: 'Thread passes through the spine, binding the signatures together by hand — Smyth sewing.' },
    { stage: 'Case',   text: 'The cover is wrapped and cased in, giving the loose pages a single skin.' },
    { stage: 'Bound',  text: 'What began as separate sheets of paper is now one bound volume.' },
  ],
  colophon: {
    heading: 'Colophon',
    rows: [
      ['Title', 'One Volume'],
      ['Paper', 'Munken Pure 120 g/m²'],
      ['Typeface', 'Bradford · Graphik'],
      ['Binding', 'Smyth-sewn, exposed spine'],
      ['Press', 'TIPS — Three Idiots Paper Service'],
      ['Edition', 'First edition, 2026'],
    ],
    highlight: 3, // Binding 행 강조
    note: 'The binding is what turns sheets into a book — and the choice TIPS keeps experimenting with.',
  },
  closing: 'Every choice — paper, print, fold, thread — leaves its trace in the finished book.',
}

// ── Chapter 2: Many Ways to Bind (원본 'Artists as Collectors' 각색) ──
// 책 + 거대 제본방식 이름(textH1) + 배경 틴트 크로스페이드
export const CH2 = {
  label: 'Chapter 2',
  title: 'Many Ways to Bind',
  intro: 'There is no single way to hold paper together. Each method gives the book a different body.',
  methods: [
    { name: 'Saddle Stitch',  kr: '중철',     book: book('6699/6699-02.jpg'),                         ar: 1.50, tint: '#e9efee', desc: 'Folded sheets stapled through the spine — light, fast, and flat-opening.' },
    { name: 'Perfect Binding', kr: '무선철',   book: book('workroom/SCORE-8-COVER-1.jpg'),             ar: 0.72, tint: '#f1ece4', desc: 'Pages glued at the spine and wrapped in a cover — the everyday paperback.' },
    { name: 'Smyth Sewn',     kr: '사철',     book: book('workroom/Sasa-AR-Rehab-2014-cover1.jpg'),   ar: 0.71, tint: '#e8ecf3', desc: 'Signatures sewn through the fold with thread — durable and flat-opening.' },
    { name: 'Exposed Spine',  kr: '오픈 사철', book: book('workroom/VOLODINE-5-COVER-1.jpg'),          ar: 0.60, tint: '#f3e8e8', desc: 'The sewn spine left bare, showing the thread as part of the design.' },
    { name: 'Japanese Stab',  kr: '오토철',   book: book('6699/6699-06.jpg'),                         ar: 1.50, tint: '#edf0e7', desc: 'Thread stitched through holes near the edge — a binding worn on the outside.' },
    { name: 'Case Bound',     kr: '양장',     book: book('workroom/KBW-COVER-web.jpg'),               ar: 0.63, tint: '#ecebe8', desc: 'A sewn text block cased into hard covers — the most protective binding.' },
  ],
  closing: 'Six methods, six different books — the same sheets, bound otherwise.',
}

// ── Chapter 3: Paper, Press and Method (원본 네트워크 data-viz 각색) ──
export const CH3 = {
  label: 'Chapter 3',
  title: 'Paper, Press and Method',
  intro: 'Every book sits in a web of choices — the paper it is printed on, the press that makes it, the method that binds it.',
  // 네트워크 노드(가장자리 라벨)
  nodes: [
    { name: 'Smyth Sewn',      sub: 'thread through the fold',     pos: 'top' },
    { name: 'Risograph',       sub: 'soy-ink, layered colour',     pos: 'right-top' },
    { name: 'Munken Paper',    sub: 'uncoated, warm white',        pos: 'right-bottom' },
    { name: 'Perfect Binding', sub: 'glued spine',                 pos: 'bottom' },
    { name: 'Offset Press',    sub: 'sharp, consistent runs',      pos: 'left-bottom' },
    { name: 'Exposed Spine',   sub: 'thread left visible',         pos: 'left-top' },
  ],
  beats: [
    'Hundreds of books, each tied to the paper, press and binding that made it.',
    'Pull one thread — a single binding method — and a whole cluster of books moves with it.',
    'Between the makers and the methods sit the small choices that give each book its character.',
  ],
  closing: 'This is the world TIPS works inside — and keeps experimenting with.',
}

// ── Outro: About TIPS (원본 'About the GPI' 각색) ──
export const OUTRO = {
  overline: 'About TIPS',
  // 강조 키워드(원본의 'geopolitical'처럼)
  statement: ['A continuing experiment in the', 'many ways to', 'bind paper', 'into a book.'],
  highlight: 'bind paper',
  aboutKr: BRAND.aboutKr,
  cta: 'Three Idiots Paper Service',
  copyright: BRAND.copyright,
}
