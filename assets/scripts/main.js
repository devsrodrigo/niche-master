/* ============================================================
   main.js — Scroll animations & nav behavior
   niche.com.mx · Vanilla JS, no dependencies
   ============================================================ */

(function () {
  "use strict";

  // --- Nav scroll class toggle ---
  var nav = document.querySelector(".site-nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // --- Dropdown: click toggle + keyboard + outside-click dismiss ---
  var triggers = document.querySelectorAll(".nav-dropdown-trigger");
  triggers.forEach(function (trigger) {
    var dropdown = trigger.closest(".nav-dropdown");
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", isOpen);
    });
    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var isOpen = dropdown.classList.toggle("open");
        trigger.setAttribute("aria-expanded", isOpen);
      }
      if (e.key === "Escape") {
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });
  });

  document.addEventListener("click", function () {
    triggers.forEach(function (trigger) {
      trigger.closest(".nav-dropdown").classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    });
  });

  // --- IntersectionObserver for fade-up elements ---
  var fadeEls = document.querySelectorAll(".fade-up");
  if (fadeEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    fadeEls.forEach(function (el, i) {
      // Stagger delay: each element gets +0.08s
      el.style.transitionDelay = (i * 0.08) + "s";
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    fadeEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
