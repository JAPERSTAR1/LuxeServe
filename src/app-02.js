/* ============================================================
   CODEX EXAM STUDIO · APPLICATION ENGINE
   Part 2 · exam room, timer, practice feedback, navigation
   ============================================================ */

  /* ---------- Small shared helpers ---------- */

  function hasAnswer(item) {
    if (!item) return false;
    if (typeof item.response === "string") return item.response.trim() !== "";
    return item.response !== null && item.response !== undefined;
  }

  function currentAttempt() { return state.active; }

  function currentItem() {
    const attempt = state.active;
    return attempt ? attempt.items[attempt.index] : null;
  }

  function currentQuestion() {
    const item = currentItem();
    return item ? qById(item.qid) : null;
  }

  function isPractice() {
    return !!state.active && state.active.mode === "practice";
  }

  function isLocked(item) {
    return isPractice() && !!item.checked;
  }

  function typeLabel(type) {
    return {
      mcq: "Multiple choice",
      tf: "True / False",
      fill: "Fill in the blank",
      short: "Short answer",
      scenario: "Scenario-based"
    }[type] || "Question";
  }

  function typeIcon(type) {
    return {
      mcq: "checkCircle",
      tf: "check",
      fill: "list",
      short: "book",
      scenario: "map"
    }[type] || "dot";
  }

  function modeLabel(attempt) {
    if (!attempt) return "";
    return attempt.mode === "practice" ? "Practice mode · instant feedback" : "Exam mode · feedback after submission";
  }

  function hasModal() {
    return !!document.querySelector("#modalRoot .modal-backdrop");
  }

  /* ---------- Timer ---------- */

  function updateTimerDisplay() {
    const attempt = state.active;
    if (!attempt || attempt.mode === "practice") return;
    const box = $("#timerBox");
    const text = $("#timerText");
    const label = $("#timerLabel");
    if (!box || !text || !label) return;
    const left = Math.max(0, attempt.remaining == null ? 0 : attempt.remaining);
    text.textContent = formatTime(left);
    label.textContent = left <= 60 ? "time left" : (left <= 300 ? "hurry" : "remaining");
    box.classList.toggle("is-warning", left <= 300 && left > 60);
    box.classList.toggle("is-critical", left <= 60);
    box.setAttribute("aria-label", "Time remaining: " + formatTime(left));
  }

  function stopTimer() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }

  function pauseTimer() {
    const attempt = state.active;
    stopTimer();
    if (!attempt) return;
    if (attempt.mode === "practice") {
      if (attempt.sessionStart) {
        attempt.elapsedSec = (attempt.elapsedSec || 0) + Math.max(0, Math.round((Date.now() - attempt.sessionStart) / 1000));
        delete attempt.sessionStart;
      }
    } else if (attempt.deadline) {
      attempt.remaining = Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000));
      delete attempt.deadline;
    }
  }

  function tickTimer() {
    const attempt = state.active;
    if (!attempt || attempt.mode === "practice") { stopTimer(); return; }
    const left = Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000));
    if (left !== attempt.remaining) {
      attempt.remaining = left;
      updateTimerDisplay();
      if (left > 0 && left % 5 === 0) saveActive();
    }
    if (left <= 0) {
      stopTimer();
      toast("Time is up — your saved answers are being submitted.", "warn");
      finishAttempt(true);
    }
  }

  function startTimer() {
    const attempt = state.active;
    if (!attempt) return;
    const box = $("#timerBox");
    if (box) box.style.display = attempt.mode === "practice" ? "none" : "flex";

    if (attempt.mode === "practice") {
      stopTimer();
      if (!attempt.sessionStart) attempt.sessionStart = Date.now();
      return;
    }

    if (state.timer) return;
    if (attempt.totalSeconds == null) attempt.totalSeconds = (attempt.remaining || 0);
    if (attempt.remaining == null) attempt.remaining = attempt.totalSeconds;
    attempt.deadline = Date.now() + Math.max(0, attempt.remaining) * 1000;
    updateTimerDisplay();
    state.timer = setInterval(tickTimer, 250);
  }

  function attemptDuration(attempt) {
    if (!attempt) return 0;
    if (attempt.mode === "practice") return Math.max(0, attempt.elapsedSec || 0);
    return Math.max(0, (attempt.totalSeconds || 0) - (attempt.remaining || 0));
  }

  /* ---------- Start / resume / discard ---------- */

  function startExam(examId, mode, mixRequested) {
    if (examId !== "mix" && !QUESTIONS[examId]) return;
    const nextMode = mode === "practice" ? "practice" : "exam";
    if (state.active) {
      state.pendingStart = { examId: examId, mode: nextMode, mixRequested: mixRequested };
      openActiveGuardModal();
      return;
    }
    beginAttempt(examId, nextMode, mixRequested);
  }

  function startMix(mode) {
    startExam("mix", mode, state.mixCount);
  }

  function beginAttempt(examId, mode, mixRequested) {
    pauseTimer();
    state.active = buildAttempt(examId, mode, mixRequested);
    state.result = null;
    state.resultFrom = "dashboard";
    state.reviewFilter = "all";
    state.pendingStart = null;
    saveActive();
    closeModal(true);
    showView("exam");
    startTimer();
    toast(mode === "practice"
      ? "Practice started — each answer can be checked instantly."
      : "Timed attempt started. Your answers save automatically.");
  }

  function openActiveGuardModal() {
    const pending = state.pendingStart;
    if (!pending) return;
    const attempt = state.active;
    const totals = attemptTotals(attempt);
    const pendingTitle = pending.examId === "mix"
      ? "All-in-One Random Exam"
      : (EXAM_MAP[pending.examId] || {}).title || "exam";
    openModal({
      title: "An attempt is already in progress",
      sub: "Only one paper can be active at a time. Resume the current attempt, or discard it and begin <strong>" + esc(pendingTitle) + "</strong>.",
      body: '' +
        '<div class="modal-stats">' +
          '<div class="modal-stat"><strong>' + totals.answered + '</strong><span>Answered</span></div>' +
          '<div class="modal-stat warn"><strong>' + (totals.total - totals.answered) + '</strong><span>Unanswered</span></div>' +
          '<div class="modal-stat"><strong>' + totals.flagged + '</strong><span>Flagged</span></div>' +
        '</div>' +
        '<p class="modal-sub" style="margin-bottom:0">Current paper: <strong>' + esc(examTitleFor(attempt)) + '</strong>' +
          (attempt.mode === "practice" ? " · Practice" : (attempt.remaining != null ? " · " + formatTime(attempt.remaining) + " remaining" : "")) + '</p>',
      note: "Discarding the current attempt erases its progress. Submitted results are never affected.",
      actions: '' +
        '<button class="btn btn-ghost" type="button" data-act="close-modal">Cancel</button>' +
        '<button class="btn btn-soft" type="button" data-act="resume-current">Resume current</button>' +
        '<button class="btn btn-danger" type="button" data-act="start-new">Discard &amp; start new</button>'
    });
  }

  function exitExamPrompt(target) {
    if (!state.active) { showView("dashboard"); return; }
    state.exitTarget = target || "dashboard";
    const attempt = state.active;
    const totals = attemptTotals(attempt);
    openModal({
      title: "Save progress and leave?",
      sub: "Your answers are stored on this device. You can continue from the dashboard whenever you are ready.",
      body: '' +
        '<div class="modal-stats">' +
          '<div class="modal-stat good"><strong>' + totals.answered + '</strong><span>Answered</span></div>' +
          '<div class="modal-stat warn"><strong>' + (totals.total - totals.answered) + '</strong><span>Remaining</span></div>' +
          '<div class="modal-stat"><strong>' + totals.flagged + '</strong><span>Flagged</span></div>' +
        '</div>',
      note: attempt.mode === "practice"
        ? "Practice progress is saved separately and never affects official exam records."
        : "The countdown pauses when you leave and resumes when you continue this attempt.",
      actions: '' +
        '<button class="btn btn-ghost" type="button" data-act="close-modal">Keep working</button>' +
        '<button class="btn btn-primary" type="button" data-act="exit-confirm">Save &amp; exit</button>'
    });
  }

  function confirmExit() {
    if (!state.active) { closeModal(); showView("dashboard"); return; }
    pauseTimer();
    saveActive();
    const target = state.exitTarget || "dashboard";
    state.exitTarget = null;
    closeModal(true);
    showView(target);
    toast("Progress saved. Resume from the dashboard when you are ready.");
  }

  function discardActivePrompt() {
    if (!state.active) return;
    const attempt = state.active;
    openModal({
      title: "Discard this attempt?",
      sub: "This will permanently erase the current attempt and its answers. Past results will not be touched.",
      body: '<p class="modal-sub" style="margin-bottom:0">' + esc(examTitleFor(attempt)) + ' · ' + attemptTotals(attempt).answered + ' answered</p>',
      note: "There is no undo for a discarded attempt.",
      actions: '' +
        '<button class="btn btn-ghost" type="button" data-act="close-modal">Cancel</button>' +
        '<button class="btn btn-danger" type="button" data-act="discard-confirm">Discard attempt</button>'
    });
  }

  function discardActive() {
    pauseTimer();
    state.active = null;
    state.result = null;
    try { localStorage.removeItem(STORE.active); } catch (e) { /* ignore */ }
    const pending = state.pendingStart;
    state.pendingStart = null;
    closeModal(true);
    if (pending) {
      beginAttempt(pending.examId, pending.mode, pending.mixRequested);
    } else {
      renderDashboard();
      showView("dashboard");
      toast("Attempt discarded.", "warn");
    }
  }

  function confirmSubmitPrompt() {
    const attempt = state.active;
    if (!attempt) return;
    const totals = attemptTotals(attempt);
    const left = attempt.mode === "practice" ? null : attempt.remaining;
    openModal({
      title: isPractice() ? "Finish this practice session?" : "Submit your exam?",
      sub: isPractice()
        ? "You can keep reviewing answers with explanations after finishing. Practice sessions are not counted in official records."
        : "Once submitted, your answers are locked and the score, correct answers and explanations are revealed immediately.",
      body: '' +
        '<div class="modal-stats">' +
          '<div class="modal-stat good"><strong>' + totals.answered + '</strong><span>Answered</span></div>' +
          '<div class="modal-stat warn"><strong>' + (totals.total - totals.answered) + '</strong><span>Unanswered</span></div>' +
          '<div class="modal-stat"><strong>' + totals.flagged + '</strong><span>Flagged</span></div>' +
        '</div>' +
        '<p class="modal-sub" style="margin-bottom:0">' +
          (attempt.mode === "practice"
            ? "Checking and finishing saves this session separately from your exam records."
            : (left != null ? formatTime(left) + " remaining on the clock." : "Your timer has ended.")) +
        '</p>',
      note: totals.total - totals.answered > 0
        ? "Unanswered questions are reported separately and will not earn marks. You can return to the paper before submitting."
        : "Every question has an answer. Make sure you are ready to lock the paper.",
      actions: '' +
        '<button class="btn btn-ghost" type="button" data-act="close-modal">Keep working</button>' +
        '<button class="btn btn-primary" type="button" data-act="submit-confirm">' +
          (isPractice() ? "Finish &amp; see results" : "Submit &amp; see results") + '</button>'
    });
  }

  /* ---------- Question rendering ---------- */

  function answerAreaHTML(q, item) {
    const locked = isLocked(item);
    if (isChoice(q)) {
      const opts = displayOptions(q, item);
      return '<div class="options" role="radiogroup" aria-label="Answer options">' + opts.map(function (text, k) {
        let cls = "option";
        let mark = "";
        if (item.response === k) {
          cls += " is-selected";
          mark = icon("check");
        }
        if (locked) {
          cls += " is-locked";
          if (k === item.correctIndex) {
            cls += " is-correct";
            mark = icon("check");
          } else if (k === item.response) {
            cls += " is-wrong";
            mark = icon("x");
          }
        }
        const checked = item.response === k ? " checked" : "";
        const disabled = locked ? " disabled" : "";
        return '<label class="' + cls + '">' +
          '<input type="radio" name="qOpt" value="' + k + '"' + checked + disabled + '>' +
          '<span class="opt-key">' + optionKey(q, k) + '</span>' +
          '<span class="opt-text">' + esc(text) + '</span>' +
          '<span class="opt-mark">' + mark + '</span>' +
        '</label>';
      }).join("") + '</div>';
    }

    const value = item.response == null ? "" : String(item.response);
    if (q.t === "fill") {
      return '<div class="text-answer">' +
        '<label for="answerInput">Your answer</label>' +
        '<input class="answer-input" id="answerInput" type="text" autocomplete="off" spellcheck="false" ' +
          'placeholder="Type the missing word or phrase" value="' + esc(value) + '"' + (locked ? " disabled" : "") + '>' +
        '<p class="answer-note">Spelling is ignored and accepted alternatives are allowed. The answer is checked after you submit' + (isPractice() ? " — or immediately when you use Check answer." : ".") + '</p>' +
      '</div>';
    }

    return '<div class="text-answer">' +
      '<label for="answerInput">Your answer</label>' +
      '<textarea class="answer-input" id="answerInput" rows="4" spellcheck="true" ' +
        'placeholder="Write a concise answer in your own words…"' + (locked ? " disabled" : "") + '>' + esc(value) + '</textarea>' +
      '<p class="answer-note">Short answers are auto-marked against the key concepts required by the model answer. The full model answer appears after checking or submitting.</p>' +
    '</div>';
  }

  function practiceFeedbackHTML(q, item) {
    if (!isPractice() || !item.checked) return "";
    const ok = isCorrect(q, item);
    let extra = "";
    if (q.t === "fill") {
      extra = '<div class="model-answer"><strong>Accepted answer:</strong> ' + esc((q.accept || []).join(" / ") || correctText(q, item)) + '</div>';
    } else if (q.t === "short") {
      extra = '<div class="model-answer"><strong>Model answer:</strong> ' + esc(q.model || correctText(q, item)) + '</div>';
    } else {
      extra = '<div class="model-answer"><strong>Correct answer:</strong> ' + esc(correctText(q, item)) + '</div>';
    }
    return '<div class="feedback ' + (ok ? "is-correct" : "is-wrong") + '">' +
      '<div class="feedback-head"><span class="badge">' + icon(ok ? "check" : "x") + '</span>' +
        (ok ? "Correct — well done." : "Not quite. Review the explanation below.") + '</div>' +
      '<p>' + esc(q.e || "No explanation is available for this question.") + '</p>' +
      extra +
    '</div>';
  }

  function renderQuestion() {
    const attempt = state.active;
    if (!attempt) return;
    const item = attempt.items[attempt.index];
    const q = qById(item.qid);
    const slot = $("#questionSlot");
    if (!slot || !q) return;

    const locked = isLocked(item);
    const showCheck = isPractice() && !item.checked;
    const last = attempt.index === attempt.items.length - 1;

    slot.innerHTML = '' +
      '<article class="qcard" id="qcard" tabindex="-1">' +
        '<div class="qcard-top">' +
          '<div class="qchips">' +
            '<span class="chip chip-accent">' + icon(typeIcon(q.t)) + esc(typeLabel(q.t)) + '</span>' +
            '<span class="chip">' + esc(q.topic || "General") + '</span>' +
            (attempt.examId === "mix" ? '<span class="chip">Mixed paper</span>' : '') +
          '</div>' +
          '<button class="flag-btn' + (item.flagged ? " is-flagged" : "") + '" type="button" data-act="flag" aria-pressed="' + (item.flagged ? "true" : "false") + '" title="Flag this question for review">' +
            icon("flag") + (item.flagged ? "Flagged" : "Flag") +
          '</button>' +
        '</div>' +
        (q.scenario ? '<div class="scenario-box"><span class="label">Scenario</span><p>' + esc(q.scenario) + '</p></div>' : '') +
        '<h2 class="qtext" id="qtext">' + esc(q.q) + '</h2>' +
        '<div class="answer-area">' + answerAreaHTML(q, item) + '</div>' +
        practiceFeedbackHTML(q, item) +
        '<div class="qcard-foot">' +
          '<div class="qhint">' +
            '<kbd>←</kbd><kbd>→</kbd> navigate' +
            (isChoice(q) ? '<span>·</span><kbd>1</kbd>–<kbd>' + displayOptions(q, item).length + '</kbd> answer' : '') +
            '<span>·</span><kbd>F</kbd> flag' +
          '</div>' +
          '<div class="qfoot-btns">' +
            '<button class="btn btn-ghost btn-sm" type="button" data-act="prev"' + (attempt.index === 0 ? " disabled" : "") + '>' + icon("arrowLeft") + ' Prev</button>' +
            (showCheck ? '<button class="btn btn-primary btn-sm" type="button" data-act="check">' + icon("checkCircle") + ' Check answer</button>' : '') +
            (last
              ? '<button class="btn ' + (showCheck ? "btn-ghost" : "btn-primary") + ' btn-sm" type="button" data-act="submit">' + (isPractice() ? "Finish practice" : "Review &amp; submit") + '</button>'
              : '<button class="btn ' + (showCheck ? "btn-ghost" : "btn-primary") + ' btn-sm" type="button" data-act="next">Next ' + icon("arrowRight") + '</button>') +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ---------- Chrome / sidebar ---------- */

  function updateExamChrome() {
    const attempt = state.active;
    if (!attempt) return;
    const totals = attemptTotals(attempt);
    const pct = totals.total ? Math.round((totals.answered / totals.total) * 100) : 0;
    const bar = $("#examProgress");
    if (bar) {
      const fill = bar.querySelector("span");
      if (fill) fill.style.width = pct + "%";
      bar.setAttribute("aria-valuenow", pct);
      bar.setAttribute("aria-valuetext", totals.answered + " of " + totals.total + " questions answered");
    }
    const progressText = $("#examProgressText");
    if (progressText) progressText.innerHTML = icon("list") + "Question " + (attempt.index + 1) + " of " + totals.total;
    const answeredText = $("#examAnsweredText");
    if (answeredText) answeredText.innerHTML = icon("checkCircle") + totals.answered + " answered";
    const flagText = $("#examFlagText");
    if (flagText) flagText.innerHTML = icon("flag") + totals.flagged + " flagged";
    updateSidebarSummary();
  }

  function mapBtnClass(index, item) {
    let cls = "map-btn";
    const checked = isPractice() && item.checked;
    if (checked) cls += isCorrect(qById(item.qid), item) ? " is-correct" : " is-wrong";
    else if (hasAnswer(item)) cls += " is-answered";
    if (index === state.active.index) cls += " is-current";
    if (item.flagged) cls += " is-flagged";
    return cls;
  }

  function mapWindow(total, index) {
    if (total <= 35) return { start: 0, end: total, limited: false };
    const size = 35;
    const start = clamp(index - 17, 0, total - size);
    return { start: start, end: start + size, limited: true };
  }

  function mapButtonHTML(index, item) {
    const labels = [];
    if (hasAnswer(item)) labels.push("answered"); else labels.push("unanswered");
    if (isPractice() && item.checked) labels.push(isCorrect(qById(item.qid), item) ? "correct" : "incorrect");
    if (item.flagged) labels.push("flagged");
    return '<button class="' + mapBtnClass(index, item) + '" type="button" data-act="jump" data-index="' + index + '"' +
      ' aria-label="Question ' + (index + 1) + ', ' + labels.join(", ") + '"' +
      (index === state.active.index ? ' aria-current="true"' : '') + '>' + (index + 1) + '</button>';
  }

  function legendHTML() {
    return '<div class="legend">' +
      '<span><i class="ans"></i> Answered</span>' +
      '<span><i class="cur"></i> Current</span>' +
      '<span><i class="flag"></i> Flagged</span>' +
      '<span><i class="un"></i> Unanswered</span>' +
    '</div>';
  }

  function renderSidebar() {
    const attempt = state.active;
    const side = $("#examSidebar");
    if (!attempt || !side) return;
    const totals = attemptTotals(attempt);
    const win = mapWindow(totals.total, attempt.index);
    let buttons = "";
    for (let i = win.start; i < win.end; i++) {
      buttons += mapButtonHTML(i, attempt.items[i]);
    }
    side.innerHTML = '' +
      '<div class="side-card">' +
        '<div class="side-head"><h3>Question map</h3><span class="count">' + totals.answered + '/' + totals.total + '</span></div>' +
        '<div class="map-grid">' + buttons + '</div>' +
        (win.limited ? '<button class="map-more" type="button" data-act="open-map">Full map · all ' + totals.total + ' questions</button>' : '') +
        legendHTML() +
        (win.limited ? '<p class="side-tip">Showing ' + (win.start + 1) + '–' + win.end + ' of ' + totals.total + '</p>' : '') +
      '</div>' +
      '<div class="side-card">' +
        '<div class="side-head"><h3>Attempt summary</h3><span class="count">' + (isPractice() ? "PRACTICE" : "TIMED") + '</span></div>' +
        '<div class="side-summary">' +
          '<div class="side-stat"><span>Answered</span><strong class="good" id="sideAnswered">' + totals.answered + '</strong></div>' +
          '<div class="side-stat"><span>Unanswered</span><strong class="warn" id="sideUnanswered">' + (totals.total - totals.answered) + '</strong></div>' +
          '<div class="side-stat"><span>Flagged</span><strong id="sideFlagged">' + totals.flagged + '</strong></div>' +
          (isPractice() ? '<div class="side-stat"><span>Checked</span><strong id="sideChecked">' + totals.checked + '</strong></div>' : '') +
        '</div>' +
        '<button class="btn btn-primary btn-block side-submit" type="button" data-act="submit">' + (isPractice() ? "Finish practice" : "Submit exam") + '</button>' +
        '<button class="btn btn-ghost btn-block" type="button" data-act="exit-exam" style="margin-top:7px">Save &amp; exit</button>' +
        '<p class="side-tip">Answers save automatically on this device. Nothing is revealed before you submit.</p>' +
      '</div>';
  }

  function updateSidebarSummary() {
    const attempt = state.active;
    if (!attempt) return;
    const totals = attemptTotals(attempt);
    const set = function (id, value) {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    set("sideAnswered", totals.answered);
    set("sideUnanswered", totals.total - totals.answered);
    set("sideFlagged", totals.flagged);
    set("sideChecked", totals.checked);
  }

  function updateMapStates() {
    const attempt = state.active;
    if (!attempt) return;
    $$("#examSidebar .map-btn").forEach(function (btn) {
      const i = Number(btn.getAttribute("data-index"));
      const item = attempt.items[i];
      if (!item) return;
      btn.className = mapBtnClass(i, item);
      if (i === attempt.index) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
    });
    updateSidebarSummary();
  }

  function renderExam() {
    const attempt = state.active;
    if (!attempt) { showView("dashboard"); return; }
    const eyebrow = $("#examEyebrow");
    if (eyebrow) eyebrow.textContent = isPractice() ? "Practice room · instant feedback" : "Exam room · feedback after submission";
    const title = $("#examTitle");
    if (title) title.textContent = examTitleFor(attempt);
    const pill = $("#examModePill");
    if (pill) pill.innerHTML = icon(isPractice() ? "book" : "clock") + (isPractice() ? "Practice mode" : (attempt.examId === "mix" ? "Mixed exam · timed" : "Timed exam"));
    renderQuestion();
    renderSidebar();
    updateExamChrome();
    startTimer();
  }

  function goTo(index) {
    const attempt = state.active;
    if (!attempt) return;
    attempt.index = clamp(index, 0, attempt.items.length - 1);
    saveActiveSoon();
    renderQuestion();
    renderSidebar();
    updateExamChrome();
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  function moveQuestion(delta) {
    const attempt = state.active;
    if (!attempt) return;
    goTo(attempt.index + delta);
  }

  function selectOption(index) {
    const attempt = state.active;
    const item = currentItem();
    const q = currentQuestion();
    if (!attempt || !item || !q || !isChoice(q) || isLocked(item)) return;
    const max = displayOptions(q, item).length;
    if (index < 0 || index >= max) return;
    item.response = index;
    $$("#questionSlot .option").forEach(function (el, k) {
      const input = el.querySelector("input");
      if (input) input.checked = k === index;
      el.classList.toggle("is-selected", k === index);
      const mark = el.querySelector(".opt-mark");
      if (mark) mark.innerHTML = k === index ? icon("check") : "";
    });
    saveActiveSoon();
    updateExamChrome();
    updateMapStates();
  }

  function toggleFlag() {
    const attempt = state.active;
    const item = currentItem();
    if (!attempt || !item) return;
    item.flagged = !item.flagged;
    saveActive();
    const btn = $('#questionSlot [data-act="flag"]');
    if (btn) {
      btn.classList.toggle("is-flagged", item.flagged);
      btn.setAttribute("aria-pressed", item.flagged ? "true" : "false");
      btn.innerHTML = icon("flag") + (item.flagged ? "Flagged" : "Flag");
    }
    updateExamChrome();
    updateMapStates();
    if (item.flagged) toast("Question flagged for review.", "warn");
  }

  function checkPracticeAnswer() {
    const attempt = state.active;
    const item = currentItem();
    const q = currentQuestion();
    if (!attempt || !item || !q || !isPractice() || item.checked) return;
    const input = $("#answerInput");
    if (input) item.response = input.value;
    if (!hasAnswer(item)) {
      toast(q.t === "fill" || q.t === "short" ? "Type an answer before checking." : "Choose an option before checking.", "warn");
      if (input) input.focus();
      return;
    }
    item.checked = true;
    saveActive();
    renderQuestion();
    updateExamChrome();
    updateMapStates();
    const feedback = $("#questionSlot .feedback");
    if (feedback) {
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTimeout(function () { feedback.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }); }, 60);
    }
  }

  function handleTextInput(value) {
    const item = currentItem();
    if (!item || isLocked(item)) return;
    item.response = value;
    saveActiveSoon();
    updateExamChrome();
    updateMapStates();
  }

  /* ---------- Modal foundation ---------- */

  function openModal(options) {
    const root = $("#modalRoot");
    if (!root) return;
    if (hasModal()) closeModal(true);
    const opts = options || {};
    const titleId = "modalTitle";
    root.innerHTML = '' +
      '<div class="modal-backdrop">' +
        '<div class="modal' + (opts.wide ? " wide" : "") + '" role="dialog" aria-modal="true" aria-labelledby="' + titleId + '" tabindex="-1">' +
          '<div class="modal-top">' +
            '<div>' +
              (opts.eyebrow ? '<span class="eyebrow" style="margin-bottom:6px">' + opts.eyebrow + '</span>' : '') +
              '<h2 id="' + titleId + '">' + (opts.title || "") + '</h2>' +
            '</div>' +
            '<button class="modal-close" type="button" data-act="close-modal" aria-label="Close dialog">' + icon("x") + '</button>' +
          '</div>' +
          (opts.sub ? '<p class="modal-sub">' + opts.sub + '</p>' : '') +
          (opts.body || "") +
          (opts.note ? '<div class="modal-note">' + icon("info") + '<span>' + opts.note + '</span></div>' : '') +
          (opts.actions ? '<div class="modal-actions">' + opts.actions + '</div>' : '') +
        '</div>' +
      '</div>';
    state.modalReturnFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      const dialog = root.querySelector(".modal");
      if (!dialog) return;
      const focusable = dialog.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      (focusable || dialog).focus();
    });
  }

  function closeModal(silent) {
    const root = $("#modalRoot");
    if (!root) return;
    const had = hasModal();
    root.innerHTML = "";
    document.body.style.overflow = "";
    const previous = state.modalReturnFocus;
    state.modalReturnFocus = null;
    if (!silent && had && previous && document.body.contains(previous) && typeof previous.focus === "function") {
      try { previous.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
  }

  function trapFocus(event) {
    const dialog = document.querySelector("#modalRoot .modal");
    if (!dialog) return;
    const nodes = Array.prototype.slice.call(dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"))
      .filter(function (el) { return !el.disabled && el.offsetParent !== null; });
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMapModal() {
    const attempt = state.active;
    if (!attempt) return;
    const buttons = attempt.items.map(function (item, i) { return mapButtonHTML(i, item); }).join("");
    const totals = attemptTotals(attempt);
    openModal({
      title: "Question map",
      sub: "Jump directly to any question. Answered, flagged and current questions are marked; practice sessions also mark checked answers.",
      wide: true,
      body: '' +
        '<div class="map-modal-grid">' + buttons + '</div>' +
        '<div class="legend map-legend">' +
          '<span><i class="ans"></i> Answered</span>' +
          '<span><i class="cur"></i> Current</span>' +
          '<span><i class="flag"></i> Flagged</span>' +
          '<span><i class="un"></i> Unanswered</span>' +
        '</div>' +
        (isPractice() ? '<p class="side-tip" style="text-align:left">Green and red tiles mark checked answers in practice mode.</p>' : ''),
      actions: '<button class="btn btn-ghost" type="button" data-act="close-modal">Close</button>' +
        '<button class="btn btn-primary" type="button" data-act="close-modal-submit">' + (isPractice() ? "Finish practice" : "Submit exam") + '</button>'
    });
    const count = $(".modal .map-modal-grid");
    if (count) count.setAttribute("data-total", String(totals.total));
  }
