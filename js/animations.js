/* ============================================================
   HARI DHAARANI S — PORTFOLIO
   Hero background: nodes connected like tables in an ER diagram,
   drifting slowly with foreign-key-style relation lines.
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const LABELS = ['users', 'projects', 'skills', 'auth', 'orders', 'schemes', 'sessions', 'roles'];
  let nodes = [];
  let w, h, dpr;
  let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getAccent(varName, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return v || fallback;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initNodes() {
    const count = w < 700 ? 7 : 12;
    nodes = Array.from({ length: count }).map((_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 2 + Math.random() * 1.6,
      label: LABELS[i % LABELS.length],
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    const lineColor = getAccent('--line', '#24344C');
    const accent2 = getAccent('--accent-2', '#4FB8AE');
    const accent = getAccent('--accent', '#E8A33D');
    const textFaint = getAccent('--text-faint', '#5C6E8A');

    nodes.forEach((n) => {
      if (!reduced) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
    });

    // relation lines (foreign-key style, dashed) between near nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = w < 700 ? 190 : 240;
        if (dist < maxDist) {
          const alpha = 1 - dist / maxDist;
          ctx.beginPath();
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = hexToRgba(lineColor, alpha * 0.55);
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

    // nodes
    nodes.forEach((n, idx) => {
      ctx.beginPath();
      ctx.fillStyle = idx % 3 === 0 ? accent : accent2;
      ctx.globalAlpha = 0.85;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (w > 700) {
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = hexToRgba(textFaint, 0.55);
        ctx.fillText(n.label, n.x + 8, n.y + 3);
      }
    });

    if (!reduced) requestAnimationFrame(step);
  }

  function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((ch) => ch + ch).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function start() {
    resize();
    initNodes();
    step();
    if (reduced) {
      // draw a single static frame periodically isn't needed; one call suffices
    }
  }

  window.addEventListener('resize', () => {
    resize();
    initNodes();
    if (reduced) step();
  });

  start();

  /* ---------------- Floating tech icon chips in hero ---------------- */
  const floatWrap = document.getElementById('floatIcons');
  if (floatWrap) {
    const icons = floatWrap.querySelectorAll('.float-chip');
    icons.forEach((el, i) => {
      const delay = i * 0.6;
      const duration = 5 + (i % 3);
      el.style.animation = `floatChip ${duration}s ease-in-out ${delay}s infinite`;
    });
  }
})();

/* Keyframes injected via JS-created stylesheet to keep this self-contained */
(function injectFloatKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatChip {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-14px) rotate(3deg); }
    }
  `;
  document.head.appendChild(style);
})();
