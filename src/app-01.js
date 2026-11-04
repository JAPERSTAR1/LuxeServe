/* ============================================================
   CODEX EXAM STUDIO · APPLICATION ENGINE
   Part 1 · constants, storage, icons, dashboard
   ============================================================ */
(function () {
  "use strict";

  const PASS_MARK = 60;
  const LETTERS = ["A", "B", "C", "D", "E"];
  const STORE = {
    theme: "codex.theme.v1",
    results: "codex.results.v1",
    practice: "codex.practice.v1",
    active: "codex.active.v1"
  };

  const EXAMS = [
    {
      id: "ch1", no: "01", title: "Software Product Engineering",
      chapter: "Chapter 1 · Lecture 1", source: "Lecture 1", short: "Software Products",
      minutes: 38, icon: "cube", accent: "#5eead4", accentSoft: "rgba(94,234,212,.11)",
      blurb: "Products versus projects, delivery models, product vision, product management, prototyping and professional ethics.",
      topics: ["Products", "Vision", "Management", "Ethics"]
    },
    {
      id: "ch2", no: "02", title: "Agile Software Engineering",
      chapter: "Chapter 2 · Lecture 2", source: "Lecture 2", short: "Agile",
      minutes: 46, icon: "zap", accent: "#7dd3fc", accentSoft: "rgba(125,211,252,.11)",
      blurb: "Plan-driven versus agile, incremental delivery, agile principles, Extreme Programming, Scrum roles, backlogs and sprints.",
      topics: ["Agile", "XP", "Scrum", "Sprints"]
    },
    {
      id: "ch3", no: "03", title: "Features, Scenarios & Stories",
      chapter: "Chapter 3 · Lecture 3", source: "Lecture 3", short: "Features & Stories",
      minutes: 34, icon: "layers", accent: "#a78bfa", accentSoft: "rgba(167,139,250,.11)",
      blurb: "Software features, personas, scenarios, user stories and epics, feature qualities, feature creep and design knowledge.",
      topics: ["Features", "Personas", "Scenarios", "Stories"]
    },
    {
      id: "ch4", no: "04", title: "Software Architecture",
      chapter: "Chapter 4 · Lecture 4", source: "Lecture 4", short: "Architecture",
      minutes: 44, icon: "grid", accent: "#fbbf24", accentSoft: "rgba(251,191,36,.10)",
      blurb: "Architectural design, components and APIs, quality attributes, security architectures, layering, MVC, SOA and technology choices.",
      topics: ["Components", "Security", "Layers", "MVC"]
    },
    {
      id: "ch5", no: "05", title: "Midterm Comprehensive",
      chapter: "Chapters 1–5 · Midterm bank", source: "Midterm", short: "Midterm",
      minutes: 82, icon: "cloud", accent: "#f472b6", accentSoft: "rgba(244,114,182,.10)",
      blurb: "A full midterm simulation: cloud computing, virtualisation, SaaS, multi-tenancy, scaling, microservices and integrated concepts from Chapters 1–4.",
      topics: ["Cloud", "Microservices", "Integrated"], featured: true
    }
  ];

  const EXAM_MAP = Object.fromEntries(EXAMS.map(e => [e.id, e]));
  const QUESTIONS = { ch1: CH1, ch2: CH2, ch3: CH3, ch4: CH4, ch5: CH5 };
  const CORE_IDS = EXAMS.map(e => e.id);
  const ALL_IDS = [...CORE_IDS, "mix"];
  const QINDEX = {};

  EXAMS.forEach(e => { e.bank = QUESTIONS[e.id].length; });
  Object.values(QUESTIONS).forEach(list => list.forEach(q => {
    if (QINDEX[q.id]) console.warn("Duplicate question id:", q.id);
    QINDEX[q.id] = q;
  }));

  /* ---------- Icons ---------- */

  const ICONS = {
    cube: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
    zap: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    layers: '<path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    cloud: '<path d="M17.5 19H7a5 5 0 1 1 1.9-9.6A7 7 0 0 1 22 12a4 4 0 0 1-4.5 7z"/>',
    shuffle: '<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    xCircle: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    play: '<path d="M6 4l14 8-14 8V4z"/>',
    rotate: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    chevronLeft: '<path d="M15 18l-6-6 6-6"/>',
    chevronRight: '<path d="M9 18l6-6-6-6"/>',
    alert: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a2 2 0 0 0 2 4h1M17 6h3a2 2 0 0 1-2 4h-1"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v18H6.5A2.5 2.5 0 0 1 4 18.5z"/><path d="M8 7h8M8 11h6"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 17l.9 2.1L22 20l-2.1.9L19 23l-.9-2.1L16 20l2.1-.9L19 17z"/>',
    dot: '<circle cx="12" cy="12" r="3"/>',
    map: '<path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z"/><path d="M9 3v15M15 6v15"/>',
    home: '<path d="M3 10.5L12 3l9 7.5V21H3z"/><path d="M9 21v-7h6v7"/>'
  };

  function icon(name, extra) {
    const path = ICONS[name] || ICONS.spark;
    return '<svg class="ic ' + (extra || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
  }

  /* ---------- Utilities ---------- */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function sum(arr) { return arr.reduce((a, b) => a + b, 0); }
  function round(n) { return Math.round(n); }

  function formatTime(sec) {
    if (sec == null) return "—";
    sec = Math.max(0, Math.floor(sec));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return h + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function formatMinutes(min) {
    if (min >= 60) {
      const h = Math.floor(min / 60);
      const m = min % 60;
      return h + "h" + (m ? " " + m + "m" : "");
    }
    return min + " min";
  }

  function formatDate(ts) {
    try {
      return new Date(ts).toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
      });
    } catch (e) { return ""; }
  }

  function normalizeText(value) {
    return String(value == null ? "" : value)
      .toLowerCase()
      .replace(/[\u2018\u2019']/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* ---------- Storage ---------- */

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      toast("Could not save to local storage. Your device may be out of space.", "error");
      return false;
    }
  }

  function emptyDB() {
    const db = {};
    ALL_IDS.forEach(id => { db[id] = []; });
    return db;
  }

  function getDB(key) {
    const raw = readJSON(key, null);
    const db = emptyDB();
    if (raw && typeof raw === "object") {
      ALL_IDS.forEach(id => { if (Array.isArray(raw[id])) db[id] = raw[id]; });
    }
    return db;
  }

  function saveAttemptResult(kind, examId, result) {
    const key = kind === "practice" ? STORE.practice : STORE.results;
    const db = getDB(key);
    db[examId] = [result, ...(db[examId] || [])].slice(0, 20);
    writeJSON(key, db);
  }

  function bestOf(list) {
    if (!list || !list.length) return null;
    return Math.max.apply(null, list.map(a => a.percent));
  }

  function allQuestions() {
    return CORE_IDS.reduce((acc, id) => acc.concat(QUESTIONS[id]), []);
  }

  function qById(id) { return QINDEX[id]; }

  function isChoice(q) {
    return q.t === "mcq" || q.t === "tf" || q.t === "scenario";
  }

  function isAnswered(item) {
    if (!item || item.response === null || item.response === undefined) return false;
    if (typeof item.response === "string") return item.response.trim() !== "";
    return true;
  }

  function correctText(q, item) {
    if (isChoice(q)) {
      const opts = displayOptions(q, item);
      return opts[item.correctIndex];
    }
    if (q.t === "fill") return q.accept && q.accept.length ? q.accept[0] : "";
    return q.model || "";
  }

  function displayOptions(q, item) {
    if (q.t === "tf") return ["True", "False"];
    if (!item || !item.order) return q.o || [];
    return item.order.map(i => q.o[i]);
  }

  function optionKey(q, i) {
    return q.t === "tf" ? (i === 0 ? "T" : "F") : LETTERS[i];
  }

  function gradeText(q, response) {
    const ans = normalizeText(response);
    if (!ans) return false;
    if (q.accept && q.accept.some(a => normalizeText(a) === ans)) return true;
    if (q.keywords && q.keywords.length && q.keywords.every(group => group.some(k => ans.includes(normalizeText(k))))) return true;
    if (q.accept && q.accept.some(a => {
      const n = normalizeText(a);
      return n.length > 3 && ans.includes(n);
    })) return true;
    return false;
  }

  function isCorrect(q, item) {
    if (!q || !item || !isAnswered(item)) return false;
    if (isChoice(q)) return item.response === item.correctIndex;
    return gradeText(q, item.response);
  }

  /* ---------- State ---------- */

  const state = {
    view: "dashboard",
    theme: "dark",
    active: null,
    timer: null,
    result: null,
    resultFrom: "dashboard",
    reviewFilter: "all",
    mixCount: 30,
    mixMode: "exam",
    mapModalClose: null
  };

  /* ---------- Theme ---------- */

  function applyTheme(theme) {
    state.theme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "light" ? "#f3f5fa" : "#070b14");
    const btn = $('[data-act="theme"]');
    if (btn) btn.setAttribute("aria-label", state.theme === "light" ? "Switch to dark mode" : "Switch to light mode");
  }

  function toggleTheme() {
    applyTheme(state.theme === "light" ? "dark" : "light");
    writeJSON(STORE.theme, state.theme);
  }

  /* ---------- Mix helpers ---------- */

  function selectedMixCount() {
    const total = allQuestions().length;
    if (state.mixCount === "all") return total;
    return Math.min(Number(state.mixCount) || total, total);
  }

  function mixMinutes(count) {
    return clamp(Math.round(count * 1), 15, 180);
  }

  function sampleMix(requested) {
    const total = allQuestions().length;
    const target = Math.min(requested == null ? total : requested, total);
    if (target >= total) return allQuestions();

    const pools = CORE_IDS.map(id => shuffle(QUESTIONS[id]));
    const picked = [];
    const ptr = CORE_IDS.map(() => 0);

    // Round-robin allocation keeps the papers balanced across all five banks.
    while (picked.length < target) {
      let added = false;
      for (let i = 0; i < pools.length && picked.length < target; i++) {
        if (ptr[i] < pools[i].length) {
          picked.push(pools[i][ptr[i]]);
          ptr[i] += 1;
          added = true;
        }
      }
      if (!added) break;
    }
    return shuffle(picked);
  }

  /* ---------- Attempt helpers ---------- */

  function makeItem(q) {
    let order = null;
    let correctIndex = null;
    if (q.t === "mcq" || q.t === "scenario") {
      order = shuffle(q.o.map((_, i) => i));
      correctIndex = order.indexOf(LETTERS.indexOf(q.a));
    } else if (q.t === "tf") {
      order = [0, 1];
      correctIndex = q.a ? 0 : 1;
    }
    return {
      qid: q.id,
      order: order,
      correctIndex: correctIndex,
      response: null,
      flagged: false,
      checked: false
    };
  }

  function buildAttempt(examId, mode, mixRequested) {
    let pool;
    let meta;
    if (examId === "mix") {
      const available = allQuestions().length;
      const wanted = mixRequested == null ? selectedMixCount() : mixRequested;
      const count = wanted === "all" ? available : Math.min(Number(wanted) || selectedMixCount(), available);
      pool = sampleMix(count);
      meta = {
        id: "mix",
        title: "All-in-One Random Exam",
        chapter: "All five banks · Randomised",
        source: "Mix",
        minutes: mixMinutes(pool.length),
        icon: "shuffle",
        short: "Mixed"
      };
    } else {
      meta = EXAM_MAP[examId];
      pool = QUESTIONS[examId].slice();
    }

    const items = shuffle(pool).map(makeItem);
    const totalSeconds = mode === "practice" ? null : meta.minutes * 60;

    return {
      id: "att-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      examId: examId,
      mode: mode,
      title: meta.title,
      chapter: meta.chapter,
      icon: meta.icon,
      mixRequested: examId === "mix" ? mixRequested : null,
      mixCount: examId === "mix" ? items.length : null,
      items: items,
      index: 0,
      remaining: totalSeconds,
      totalSeconds: totalSeconds,
      created: Date.now(),
      updated: Date.now()
    };
  }

  function saveActive() {
    if (!state.active) return;
    state.active.updated = Date.now();
    writeJSON(STORE.active, state.active);
  }

  let saveSoonTimer = null;
  function saveActiveSoon() {
    clearTimeout(saveSoonTimer);
    saveSoonTimer = setTimeout(saveActive, 350);
  }

  function attemptTotals(attempt) {
    const total = attempt.items.length;
    let answered = 0;
    let flagged = 0;
    let checked = 0;
    attempt.items.forEach(item => {
      if (isAnswered(item)) answered += 1;
      if (item.flagged) flagged += 1;
      if (item.checked) checked += 1;
    });
    return { total, answered, flagged, checked };
  }

  function examTitleFor(attempt) {
    if (!attempt) return "";
    return attempt.examId === "mix" ? "All-in-One Random Exam" : (EXAM_MAP[attempt.examId] || {}).title || attempt.title;
  }

  /* ---------- Dashboard ---------- */

  function examCardHTML(exam, i) {
    const db = getDB(STORE.results);
    const best = bestOf(db[exam.id]);
    const n = exam.bank;
    const pct = best == null ? 0 : best;
    const practiceBest = bestOf(getDB(STORE.practice)[exam.id]);
    const featured = exam.featured ? " featured" : "";
    return '' +
      '<article class="exam-card' + featured + '" style="--card-accent:' + exam.accent + ';--card-accent-soft:' + exam.accentSoft + ';--i:' + i + '">' +
        '<div class="card-top">' +
          '<span class="exam-index">Exam ' + exam.no + '</span>' +
          '<span class="icon-tile">' + icon(exam.icon) + '</span>' +
        '</div>' +
        '<h3>' + esc(exam.title) + '</h3>' +
        '<span class="exam-sub">' + esc(exam.chapter) + ' · ' + esc(exam.source) + '</span>' +
        '<p class="exam-desc">' + esc(exam.blurb) + '</p>' +
        '<div class="topic-row">' + exam.topics.map(t => '<span class="chip">' + esc(t) + '</span>').join('') + '</div>' +
        '<div class="card-meta">' +
          '<span>' + icon("list") + n + ' questions</span>' +
          '<span>' + icon("clock") + formatMinutes(exam.minutes) + '</span>' +
          '<span class="best">' + (best == null ? "Not attempted" : "Best " + best + "%") + '</span>' +
        '</div>' +
        '<div class="card-score"><div class="bar"><span style="width:' + pct + '%"></span></div><small>' + (best == null ? "—" : best + "%") + '</small></div>' +
        '<div class="card-actions">' +
          '<button class="btn btn-primary" type="button" data-act="start" data-exam="' + exam.id + '" data-mode="exam">Start exam ' + icon("arrowRight") + '</button>' +
          '<button class="btn btn-ghost" type="button" data-act="start" data-exam="' + exam.id + '" data-mode="practice" title="Practice with instant feedback">' + icon("book") + ' Practice</button>' +
        '</div>' +
      '</article>';
  }

  function mixCardHTML() {
    const total = allQuestions().length;
    const selected = selectedMixCount();
    const counts = [20, 30, 50, 100, "all"];
    return '' +
      '<section class="mix-card" aria-labelledby="mixTitle">' +
        '<div class="mix-inner">' +
          '<div class="mix-left">' +
            '<div class="mix-icon">' + icon("shuffle") + '</div>' +
            '<div class="mix-copy">' +
              '<span class="eyebrow">Mode 6 · Randomized</span>' +
              '<h2 id="mixTitle">Mix All Exams</h2>' +
              '<p>One continuous paper drawn from all five question banks. Questions and answer choices are reshuffled every time, and the sample stays balanced across the five sources.</p>' +
              '<div class="mix-highlights">' +
                '<span>' + icon("check") + ' Balanced across 5 banks</span>' +
                '<span>' + icon("check") + ' Fresh order every attempt</span>' +
                '<span>' + icon("check") + ' No duplicates</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="mix-right">' +
            '<span class="mix-label">Number of questions</span>' +
            '<div class="count-group" role="group" aria-label="Number of mixed questions">' +
              counts.map(c => {
                const label = c === "all" ? "All · " + total : c;
                return '<button class="count-btn' + (state.mixCount === c ? " is-active" : "") + '" type="button" data-act="mix-count" data-count="' + c + '">' + label + '</button>';
              }).join('') +
            '</div>' +
            '<div class="mix-actions">' +
              '<button class="btn btn-primary" type="button" data-act="start-mix" data-mode="exam">' + icon("shuffle") + ' Mix all exams</button>' +
              '<button class="btn btn-ghost" type="button" data-act="start-mix" data-mode="practice">Practice</button>' +
            '</div>' +
            '<div class="mix-note" id="mixNote">' + selected + ' questions · about ' + formatMinutes(mixMinutes(selected)) + ' · saved separately</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  function renderDashboard() {
    const official = getDB(STORE.results);
    const practice = getDB(STORE.practice);
    const attempted = CORE_IDS.filter(id => official[id].length > 0).length;
    const bests = CORE_IDS.map(id => bestOf(official[id])).filter(v => v != null);
    const avg = bests.length ? round(sum(bests) / bests.length) : 0;

    $("#snapPct").textContent = avg + "%";
    $("#snapAttempted").innerHTML = attempted + '<small> / ' + CORE_IDS.length + '</small>';
    $("#snapBank").innerHTML = allQuestions().length + '<small> items</small>';
    $("#snapshotStatus").textContent = attempted === 0 ? "Fresh start" : (attempted === CORE_IDS.length ? "All exams explored" : attempted + " of " + CORE_IDS.length + " explored");

    const ring = $("#snapRing");
    const C = 2 * Math.PI * 52;
    if (ring) {
      ring.setAttribute("stroke-dasharray", C.toFixed(2));
      requestAnimationFrame(() => ring.setAttribute("stroke-dashoffset", (C * (1 - avg / 100)).toFixed(2)));
    }

    let foot = "Your progress is stored on this device.";
    if (state.active) foot = "An attempt is in progress — resume whenever you are ready.";
    else {
      const stamps = CORE_IDS.concat("mix")
        .map(id => (official[id][0] || {}).finishedAt)
        .filter(Boolean)
        .sort((a, b) => b - a);
      if (stamps.length) foot = "Last attempt " + formatDate(stamps[0]) + ".";
    }
    $("#snapFoot").textContent = foot;

    const resumeSlot = $("#resumeSlot");
    if (state.active) {
      const totals = attemptTotals(state.active);
      const modeLabel = state.active.mode === "practice" ? "Practice" : (state.active.remaining != null ? formatTime(state.active.remaining) + " left" : "Timed");
      resumeSlot.innerHTML = '' +
        '<div class="resume-banner">' +
          '<div class="resume-icon">' + icon("clock") + '</div>' +
          '<div class="resume-copy"><strong>Attempt in progress · ' + esc(state.active.title) + '</strong>' +
            '<span>' + totals.answered + ' of ' + totals.total + ' answered · ' + (state.active.mode === "practice" ? "Practice mode" : modeLabel) + ' · progress saved</span></div>' +
          '<div class="resume-actions">' +
            '<button class="btn btn-primary btn-sm" type="button" data-act="resume">Resume</button>' +
            '<button class="btn btn-ghost btn-sm" type="button" data-act="discard">Discard</button>' +
          '</div>' +
        '</div>';
    } else {
      resumeSlot.innerHTML = "";
    }

    $("#examGrid").innerHTML = EXAMS.map((exam, i) => examCardHTML(exam, i)).join("");
    $("#mixSlot").innerHTML = mixCardHTML();
    $("#examCountLabel").textContent = EXAMS.length + " EXAMS · " + allQuestions().length + " QUESTIONS";

    const teaser = $("#teaserBars");
    teaser.innerHTML = EXAMS.map(ex => {
      const best = bestOf(official[ex.id]);
      const pct = best == null ? 0 : best;
      return '<div class="teaser-row"><span class="name">' + esc(ex.short) + '</span>' +
        '<div class="bar"><span style="width:' + pct + '%"></span></div>' +
        '<span class="num">' + (best == null ? "—" : best + "%") + '</span></div>';
    }).join("");

    syncNav();
  }

  function setMixCount(count) {
    state.mixCount = count === "all" ? "all" : Number(count);
    $$('[data-act="mix-count"]').forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-count") === String(count));
    });
    const selected = selectedMixCount();
    const note = $("#mixNote");
    if (note) note.textContent = selected + " questions · about " + formatMinutes(mixMinutes(selected)) + " · saved separately";
  }

  /* ---------- View switching / nav ---------- */

  function syncNav() {
    $$(".nav-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-view") === state.view);
    });
  }

  function showView(name) {
    if (name === "exam" && !state.active) name = "dashboard";
    state.view = name;
    ["dashboard", "exam", "results", "performance"].forEach(v => {
      const el = $("#view-" + v);
      if (el) el.hidden = v !== name;
    });
    document.body.setAttribute("data-view", name);
    if (name === "dashboard") renderDashboard();
    if (name === "performance") renderPerformance();
    if (name === "results") renderResults();
    if (name === "exam") renderExam();
    syncNav();
    window.scrollTo(0, 0);
  }

  function resumeActive() {
    if (!state.active) return;
    showView("exam");
    startTimer();
  }

  /* ---------- Expose part boundary ---------- */

  // Remaining functions are declared in subsequent parts of the IIFE.
