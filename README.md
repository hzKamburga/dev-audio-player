# Dev Audio Player

A lightweight, dependency-free audio player library designed specifically for developer portfolios and GitHub Pages.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Size](https://img.shields.io/badge/size-~5kb-green.svg)

## Features

- 🎵 **Zero Dependencies**: Pure Vanilla JS, no frameworks required.
- 🚀 **CDN Ready**: Works instantly via jsDelivr.
- 🎨 **Themable**: Built-in Dark and Light themes.
- 📊 **Visualizer**: Optional mini audio visualizer using Web Audio API.
- 💾 **Smart State**: Remembers play/pause state across page reloads.
- ⌨️ **Accessible**: Keyboard shortcuts (Space to toggle) and ARIA labels.
- 📱 **Responsive**: Adapts to container width.

## Quick Start (30 Seconds)

Add the script to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/USERNAME/REPO@v1.0.0/dist/dev-audio-player.min.js"></script>
```

Initialize the player:

```html
<div id="my-player"></div>

<script>
  createPlayer({
    container: '#my-player',
    src: 'path/to/your/audio.mp3',
    theme: 'dark'
  });
</script>
```

## API

### `createPlayer(options)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `src` | `string` | **Required** | URL to the audio file. |
| `container` | `string` | `'body'` | CSS selector for the container element. |
| `theme` | `'dark' \| 'light'` | `'dark'` | Color theme of the player. |
| `autoplay` | `boolean` | `false` | Auto-start playback (subject to browser policy). |
| `loop` | `boolean` | `false` | Loop audio when finished. |
| `volume` | `number` | `1.0` | Initial volume (0.0 to 1.0). |

## Chrome Autoplay Policy

Modern browsers (Chrome, Safari, Firefox) block audio autoplay until the user interacts with the page (click, tap, keypress).

- This library respects this policy.
- The Audio Context (visualizer) initializes only after the first user interaction.
- If `autoplay: true` is set, the player will attempt to play. If blocked, it will log a message and wait for user interaction.

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Open `demo/index.html` to see the result.

## Publishing to GitHub Pages & jsDelivr

1. Push your code to a GitHub repository.
2. Create a release tag (e.g., `v1.0.0`).
3. Your file will be automatically available at:
   `https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@v1.0.0/dist/dev-audio-player.min.js`

## License

MIT
