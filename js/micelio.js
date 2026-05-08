(function () {
  const canvas = document.getElementById('mycelium-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Pares de cor: cada tip interpola de A → B ao longo da vida
  const PAIRS = [
    { a: [0, 232, 122],  b: [124, 58, 237]  }, // verde → roxo
    { a: [124, 58, 237], b: [15, 212, 160]  }, // roxo → teal
    { a: [15, 212, 160], b: [167, 139, 250] }, // teal → lilás
    { a: [167, 139, 250],b: [0, 232, 122]   }, // lilás → verde
  ];

  let tips  = [];
  let frame = 0;
  let raf;

  function rnd(min, max) { return min + Math.random() * (max - min); }

  function lerpColor(a, b, t) {
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl= Math.round(a[2] + (b[2] - a[2]) * t);
    return `rgb(${r},${g},${bl})`;
  }

  function makePrimary() {
    const W = canvas.width, H = canvas.height;
    const border = Math.floor(Math.random() * 4);
    let x, y, angle;
    if      (border === 0) { x = rnd(0, W); y = 0;  angle =  Math.PI / 2 + rnd(-0.8, 0.8); }
    else if (border === 1) { x = W; y = rnd(0, H);  angle =  Math.PI     + rnd(-0.8, 0.8); }
    else if (border === 2) { x = rnd(0, W); y = H;  angle = -Math.PI / 2 + rnd(-0.8, 0.8); }
    else                   { x = 0; y = rnd(0, H);  angle =                rnd(-0.8, 0.8); }

    const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
    return { x, y, angle, depth: 0, speed: rnd(0.6, 1.4),
             pair, life: 0, maxLife: Math.floor(rnd(80, 200)), branched: false };
  }

  function makeChild(parent, offset) {
    return { x: parent.x, y: parent.y, angle: parent.angle + offset,
             depth: parent.depth + 1, speed: rnd(0.6, 1.4),
             pair: parent.pair, life: 0, maxLife: Math.floor(rnd(80, 200)), branched: false };
  }

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#0a0f0d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function init() {
    resize();
    tips  = [];
    frame = 0;
    for (let i = 0; i < 8; i++) tips.push(makePrimary());
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function loop() {
    frame++;
    const W = canvas.width, H = canvas.height;

    ctx.globalAlpha = 1;
    ctx.fillStyle   = 'rgba(10,15,13,0.018)';
    ctx.fillRect(0, 0, W, H);

    const surviving = [];
    const newBorn   = [];

    for (const t of tips) {
      t.angle += (Math.random() - 0.5) * 0.09;

      const nx = t.x + Math.cos(t.angle) * t.speed;
      const ny = t.y + Math.sin(t.angle) * t.speed;

      // Cor interpolada pelo progresso da vida
      const progress = Math.min(t.life / t.maxLife, 1);
      const color    = lerpColor(t.pair.a, t.pair.b, progress);

      ctx.beginPath();
      ctx.moveTo(t.x, t.y);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = color;
      ctx.lineWidth   = Math.max(0.3, 1.3 - t.depth * 0.13);
      ctx.globalAlpha = Math.max(0.05, 0.55 - t.depth * 0.05);
      ctx.stroke();

      t.x = nx;
      t.y = ny;
      t.life++;

      if (t.life > t.maxLife || nx < -10 || nx > W + 10 || ny < -10 || ny > H + 10) continue;

      if (!t.branched && t.depth < 9 &&
          t.life > 30 + Math.random() * 50 && Math.random() < 0.02) {
        t.branched = true;
        newBorn.push(makeChild(t, +(0.5 + Math.random() * 0.5)));
        newBorn.push(makeChild(t, -(0.5 + Math.random() * 0.5)));
      }

      surviving.push(t);
    }

    tips = surviving;
    for (const nb of newBorn) {
      if (tips.length < 80) tips.push(nb);
    }

    if (frame % 90 === 0 && tips.length < 30) tips.push(makePrimary());

    const primaries = tips.filter(t => t.depth === 0).length;
    if (primaries < 6 && tips.length < 80) tips.push(makePrimary());

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', init);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
