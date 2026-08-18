/* ============================================================
   HARI DHAARANI S — PORTFOLIO
   Core interactions
   ============================================================ */
(function () {
  'use strict';

  const doc = document;
  const root = doc.documentElement;

  /* ---------------- Loading screen ---------------- */
  window.addEventListener('load', () => {
    const loader = doc.getElementById('loader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('hidden'), 500);
  });

  /* ---------------- Theme toggle ---------------- */
  const themeBtn = doc.getElementById('themeToggle');
  const THEME_KEY = 'hd-portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  let savedTheme = 'dark';
  try {
    savedTheme = window.__hdTheme || 'dark';
  } catch (e) { /* noop */ }
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      window.__hdTheme = next;
    });
  }

  /* ---------------- Sticky nav + scrollspy ---------------- */
  const navbar = doc.getElementById('navbar');
  const navLinks = Array.from(doc.querySelectorAll('.nav-links a'));
  const sections = navLinks
    .map((a) => doc.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 12);

    let currentId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });

    const backTop = doc.getElementById('backToTop');
    if (backTop) backTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = doc.getElementById('navToggle');
  const navLinksWrap = doc.getElementById('navLinks');
  if (navToggle && navLinksWrap) {
    navToggle.addEventListener('click', () => {
      navLinksWrap.classList.toggle('open');
      navToggle.setAttribute(
        'aria-expanded',
        navLinksWrap.classList.contains('open') ? 'true' : 'false'
      );
    });
    navLinksWrap.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinksWrap.classList.remove('open'))
    );
  }

  /* ---------------- Back to top ---------------- */
  const backTopBtn = doc.getElementById('backToTop');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* ---------------- Custom cursor ---------------- */
  const cursorDot = doc.querySelector('.cursor-dot');
  const cursorRing = doc.querySelector('.cursor-ring');
  if (cursorDot && cursorRing && matchMedia('(hover:hover)').matches) {
    let rx = 0, ry = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      tx = e.clientX; ty = e.clientY;
    });
    (function loop() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    doc.querySelectorAll('a, button, .skill-card, .project-card, input, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('grow'));
    });
  }

  /* ---------------- Typing animation (hero name) ---------------- */
  const typedEl = doc.getElementById('typed-name');
  if (typedEl) {
    const full = typedEl.getAttribute('data-text') || typedEl.textContent;
    typedEl.textContent = '';
    let i = 0;
    function type() {
      if (i <= full.length) {
        typedEl.textContent = full.slice(0, i);
        i++;
        setTimeout(type, 68);
      }
    }
    setTimeout(type, 900);
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = doc.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- Animated counters ---------------- */
  const counters = doc.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const isFloat = String(target).includes('.');
        const duration = 1400;
        const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = isFloat ? val.toFixed(2) : Math.round(val);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = isFloat ? target.toFixed(2) : target;
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------------- Skill progress bars ---------------- */
  const skillFills = doc.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute('data-level');
          entry.target.style.width = target + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillFills.forEach((el) => skillObserver.observe(el));

  /* ---------------- Project filtering ---------------- */
  const filterBtns = doc.querySelectorAll('.filter-btn');
  const projectCards = doc.querySelectorAll('.project-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const tags = (card.getAttribute('data-tags') || '').split(',');
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------------- Contact form (client-side demo) ---------------- */
  const form = doc.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = doc.getElementById('formStatus');
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = '// error: please fill in all required fields';
        status.className = 'form-status err';
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        status.textContent = '// error: please enter a valid email address';
        status.className = 'form-status err';
        return;
      }

      const subject = encodeURIComponent(form.subject.value.trim() || 'Portfolio contact');
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:haridhaarani14112003@gmail.com?subject=${subject}&body=${body}`;

      status.textContent = '// success: opening your mail client…';
      status.className = 'form-status ok';
      form.reset();
    });
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
