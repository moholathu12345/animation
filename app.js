/* ============================================
   APP.JS — Vanilla JavaScript
   Ashveen Dev Menon · GTP1302 Guided Learning
   ============================================ */

(function () {
  'use strict';

  // ---- Sticky Nav Scroll Effect ----
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- Scroll Fade-In (IntersectionObserver) ----
  const fadeElements = document.querySelectorAll('.fade-in-up');

  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once visible
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver not supported
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Week Entry Toggles (Journey page) ----
  const weekToggles = document.querySelectorAll('.week-toggle');

  weekToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      const body = toggle.nextElementSibling;

      toggle.setAttribute('aria-expanded', !expanded);

      if (body) {
        if (expanded) {
          body.setAttribute('hidden', '');
        } else {
          body.removeAttribute('hidden');
        }
      }
    });
  });

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();
