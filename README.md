# Christian Hernandez — Portfolio

Standalone static portfolio site. Plain HTML/CSS/JS — no framework, no build step, no runtime hydration. All shared styling lives in `assets/css/site.css` and shared behavior in `assets/js/site.js`.

## 📁 Pages
- [index.html](./index.html) — homepage (animated WebGPU shader hero + selected work)
- [casestudy-page.html](./casestudy-page.html) — Zoning Compliance Reporting case study
- [casestudy-title-extraction.html](./casestudy-title-extraction.html) — Title Document Extractor case study

## 🚀 Run locally
```bash
npm run preview
# or
npx serve .
```
You can also open `index.html` directly, though a local server is recommended so the shader module and fonts load correctly.

## 🌐 Deployment
100% static — deploy to any static host. Recommended: **Cloudflare Pages** (unlimited bandwidth, global CDN, free SSL), optionally connected to a GitHub repo for auto-deploys. Custom domain via Porkbun DNS.
