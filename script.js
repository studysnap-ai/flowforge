// ── NAV: scroll effect & hamburger ──
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── REVEAL ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        successMsg.style.display = 'block';
        submitBtn.style.display = 'none';
      } else {
        submitBtn.textContent = 'Error — try again';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'Error — try again';
      submitBtn.disabled = false;
    }
  });
}

// ── HERO ANIMATED WAVES (canvas, theme-aware, ported from 21st.dev) ──
(function initHeroWaves() {
  const hero = document.querySelector('.hero');
  const canvas = document.querySelector('.hero-waves');
  if (!hero || !canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const influenceRadius = prefersReduced ? 160 : 320;
  const mouseInfluence  = prefersReduced ? 10  : 60;
  const smoothing       = prefersReduced ? 0.04 : 0.1;

  let width = 0, height = 0, time = 0, raf;
  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  const cssVar = (name, fallback) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

  let palette = [];
  function buildPalette() {
    const blue = cssVar('--blue', '#38bdf8');
    const purple = cssVar('--purple', '#a855f7');
    const text = cssVar('--text', '#f1f5f9');
    palette = [
      { offset: 0,           amplitude: 70, frequency: 0.0030, color: blue,   opacity: 0.40 },
      { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: purple, opacity: 0.32 },
      { offset: Math.PI,     amplitude: 60, frequency: 0.0034, color: blue,   opacity: 0.26 },
      { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: purple, opacity: 0.20 },
      { offset: Math.PI * 2, amplitude: 55, frequency: 0.0040, color: text,   opacity: 0.10 },
    ];
  }

  function recenter() {
    mouse.x = target.x = width / 2;
    mouse.y = target.y = height / 2;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    recenter();
  }

  function drawWave(w) {
    ctx.save();
    ctx.beginPath();
    for (let x = 0; x <= width; x += 4) {
      const dx = x - mouse.x;
      const dy = height / 2 - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / influenceRadius);
      const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + w.offset);
      const y = height / 2
        + Math.sin(x * w.frequency + time * 0.002 + w.offset) * w.amplitude
        + Math.sin(x * w.frequency * 0.4 + time * 0.003) * (w.amplitude * 0.45)
        + mouseEffect;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = w.color;
    ctx.globalAlpha = w.opacity;
    ctx.shadowBlur = 28;
    ctx.shadowColor = w.color;
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    time += 1;
    mouse.x += (target.x - mouse.x) * smoothing;
    mouse.y += (target.y - mouse.y) * smoothing;
    ctx.clearRect(0, 0, width, height);
    palette.forEach(drawWave);
    raf = requestAnimationFrame(animate);
  }

  hero.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    target.x = e.clientX - r.left;
    target.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', recenter);
  window.addEventListener('resize', resize);

  // Recolor instantly when the light/dark theme toggle flips data-theme.
  const themeObserver = new MutationObserver(buildPalette);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  if (document.body) themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  buildPalette();
  resize();
  raf = requestAnimationFrame(animate);
})();

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
