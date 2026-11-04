/* ============================================================
   CODEX EXAM STUDIO · APPLICATION ENGINE
   Part 3 · scoring, results review, performance, events, init
   ============================================================ */

  /* ---------- Result helpers ---------- */

  const MIX_META = {
    id: "mix", title: "All-in-One Random Exam", short: "Mixed",
    chapter: "All five banks · Randomised", icon: "shuffle",
    accent: "#f472b6", accentSoft: "rgba(244,114,182,.10)"
  };

  function paperMeta(id) {
    return EXAM_MAP[id] || MIX_META;
  }

  function expectedAnswer(q, item) {
    if (q.t === "fill") {
      const list = q.accept || [];
      return list.length ? list.join(" / ") : correctText(q, item);
    }
    if (q.t === "short") return q.model || correctText(q, item);
    return correctText(q, item);
  }

  function shortDate(ts) {
    try {
      return new Date(ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    } catch (e) { return ""; }
  }

  function resultCounts(result) {
    const counts = { total: 0, correct: 0, wrong: 0, unanswered: 0, flagged: 0 };
    if (!result || !Array.isArray(result.items)) return counts;
    counts.total = result.items.length;
    result.items.forEach(function (item) {
      if (!hasAnswer(item)) counts.unanswered += 1;
      else if (item.correct) counts.correct += 1;
      else counts.wrong += 1;
      if (item.flagged) counts.flagged += 1;
    });
    return counts;
  }

  function resultMessage(result) {
    const p = result.percent;
    if (result.mode === "practice") {
      if (p >= 85) return "Excellent practice run. The explanations are still worth a scan — practice results never touch your official record.";
      if (p >= PASS_MARK) return "A solid practice score. Review the questions you missed, then take this paper in timed exam mode.";
      return "Practice is where gaps are useful. Work through the explanations below, then run this paper again before attempting the timed version.";
    }
    if (p >= 90) return "Outstanding. You have a firm command of this material — check the review only for the details you flagged or missed.";
    if (p >= 75) return "A strong result. You are comfortably above the pass mark; target the incorrect and unanswered questions before your next attempt.";
    if (p >= PASS_MARK) return "You passed this paper. Use the review to turn the remaining weak spots into secure marks before the real midterm.";
    if (p >= 45) return "You are close to the pass mark. The explanations below identify exactly which concepts need another pass.";
    return "This paper needs another study cycle. Read each explanation below, return to the lecture material, then retake the exam when ready.";
  }

  /* ---------- Results view ---------- */

  function reviewCountFor(filter, counts) {
    if (filter === "correct") return counts.correct;
    if (filter === "wrong") return counts.wrong;
    if (filter === "unanswered") return counts.unanswered;
    if (filter === "flagged") return counts.flagged;
    return counts.total;
  }

  function reviewMatches(filter, item) {
    if (filter === "correct") return !!item.correct;
    if (filter === "wrong") return hasAnswer(item) && !item.correct;
    if (filter === "unanswered") return !hasAnswer(item);
    if (filter === "flagged") return !!item.flagged;
    return true;
  }

  function reviewItemHTML(item, index) {
    const q = qById(item.qid);
    if (!q) return "";
    const answered = hasAnswer(item);
    const ok = !!item.correct && answered;
    const stateText = !answered ? "Unanswered" : (ok ? "Correct" : "Incorrect");
    const stateClass = !answered ? "skip" : (ok ? "ok" : "bad");
    const itemClass = ok ? " is-right" : (answered ? " is-wrong" : "");

    let answerBlock = "";
    if (isChoice(q)) {
      const opts = displayOptions(q, item);
      answerBlock = '<div class="review-options">' + opts.map(function (text, k) {
        let cls = "ropt";
        let tag = "";
        if (k === item.correctIndex) {
          cls += " is-correct";
          tag = k === item.response ? "Your answer" : "Correct answer";
        } else if (k === item.response) {
          cls += " is-wrong";
          tag = "Your answer";
        }
        return '<div class="' + cls + '"><span class="rk">' + optionKey(q, k) + '</span>' +
          '<span>' + esc(text) + '</span>' +
          (tag ? '<span class="tag">' + tag + '</span>' : '') + '</div>';
      }).join("") + '</div>';
    } else {
      const user = answered ? String(item.response) : "";
      const expected = expectedAnswer(q, item);
      answerBlock = '<div class="answer-compare">' +
        '<div class="answer-box ' + (!answered ? "empty" : (ok ? "ok" : "bad")) + '">' +
          '<div class="label">Your answer</div>' +
          '<div class="val">' + (answered ? esc(user) : "No answer") + '</div>' +
        '</div>' +
        '<div class="answer-box ok">' +
          '<div class="label">' + (q.t === "fill" ? "Accepted answer" : "Model answer") + '</div>' +
          '<div class="val">' + esc(expected) + '</div>' +
        '</div>' +
      '</div>';
    }

    return '<article class="review-item' + itemClass + '">' +
      '<div class="review-top">' +
        '<span class="review-num">' + (index + 1) + '</span>' +
        '<div class="review-q">' +
          '<div class="review-meta">' +
            '<span class="chip chip-accent">' + esc(typeLabel(q.t)) + '</span>' +
            '<span class="chip">' + esc(q.topic || "General") + '</span>' +
            (item.flagged ? '<span class="chip chip-gold">' + icon("flag") + 'Flagged</span>' : '') +
          '</div>' +
          '<div class="review-text">' + esc(q.q) + '</div>' +
          (q.scenario ? '<div class="review-scenario">' + esc(q.scenario) + '</div>' : '') +
        '</div>' +
        '<span class="review-result ' + stateClass + '">' + icon(!answered ? "dot" : (ok ? "check" : "x")) + stateText + '</span>' +
      '</div>' +
      '<div class="review-body">' +
        answerBlock +
        '<div class="explanation"><strong>' + icon("book") + 'Explanation</strong>' + esc(q.e || "No explanation is available for this question.") + '</div>' +
      '</div>' +
    '</article>';
  }

  function renderReviewList() {
    const list = $("#reviewList");
    if (!list) return;
    const result = state.result;
    if (!result) { list.innerHTML = ""; return; }
    const filtered = result.items.map(function (item, index) {
      return { item: item, index: index };
    }).filter(function (entry) {
      return reviewMatches(state.reviewFilter, entry.item);
    });
    if (!filtered.length) {
      list.innerHTML = '<div class="review-empty">No questions match this filter. Choose another view above.</div>';
      return;
    }
    list.innerHTML = filtered.map(function (entry) {
      return reviewItemHTML(entry.item, entry.index);
    }).join("");
  }

  function setReviewFilter(filter) {
    state.reviewFilter = filter || "all";
    $$('[data-act="review-filter"]').forEach(function (btn) {
      const active = btn.getAttribute("data-filter") === state.reviewFilter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    renderReviewList();
  }

  function renderResults() {
    const view = $("#view-results");
    if (!view) return;
    const result = state.result;

    if (!result) {
      view.innerHTML = '<div class="wrap">' +
        '<div class="empty-state">' + icon("chart") +
          '<h1 id="resultsTitle">No result to show</h1>' +
          '<h3>Finish an exam to unlock the review</h3>' +
          '<p>Complete any paper and your score, correct answers and full explanations will appear here.</p>' +
          '<button class="btn btn-primary" type="button" data-act="nav" data-view="dashboard">Back to the exams</button>' +
        '</div>' +
      '</div>';
      return;
    }

    const counts = resultCounts(result);
    const pass = result.percent >= PASS_MARK;
    const heroClass = pass ? "pass" : "fail";
    const backTarget = state.resultFrom === "performance" ? "performance" : "dashboard";
    const backLabel = state.resultFrom === "performance" ? "Back to performance" : "Back to dashboard";
    const meta = paperMeta(result.examId);
    const date = formatDate(result.finishedAt);
    const duration = formatTime(result.durationSec);
    const mixCount = result.mixCount || (result.items && result.items.length) || 0;
    const retakeCount = result.mixRequested == null ? (result.examId === "mix" ? "all" : "") : result.mixRequested;
    const mixAttr = result.examId === "mix" ? ' data-mix-count="' + esc(retakeCount) + '"' : "";
    const practicePrimary = result.mode === "practice";
    const primaryMode = "exam";
    const secondaryMode = "practice";
    const primaryLabel = practicePrimary
      ? (result.examId === "mix" ? "Take a timed mix" : "Take the timed exam")
      : (result.examId === "mix" ? "New mixed paper" : "Retake exam");
    const secondaryLabel = practicePrimary
      ? (result.examId === "mix" ? "Practice mix again" : "Practice again")
      : (result.examId === "mix" ? "Practice this mix" : "Practice this paper");

    const reviewChips = "" +
      '<div class="filter-tabs" role="group" aria-label="Filter review questions">' +
        ["all", "correct", "wrong", "unanswered", "flagged"].map(function (filter) {
          const labels = { all: "All", correct: "Correct", wrong: "Incorrect", unanswered: "Unanswered", flagged: "Flagged" };
          return '<button class="filter-btn' + (state.reviewFilter === filter ? " is-active" : "") + '" type="button" data-act="review-filter" data-filter="' + filter + '" aria-pressed="' + (state.reviewFilter === filter ? "true" : "false") + '">' +
            labels[filter] + '<span class="n">' + reviewCountFor(filter, counts) + '</span></button>';
        }).join("") +
      '</div>';

    view.innerHTML = '<div class="wrap">' +
      '<button class="back-link" type="button" data-act="nav" data-view="' + backTarget + '">' + icon("arrowLeft") + backLabel + '</button>' +
      '<article class="result-hero ' + heroClass + '">' +
        '<div class="score-ring">' +
          '<svg viewBox="0 0 168 168" aria-hidden="true">' +
            '<circle class="track" cx="84" cy="84" r="72"></circle>' +
            '<circle class="value ' + heroClass + '" id="resultRing" cx="84" cy="84" r="72"></circle>' +
          '</svg>' +
          '<div class="score-label"><strong>' + result.percent + '%</strong><span>Score</span></div>' +
        '</div>' +
        '<div class="result-copy">' +
          '<span class="eyebrow">' + (result.mode === "practice" ? "Practice session · not counted" : (result.autoSubmitted ? "Time expired · auto-submitted" : "Official attempt · saved locally")) + '</span>' +
          '<h1 id="resultsTitle">' + esc(result.title || meta.title) + '</h1>' +
          '<div class="result-sub">' +
            '<span class="result-verdict ' + heroClass + '">' + icon(pass ? "check" : "x") + (pass ? "Passed" : "Failed") + '</span>' +
            '<span>' + esc(result.chapter || meta.chapter) + '</span>' +
            '<span>·</span><span>' + esc(date) + '</span>' +
            '<span>·</span><span>' + icon("clock") + ' ' + duration + ' used</span>' +
            (result.examId === "mix" ? '<span class="chip">Mixed · ' + mixCount + ' questions</span>' : '') +
            (result.mode === "practice" ? '<span class="chip">Practice</span>' : '') +
            (result.autoSubmitted ? '<span class="chip chip-gold">Time expired</span>' : '') +
          '</div>' +
          '<p class="result-message">' + esc(resultMessage(result)) + '</p>' +
          '<div class="result-actions">' +
            '<button class="btn btn-primary" type="button" data-act="retake" data-exam="' + result.examId + '" data-mode="' + primaryMode + '"' + mixAttr + '>' + icon("rotate") + primaryLabel + '</button>' +
            '<button class="btn btn-ghost" type="button" data-act="retake" data-exam="' + result.examId + '" data-mode="' + secondaryMode + '"' + mixAttr + '>' + icon("book") + secondaryLabel + '</button>' +
            '<button class="btn btn-ghost" type="button" data-act="review-mistakes">' + icon("target") + ' Review mistakes</button>' +
            '<button class="btn btn-ghost" type="button" data-act="nav" data-view="dashboard">' + icon("home") + ' Dashboard</button>' +
          '</div>' +
        '</div>' +
      '</article>' +
      '<div class="result-stats">' +
        '<div class="stat-card good"><div class="k">' + icon("checkCircle") + 'Correct</div><div class="v">' + counts.correct + '<small>/ ' + counts.total + '</small></div></div>' +
        '<div class="stat-card bad"><div class="k">' + icon("xCircle") + 'Incorrect</div><div class="v">' + counts.wrong + '</div></div>' +
        '<div class="stat-card ' + (counts.unanswered ? "warn" : "neutral") + '"><div class="k">' + icon("info") + 'Unanswered</div><div class="v">' + counts.unanswered + '</div></div>' +
        '<div class="stat-card neutral"><div class="k">' + icon("clock") + 'Time used</div><div class="v">' + duration + '</div></div>' +
      '</div>' +
      '<section class="review-section" id="reviewSection">' +
        '<div class="review-head">' +
          '<div><h2>Question review</h2><p>Every question with your answer, the correct answer and the reasoning behind it.</p></div>' +
          reviewChips +
        '</div>' +
        '<div class="review-list" id="reviewList"></div>' +
      '</section>' +
    '</div>';

    renderReviewList();

    const ring = $("#resultRing");
    if (ring) {
      const C = 2 * Math.PI * 72;
      ring.style.strokeDasharray = C.toFixed(2);
      ring.style.strokeDashoffset = C.toFixed(2);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          ring.style.strokeDashoffset = (C * (1 - result.percent / 100)).toFixed(2);
        });
      });
    }
  }

  /* ---------- Performance dashboard ---------- */

  function renderPerformance() {
    const view = $("#view-performance");
    if (!view) return;
    const official = getDB(STORE.results);
    const practice = getDB(STORE.practice);
    const coreBests = CORE_IDS.map(function (id) { return bestOf(official[id]); }).filter(function (v) { return v != null; });
    const average = coreBests.length ? round(sum(coreBests) / coreBests.length) : null;
    const passedExams = CORE_IDS.filter(function (id) {
      const best = bestOf(official[id]);
      return best != null && best >= PASS_MARK;
    }).length;
    const officialCount = ALL_IDS.reduce(function (acc, id) { return acc + official[id].length; }, 0);
    const practiceCount = ALL_IDS.reduce(function (acc, id) { return acc + practice[id].length; }, 0);

    const recent = [];
    ALL_IDS.forEach(function (id) {
      official[id].forEach(function (result) { recent.push({ result: result, kind: "exam" }); });
      practice[id].forEach(function (result) { recent.push({ result: result, kind: "practice" }); });
    });
    recent.sort(function (a, b) { return (b.result.finishedAt || 0) - (a.result.finishedAt || 0); });
    const recentRows = recent.slice(0, 8);

    const papers = EXAMS.map(function (exam) { return exam; }).concat([MIX_META]);

    const bars = papers.map(function (meta) {
      const list = official[meta.id] || [];
      const best = bestOf(list);
      const pct = best == null ? 0 : best;
      const level = best == null ? "" : (best < PASS_MARK ? " weak" : (best < 75 ? " mid" : ""));
      return '<div class="perf-bar-row">' +
        '<div class="perf-bar-top"><span class="name">' + esc(meta.short || meta.title) + '</span>' +
          '<span class="score">' + (best == null ? "Not attempted" : '<b>' + best + '%</b> · ' + list.length + ' attempt' + (list.length === 1 ? "" : "s")) + '</span></div>' +
        '<div class="perf-bar-track"><div class="perf-bar-fill' + level + '" style="width:' + pct + '%"></div></div>' +
      '</div>';
    }).join("");

    const recordCards = papers.map(function (meta) {
      const list = official[meta.id] || [];
      const best = bestOf(list);
      const latest = list.length ? list[0].percent : null;
      const passClass = best == null ? "" : (best >= PASS_MARK ? " pass" : " fail");
      return '<div class="exam-perf-card">' +
        '<span class="icon-tile" style="color:' + meta.accent + ';background:' + meta.accentSoft + '">' + icon(meta.icon) + '</span>' +
        '<div class="exam-perf-copy"><h3>' + esc(meta.title) + '</h3>' +
          '<div class="meta"><span>' + list.length + ' attempt' + (list.length === 1 ? "" : "s") + '</span>' +
          '<span>Latest ' + (latest == null ? "—" : latest + "%") + '</span>' +
          (list.length ? '<span>Last ' + esc(shortDate(list[0].finishedAt)) + '</span>' : '') +
          '</div></div>' +
        '<div class="exam-perf-score' + passClass + '"><strong>' + (best == null ? "—" : best + '<small>%</small>') + '</strong>' +
          '<span>' + (best == null ? "no attempts" : "best") + '</span></div>' +
      '</div>';
    }).join("");

    const activity = recentRows.length ? '<div class="perf-list">' + recentRows.map(function (entry) {
      const result = entry.result;
      const isPracticeRow = entry.kind === "practice";
      const pass = result.percent >= PASS_MARK;
      const dot = isPracticeRow ? "none" : (pass ? "ok" : "bad");
      return '<button class="perf-row" type="button" data-act="open-result" data-exam="' + esc(result.examId) + '" data-kind="' + entry.kind + '" data-id="' + esc(result.id) + '">' +
        '<span class="perf-dot ' + dot + '"></span>' +
        '<span class="perf-row-copy"><strong>' + esc(result.title || paperMeta(result.examId).title) + '</strong>' +
          '<span>' + (isPracticeRow ? "Practice · " : "Official · ") + esc(formatDate(result.finishedAt)) + '</span></span>' +
        '<span class="perf-row-score ' + (isPracticeRow ? "" : (pass ? "pass" : "fail")) + '">' + result.percent + '%</span>' +
      '</button>';
    }).join("") + '</div>' : '<div class="perf-empty">No attempts yet. Start with any lecture exam or the mixed paper.' +
      '<div><button class="btn btn-primary btn-sm" type="button" data-act="nav" data-view="dashboard">Choose an exam</button></div></div>';

    view.innerHTML = '<div class="wrap">' +
      '<div class="perf-head">' +
        '<span class="eyebrow">Performance dashboard</span>' +
        '<h1 id="performanceTitle">Every attempt, in one place.</h1>' +
        '<p>Official exams, the mixed paper and practice sessions are stored separately on this device. Best scores are never overwritten, and each paper keeps its own history.</p>' +
      '</div>' +
      '<div class="perf-kpis">' +
        '<div class="kpi"><div class="k">' + icon("target") + 'Best average</div><div class="v">' + (average == null ? "—" : average + "<small>%</small>") + '</div><div class="sub">Best score across the 5 lecture exams</div></div>' +
        '<div class="kpi"><div class="k">' + icon("checkCircle") + 'Exams passed</div><div class="v">' + passedExams + '<small> / ' + CORE_IDS.length + '</small></div><div class="sub">Best score at or above ' + PASS_MARK + '%</div></div>' +
        '<div class="kpi"><div class="k">' + icon("list") + 'Official attempts</div><div class="v">' + officialCount + '</div><div class="sub">Includes the mixed paper</div></div>' +
        '<div class="kpi"><div class="k">' + icon("book") + 'Practice sessions</div><div class="v">' + practiceCount + '</div><div class="sub">Never counted in official records</div></div>' +
      '</div>' +
      '<div class="perf-layout">' +
        '<div style="display:grid;gap:16px">' +
          '<section class="perf-panel">' +
            '<div class="perf-panel-head"><h2>Best score by paper</h2><span class="chip chip-accent">Official only</span></div>' +
            '<div class="perf-bars">' + bars + '</div>' +
            '<p class="perf-note">Each bar uses the highest official score for that paper. A dash means the paper has not been submitted yet.</p>' +
          '</section>' +
          '<section class="perf-panel">' +
            '<div class="perf-panel-head"><h2>Recent activity</h2><span class="chip">' + (recentRows.length ? "Last " + recentRows.length : "Nothing yet") + '</span></div>' +
            activity +
            '<p class="perf-note">Select any row to reopen its full result and question review. Practice rows are labelled and never affect best scores.</p>' +
          '</section>' +
        '</div>' +
        '<div style="display:grid;gap:16px">' +
          '<section class="perf-panel">' +
            '<div class="perf-panel-head"><h2>Exam records</h2><span class="chip">Separate</span></div>' +
            '<div class="exam-perf-grid" style="margin-top:0">' + recordCards + '</div>' +
          '</section>' +
          '<section class="perf-panel">' +
            '<div class="perf-panel-head"><h2>How records work</h2><span class="chip">Local only</span></div>' +
            '<p class="perf-note" style="margin-top:0">Official attempts are saved per paper, up to 20 per paper. Practice sessions live in a separate store. Retaking a paper never deletes its earlier results, and clearing your browser storage removes everything.</p>' +
            '<div class="perf-actions">' +
              '<button class="btn btn-primary btn-sm" type="button" data-act="nav" data-view="dashboard">' + icon("play") + ' Start an exam</button>' +
              '<button class="btn btn-ghost btn-sm" type="button" data-act="reset-data">' + icon("rotate") + ' Reset all data</button>' +
            '</div>' +
          '</section>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- Submit / score ---------- */

  function finishAttempt(autoSubmitted) {
    if (!state.active || state.finishing) return;
    state.finishing = true;
    const attempt = state.active;
    pauseTimer();

    const itemResults = attempt.items.map(function (item) {
      const q = qById(item.qid);
      return {
        qid: item.qid,
        order: item.order ? item.order.slice() : null,
        correctIndex: item.correctIndex,
        response: item.response,
        flagged: !!item.flagged,
        checked: !!item.checked,
        correct: isCorrect(q, item)
      };
    });

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    let flagged = 0;
    itemResults.forEach(function (item) {
      if (!hasAnswer(item)) unanswered += 1;
      else if (item.correct) correct += 1;
      else wrong += 1;
      if (item.flagged) flagged += 1;
    });

    const total = itemResults.length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    const result = {
      id: attempt.id,
      examId: attempt.examId,
      mode: attempt.mode,
      title: examTitleFor(attempt),
      chapter: attempt.chapter,
      total: total,
      correct: correct,
      wrong: wrong,
      unanswered: unanswered,
      flagged: flagged,
      percent: percent,
      passed: percent >= PASS_MARK,
      passMark: PASS_MARK,
      durationSec: attemptDuration(attempt),
      totalSeconds: attempt.totalSeconds,
      remaining: attempt.remaining,
      startedAt: attempt.created,
      finishedAt: Date.now(),
      autoSubmitted: !!autoSubmitted,
      mixRequested: attempt.mixRequested,
      mixCount: attempt.mixCount,
      items: itemResults
    };

    saveAttemptResult(attempt.mode === "practice" ? "practice" : "exam", attempt.examId, result);

    state.result = result;
    state.resultFrom = "exam";
    state.reviewFilter = "all";
    state.active = null;
    state.pendingStart = null;
    state.exitTarget = null;
    state.finishing = false;
    try { localStorage.removeItem(STORE.active); } catch (e) { /* ignore */ }
    closeModal(true);
    showView("results");
    toast(result.mode === "practice"
      ? "Practice complete — review your answers below."
      : (autoSubmitted ? "Time expired — your answers were submitted." : "Exam submitted — your result is ready."),
      autoSubmitted ? "warn" : "success");
  }

  /* ---------- Stored result / reset ---------- */

  function openStoredResult(examId, kind, id) {
    const key = kind === "practice" ? STORE.practice : STORE.results;
    const db = getDB(key);
    const list = db[examId] || [];
    const result = list.filter(function (r) { return r.id === id; })[0];
    if (!result) {
      toast("That attempt could not be found in local storage.", "error");
      return;
    }
    state.result = result;
    state.resultFrom = "performance";
    state.reviewFilter = "all";
    showView("results");
  }

  function openResetModal() {
    const official = getDB(STORE.results);
    const practice = getDB(STORE.practice);
    const saved = ALL_IDS.reduce(function (acc, id) { return acc + official[id].length + practice[id].length; }, 0);
    openModal({
      title: "Reset all data?",
      sub: "This removes every official result, every practice session and any attempt currently in progress from this device.",
      body: '<div class="modal-stats">' +
        '<div class="modal-stat"><strong>' + saved + '</strong><span>Saved attempts</span></div>' +
        '<div class="modal-stat"><strong>' + (state.active ? "1" : "0") + '</strong><span>In progress</span></div>' +
        '<div class="modal-stat"><strong>0</strong><span>Will remain</span></div>' +
      '</div>',
      note: "Your dark or light theme preference is kept. This action cannot be undone.",
      actions: '<button class="btn btn-ghost" type="button" data-act="close-modal">Cancel</button>' +
        '<button class="btn btn-danger" type="button" data-act="confirm-reset">Reset everything</button>'
    });
  }

  function resetAllData() {
    pauseTimer();
    state.active = null;
    state.result = null;
    state.pendingStart = null;
    state.exitTarget = null;
    state.reviewFilter = "all";
    [STORE.results, STORE.practice, STORE.active].forEach(function (key) {
      try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
    });
    closeModal(true);
    showView("dashboard");
    toast("All saved progress has been reset.", "warn");
  }

  /* ---------- Toasts ---------- */

  function toast(message, kind) {
    const root = $("#toastRoot");
    if (!root) return;
    while (root.children.length >= 3) root.removeChild(root.firstChild);
    const el = document.createElement("div");
    el.className = "toast" + (kind === "warn" ? " is-warn" : (kind === "error" ? " is-error" : ""));
    const iconName = kind === "error" ? "alert" : (kind === "warn" ? "info" : "checkCircle");
    el.innerHTML = icon(iconName) + '<span>' + esc(message) + '</span>';
    root.appendChild(el);
    setTimeout(function () {
      el.classList.add("is-out");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 280);
    }, 3400);
  }

  /* ---------- Active attempt restore ---------- */

  function loadActiveAttempt() {
    const raw = readJSON(STORE.active, null);
    if (!raw || typeof raw !== "object" || !Array.isArray(raw.items) || !raw.items.length) return;
    if (raw.examId !== "mix" && !QUESTIONS[raw.examId]) return;
    const valid = raw.items.every(function (item) {
      return item && item.qid && qById(item.qid);
    });
    if (!valid) {
      try { localStorage.removeItem(STORE.active); } catch (e) { /* ignore */ }
      console.warn("Discarded an in-progress attempt because one or more questions no longer exist.");
      return;
    }
    raw.mode = raw.mode === "practice" ? "practice" : "exam";
    raw.index = clamp(Number(raw.index) || 0, 0, raw.items.length - 1);
    raw.created = Number(raw.created) || Date.now();
    raw.updated = Number(raw.updated) || raw.created;
    raw.items.forEach(function (item) {
      if (item.response === undefined) item.response = null;
      item.flagged = !!item.flagged;
      item.checked = !!item.checked;
    });
    if (raw.mode === "practice") {
      raw.remaining = null;
      raw.totalSeconds = null;
      raw.elapsedSec = Math.max(0, Number(raw.elapsedSec) || 0);
    } else {
      const meta = raw.examId === "mix" ? MIX_META : EXAM_MAP[raw.examId];
      const expected = (raw.totalSeconds || (meta.minutes || 60) * 60);
      raw.totalSeconds = expected;
      raw.remaining = clamp(Number(raw.remaining) || 0, 0, expected);
      if (!raw.title) raw.title = raw.examId === "mix" ? MIX_META.title : meta.title;
      if (!raw.chapter) raw.chapter = raw.examId === "mix" ? MIX_META.chapter : meta.chapter;
    }
    delete raw.deadline;
    delete raw.sessionStart;
    state.active = raw;
  }

  /* ---------- Navigation / view flow ---------- */

  function navTo(view) {
    if (!view) return;
    if (view === "exam") {
      if (state.active) resumeActive();
      return;
    }
    if (state.view === "exam" && state.active) {
      exitExamPrompt(view);
      return;
    }
    showView(view);
  }

  /* ---------- Event wiring ---------- */

  function onClick(event) {
    const backdrop = event.target.closest ? event.target.closest(".modal-backdrop") : null;
    if (backdrop && event.target === backdrop) {
      closeModal();
      return;
    }
    const target = event.target.closest ? event.target.closest("[data-act]") : null;
    if (!target) return;
    const act = target.getAttribute("data-act");
    const dataset = target.dataset || {};

    switch (act) {
      case "theme":
        toggleTheme();
        break;
      case "brand":
        navTo("dashboard");
        break;
      case "nav":
        navTo(dataset.view);
        break;
      case "scroll-exams": {
        const exams = $("#exams");
        if (exams) {
          const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          exams.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }
        break;
      }
      case "start":
        startExam(dataset.exam, dataset.mode);
        break;
      case "start-mix":
        startMix(dataset.mode);
        break;
      case "mix-count":
        setMixCount(dataset.count);
        break;
      case "resume":
        resumeActive();
        break;
      case "resume-current":
        state.pendingStart = null;
        closeModal(true);
        resumeActive();
        break;
      case "discard":
        discardActivePrompt();
        break;
      case "discard-confirm":
      case "start-new":
        discardActive();
        break;
      case "exit-exam":
        exitExamPrompt("dashboard");
        break;
      case "exit-confirm":
        confirmExit();
        break;
      case "submit":
        confirmSubmitPrompt();
        break;
      case "submit-confirm":
        closeModal(true);
        finishAttempt(false);
        break;
      case "prev":
        moveQuestion(-1);
        break;
      case "next":
        moveQuestion(1);
        break;
      case "flag":
        toggleFlag();
        break;
      case "check":
        checkPracticeAnswer();
        break;
      case "open-map":
        openMapModal();
        break;
      case "jump": {
        const index = Number(dataset.index);
        closeModal(true);
        goTo(index);
        break;
      }
      case "close-modal":
        closeModal();
        break;
      case "close-modal-submit":
        closeModal(true);
        confirmSubmitPrompt();
        break;
      case "review-filter":
        setReviewFilter(dataset.filter);
        break;
      case "review-mistakes": {
        const result = state.result;
        if (!result) break;
        const counts = resultCounts(result);
        let filter = "all";
        if (counts.wrong) filter = "wrong";
        else if (counts.unanswered) filter = "unanswered";
        setReviewFilter(filter);
        const section = $("#reviewSection");
        if (section) {
          const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }
        break;
      }
      case "retake":
        startExam(dataset.exam, dataset.mode, dataset.mixCount);
        break;
      case "open-result":
        openStoredResult(dataset.exam, dataset.kind, dataset.id);
        break;
      case "reset-data":
        openResetModal();
        break;
      case "confirm-reset":
        resetAllData();
        break;
      default:
        break;
    }
  }

  function onChange(event) {
    const input = event.target;
    if (input && input.name === "qOpt") selectOption(Number(input.value));
  }

  function onInput(event) {
    if (event.target && event.target.id === "answerInput") handleTextInput(event.target.value);
  }

  function onKeydown(event) {
    if (hasModal()) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      } else if (event.key === "Tab") {
        trapFocus(event);
      }
      return;
    }
    if (state.view !== "exam" || !state.active) return;
    const tag = (event.target && event.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || (event.target && event.target.isContentEditable)) return;

    const item = currentItem();
    const q = currentQuestion();
    if (!item || !q) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveQuestion(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveQuestion(-1);
    } else if (event.key === "f" || event.key === "F") {
      event.preventDefault();
      toggleFlag();
    } else if (/^[1-5]$/.test(event.key) && isChoice(q)) {
      const n = Number(event.key) - 1;
      if (n < displayOptions(q, item).length) {
        event.preventDefault();
        selectOption(n);
      }
    } else if (/^[a-eA-E]$/.test(event.key) && (q.t === "mcq" || q.t === "scenario")) {
      const n = event.key.toUpperCase().charCodeAt(0) - 65;
      if (n < displayOptions(q, item).length) {
        event.preventDefault();
        selectOption(n);
      }
    }
  }

  function persistSnapshot() {
    if (!state.active) return;
    if (state.active.mode !== "practice" && state.active.deadline) {
      state.active.remaining = Math.max(0, Math.ceil((state.active.deadline - Date.now()) / 1000));
    }
    saveActive();
  }

  function bindEvents() {
    document.addEventListener("click", onClick);
    document.addEventListener("change", onChange);
    document.addEventListener("input", onInput);
    document.addEventListener("keydown", onKeydown);
    window.addEventListener("beforeunload", persistSnapshot);
    window.addEventListener("pagehide", persistSnapshot);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") persistSnapshot();
    });
  }

  /* ---------- Boot ---------- */

  function init() {
    const savedTheme = readJSON(STORE.theme, null);
    let theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
    if (!theme) {
      const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
      theme = prefersLight ? "light" : "dark";
    }
    applyTheme(theme);
    loadActiveAttempt();
    bindEvents();
    showView("dashboard");
  }

  init();
})();
