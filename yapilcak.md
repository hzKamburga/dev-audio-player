
---

## 🎯 PROMPT (DERHAL KULLAN)

> You are a senior frontend library engineer.
> Your task is to **design and implement a lightweight JavaScript audio player library specifically for developer portfolios and GitHub Pages**, with CDN-ready distribution.

### REQUIREMENTS

#### 1️⃣ CORE

* Vanilla JavaScript (NO framework dependency)
* Single-file usage via CDN
* Works on GitHub Pages
* No autoplay until user interaction (Chrome policy compliant)
* Clean, minimal UI

#### 2️⃣ PUBLIC API

Expose a global function:

```js
createPlayer({
  src: string,              // audio file URL
  autoplay: boolean,        // default false
  loop: boolean,            // default false
  volume: number,           // 0–1
  theme: "dark" | "light",
  container?: string        // CSS selector
})
```

#### 3️⃣ FEATURES

* Play / Pause button
* Progress bar
* Volume control
* Keyboard shortcut (space = play/pause)
* Pause on tab hidden, resume on focus
* Save user preference (paused/playing) via localStorage
* Optional mini audio visualizer using Web Audio API (low CPU)

#### 4️⃣ PROJECT STRUCTURE

```
project/
├─ src/
│  ├─ player.js
│  ├─ visualizer.js
│  └─ styles.css
├─ dist/
│  └─ dev-audio-player.min.js
├─ demo/
│  └─ index.html
├─ README.md
└─ package.json
```

#### 5️⃣ BUILD

* Bundle into **UMD** so it works via `<script>`
* Minified output in `dist/`
* No external runtime dependencies

#### 6️⃣ CDN SUPPORT

* Must be compatible with jsDelivr GitHub CDN
* README must include:

```html
<script src="https://cdn.jsdelivr.net/gh/USERNAME/REPO@v1.0.0/dist/dev-audio-player.min.js"></script>
```

#### 7️⃣ README.md MUST INCLUDE

* What the library does (for dev portfolios)
* 30-second quick start
* CDN usage
* API options table
* Chrome autoplay policy explanation
* Demo link (GitHub Pages ready)

#### 8️⃣ CODE QUALITY

* Clean, commented, readable
* No overengineering
* Performance-conscious
* Portfolio-quality output

### OUTPUT

* Full source code
* Final minified file
* README.md
* Demo HTML
* Clear instructions to publish on GitHub + jsDelivr

---

🔥 **NOTES**

* Do NOT use React, Vue, or heavy libraries
* Do NOT autoplay audio
* UX must be respectful, minimal, and developer-friendly

---
