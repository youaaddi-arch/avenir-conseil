/* =========================================================
   Avenir Conseil — interactions premium
   ========================================================= */
(function () {
  "use strict";

  /* ---- Données des 5 expertises (contenu réel) ---- */
  var EXPERTISES = {
    project: {
      num: "01", title: "Project",
      kicker: "Stratégie · Architecture · Pilotage",
      desc: "Le domaine Project couvre l'ensemble des aspects stratégiques, architecturaux et de pilotage. Il cadre le projet en amont, en intégrant les impératifs stratégiques de l'entreprise, les contraintes techniques et les enjeux organisationnels de la transformation numérique.",
      domains: ["Gouvernance", "Analyse des processus métier", "Architecture fonctionnelle", "Spécification"],
      figures: [["30", "consultants mobilisés"], ["100", "user cases / an"], ["500", "spécifications fonctionnelles / an"]]
    },
    change: {
      num: "02", title: "Change",
      kicker: "Conduite du changement",
      desc: "Dans la continuité de Project, l'expertise Change met en œuvre les organisations et architectures système pour un changement efficient. Elle implique et accompagne les parties prenantes afin de faciliter l'adoption des nouvelles technologies et des nouveaux modes de travail.",
      domains: ["Projet pilote", "Méthodes & processus", "Tests fonctionnels", "Suivi du déploiement", "Communication & coaching"],
      figures: [["150", "consultants actifs sur missions"], ["100", "user cases / an"], ["+20 000", "utilisateurs accompagnés / 10 ans"]]
    },
    training: {
      num: "03", title: "Training",
      kicker: "Formation · Digital Learning",
      desc: "L'expertise Training assure une adoption rapide d'un nouveau SI métier, de la construction du programme jusqu'au coaching des utilisateurs finaux. Depuis 2024, elle est enrichie par edufactory, notre agence de Digital Learning sur mesure, pionnière en France.",
      domains: ["Ingénierie de formation", "Maintenance des modules", "Animation de sessions", "Formation de formateurs", "Coaching"],
      figures: [["60", "formateurs"], ["15 000", "heures de formation / an"], ["150 000", "apprenants / an en distanciel"]]
    },
    operations: {
      num: "04", title: "Operations",
      kicker: "Mise en œuvre métier",
      desc: "L'expertise Operations met en forme les projets dans les outils et les processus. Nos équipes métiers valident la solution déployée, puis améliorent son efficacité, sa productivité et sa rentabilité sur l'ensemble du cycle de vie produit.",
      domains: ["Jumeau numérique", "Maquette numérique", "Gestion de configuration", "Bill Of Materials"],
      figures: [["50", "consultants mobilisés"], ["+50", "maquettes numériques / an"], ["+200", "opérations de gestion de config. / an"]]
    },
    support: {
      num: "05", title: "Support",
      kicker: "Adoption & support utilisateurs",
      desc: "L'expertise Support accompagne les utilisateurs à l'usage des nouveaux outils numériques et favorise une adoption fluide et efficace. Nos centres de support spécialisés délivrent une prestation sur mesure, du support de proximité au monitoring.",
      domains: ["Support de proximité", "Techline", "Chatbots", "Monitoring"],
      figures: [["3", "centres de support nearshore"], ["+150", "ingénieurs support"], ["+50 000", "utilisateurs supportés dans le monde"]]
    }
  };

  /* ---- Année courante ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header au scroll ---- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
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

  /* ---- Explorateur d'expertises (onglets) ---- */
  var tabs = document.querySelectorAll(".tab");
  var panel = document.getElementById("explorer-panel");
  var renderPanel = function (key) {
    var d = EXPERTISES[key];
    if (!d || !panel) return;
    var domains = d.domains.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    var figures = d.figures.map(function (f) {
      return '<div class="panel__fig"><strong>' + f[0] + "</strong><span>" + f[1] + "</span></div>";
    }).join("");
    panel.innerHTML =
      '<div class="panel-anim">' +
        '<p class="panel__kicker">' + d.kicker + "</p>" +
        '<div class="panel__head"><h3>' + d.title + "</h3></div>" +
        '<p class="panel__desc">' + d.desc + "</p>" +
        '<p class="panel__sub">Domaines couverts</p>' +
        '<ul class="panel__domains">' + domains + "</ul>" +
        '<p class="panel__sub">Chiffres clés</p>' +
        '<div class="panel__figures">' + figures + "</div>" +
      "</div>";
  };
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderPanel(tab.getAttribute("data-tab"));
    });
  });
  renderPanel("project");

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
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1500;
    var start = performance.now();
    var step = function (now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNumber(target * eased, target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  var counters = document.querySelectorAll(".figure__num, .lfig__n");
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
      var required = ["name", "firstname", "company", "email", "phone", "message"];
      var missing = required.some(function (id) {
        var el = form.querySelector("#" + id);
        return !el || !el.value.trim();
      });
      if (missing) {
        status.textContent = "Merci de renseigner tous les champs obligatoires.";
        status.classList.add("err");
        return;
      }
      var email = form.querySelector("#email").value;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
