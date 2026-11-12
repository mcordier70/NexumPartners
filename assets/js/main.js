// Nexum Partners · interactions légères (aucune dépendance)

// En-tête : liseré au défilement
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// E-mail assemblé côté client (anti-robots)
const mail = document.getElementById('email-link');
if (mail) {
  const address = `${mail.dataset.u}@${mail.dataset.d}`;
  mail.href = `mailto:${address}`;
  mail.querySelector('.email-text').textContent = address;
}

// Compteurs animés
const counters = document.querySelectorAll('[data-count]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
  const animate = (el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => io.observe(el));
}
