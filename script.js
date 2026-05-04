const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

const roles = [
  'Data & AI Engineer_',
  'Full-Stack Developer_',
  'Machine Learning Engineer_',
  'Algorithms & Systems_',
  'Open to Opportunities_'
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-role');
const cursorEl = document.createElement('span');
cursorEl.className = 'cursor';

function tick() {
  const cur = roles[ri];
  const displayed = deleting ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  typedEl.textContent = displayed.replace(/_$/, '');
  typedEl.appendChild(cursorEl);
  if (!deleting && ci === cur.length) { deleting = true; setTimeout(tick, 2200); return; }
  if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  setTimeout(tick, deleting ? 35 : 72);
}
tick();

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 65);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const barsSection = document.querySelector('.skill-bars');
if (barsSection) {
  const barObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      entries[0].target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.level;
      });
      barObserver.unobserve(entries[0].target);
    }
  }, { threshold: 0.3 });
  barObserver.observe(barsSection);
}

function applyProjFilter(cat) {
  document.querySelectorAll('.proj-filters .filter-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.proj-filters .filter-btn[data-filter="${cat}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  document.querySelectorAll('.proj-card').forEach(card => {
    const visible = card.dataset.cat === cat;
    card.style.display = visible ? 'flex' : 'none';
    if (visible) card.classList.add('on');
  });
  const featured = document.querySelector('.projects-featured');
  if (featured) {
    const anyVisible = Array.from(featured.children).some(c => c.style.display !== 'none');
    featured.style.marginBottom = anyVisible ? '' : '0';
  }
}

document.querySelectorAll('.proj-filters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => applyProjFilter(btn.dataset.filter));
});

applyProjFilter('ai');

function applyCertFilter(cat) {
  document.querySelectorAll('.online-row').forEach(row => {
    row.style.display = (cat === 'all' || row.dataset.cat === cat) ? 'flex' : 'none';
  });
}
document.querySelectorAll('.cert-filters .filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cert-filters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyCertFilter(btn.dataset.filter);
  });
});
const activeCertBtn = document.querySelector('.cert-filters .filter-btn.active');
if (activeCertBtn) applyCertFilter(activeCertBtn.dataset.filter);

function openLb(pdf, title) {
  document.getElementById('lb-title').textContent = title;
  document.getElementById('lb-ext').href = pdf;
  document.getElementById('lb-embed').src = pdf;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lb-embed').src = '';
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}
function closeLbBg(e) {
  if (e.target.id === 'lb') closeLb();
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLb();
});
