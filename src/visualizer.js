export class Visualizer {
  constructor(audioElement, canvasElement, theme) {
    this.audio = audioElement;
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.theme = theme;
    this.isPlaying = false;
    this.animationId = null;
    
    this.audioContext = null;
    this.analyser = null;
    this.source = null;
    
    this.init();
  }

  init() {
    // We initialize AudioContext on first user interaction to comply with browser policies
    const initAudioContext = () => {
      if (!this.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        try {
          this.source = this.audioContext.createMediaElementSource(this.audio);
          this.source.connect(this.analyser);
          this.analyser.connect(this.audioContext.destination);
        } catch (e) {
          console.warn('Visualizer disabled: CORS restriction or audio source error.', e);
          this.source = null; // Disable visualizer
        }
        
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
      }
      
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      
      this.audio.removeEventListener('play', initAudioContext);
    };

    this.audio.addEventListener('play', initAudioContext);
  }

  start() {
    this.isPlaying = true;
    this.draw();
  }

  stop() {
    this.isPlaying = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  draw() {
    if (!this.isPlaying) return;

    this.animationId = requestAnimationFrame(() => this.draw());

    if (!this.analyser) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    const width = this.canvas.width;
    const height = this.canvas.height;
    const barWidth = (width / this.bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    this.ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i] / 2;

      const r = barHeight + (25 * (i / this.bufferLength));
      const g = 250 * (i / this.bufferLength);
      const b = 50;

      if (this.theme === 'dark') {
        this.ctx.fillStyle = `rgb(${r},${g},${b})`;
      } else {
        this.ctx.fillStyle = `rgb(${r},${g},${b})`; // Can be adjusted for light theme
      }

      this.ctx.fillRect(x, height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }
}
