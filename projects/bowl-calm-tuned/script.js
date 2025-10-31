// Desktop header inline nav (right) + Mobile hamburger overlay
const navToggle = document.querySelector('.nav-toggle');
const gnav = document.getElementById('gnav');

// IntersectionObserver for subtle fade-ins
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-in');
  });
}, { threshold: 0.08 });
document.querySelectorAll('[data-observe]').forEach(el => io.observe(el));

function openMenu(){
  document.body.classList.add('no-scroll');
  gnav.classList.add('is-open');
  gnav.setAttribute('aria-hidden','false');
  navToggle.setAttribute('aria-expanded','true');
  const firstLink = gnav.querySelector('a');
  if(firstLink) firstLink.focus();
}
function closeMenu(){
  document.body.classList.remove('no-scroll');
  gnav.classList.remove('is-open');
  gnav.setAttribute('aria-hidden','true');
  navToggle.setAttribute('aria-expanded','false');
  navToggle.focus();
}

if (navToggle && gnav){
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  // backdrop click (only mobile)
  gnav.addEventListener('click', (e) => {
    if (window.matchMedia('(min-width: 768px)').matches) return;
    const sheet = gnav.querySelector('.gnav__sheet');
    if (sheet && !sheet.contains(e.target)) closeMenu();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gnav.classList.contains('is-open')) closeMenu();
  });

  // close after click (mobile)
  gnav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (!window.matchMedia('(min-width: 768px)').matches) closeMenu();
    });
  });
}

// スクロール時の影付け
const header = document.querySelector('.site-header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8));
