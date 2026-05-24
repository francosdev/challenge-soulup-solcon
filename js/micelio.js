// SporeField — partículas estilo PS5 para o hero canvas #mycelium-bg
// Este arquivo é carregado pelo index.html; define a classe e inicializa.

class SporeField {
  constructor(canvasId) {
    this.canvas = typeof canvasId === 'string'
      ? document.getElementById(canvasId)
      : canvasId;
    if (!this.canvas || this.canvas._sporeField) return;
    this.canvas._sporeField = this;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.targetCount = 0;
    this.raf = null;

    window.addEventListener('resize', () => this._resize());
    this._resize();
    this._init();
  }

  _colorAtT(t) {
    const stops = [
      [139, 175, 110],
      [184, 212, 154],
      [130, 150, 190],
      [192, 168, 255],
      [155, 127, 232],
    ];
    const seg = (stops.length - 1) * t;
    const i = Math.min(Math.floor(seg), stops.length - 2);
    const f = seg - i;
    const a = stops[i], b = stops[i + 1];
    return [
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f),
    ];
  }

  _resize() {
    const w = this.canvas.offsetWidth || window.innerWidth;
    const h = this.canvas.offsetHeight || (window.innerHeight - 70);
    if (w > 0 && h > 0) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.targetCount = Math.min(120, Math.max(35, Math.floor(
      (this.canvas.width * this.canvas.height) / 7000
    )));
  }

  _makeParticle(randomLife) {
    const W = this.canvas.width, H = this.canvas.height;
    const r = Math.random();
    let size, category;
    if (r < 0.60) {
      size = 0.5 + Math.random() * 0.7;   category = 'micro';
    } else if (r < 0.90) {
      size = 1.2 + Math.random() * 1.0;   category = 'small';
    } else {
      size = 2.2 + Math.random() * 1.3;   category = 'medium';
    }
    const maxOpacity = category === 'micro' ? 0.15 : category === 'small' ? 0.30 : 0.50;
    const totalLife = 200 + Math.random() * 300;
    const p = {
      originX:     Math.random() * W,
      originY:     H * 0.5 + Math.random() * H * 0.5,
      size, category, maxOpacity,
      shape:       Math.random() < 0.8 ? 'circle' : 'diamond',
      wobbleFreq:  0.5 + Math.random() * 1.5,
      wobbleAmp:   3 + Math.random() * 5,
      wobblePhase: Math.random() * Math.PI * 2,
      speed:       0.18 + Math.random() * 0.42,
      colorStart:  Math.random(),
      colorEnd:    Math.random(),
      life: 0, totalLife,
      fadeInEnd:    totalLife * 0.15,
      fadeOutStart: totalLife * 0.82,
    };
    if (randomLife) p.life = Math.random() * p.totalLife;
    return p;
  }

  _init() {
    this.particles = [];
    for (let i = 0; i < this.targetCount; i++) {
      this.particles.push(this._makeParticle(true));
    }
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _loop() {
    const ctx = this.ctx;
    const W = this.canvas.width, H = this.canvas.height;
    ctx.clearRect(0, 0, W, H);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;

      if (p.life >= p.totalLife) { this.particles[i] = this._makeParticle(false); continue; }

      const t    = p.life / p.totalLife;
      const drawX = p.originX + Math.sin(p.wobblePhase + t * p.wobbleFreq * Math.PI * 2) * p.wobbleAmp;
      const drawY = p.originY - p.speed * p.life;

      if (drawY < -p.size * 3) { this.particles[i] = this._makeParticle(false); continue; }

      let opacity;
      if      (p.life < p.fadeInEnd)    opacity = (p.life / p.fadeInEnd) * p.maxOpacity;
      else if (p.life < p.fadeOutStart) opacity = p.maxOpacity;
      else    opacity = ((p.totalLife - p.life) / (p.totalLife - p.fadeOutStart)) * p.maxOpacity;

      const colorT = ((p.colorStart + (p.colorEnd - p.colorStart) * t) % 1 + 1) % 1;
      const [r, g, b] = this._colorAtT(colorT);

      ctx.save();
      ctx.globalAlpha = Math.max(0, opacity);

      if (p.shape === 'circle') {
        if (p.category === 'medium') {
          const grd = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size * 3);
          grd.addColorStop(0, `rgba(${r},${g},${b},0.25)`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      } else {
        ctx.translate(drawX, drawY);
        ctx.rotate(Math.PI / 4);
        if (p.category === 'medium') {
          const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3);
          grd.addColorStop(0, `rgba(${r},${g},${b},0.25)`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grd;
          ctx.fillRect(-p.size * 2.5, -p.size * 2.5, p.size * 5, p.size * 5);
        }
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
      }

      ctx.restore();
    }

    while (this.particles.length < this.targetCount) {
      this.particles.push(this._makeParticle(false));
    }

    this.raf = requestAnimationFrame(() => this._loop());
  }
}

// Auto-inicialização
(function () {
  function start() {
    new SporeField('mycelium-bg');
    document.querySelectorAll('.mycelium-divider canvas').forEach(canvas => {
      new SporeField(canvas);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
