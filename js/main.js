const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a, .nav-dropdown-content a');

// Force navbar background on pages without dark hero
const path = window.location.pathname;
const isRootPage = path === '/' || path === '/index.html' || path.split('/').filter(Boolean).length <= 1;
if (!isRootPage) {
  navbar.classList.add('scrolled');
}

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 50 || !isRootPage) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  if (!navLinks.classList.contains('open')) {
    document.querySelectorAll('.nav-dropdown.open').forEach(el => el.classList.remove('open'));
  }
});

// Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown > a').forEach(a => {
  a.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    }
  });
});

navAnchors.forEach(a => {
  a.addEventListener('click', (e) => {
    const isDropdownParent = a.parentElement.classList.contains('nav-dropdown');
    if (isDropdownParent && window.innerWidth <= 768) {
      return;
    }
    navLinks.classList.remove('open');
    document.querySelectorAll('.nav-dropdown.open').forEach(el => el.classList.remove('open'));
    const targetId = a.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Dark mode
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') document.body.classList.add('dark-mode');

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
}
