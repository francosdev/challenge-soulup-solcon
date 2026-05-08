(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const NUM_CLUSTERS  = 5;
  const NUM_PARTICLES = 60;
  const COLORS        = ['#00e87a', '#0fd4a0'];

  let clusters = [];
  let particles = [];
  let raf;
  let frame = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function init() {
    resize();
    clusters  = buildClusters();
    particles = buildParticles();
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function buildClusters() {
    return Array.from({ length: NUM_CLUSTERS }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }

  function buildParticles() {
    return Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      cluster:      i % NUM_CLUSTERS,
      angle:        Math.random() * Math.PI * 2,
      radius:       10 + Math.random() * 55,
      size:         0.5 + Math.random() * 1.8,
      color:        COLORS[Math.random() < 0.5 ? 0 : 1],
      pulseOffset:  Math.random() * Math.PI * 2,
      pulseSpeed:   0.018 + Math.random() * 0.025,
    }));
  }

  function update() {
    for (const c of clusters) {
      c.x += c.vx;
      c.y += c.vy;
      if (c.x < 0 || c.x > canvas.width)  { c.vx *= -1; c.x = Math.max(0, Math.min(canvas.width,  c.x)); }
      if (c.y < 0 || c.y > canvas.height) { c.vy *= -1; c.y = Math.max(0, Math.min(canvas.height, c.y)); }
    }
    for (const p of particles) p.angle += 0.008;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pos = particles.map(p => {
      const c = clusters[p.cluster];
      return { x: c.x + Math.cos(p.angle) * p.radius, y: c.y + Math.sin(p.angle) * p.radius };
    });

    // Linhas de conexão dentro do mesmo cluster
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        if (particles[i].cluster !== particles[j].cluster) continue;
        const dx   = pos[i].x - pos[j].x;
        const dy   = pos[i].y - pos[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 50) {
          ctx.beginPath();
          ctx.moveTo(pos[i].x, pos[i].y);
          ctx.lineTo(pos[j].x, pos[j].y);
          ctx.strokeStyle = `rgba(0,232,122,${0.22 * (1 - dist / 50)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    // Partículas
    for (let i = 0; i < particles.length; i++) {
      const p     = particles[i];
      const scale = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(frame * p.pulseSpeed + p.pulseOffset));
      ctx.beginPath();
      ctx.arc(pos[i].x, pos[i].y, p.size * scale, 0, Math.PI * 2);
      ctx.fillStyle   = p.color;
      ctx.globalAlpha = 0.65 + 0.35 * scale;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function loop() {
    frame++;
    update();
    draw();
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', init);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
