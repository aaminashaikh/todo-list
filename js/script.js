/* =========================================================
   Aamina Shaikh — Portfolio
   Vanilla JS — navbar, scroll reveal, form, back-to-top
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar: shrink + shadow on scroll ---- */
  const navbar = document.getElementById('mainNav');
  const toggleNavbarState = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  toggleNavbarState();
  window.addEventListener('scroll', toggleNavbarState, { passive: true });

  /* ---- Collapse mobile menu after clicking a link ---- */
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('.nav-link, .btn-nav-cta');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---- Active nav link highlighting on scroll (scrollspy-lite) ---- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.navbar-nav .nav-link');

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Scroll-reveal animations (IntersectionObserver) ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 480);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Contact form (client-side only — no backend wired up) ---- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      formStatus.textContent = 'Please fill in all fields correctly.';
      formStatus.className = 'form-status error';
      return;
    }

    // NOTE: No backend/email service is connected yet.
    // [ADD YOUR INFORMATION]: wire this up to a form service (e.g. Formspree,
    // EmailJS) or your own backend endpoint to actually receive messages.
    formStatus.textContent = "Thanks for reaching out! (Form isn't connected to a backend yet.)";
    formStatus.className = 'form-status success';
    contactForm.reset();
    contactForm.classList.remove('was-validated');
  });

});
