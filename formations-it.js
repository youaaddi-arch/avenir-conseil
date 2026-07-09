/* =========================================================
   Avenir Conseil — Catalogue IT (piloté par Sanity)
   Charge le contenu depuis Sanity, sinon le dataset local,
   sinon les données intégrées. Recherche, filtres, fiche détaillée.
   ========================================================= */
(function () {
  "use strict";

  /* --- Configuration Sanity (renseigner projectId pour brancher le CMS) --- */
  var SANITY = { projectId: "", dataset: "production", apiVersion: "2023-10-01" };
  var GROQ = '*[_type=="formationIt"]|order(order asc){title,slug,category,categoryColor,level,durationDays,durationHours,price,isNew,summary,objectives,audience,prerequisites,program,tools}';

  var grid = document.getElementById("it-grid");
  if (!grid) return;
  var filtersEl = document.getElementById("it-filters");
  var searchEl = document.getElementById("it-search");
  var emptyEl = document.getElementById("it-empty");
  var countEl = document.getElementById("it-count");
  var modal = document.getElementById("it-modal");
  var modalPanel = document.getElementById("it-modal-panel");

  var COURSES = [];
  var activeCat = "all";
  var query = "";

  /* --- Sources de données --- */
  function fromEmbedded() {
    var el = document.getElementById("it-data");
    if (!el) return [];
    try { return JSON.parse(el.textContent); } catch (e) { return []; }
  }
  function fetchSanity() {
    if (!SANITY.projectId) return Promise.reject(new Error("no-project"));
    var url = "https://" + SANITY.projectId + ".apicdn.sanity.io/v" + SANITY.apiVersion +
      "/data/query/" + SANITY.dataset + "?query=" + encodeURIComponent(GROQ);
    return fetch(url).then(function (r) { if (!r.ok) throw new Error("sanity"); return r.json(); })
      .then(function (j) { if (!j.result || !j.result.length) throw new Error("empty"); return j.result; });
  }
  function fetchLocal() {
    return fetch("data/formations-it.json").then(function (r) { if (!r.ok) throw new Error("local"); return r.json(); });
  }
  function loadCourses() {
    return fetchSanity()
      .catch(fetchLocal)
      .catch(function () { return fromEmbedded(); });
  }

  /* --- Utilitaires --- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function dur(c) { return (c.durationDays ? c.durationDays + " j · " + c.durationHours + " h" : "Sur mesure"); }
  function newBadge(c) { return c.isNew ? '<span class="badge-new">New</span>' : ""; }

  /* --- Filtres (catégories) --- */
  function buildFilters() {
    var cats = []; var colors = {};
    COURSES.forEach(function (c) { if (cats.indexOf(c.category) < 0) { cats.push(c.category); colors[c.category] = c.categoryColor; } });
    var html = '<button class="it-chip is-active" data-cat="all">Toutes</button>';
    cats.forEach(function (cat) {
      html += '<button class="it-chip" data-cat="' + esc(cat) + '"><span class="it-chip__dot" style="background:' + esc(colors[cat] || "#999") + '"></span>' + esc(cat) + "</button>";
    });
    filtersEl.innerHTML = html;
    filtersEl.querySelectorAll(".it-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        filtersEl.querySelectorAll(".it-chip").forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        activeCat = btn.getAttribute("data-cat");
        render();
      });
    });
  }

  /* --- Rendu des cartes --- */
  function cardHtml(c, i) {
    var tools = (c.tools || []).slice(0, 4).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
    return '<article class="it-card reveal" style="--cat:' + esc(c.categoryColor || "#5b8cff") + '" data-i="' + i + '">' +
      newBadge(c) +
      '<div class="it-card__top"><span class="it-card__cat" style="background:' + esc(c.categoryColor || "#5b8cff") + '">' + esc(c.category) + '</span><span class="it-card__level">' + esc(c.level) + '</span></div>' +
      "<h3>" + esc(c.title) + "</h3>" +
      '<p class="it-card__sum">' + esc(c.summary) + "</p>" +
      '<div class="it-card__tools">' + tools + "</div>" +
      '<div class="it-card__meta"><span>⏱ ' + dur(c) + "</span><span>" + esc(c.price || "Nous consulter") + "</span></div>" +
      '<button class="btn btn--primary btn--sm it-card__btn" data-open="' + i + '">Voir le programme</button>' +
      "</article>";
  }

  function render() {
    var list = COURSES.filter(function (c) {
      if (activeCat !== "all" && c.category !== activeCat) return false;
      if (query) {
        var hay = (c.title + " " + c.summary + " " + (c.tools || []).join(" ") + " " + c.category).toLowerCase();
        if (hay.indexOf(query) < 0) return false;
      }
      return true;
    });
    grid.innerHTML = list.map(function (c) { return cardHtml(c, COURSES.indexOf(c)); }).join("");
    if (emptyEl) emptyEl.hidden = list.length > 0;
    if (countEl) countEl.textContent = list.length;
    grid.querySelectorAll("[data-open]").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(COURSES[+btn.getAttribute("data-open")]); });
    });
    grid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* --- Fiche détaillée (modal) --- */
  function listBlock(title, items) {
    if (!items || !items.length) return "";
    return '<div class="it-modal__block"><h3>' + title + '</h3><ul class="bullets">' +
      items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
  }
  function progBlock(program) {
    if (!program || !program.length) return "";
    var blocks = program.map(function (m) {
      var items = (m.items || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
      return '<div class="prog-block"><strong>' + esc(m.module) + "</strong>" + (items ? "<ul>" + items + "</ul>" : "") + "</div>";
    }).join("");
    return '<div class="it-modal__block"><h3>Programme</h3>' + blocks + "</div>";
  }
  function openModal(c) {
    if (!c || !modal) return;
    var tools = (c.tools || []).map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
    modalPanel.innerHTML =
      '<button class="it-modal__close" data-close aria-label="Fermer">✕</button>' +
      '<span class="it-card__cat" style="background:' + esc(c.categoryColor || "#5b8cff") + '">' + esc(c.category) + "</span> " + newBadge(c) +
      "<h2 id=\"it-modal-title\">" + esc(c.title) + "</h2>" +
      '<div class="it-modal__meta"><span>★ ' + esc(c.level) + "</span><span>⏱ " + dur(c) + "</span><span>" + esc(c.price || "Nous consulter") + " HT</span></div>" +
      '<p class="it-modal__sum">' + esc(c.summary) + "</p>" +
      (tools ? '<div class="it-card__tools" style="margin-bottom:8px">' + tools + "</div>" : "") +
      listBlock("Objectifs", c.objectives) +
      listBlock("Public concerné", c.audience) +
      listBlock("Prérequis", c.prerequisites) +
      progBlock(c.program) +
      '<div class="it-modal__cta"><a href="contact.html" class="btn btn--gold">Demander une session</a><button type="button" class="btn btn--ghost" data-close>Fermer</button></div>';
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalPanel.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", closeModal); });
    modalPanel.scrollTop = 0;
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  if (modal) {
    modal.querySelector(".it-modal__overlay").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  /* --- Recherche --- */
  if (searchEl) {
    searchEl.addEventListener("input", function () { query = searchEl.value.trim().toLowerCase(); render(); });
  }

  /* --- Init --- */
  loadCourses().then(function (data) {
    COURSES = (data || []).sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    buildFilters();
    render();
  });
})();
