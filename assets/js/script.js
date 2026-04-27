// ============================================================
//  Portfolio - Meagan Dietert | script.js
// ============================================================
 
document.addEventListener('DOMContentLoaded', () => {
 
  // ----------------------------------------------------------
  // 1. HAMBURGER MENU — close nav when a link is clicked
  // ----------------------------------------------------------
  const hamToggle = document.getElementById('ham-toggle');
  const navLinks  = document.querySelectorAll('.nav-link');
 
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamToggle) hamToggle.checked = false;
    });
  });
 
  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    const header = document.querySelector('.page-header');
    if (hamToggle && hamToggle.checked && !header.contains(e.target)) {
      hamToggle.checked = false;
    }
  });
 
 
  // ----------------------------------------------------------
  // 2. ACTIVE NAV LINK — highlight link that matches current page
  // ----------------------------------------------------------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
 
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
 
 
  // ----------------------------------------------------------
  // 3. STICKY HEADER — add shadow/class on scroll
  // ----------------------------------------------------------
  const header = document.querySelector('.page-header');
 
  const onScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    toggleBackToTop();
  };
 
  window.addEventListener('scroll', onScroll, { passive: true });
 
 
  // ----------------------------------------------------------
  // 4. BACK-TO-TOP BUTTON — show/hide + smooth scroll
  // ----------------------------------------------------------
  const backToTop = document.querySelector('.back-to-top');
 
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };
 
  backToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
 
 
  // ----------------------------------------------------------
  // 5. FOOTER YEAR — keep copyright year current automatically
  // ----------------------------------------------------------
  const copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    copyEl.innerHTML = copyEl.innerHTML.replace(
      /\d{4}/,
      new Date().getFullYear()
    );
  }
 
 
  // ----------------------------------------------------------
  // 6. SMOOTH SCROLL — for any on-page anchor links
  // ----------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
 
 
  // ----------------------------------------------------------
  // 7. FADE-IN ON SCROLL — lightweight intersection observer
  // ----------------------------------------------------------
  const fadeEls = document.querySelectorAll('.fade-in');
 
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
 
    fadeEls.forEach(el => observer.observe(el));
  }
 
});
