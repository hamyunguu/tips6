# TIPS — Three Idiots Paper Service

> **Experiment for Many Ways to Bind Paper · 종이를 엮는 수많은 방법을 실험하다**

A scroll-driven storytelling site for **TIPS (Three Idiots Paper Service)**, a bookbinding/printing studio.
The interaction model, motion, and layout are a faithful re-implementation of Getty's
[*Tracing Art*](https://www.getty.edu/tracingart/), re-themed end-to-end into TIPS's bookbinding narrative.

## Chapters
- **Intro / Hero** — floating book covers (Workroom Press · 6699press) + slogan
- **Ch.1 Binding a Book, Step by Step** — Print → Fold → Gather → Sew → Case → Bound, with a colophon zoom
- **Ch.2 Many Ways to Bind** — Saddle Stitch · Perfect Binding · Smyth Sewn · Exposed Spine · Japanese Stab · Case Bound
- **Ch.3 Paper, Press and Method** — a radial network of books around paper / press / binding nodes
- **Outro — About TIPS**

## Tech
Vite · GSAP (ScrollTrigger) · Lenis (smooth scroll). No framework — vanilla ES modules.

## Develop
```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # → dist/
```

## Notes
Student project / non-commercial demo. Book-cover images (Workroom Press, 6699press), reference
imagery, and the Bradford typeface remain the property of their respective owners and are used here
for academic, non-commercial purposes only.
