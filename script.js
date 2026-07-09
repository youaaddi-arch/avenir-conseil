/* =========================================================
   Avenir Conseil — interactions (partagé multi-pages)
   ========================================================= */
(function () {
  "use strict";

  /* ---- Année courante (footer) ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header au scroll ---- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Repli des images (Unsplash -> Picsum -> dégradé) ---- */
  document.querySelectorAll("img.net-img").forEach(function (img) {
    img.addEventListener("error", function handleError() {
      img.removeEventListener("error", handleError);
      var seed = img.getAttribute("data-seed") || "avenir";
      var w = img.getAttribute("width") || 1200;
      var h = img.getAttribute("height") || 800;
      var fallback = "https://picsum.photos/seed/" + encodeURIComponent(seed) + "/" + w + "/" + h + "?grayscale";
      img.addEventListener("error", function () { img.classList.add("is-failed"); });
      img.src = fallback;
    });
  });

  /* ---- Reveal au scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Compteurs animés ---- */
  var formatNumber = function (value, target) {
    if (target < 10 && target % 1 !== 0) return value.toFixed(1).replace(".", ",");
    if (target >= 1000) return Math.round(value).toLocaleString("fr-FR");
    return String(Math.round(value));
  };
  var animateCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1500;
    var start = performance.now();
    var step = function (now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + formatNumber(target * eased, target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Formulaire de contact (validation front) ---- */
  var form = document.querySelector(".contact__form");
  if (form) {
    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form__status";
      var required = form.querySelectorAll("[required]");
      var missing = Array.prototype.some.call(required, function (el) { return !el.value.trim(); });
      if (missing) {
        status.textContent = "Merci de renseigner tous les champs obligatoires.";
        status.classList.add("err");
        return;
      }
      var email = form.querySelector('input[type="email"]');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        status.textContent = "Veuillez saisir un email valide.";
        status.classList.add("err");
        return;
      }
      status.textContent = "Merci ! Votre demande a bien été prise en compte. Un expert vous recontacte rapidement.";
      status.classList.add("ok");
      form.reset();
    });
  }
})();
