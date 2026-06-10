// ── PAGE ROUTER ──────────────────────────────────────────────
const pages   = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a');

function showPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  const target = document.getElementById(id);
  const link   = document.querySelector(`.nav-links a[data-page="${id}"]`);

  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    setTimeout(() => triggerReveals(target), 50);
    animateSkillBars(target);
  }
  if (link) link.classList.add('active');

  history.pushState({ page: id }, '', `#${id}`);
}

navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showPage(a.dataset.page);
  });
});

// Handle back/forward
window.addEventListener('popstate', e => {
  const id = e.state?.page || 'home';
  showPage(id);
});

// ── SCROLL REVEAL ─────────────────────────────────────────────
function triggerReveals(container) {
  const els = container.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.07}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ── SKILL BARS ────────────────────────────────────────────────
function animateSkillBars(container) {
  const fills = container.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    const width = fill.dataset.width;
    setTimeout(() => { fill.style.width = width; }, 300);
  });
}

// ── BLOG TOGGLE ───────────────────────────────────────────────
function togglePost(id) {
  const modal = document.getElementById(id);
  const grid  = modal.closest('.section').querySelector('.blog-grid');
  const isOpen = modal.style.display === 'block';

  // Close all modals first
  document.querySelectorAll('.blog-post-modal').forEach(m => m.style.display = 'none');
  document.querySelectorAll('.blog-grid').forEach(g => g.style.display = 'grid');

  if (!isOpen) {
    grid.style.display = 'none';
    modal.style.display = 'block';
    window.scrollTo({ top: modal.offsetTop - 80, behavior: 'smooth' });
  }
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#', '') || 'home';
  showPage(hash);
});
