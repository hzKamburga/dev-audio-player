import { Visualizer } from './visualizer.js';
import styles from './styles.css';

class DevAudioPlayer {
  constructor(options) {
    this.options = {
      src: '',
      autoplay: false,
      loop: false,
      volume: 1.0,
      theme: 'dark',
      container: 'body',
      ...options
    };

    this.container = document.querySelector(this.options.container);
    if (!this.container) {
      console.error('DevAudioPlayer: Container not found');
      return;
    }

    this.audio = new Audio(this.options.src);
    this.audio.loop = this.options.loop;
    this.audio.volume = this.options.volume;
    
    this.isPlaying = false;
    this.visualizer = null;

    this.init();
  }

  init() {
    this.injectStyles();
    this.render();
    this.attachEvents();
    this.loadPreference();
    
    if (this.options.autoplay) {
      // Chrome policy might block this
      this.play().catch((err) => {
        console.log('Autoplay blocked by browser policy:', err.message);
        this.isPlaying = false;
        this.updatePlayButton();
      });
    }
  }

  injectStyles() {
    if (!document.getElementById('dev-audio-player-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'dev-audio-player-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
  }

  render() {
    const player = document.createElement('div');
    player.className = `dev-audio-player ${this.options.theme}`;
    
    player.innerHTML = `
      <div class="dap-controls">
        <button class="dap-play-btn" aria-label="Play">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        
        <div class="dap-progress-container">
          <div class="dap-progress-bar"></div>
        </div>
        
        <span class="dap-time">0:00</span>
        
        <div class="dap-volume-container">
          <input type="range" class="dap-volume-slider" min="0" max="1" step="0.01" value="${this.options.volume}">
        </div>
      </div>
      <canvas class="dap-visualizer" width="400" height="40"></canvas>
    `;

    this.container.appendChild(player);
    
    this.elements = {
      player,
      playBtn: player.querySelector('.dap-play-btn'),
      progressBar: player.querySelector('.dap-progress-bar'),
      progressContainer: player.querySelector('.dap-progress-container'),
      timeDisplay: player.querySelector('.dap-time'),
      volumeSlider: player.querySelector('.dap-volume-slider'),
      canvas: player.querySelector('.dap-visualizer')
    };

    this.visualizer = new Visualizer(this.audio, this.elements.canvas, this.options.theme);
  }

  attachEvents() {
    // Play/Pause
    this.elements.playBtn.addEventListener('click', () => this.togglePlay());
    
    // Spacebar shortcut
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        this.togglePlay();
      }
    });

    // Audio events
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updatePlayButton();
      this.visualizer.stop();
    });

    // Progress bar click
    this.elements.progressContainer.addEventListener('click', (e) => {
      const rect = this.elements.progressContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      this.audio.currentTime = pos * this.audio.duration;
    });

    // Volume control
    this.elements.volumeSlider.addEventListener('input', (e) => {
      this.audio.volume = e.target.value;
    });

    // Visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isPlaying) {
        this.pause();
        this.wasPlayingBeforeHidden = true;
      } else if (!document.hidden && this.wasPlayingBeforeHidden) {
        this.play();
        this.wasPlayingBeforeHidden = false;
      }
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    return this.audio.play().then(() => {
      this.isPlaying = true;
      this.updatePlayButton();
      this.visualizer.start();
      this.savePreference(true);
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButton();
    this.visualizer.stop();
    this.savePreference(false);
  }

  updatePlayButton() {
    const icon = this.isPlaying 
      ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' 
      : '<path d="M8 5v14l11-7z"/>';
    
    this.elements.playBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24">${icon}</svg>`;
    this.elements.playBtn.setAttribute('aria-label', this.isPlaying ? 'Pause' : 'Play');
  }

  updateProgress() {
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    this.elements.progressBar.style.width = `${percent}%`;
    this.elements.timeDisplay.textContent = this.formatTime(this.audio.currentTime);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  savePreference(isPlaying) {
    try {
      localStorage.setItem('dap-playing', isPlaying);
    } catch (e) {
      // Ignore storage errors
    }
  }

  loadPreference() {
    try {
      const shouldPlay = localStorage.getItem('dap-playing') === 'true';
      if (shouldPlay && !this.options.autoplay) {
        // We don't auto-resume from storage to respect "no autoplay" policy
        // unless user explicitly enabled autoplay in options
      }
    } catch (e) {
      // Ignore storage errors
    }
  }
}

// Expose global function
window.createPlayer = (options) => new DevAudioPlayer(options);
