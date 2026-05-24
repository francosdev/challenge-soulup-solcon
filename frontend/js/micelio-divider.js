class MyceliumDivider {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas || this.canvas._myceliumDivider) return;
    this.canvas._myceliumDivider = this;
    this.ctx = this.canvas.getContext('2d');
    this.filaments = [];
    this.nodes = [];
    this.time = 0;
    this.globalAlpha = 1;
    this.dissolving = false;
    this.raf = null;

    this._resize();
    this._initFilaments();

    window.addEventListener('resize', () => { this._resize(); this._softReset(); });
    this.canvas.addEventListener('click', () => this._dissolveAndRebirth());
  }

  _resize() {
    const parent = this.canvas.parentElement;
    const w = (parent ? parent.offsetWidth : window.innerWidth) || window.innerWidth;
    const h = (parent ? parent.offsetHeight : 120) || 120;
    this.canvas.width = w;
    this.canvas.height = h;
  }

  _lerpRGB(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t),
    ];
  }

  _getColor(phaseOffset) {
    const t = (Math.sin(this.time * 0.02 + phaseOffset) + 1) / 2;
    return this._lerpRGB([139, 175, 110], [155, 127, 232], t);
  }

  _makeFilament(startX, startY, angle, generation, phaseOffset) {
    const W = this.canvas.width, H = this.canvas.height;
    const maxLen = W * 0.18 + Math.random() * W * 0.22;
    const numSeg = Math.floor(12 + Math.random() * 16);
    const segLen = maxLen / numSeg;
    const thickness = Math.max(0.25, 2.0 - generation * 0.22);
    const opacity = Math.max(0.08, 0.65 - generation * 0.08);

    const points = [{ x: startX, y: startY }];
    const controls = [];
    let cx = startX, cy = startY, cAngle = angle;

    for (let i = 0; i < numSeg; i++) {
      cAngle += (Math.random() - 0.5) * 0.4;
      const nx = cx + Math.cos(cAngle) * segLen;
      const ny = cy + Math.sin(cAngle) * segLen;
      const clampY = Math.max(2, Math.min(H - 2, ny));

      const perp = cAngle + Math.PI / 2;
      const dev = (Math.random() - 0.5) * segLen * 0.55;
      const cpX = (cx + nx) / 2 + Math.cos(perp) * dev;
      const cpY = (cy + clampY) / 2 + Math.sin(perp) * dev;

      controls.push({ x: cpX, y: Math.max(2, Math.min(H - 2, cpY)) });
      points.push({ x: nx, y: clampY });
      cx = nx; cy = clampY;
    }

    return {
      points, controls,
      generation, thickness, opacity, phaseOffset,
      drawn: 0, complete: false, branched: false,
      endX: points[points.length - 1].x,
      endY: points[points.length - 1].y,
      endAngle: cAngle,
    };
  }

  _initFilaments() {
    this.filaments = [];
    this.nodes = [];
    this.time = 0;
    this.globalAlpha = 1;
    this.dissolving = false;

    const H = this.canvas.height;
    const numOrigins = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numOrigins; i++) {
      const y = H * (0.15 + Math.random() * 0.7);
      const angle = (Math.random() - 0.5) * 0.9;
      const phase = Math.random() * Math.PI * 2;
      this.filaments.push(this._makeFilament(0, y, angle, 0, phase));
    }

    if (!this.raf) {
      this.raf = requestAnimationFrame(() => this._loop());
    }
  }

  _softReset() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
    this._initFilaments();
  }

  _dissolveAndRebirth() {
    if (this.dissolving) return;
    this.dissolving = true;
  }

  _drawFilament(f) {
    if (f.drawn < 1) return;
    const ctx = this.ctx;
    const [r, g, b] = this._getColor(f.phaseOffset);
    const segsToDraw = Math.min(f.drawn, f.controls.length);

    ctx.save();
    ctx.globalAlpha = f.opacity * this.globalAlpha;
    ctx.strokeStyle = `rgb(${r},${g},${b})`;
    ctx.lineWidth = f.thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(f.points[0].x, f.points[0].y);
    for (let i = 0; i < segsToDraw; i++) {
      ctx.quadraticCurveTo(f.controls[i].x, f.controls[i].y, f.points[i + 1].x, f.points[i + 1].y);
    }
    ctx.stroke();
    ctx.restore();
  }

  _drawNodes() {
    const ctx = this.ctx;
    for (const node of this.nodes) {
      const [r, g, b] = this._getColor(node.phaseOffset);
      const pulse = (Math.sin(this.time * 0.05 + node.phaseOffset) + 1) / 2;
      const size = node.size * (1.0 + pulse * 0.5);

      ctx.save();
      ctx.globalAlpha = 0.55 * this.globalAlpha;

      const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 3.5);
      grd.addColorStop(0, `rgba(${r},${g},${b},0.35)`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(node.x, node.y, size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.globalAlpha = 0.85 * this.globalAlpha;
      ctx.beginPath();
      ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fill();
      ctx.restore();
    }
  }

  _loop() {
    const ctx = this.ctx;
    const W = this.canvas.width, H = this.canvas.height;
    ctx.clearRect(0, 0, W, H);
    this.time++;

    if (this.dissolving) {
      this.globalAlpha = Math.max(0, this.globalAlpha - 1 / 18);
      if (this.globalAlpha <= 0) {
        this.filaments = [];
        this.nodes = [];
        this.time = 0;
        this.globalAlpha = 1;
        this.dissolving = false;
        const numOrigins = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numOrigins; i++) {
          const y = H * (0.15 + Math.random() * 0.7);
          const angle = (Math.random() - 0.5) * 0.9;
          const phase = Math.random() * Math.PI * 2;
          this.filaments.push(this._makeFilament(0, y, angle, 0, phase));
        }
      }
    }

    const toAdd = [];
    for (const f of this.filaments) {
      if (!f.complete) {
        f.drawn = Math.min(f.drawn + 1, f.controls.length);
        if (f.drawn >= f.controls.length) {
          f.complete = true;
          if (f.generation < 8 && this.filaments.length + toAdd.length < 60) {
            this.nodes.push({
              x: f.endX, y: f.endY,
              size: Math.max(0.8, 2.8 - f.generation * 0.28),
              phaseOffset: Math.random() * Math.PI * 2,
            });
            if (!f.branched) {
              f.branched = true;
              const numBranches = 1 + Math.floor(Math.random() * 3);
              for (let i = 0; i < numBranches; i++) {
                const angleOff = (Math.random() - 0.5) * 1.1 + (i - numBranches / 2) * 0.45;
                toAdd.push(this._makeFilament(
                  f.endX, f.endY,
                  f.endAngle + angleOff,
                  f.generation + 1,
                  Math.random() * Math.PI * 2
                ));
              }
            }
          }
        }
      }
      this._drawFilament(f);
    }

    for (const child of toAdd) this.filaments.push(child);

    this._drawNodes();

    this.raf = requestAnimationFrame(() => this._loop());
  }
}
