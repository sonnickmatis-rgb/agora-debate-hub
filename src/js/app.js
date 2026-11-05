/* =========================================================
   Plateforme e-learning AI Act — Blockchain AkademIA
   Une base de code, deux sorties :
   - web   : les 4 niveaux, progression dans le navigateur
   - scorm : un niveau par paquet SCORM 1.2 (suivi par le LMS)
   ========================================================= */
const CFG = Object.assign({ mode: 'web', level: null }, window.BA_CONFIG || {});
const SC = CFG.mode === 'scorm';
const FINAL = SC && !!CFG.final; // paquet SCORM « Évaluation finale »
const PREVIEW = /[?&]apercu=1/.test(location.search);

const ic = (n, cls = '') => `<svg class="ico ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const ring = (v, sz = 64, c = 'var(--p)') => `<div class="ring" style="--v:${v};--sz:${sz}px;--c:${c}" role="img" aria-label="${v} %"><span>${v}%</span></div>`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const TAGS = { 'Loi': 'loi', 'Guide': 'guide', 'Projet': 'projet', 'À vérifier': 'verif' };
const tagChip = t => t ? `<span class="tag ${TAGS[t] || 'guide'}">${t}</span>` : '';
const L = n => LV[n - 1];
const LEVELS = SC && !FINAL ? [CFG.level] : [1, 2, 3, 4];
const fdate = iso => iso ? new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—';
const addDays = (iso, d) => { const x = new Date(iso); x.setDate(x.getDate() + d); return x.toISOString(); };
const strip = h => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const norm = t => strip(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function risks(list) {
  return list.map(r => `
    <div class="risk"><span class="sw" style="background:${r[0]}"></span><div>
      <h4>${r[1]}</h4><p>${r[3]}</p>
      <div class="ex">${r[4]} <span class="mini-art">${r[5]}</span></div>
    </div></div>`).join('');
}

/* ---------------------------------------------------------
   VIDÉOS : un emplacement au début de chaque module
   --------------------------------------------------------- */
const VIDEO_TIME = { '1-1': '1 min 18', '1-2': '1 min 12', '2-1': '1 min 17', '2-2': '1 min 16', '3-1': '1 min 11', '3-2': '1 min 10', '4-1': '1 min 11', '4-2': '1 min 15' };
LV.forEach(lv => {
  [1, 2].forEach(m => {
    const at = lv.steps.findIndex(s => s.mod === m);
    lv.steps.splice(at, 0, { mod: m, type: 'video', label: 'Vidéo de présentation', time: VIDEO_TIME[`${lv.n}-${m}`] || '1 min 30', video: `videos/niveau${lv.n}-module${m}`, goals: MODULE_GOALS[`${lv.n}-${m}`] });
  });
});

/* ---------------------------------------------------------
   POSITION DES BONNES RÉPONSES : répartie entre A, B et C
   (table POS : à compléter si une question est ajoutée)
   --------------------------------------------------------- */
(() => {
  const POS = { q11: 'C', q13: 'A', q21: 'B', q22: 'C', q23: 'A', q31: 'C', q32: 'B', q34: 'A', q41: 'C', q43: 'B', q44: 'A',
    s11: 'A', s12: 'C', s13: 'B', s21: 'C', s22: 'A', s23: 'B', s31: 'B', s32: 'C', s33: 'A', s41: 'C', s42: 'A', s43: 'B' };
  const place = (opts, good, id) => {
    const k = opts.findIndex(good), t = 'ABC'.indexOf(POS[id]); if (k < 0 || t < 0 || opts.length !== 3) return;
    const [g] = opts.splice(k, 1); opts.splice(t, 0, g);
  };
  LV.forEach(lv => {
    lv.steps.forEach(s => { if (s.type === 'question' && s.kind !== 'vf') place(s.opts, o => o[1] === true, s.id); });
    (lv.scn || []).forEach(sc => place(sc.opts, o => o[1] === 'ok', sc.id));
  });
})();

/* ---------------------------------------------------------
   ÉTAT ET SAUVEGARDE
   --------------------------------------------------------- */
const NEW = () => ({
  lvl: LEVELS[0], page: 'accueil', step: {}, visited: {}, answers: {}, scn: {}, spaced: {}, val: {},
  start: new Date().toISOString(), last: null, time: 0, role: '', name: '', prefs: { fs: 0, rm: 0, tr: 0, ns: 0 }, read: [], tspent: {}, tdone: {}, quiz: {}, finalDate: null,
  catchup: {}, recapTab: 0, fiche: 0, kFilter: 0, rLevel: 0, calc: { ca: 20, type: 'pme', inf: 0 },
});
const KEY = FINAL ? 'ba-aiact-scorm-final' : SC ? `ba-aiact-scorm-n${CFG.level}` : 'ba-aiact-web-v3';
let learner = { name: '', id: '' };
let state = NEW();
const lmsOk = SC && SCORM.init();
(function load() {
  let raw = '';
  if (lmsOk) { raw = SCORM.load(); learner = SCORM.learner(); }
  else { try { raw = localStorage.getItem(KEY) || ''; } catch (_) {} }
  if (raw) { try { state = Object.assign(NEW(), JSON.parse(raw)); } catch (_) {} }
  if (!state.catchup) state.catchup = {};
  state.prefs = Object.assign({ tr: 0, ns: 0 }, state.prefs); state.tspent = state.tspent || {}; state.tdone = state.tdone || {}; state.quiz = state.quiz || {};
})();
let saveTimer = null;
function save() {
  state.last = new Date().toISOString();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const keep = { ...state }; delete keep.calc;
    const data = JSON.stringify(keep);
    if (lmsOk) { SCORM.save(data); SCORM.location(`${state.page}:${state.step[state.lvl] || 0}`); }
    else { try { localStorage.setItem(KEY, data); } catch (_) {} }
  }, 250);
}
const displayName = () => learner.name || state.name || '';
const initials = () => (displayName() || 'Apprenant').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();

/* Temps passé (onglet visible seulement) */
setInterval(() => { if (!document.hidden) { state.time += 15; save(); } }, 15000);

/* ---------------------------------------------------------
   CALCULS : questions, scores, statuts
   --------------------------------------------------------- */
function questionsOf(n) {
  const lv = L(n);
  return [...lv.steps.filter(s => s.type === 'question').map(s => ({ ...s, kind2: 'q' })), ...lv.scn.map(s => ({ ...s, kind2: 's' }))];
}
function credit(item, a) {
  if (a === undefined || a === null) return null;
  if (item.kind2 === 'q') return item.opts[a][1] ? 1 : 0;
  return { ok: 1, mid: .5, ko: 0 }[item.opts[a][1]];
}
function stats(n) {
  const qs = questionsOf(n);
  let ans = 0, pts = 0;
  qs.forEach(q => { const c = credit(q, state.answers[q.id]); if (c !== null) { ans++; pts += c; } });
  const score = Math.round(pts / qs.length * 100), complete = ans === qs.length;
  const qz = state.quiz[n] || {}, quizPassed = !!qz.passed;
  return { total: qs.length, ans, pts, score, progress: Math.round(ans / qs.length * 100), complete, quizPassed, quizBest: qz.best ?? null, quizTries: qz.attempts || 0,
    validated: complete && score >= 80 && quizPassed };
}
function status(n) {
  if (stats(n).validated) return 'done';
  if (SC || PREVIEW || n === 1 || stats(n - 1).validated) return 'cur';
  return 'lock';
}
const knowList = () => KNOW.filter(k => LEVELS.includes(k[0]));
function knowPct(ids) {
  const items = ids.map(id => questionsOf(+id[1]).find(q => q.id === id));
  return Math.round(items.reduce((s, q) => s + (credit(q, state.answers[q.id]) || 0), 0) / items.length * 100);
}
const globalKnow = () => { const k = knowList(); return Math.round(k.reduce((s, x) => s + knowPct(x[3]), 0) / k.length); };
const ficheSteps = n => L(n).steps.map((s, i) => s.type === 'fiche' ? i : -1).filter(i => i >= 0);
const ficheUnlocked = (n, f) => stats(n).validated || (state.visited[n] ?? -1) >= ficheSteps(n)[f];
const ficheNum = (n, k) => (n - 1) * 2 + k + 1;
/* Questions de la séance sans réponse (indices d'étapes, dans l'ordre) */
const missingSteps = n => L(n).steps.map((s, i) => s.type === 'question' && state.answers[s.id] === undefined ? i : -1).filter(i => i >= 0);
const missingScn = n => L(n).scn.map((s, i) => state.answers[s.id] === undefined ? i : -1).filter(i => i >= 0);

/* Enregistrer une réponse (et la remonter au LMS) */
function answer(item, idx) {
  const n = +item.id[1];
  state.answers[item.id] = idx;
  const good = item.kind2 === 'q' ? item.opts.findIndex(o => o[1]) : item.opts.findIndex(o => o[1] === 'ok');
  const c = credit(item, idx);
  if (lmsOk && n === CFG.level) SCORM.interaction(`N${n}_${item.id}`, 'abc'[idx], 'abc'[good], c === 1 ? 'correct' : c === .5 ? 'neutral' : 'wrong');
  const st = stats(n);
  if (st.validated && !state.val[n]) state.val[n] = new Date().toISOString();
  report(n);
  save(); renderNav(); renderBell();
}
/* Résultat transmis au LMS : la note retenue est la plus basse entre l'entraînement et le meilleur quiz */
function report(n) {
  if (!lmsOk || n !== CFG.level) return;
  const st = stats(n), taken = st.quizTries > 0;
  SCORM.result(taken ? Math.min(st.score, st.quizBest) : st.score, st.complete && taken, st.validated);
}
/* Retenter les questions ratées d'un niveau */
function retry(n) {
  questionsOf(n).forEach(q => { if (credit(q, state.answers[q.id]) !== 1) delete state.answers[q.id]; });
  const first = questionsOf(n).find(q => state.answers[q.id] === undefined);
  state.lvl = n;
  if (first && first.kind2 === 'q') { state.step[n] = L(n).steps.findIndex(s => s.id === first.id); go('seance'); }
  else if (first) { state.scn[n] = L(n).scn.findIndex(s => s.id === first.id); go('scenarios'); }
  save();
}

/* ---------------------------------------------------------
   NAVIGATION LATÉRALE
   --------------------------------------------------------- */
function renderNav() {
  const p = state.page;
  const sub = [['seance', 'play', 'Séance'], ['fiches', 'file', 'Fiches pratiques'], ['scenarios', 'compass', 'Scénarios'], ['quiz', 'target', 'Quiz de validation'], ['recap', 'award', 'Récap & rapport']];
  if (FINAL) {
    $('#nav').innerHTML = `<span class="lbl">Évaluation</span><a href="#final" class="${p === 'final' ? 'on' : ''}">${ic('award')}Évaluation finale</a>
      <span class="lbl">Mon espace</span><a href="#ressources" class="${p === 'ressources' ? 'on' : ''}">${ic('book')}Ressources</a>`;
    $('#me').innerHTML = `<div class="avatar">${initials()}</div><div style="flex:1;min-width:0"><b>${displayName() || 'Apprenant'}</b><small>Évaluation finale</small></div>`;
    $('#me').onclick = () => go('profil');
    return;
  }
  const subHTML = `<div class="sub">${sub.map(x => `<a href="#${x[0]}" class="${p === x[0] ? 'on' : ''}">${ic(x[1])}${x[2]}</a>`).join('')}</div>`;
  $('#nav').innerHTML = `
    <a href="#accueil" class="${p === 'accueil' ? 'on' : ''}">${ic('home')}${SC ? 'Accueil du niveau' : 'Tableau de bord'}</a>
    <span class="lbl">${SC ? 'Mon niveau' : 'Parcours en 4 niveaux'}</span>
    ${LEVELS.map(n => {
      const lv = L(n), st = stats(n), s = status(n), on = state.lvl === n;
      return `<button class="lvlnav ${on ? 'on' : ''}" data-lvl="${n}" aria-expanded="${on}">
        ${ring(s === 'done' ? st.score : st.progress, 30, s === 'done' ? 'var(--ok)' : s === 'lock' ? 'var(--l2)' : 'var(--a)')}
        <span>Niveau ${n} · ${lv.name}<small>${lv.title}</small></span>${s === 'lock' ? `<span class="lk">${ic('lock')}</span>` : ''}
      </button>${on && s !== 'lock' ? subHTML : ''}`;
    }).join('')}
    ${SC ? '' : `<a href="#final" class="finalnav ${p === 'final' ? 'on' : ''}">${ic('award')}Évaluation finale${finalOpen() ? (state.quiz.final?.passed ? `<span class="count ok">${ic('check')}</span>` : '') : `<span class="lk">${ic('lock')}</span>`}</a>`}
    <span class="lbl">Mon espace</span>
    <a href="#connaissances" class="${p === 'connaissances' ? 'on' : ''}">${ic('brain')}Connaissances<span class="count">${globalKnow()} %</span></a>
    <a href="#ressources" class="${p === 'ressources' ? 'on' : ''}">${ic('book')}Ressources</a>`;
  $$('#nav [data-lvl]').forEach(b => b.onclick = () => {
    state.lvl = +b.dataset.lvl;
    go(['seance', 'fiches', 'scenarios', 'recap'].includes(state.page) ? state.page : 'seance');
  });
  $('#me').innerHTML = `<div class="avatar">${initials()}</div><div style="flex:1;min-width:0"><b>${displayName() || 'Nouvel apprenant'}</b><small>${state.role ? PROFILES.find(p => p[0] === state.role)[1].split(',')[0] : 'Profil à compléter'}</small></div>`;
  $('#me').onclick = () => go('profil');
  $('#me').classList.toggle('on', p === 'profil'); $('#me').setAttribute('aria-current', p === 'profil' ? 'page' : 'false');
  $('#courseTitle').textContent = SC ? `AI Act · Niveau ${CFG.level}` : 'AI Act · L\'essentiel';
}

/* =========================================================
   ACCUEIL
   ========================================================= */
function spacedCard(n) {
  const v = state.val[n];
  if (!v) return `<p class="muted" style="font-size:13px;margin-top:8px">Des tests courts et espacés ancrent mieux que la relecture. Après la validation ${SC ? 'du niveau' : 'd\'un niveau'} :</p>
    <div class="flow" style="margin-top:12px"><div><b>J+7</b> · deux idées reçues à vérifier<small>Vrai, faux ou ça dépend : 30 secondes chacune.</small></div><div><b>J+30</b> · deux autres idées reçues<small>Pour ancrer durablement les bons réflexes.</small></div></div>
    <p class="muted" style="font-size:12px;margin-top:12px">Vous recevrez une notification quand un rappel est disponible.</p>`;
  const now = new Date(), d7 = addDays(v, 7), d30 = addDays(v, 30);
  const due = [[0, d7], [1, d7], [2, d30], [3, d30]].filter(([, d]) => new Date(d) <= now);
  if (!due.length) return `<p class="muted" style="font-size:13px;margin-top:8px">Niveau ${n} validé le ${fdate(v)}. Prochain rappel le <b>${fdate(d7)}</b>, puis le ${fdate(d30)}.</p>`;
  return due.map(([i]) => {
    const s = SPACED[n][i], a = state.spaced[`${n}-${i}`];
    return `<div class="it"><p>${s[0]}</p><div class="btns">${['Vrai', 'Faux', 'Ça dépend'].map(t => `<button data-sp="${n}-${i}" data-v="${t}" class="${a ? (t === s[1] ? 'right' : t === a ? 'wrong' : '') : ''}" ${a ? 'disabled' : ''}>${t}</button>`).join('')}</div>${a ? `<p class="fbk">${s[2]}</p>` : ''}</div>`;
  }).join('');
}
function renderAccueil() {
  const name = displayName().split(' ')[0];
  const next = LEVELS.map(L).find(l => status(l.n) === 'cur') || L(LEVELS[0]);
  const wrong = [];
  LEVELS.forEach(n => questionsOf(n).forEach(q => { const c = credit(q, state.answers[q.id]); if (c !== null && c < 1) wrong.push([n, q]); }));
  const stN = stats(next.n);
  const hero = SC ? `
    <div class="card hero">
      <div>
        <span class="chip pk">${ic('shield')} Formation à la maîtrise de l'IA · Art. 4</span>
        <p class="eyebrow" style="margin-top:14px">${name ? `Bonjour ${name} · ` : ''}Niveau ${next.n} sur 4 · ${next.name}</p>
        <h1>${next.title}</h1>
        <p>${next.pitch} Vous suivez Léa, cheffe de projet chez Nexalis, une ESN (entreprise de services du numérique) de Belval.</p>
        <div class="stats">
          <div><b>${stN.score} %</b><small>réussite (seuil 80 %)</small></div>
          <div><b>${stN.ans} / ${stN.total}</b><small>questions</small></div>
          <div><b>≈ 25 min</b><small>durée</small></div>
        </div>
        <div class="row"><a class="btn pri" href="#seance">${ic('play')} ${stN.ans || state.visited[next.n] >= 0 ? 'Reprendre' : 'Commencer'} le niveau</a><a class="btn sec" href="#recap">Récap & rapport</a></div>
      </div>
      <div class="illus">${ILLUS[next.thumb]()}</div>
    </div>` : `
    <div class="card hero">
      <div>
        <span class="chip pk">${ic('shield')} Formation à la maîtrise de l'IA · Art. 4</span>
        <h1>${name ? `Bonjour ${name} !` : 'Comprendre et appliquer l\'AI Act'}</h1>
        <p>Suivez <b>Léa</b>, cheffe de projet chez Nexalis, une ESN (entreprise de services du numérique) de Belval. En 4 niveaux d'environ 25 minutes, apprenez à repérer l'IA, à savoir qui est responsable, à respecter les lignes rouges et à adopter les bons réflexes.</p>
        <div class="stats">
          <div><b>${LEVELS.filter(n => stats(n).validated).length} / 4</b><small>niveaux validés</small></div>
          <div><b>${stats(next.n).progress} %</b><small>niveau ${next.n} parcouru</small></div>
          <div><b>${globalKnow()} %</b><small>connaissances</small></div>
        </div>
        <div class="row"><a class="btn pri" href="#seance" data-lvl-go="${next.n}">${ic('play')} ${stN.ans || (state.visited[next.n] ?? -1) >= 0 ? 'Reprendre' : 'Commencer'} le niveau ${next.n}</a><a class="btn sec" href="#profil">Compléter mon profil</a></div>
      </div>
      <div class="illus">${ILLUS.office()}</div>
    </div>`;
  const plan = (n) => `
    <div class="card pad">
      <div class="row between" style="margin-bottom:8px"><h3>Déroulé du niveau</h3><span class="chip">${ic('clock')} ≈ 25 min</span></div>
      ${[['video', 'Vidéo de présentation', 'Au début de chaque module', '2 min'], ['play', L(n).modules[0], 'Situation, question, article de loi', '7 min'], ['file', 'Fiche pratique', 'L\'essentiel à garder', '1 min 30'], ['play', L(n).modules[1], 'Nouvelle situation, problème, question', '7 min'], ['compass', 'Partie 2 · 3 scénarios', 'Choix et conséquences', '7 min'], ['award', 'Récap & rapport', 'Score et réponses détaillées', '3 min']].map(r => `
        <div class="minirow"><span class="stepico">${ic(r[0])}</span><div class="t"><b>${r[1]}</b><small>${r[2]}</small></div><span class="muted" style="font-size:12px">${r[3]}</span></div>`).join('')}
    </div>`;
  $('#p-accueil').innerHTML = `
  ${hero}
  ${SC ? '' : `
  <div class="head" style="margin-top:32px;margin-bottom:16px"><div><h2>Votre parcours</h2><p>Atteignez 80 % de réussite pour débloquer le niveau suivant.</p></div></div>
  <div class="grid levels">
    ${LEVELS.map(n => {
      const lv = L(n), st = stats(n), s = status(n);
      return `<a class="card lvl ${s}" href="#seance" data-lvl-go="${n}">
        <div class="thumb">${ILLUS[lv.thumb]()}</div>
        <div class="row between"><div class="num">${n}</div>
          ${s === 'done' ? `<span class="chip ok">${ic('check')} Validé</span>` : s === 'cur' ? `<span class="chip pk">${st.ans ? 'En cours' : 'Disponible'}</span>` : `<span class="chip grey">${ic('lock')} Verrouillé</span>`}
        </div>
        <div><p class="eyebrow" style="${s === 'lock' ? 'color:#A8A3B8' : ''}">Niveau ${n} · ${lv.name}</p><h3>${lv.title}</h3><p class="muted" style="font-size:12.5px;margin-top:4px">${lv.pitch}</p></div>
        <div class="row">${ring(s === 'done' ? st.score : st.progress, 52, s === 'done' ? 'var(--ok)' : 'var(--p)')}<div style="flex:1"><small class="muted" style="font-size:12px">${s === 'done' ? 'Réussite' : 'Parcouru'}</small><div class="bar thin" style="margin-top:6px"><i style="width:${st.progress}%"></i></div><small class="muted" style="font-size:11px">${st.ans} / ${st.total} questions</small></div></div>
      </a>`;
    }).join('')}
  </div>`}
  <div class="grid dash3">
    ${SC ? plan(CFG.level) : ''}
    <div class="card pad spaced">
      <div class="row between" style="margin-bottom:4px"><h3>Rappels J+7 et J+30</h3><span class="chip">${ic('clock')} 1 min</span></div>
      ${LEVELS.map(n => state.val[n] ? spacedCard(n) : '').join('') || spacedCard(LEVELS[0])}
    </div>
    ${SC ? '' : `<div class="card pad">
      <div class="row between" style="margin-bottom:8px"><h3>Registre de formation</h3>${tagChip('Loi')}</div>
      <p class="muted" style="font-size:12.5px;margin-bottom:6px">Ce module est la preuve art. 4 de l'entreprise : il trace qui, quand, quelle version et quel score.</p>
      ${LEVELS.map(n => { const st = stats(n); return `<div class="minirow"><span class="stepico" style="${st.validated ? 'background:var(--okbg);color:var(--ok)' : ''}">${ic(st.validated ? 'check' : st.ans ? 'clock' : status(n) === 'lock' ? 'lock' : 'play')}</span><div class="t"><b>Niveau ${n} · ${L(n).title}</b><small>${st.validated ? `Validé le ${fdate(state.val[n])} · ${CONTENT_VERSION}` : st.ans ? `En cours · ${st.ans}/${st.total} réponses` : 'Pas commencé'}</small></div><b style="font-family:var(--display)">${st.ans ? st.score + ' %' : '—'}</b></div>`; }).join('')}
    </div>`}
    <div class="card pad" style="background:var(--d);border-color:var(--d);color:#fff">
      <p class="eyebrow" style="color:#F7A8CC">À revoir</p>
      ${wrong.length ? `<h3 style="color:#fff;margin:6px 0 10px">${wrong.length} réponse${wrong.length > 1 ? 's' : ''} à retravailler</h3>
        ${wrong.slice(0, 2).map(([n, q]) => `<div style="margin:10px 0;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.08);font-size:13px"><small style="opacity:.7">Niveau ${n}</small><br>${q.kind2 === 's' ? q.title : q.q}</div>`).join('')}
        <a class="btn" style="background:#fff;color:var(--p);margin-top:6px" href="#recap" data-lvl-go="${wrong[0][0]}" data-tab="1">Voir le rapport ${ic('right')}</a>`
        : `<h3 style="color:#fff;margin:6px 0 10px">Rien à revoir pour l'instant</h3><p style="opacity:.8;font-size:13px">Au fil du parcours, vos réponses à retravailler apparaîtront ici, avec un lien direct vers l'explication.</p>`}
    </div>
  </div>
  <div class="uptodate">${ic('clock')}<span>Contenu à jour au <b>${CONTENT_DATE}</b> (${CONTENT_VERSION}).</span></div>`;
  $$('[data-sp]').forEach(b => b.onclick = () => { state.spaced[b.dataset.sp] = b.dataset.v; save(); renderAccueil(); });
}

/* =========================================================
   NIVEAU VERROUILLÉ (version web)
   ========================================================= */
function lockedHTML(n) {
  const lv = L(n);
  return `<div class="card hero" style="grid-template-columns:1fr 1fr">
    <div>
      <span class="chip grey">${ic('lock')} Niveau verrouillé</span>
      <p class="eyebrow" style="margin-top:14px">Niveau ${n} · ${lv.name}</p>
      <h1>${lv.title}</h1>
      <p>${lv.pitch}</p>
      <div class="banner" style="margin:20px 0">${ic('lock')}<span>Validez le <b>niveau ${n - 1}</b> avec au moins <b>80 %</b> de réussite pour débloquer ce niveau.</span></div>
      <a class="btn pri" href="#seance" data-lvl-go="${n - 1}">${ic('play')} Aller au niveau ${n - 1}</a>
    </div>
    <div><div class="illus" style="filter:grayscale(.6);opacity:.8">${ILLUS[lv.thumb]()}</div>
      <div class="card pad flat" style="margin-top:16px"><h4 style="margin-bottom:8px">Au programme</h4>
      ${checksHTML([...MODULE_GOALS[`${n}-1`], ...MODULE_GOALS[`${n}-2`]].map(g => [g, '', '']), true)}</div></div>
  </div>`;
}
const guard = (n, el) => { if (status(n) === 'lock') { el.innerHTML = lockedHTML(n); return true; } return false; };

/* =========================================================
   SÉANCE
   ========================================================= */
function renderSeance() {
  const n = state.lvl, lv = L(n), steps = lv.steps;
  if (guard(n, $('#p-seance'))) return;
  let i = state.step[n] || 0; if (i >= steps.length) i = 0;
  const s = steps[i];
  state.visited[n] = Math.max(state.visited[n] ?? -1, i); save();
  const pct = Math.round(((i + 1) / steps.length) * 100);
  $('#p-seance').innerHTML = `
  <div class="lesson-head">
    <div class="grow"><p class="eyebrow">Niveau ${n} · ${lv.name}</p><h1 style="font-size:28px">${lv.title}</h1></div>
    <div style="width:240px"><div class="row between" style="font-size:12px;margin-bottom:6px"><span class="muted">Partie 1 · progression</span><b>${pct} %</b></div><div class="bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>
    <span class="chip">${ic('clock')} ≈ 25 min</span>
  </div>
  ${state.catchup[n] ? (() => { const m = missingSteps(n).length; return `<div class="banner catch">${ic('help')}<span><b>Questions à rattraper</b> · ${m ? `il reste ${m} question${m > 1 ? 's' : ''} sans réponse, dans l'ordre du parcours.` : 'tout est répondu, vous pouvez passer aux scénarios.'}</span><button class="btn ghost" id="quitCatch">Revenir au parcours normal</button></div>`; })() : ''}
  <div class="lesson">
    <aside class="card outline" aria-label="Plan du niveau">${outlineHTML(n, i)}</aside>
    <div class="card stage">
      <div class="stage-top">
        <span class="chip ${s.problem ? 'ko' : s.type === 'question' ? 'pk' : s.type === 'law' || s.type === 'calc' ? 'dark' : s.type === 'fiche' ? 'ok' : ''}">${ic(stepIcon(s))} ${s.label}</span>
        <span class="muted" style="font-size:13px">${s.mod === 'f' ? 'Entre les modules' : lv.modules[s.mod - 1]}</span>
        <span class="muted" style="margin-left:auto;font-size:13px;display:flex;align-items:center;gap:6px">${ic('clock')} ${s.time}</span>
      </div>
      <div class="stage-body">${stepHTML(s, n)}</div>
      <div class="stage-foot">
        <button class="btn sec" id="prev" ${i === 0 ? 'disabled' : ''}>${ic('left')} Précédent</button>
        <div class="grow" style="display:flex;justify-content:center"><div class="dots" aria-hidden="true">${steps.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'done' : ''}"></i>`).join('')}</div></div>
        <span class="muted" style="font-size:13px">Étape ${i + 1} / ${steps.length}</span>
        ${footBtn(n, i, s)}
      </div>
    </div>
  </div>`;
  $('#prev').onclick = () => step(-1);
  bindFoot(n);
  const qc = $('#quitCatch'); if (qc) qc.onclick = () => { delete state.catchup[n]; save(); renderSeance(); };
  $$('.ol[data-s]').forEach(b => b.onclick = () => { const k = +b.dataset.s; if (!canReach(n, k)) return; state.step[n] = k; save(); renderSeance(); });
  if (s.type === 'question' && state.answers[s.id] === undefined)
    $$('#qz .opt').forEach(b => b.onclick = () => { answer({ ...s, kind2: 'q' }, +b.dataset.i); renderSeance(); });
  if (s.type === 'calc') bindCalc();
  if (s.type === 'video') bindVideo();
  if (s.type === 'fiche') { const pb = $('#stagePdf'); if (pb) pb.onclick = () => printFiche(n, s.fiche); }
  regulate(n, i, s);
  renderBell();
}
function bindFoot(n) {
  const nx = $('#next'); if (nx) nx.onclick = () => step(1);
  const cu = $('#catchup'); if (cu) cu.onclick = () => { state.catchup[n] = 1; state.step[n] = missingSteps(n)[0]; save(); renderSeance(); renderNav(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
}
function footBtn(n, i, s) {
  if (isLocked(n, i, s)) return `<button class="btn pri wait" id="wait" disabled aria-live="polite">${ic('clock')} <span id="waitT">${waitLabel(n, i, s)}</span></button>`;
  const last = i === L(n).steps.length - 1, miss = missingSteps(n), unanswered = s.type === 'question' && state.answers[s.id] === undefined;
  if (state.catchup[n]) {
    const others = miss.filter(k => k !== i);
    if (unanswered) return `<button class="btn pri" id="next">${others.length ? 'Passer' : 'Terminer plus tard'} ${ic('right')}</button>`;
    return others.length ? `<button class="btn pri" id="next">Question suivante (${others.length}) ${ic('right')}</button>` : `<a class="btn pri" href="#scenarios">Partie 2 : scénarios ${ic('right')}</a>`;
  }
  if (last) return miss.length ? `<button class="btn pri" id="catchup">${ic('help')} Répondre ${miss.length > 1 ? `aux ${miss.length} questions restantes` : 'à la question restante'}</button>` : `<a class="btn pri" href="#scenarios">Partie 2 : scénarios ${ic('right')}</a>`;
  return `<button class="btn pri" id="next">${unanswered ? 'Passer' : 'Continuer'} ${ic('right')}</button>`;
}
function step(d) {
  const n = state.lvl;
  if (state.catchup[n] && d === 1) {
    const i = state.step[n] || 0, miss = missingSteps(n).filter(k => k !== i);
    const next = miss.find(k => k > i) ?? miss[0];
    if (next === undefined) { delete state.catchup[n]; state.step[n] = L(n).steps.length - 1; }
    else state.step[n] = next;
    save(); renderSeance(); renderNav(); window.scrollTo({ top: 0, behavior: 'smooth' }); return;
  }
  state.step[n] = Math.max(0, Math.min(L(n).steps.length - 1, (state.step[n] || 0) + d));
  save(); renderSeance(); renderNav(); window.scrollTo({ top: 0, behavior: 'smooth' });
}
function stepIcon(s) { return { situation: s.problem ? 'alert' : 'users', question: 'help', explain: 'bulb', law: 'scale', wrap: 'flag', fiche: 'file', compare: 'bulb', calc: 'calc', video: 'video' }[s.type]; }

function outlineHTML(n, cur) {
  const lv = L(n), steps = lv.steps, f = ficheSteps(n);
  const seen = state.visited[n] ?? -1;
  const item = k => {
    const s = steps[k], q = s.type === 'question', answered = q && state.answers[s.id] !== undefined;
    const st = k === cur ? 'cur' : q ? (answered ? 'done' : k <= seen ? 'todo' : '') : (k <= seen ? 'done' : '');
    const mark = st === 'done' ? ic('check') : st === 'todo' ? '!' : '';
    return `<button class="ol ${st} ${s.type === 'fiche' ? 'olf' : ''}" data-s="${k}" ${k === cur ? 'aria-current="step"' : ''} ${st === 'todo' ? 'title="Question à faire"' : ''}><span class="st">${mark}</span>${s.label}${st === 'todo' ? '<span class="todo-tag">à faire</span>' : `<span class="tm">${s.time}</span>`}</button>`;
  };
  const range = (a, b) => steps.map((_, k) => k).filter(k => k > a && k < b).map(item).join('');
  return `<h4>Partie 1 · Comprendre</h4>
    <div class="ol-mod">${lv.modules[0]}</div>${range(-1, f[0])}${item(f[0])}
    <div class="ol-mod">${lv.modules[1]}</div>${range(f[0], f[1])}${item(f[1])}
    <h4>Partie 2 · S'entraîner</h4>
    <a class="ol" href="#scenarios"><span class="st">${ic('compass')}</span>3 scénarios${missingScn(n).length < 3 && missingScn(n).length ? `<span class="todo-tag">${missingScn(n).length} à faire</span>` : '<span class="tm">7 min</span>'}</a>
    <h4>Fin de niveau</h4>
    <a class="ol" href="#quiz"><span class="st">${ic('target')}</span>Quiz de validation${stats(n).quizPassed ? `<span class="tm">${ic('check')}</span>` : '<span class="tm">5 min</span>'}</a>
    <a class="ol" href="#recap"><span class="st">${ic('award')}</span>Fiche récap & rapport<span class="tm">3 min</span></a>`;
}

function personaHTML(p, problem) { return `<div class="persona"><div class="avatar" style="${problem ? 'background:var(--a)' : ''}">${p[0]}</div><div><b>${p[1]}</b><small>${p[2]}</small></div></div>`; }
function mentorHTML(t) { return t ? `<div class="mentor"><div class="avatar">CL</div><div class="bub"><b>Le conseil de Claire, DPO</b>« ${t} »</div></div>` : ''; }
function lawBox(l) {
  return `<div class="lawbox">
    <div class="lh"><span class="eu">${ic('eu')}</span>${l.ref}${tagChip(l.tag)}<span class="ref">${l.tag === 'Projet' ? 'Texte non adopté' : l.tag === 'Guide' ? 'Non contraignant' : 'Texte adopté'}</span></div>
    <div class="lt">${l.title}</div>
    <blockquote class="${l.quote ? '' : 'para'}">${l.text}</blockquote>
  </div>`;
}
function checksHTML(list, compact) {
  return `<ul class="checks ${compact ? 'compact' : ''}">${list.map(m => `<li><span class="ck">${ic('check')}</span><div><b>${m[0]}</b>${m[2] ? ` <span class="mini-art">${m[2]}</span>` : ''}${m[1] ? `<small>${m[1]}</small>` : ''}</div></li>`).join('')}</ul>`;
}

function stepHTML(s, n) {
  switch (s.type) {
    case 'video': return `
      <div class="two" style="grid-template-columns:2.1fr 1fr;align-items:start;gap:28px">
        <div class="vwrap" data-src="${s.video}">
          <video controls preload="metadata" playsinline aria-label="Vidéo de présentation du module ${s.mod}">
            ${EN_ON ? `<source src="${s.video}-en.mp4" type="video/mp4">` : ''}<source src="${s.video}.mp4" type="video/mp4">
            <track kind="subtitles" srclang="fr" label="Français" src="${s.video}.vtt" default>
          </video>
          <div class="vph" hidden>
            <div class="vplay">${ic('play')}</div>
            <b>Vidéo de présentation du module</b>
            <span>1 min 30 à 2 min · bientôt disponible</span>
          </div>
        </div>
        <div>
          <p class="eyebrow">Module ${s.mod} · introduction</p>
          <h2>${L(n).modules[s.mod - 1].replace(/^Module \d · /, '')}</h2>
          <h4 style="margin:6px 0 10px;color:var(--p)">Dans ce module, vous allez :</h4>
          ${checksHTML(s.goals.map(g => [g, '', '']), false)}
        </div>
      </div>`;
    case 'situation': return `
      <div class="two wide">
        <div class="illus">${ILLUS[s.illus]()}</div>
        <div>
          ${personaHTML(s.persona, s.problem)}
          <h2>${s.title}</h2>
          ${s.body.map(p => `<p class="lead">${p}</p>`).join('')}
          <div class="prompt">${s.prompt}</div>
        </div>
      </div>`;
    case 'question': {
      const a = state.answers[s.id];
      const opts = s.opts.map((o, k) => {
        let cls = '';
        if (a !== undefined) cls = o[1] ? 'right' : (k === a ? 'wrong' : 'dim');
        return `<button class="opt ${cls}" data-i="${k}" ${a !== undefined ? 'disabled' : ''}><span class="k">${s.kind === 'vf' ? ['V', 'F', '?'][k] : 'ABC'[k]}</span><span class="tx">${o[0]}</span></button>`;
      }).join('');
      const qs = L(n).steps.filter(x => x.type === 'question');
      return `
      <div class="qwrap">
        <div class="${a !== undefined ? 'locked' : ''}" id="qz">
          <p class="eyebrow">${s.kind === 'vf' ? 'Idée reçue · vrai, faux ou ça dépend ?' : s.label} · ${qs.findIndex(x => x.id === s.id) + 1} / ${qs.length}</p>
          ${s.kind === 'vf' ? `<div class="quote-card">${s.q}</div><div class="vf">${opts}</div>` : `<div class="q">${s.q}</div><div class="opts">${opts}</div>`}
          <div aria-live="polite">${a !== undefined ? `<div class="fb show ${s.opts[a][1] ? 'ok' : 'ko'}"><h4>${ic(s.opts[a][1] ? 'check' : 'x')} ${s.opts[a][1] ? 'Bonne réponse' : 'Ce n\'est pas la bonne réponse'}</h4><p>${s.opts[a][1] ? s.ok : s.ko}</p></div>` : `<div class="tip">${ic('bulb')}<span>${s.tip}</span></div>`}</div>
        </div>
        <div class="illus">${ILLUS[s.illus]()}</div>
      </div>`;
    }
    case 'explain': return `
      <h2>${s.title}</h2>
      <p class="lead" style="max-width:860px">${s.intro}</p>
      ${s.critTitle ? `<div class="critTitle">${s.critTitle}</div>` : ''}
      <div class="crit">${s.crit.map((c, k) => `<div class="card"><div class="n">${k + 1}</div><b>${c[0]}</b><p>${c[1]}</p></div>`).join('')}</div>
      <div class="two" style="align-items:start;gap:20px;grid-template-columns:1.4fr 1fr">
        ${lawBox(s.law)}
        <div>${s.clair ? `<div class="clair">${ic('bulb')}<div>${s.clair} ${tagChip(s.clairTag)}</div></div>` : ''}${mentorHTML(s.mentor)}</div>
      </div>`;
    case 'law': return `
      <div class="two wide" style="align-items:start">
        <div>
          <h2>${s.title}</h2>
          ${lawBox(s.law)}
          <div class="clair" style="margin-top:16px">${ic('target')}<div>${s.why} ${tagChip(s.whyTag)}</div></div>
          ${mentorHTML(s.mentor)}
        </div>
        <div>
          ${s.compact ? '' : `<div class="illus" style="max-width:340px;margin:0 auto 18px">${ILLUS[s.illus]()}</div>`}
          <h3>${s.mustTitle}</h3>
          ${checksHTML(s.must, s.compact)}
        </div>
      </div>`;
    case 'compare': return `
      <div class="row between"><h2 style="margin:0">${s.title}</h2>${tagChip(s.tag)}</div>
      <p class="lead" style="margin-top:8px">${s.intro}</p>
      <div class="compare">
        <div class="col no"><h4>${ic('x')} ${s.left[0]}</h4><ul>${s.left[1].map(t => `<li>${ic('x')}<span>${t}</span></li>`).join('')}</ul></div>
        <div class="col yes"><h4>${ic('check')} ${s.right[0]}</h4><ul>${s.right[1].map(t => `<li>${ic('check')}<span>${t}</span></li>`).join('')}</ul></div>
      </div>
      <div class="note" style="background:var(--l1);color:var(--sd)">${ic('alert')}<span><b>« Pas interdit » ne veut pas dire « libre ».</b> La reconnaissance des émotions des clients reste un système à haut risque (annexe III, 1(c)) et oblige à informer les personnes (art. 50(3)).</span></div>
      ${mentorHTML(s.mentor)}`;
    case 'wrap': return `
      <div class="two" style="align-items:start;grid-template-columns:1.3fr .7fr">
        <div>
          <h2>${s.title}</h2>
          <p class="lead">${s.body}</p>
          <div class="takeaway">${s.keys.map(k => `<div><b>${k[0]}</b><small class="muted">${k[1]}</small></div>`).join('')}</div>
          <div class="next-teaser"><span class="stepico" style="background:rgba(255,255,255,.12);color:#fff">${ic('right')}</span><div><b>${s.next[0]}</b><p>${s.next[1]}</p></div></div>
        </div>
        <div class="illus">${ILLUS[s.illus]()}</div>
      </div>`;
    case 'fiche': {
      const f = FICHES[n][s.fiche];
      return `
      <div class="row between" style="margin-bottom:18px">
        <div><p class="eyebrow">${s.label} · débloquée</p><h2 style="margin:4px 0 0">${f.title}</h2></div>
        <div class="row"><a class="btn sec" href="#fiches" data-fiche="${s.fiche}">${ic('file')} Ouvrir en grand</a><button class="btn ghost" id="stagePdf">${ic('down')} PDF</button></div>
      </div>
      ${f.render()}`;
    }
    case 'calc': return calcHTML();
  }
}
function bindVideo() {
  const w = $('.vwrap'), v = w && w.querySelector('video');
  if (!v) return;
  const fail = () => { v.hidden = true; w.querySelector('.vph').hidden = false; w.classList.add('empty'); const n = state.lvl, i = state.step[n] || 0; if (isLocked(n, i, L(n).steps[i])) unlock(n, i); };
  trVideo(v);
  [...v.querySelectorAll('source')].pop().addEventListener('error', fail);
  v.addEventListener('error', fail);
  if (location.protocol === 'data:') fail();
}

/* =========================================================
   QUIZ DE VALIDATION (par niveau) ET ÉVALUATION FINALE
   Questions : src/js/quiz.js. Tirage au hasard et ordre des réponses mélangé à chaque tentative.
   ========================================================= */
const BANK = {};
Object.keys(QUIZ).forEach(n => QUIZ[n].forEach(x => {
  BANK[x.id] = { ...x, n: +n, opts: x.vf ? vf(x.vf) : [[x.o[0], true], [x.o[1], false], [x.o[2], false]] };
}));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const allValidated = () => [1, 2, 3, 4].every(n => stats(n).validated);
const finalOpen = () => FINAL || PREVIEW || allValidated();
const qzState = key => state.quiz[key] || (state.quiz[key] = { attempts: 0, best: null, passed: false });
const qzSize = key => key === 'final' ? SETTINGS.finalPerLevel * 4 : SETTINGS.quizSize;
const qzPassed = (key, correct, total) => key === 'final' ? Math.round(correct / total * 100) >= SETTINGS.finalPass : correct >= SETTINGS.quizPass;

function startQuiz(key) {
  const pool = key === 'final'
    ? [1, 2, 3, 4].flatMap(n => shuffle(QUIZ[n]).slice(0, SETTINGS.finalPerLevel))
    : shuffle(QUIZ[key]).slice(0, SETTINGS.quizSize);
  qzState(key).cur = { items: pool.map(x => ({ id: x.id, ord: x.vf ? [0, 1, 2] : shuffle([0, 1, 2]) })), ans: {} };
  save();
}
function submitQuiz(key) {
  const q = qzState(key), cur = q.cur; if (!cur) return;
  const total = cur.items.length, correct = cur.items.filter(it => BANK[it.id].opts[cur.ans[it.id]]?.[1]).length;
  const score = Math.round(correct / total * 100), passed = qzPassed(key, correct, total);
  q.attempts++; q.best = Math.max(q.best ?? 0, score); q.passed = q.passed || passed;
  q.last = { items: cur.items, ans: cur.ans, score, correct, total, passed, date: new Date().toISOString() };
  delete q.cur;
  if (lmsOk) cur.items.forEach(it => { const b = BANK[it.id], a = cur.ans[it.id]; if (key === 'final' || b.n === CFG.level) SCORM.interaction(`${key === 'final' ? 'FINAL' : 'N' + key}_${it.id}`, 'abc'[it.ord.indexOf(a)], 'abc'[it.ord.indexOf(b.opts.findIndex(o => o[1]))], b.opts[a][1] ? 'correct' : 'wrong'); });
  if (key === 'final') {
    if (passed && !state.finalDate) state.finalDate = q.last.date;
    if (lmsOk && FINAL) SCORM.result(q.best, true, q.passed);
  } else {
    const st = stats(key); if (st.validated && !state.val[key]) state.val[key] = q.last.date;
    report(key);
  }
  save(); renderNav(); renderBell();
}

function qzOptsHTML(it, chosen, done) {
  const b = BANK[it.id];
  return it.ord.map((k, pos) => {
    const o = b.opts[k], cls = done ? (o[1] ? 'right' : k === chosen ? 'wrong' : 'dim') : (k === chosen ? 'sel' : '');
    return `<button class="opt ${cls}" data-q="${it.id}" data-k="${k}" ${done ? 'disabled' : ''} aria-pressed="${k === chosen}"><span class="k">${b.vf ? ['V', 'F', '?'][k] : 'ABC'[pos]}</span><span class="tx">${o[0]}</span></button>`;
  }).join('');
}
function qzItemHTML(it, i, chosen, done) {
  const b = BANK[it.id], ok = done && b.opts[chosen]?.[1];
  return `<div class="card qz-item ${done ? (ok ? 'is-ok' : 'is-ko') : ''}">
    <p class="eyebrow">Question ${i + 1}${done ? ` · ${ok ? 'Bonne réponse' : 'Réponse incorrecte'}` : ''}${b.vf ? ' · Vrai, faux ou ça dépend ?' : ''}</p>
    ${b.vf ? `<div class="quote-card">${b.q}</div><div class="vf">${qzOptsHTML(it, chosen, done)}</div>` : `<div class="q">${b.q}</div><div class="opts">${qzOptsHTML(it, chosen, done)}</div>`}
    ${done ? `<div class="fb show ${ok ? 'ok' : 'ko'}"><p>${b.why}</p></div>` : ''}
  </div>`;
}

function renderQuizPage(key, el) {
  const isFinal = key === 'final', q = qzState(key), size = qzSize(key);
  const title = isFinal ? 'Évaluation finale' : `Quiz de validation · Niveau ${key}`;
  const rule = isFinal
    ? `${size} questions tirées au hasard (${SETTINGS.finalPerLevel} par niveau). Réussite à partir de ${SETTINGS.finalPass} %.`
    : `${size} questions tirées au hasard parmi ${QUIZ[key].length}. Réussite à partir de ${SETTINGS.quizPass} bonnes réponses sur ${size}.`;
  const head = `<div class="lesson-head"><div class="grow"><p class="eyebrow">${isFinal ? 'Parcours complet · 4 niveaux' : `Niveau ${key} · ${L(key).name}`}</p><h1 style="font-size:28px">${title}</h1></div>
    <span class="chip">${ic('clock')} ≈ ${isFinal ? 15 : 5} min</span></div>`;
  // Verrous
  if (!isFinal) {
    if (guard(key, el)) return;
    const st = stats(key);
    if (!st.complete) { el.innerHTML = `${head}<div class="card pad qz-intro"><h3>${ic('lock')} Quiz pas encore disponible</h3><p class="muted">Répondez d'abord à toutes les questions de la séance et aux 3 scénarios (${st.ans} / ${st.total} pour l'instant).</p><div class="row" style="margin-top:14px"><a class="btn pri" href="#seance">${ic('play')} Reprendre la séance</a><a class="btn sec" href="#scenarios">Scénarios</a></div></div>`; return; }
  } else if (!finalOpen()) {
    el.innerHTML = `${head}<div class="card pad qz-intro"><h3>${ic('lock')} Évaluation finale verrouillée</h3><p class="muted">Elle s'ouvre quand les 4 niveaux sont validés.</p>
      <ul class="checks compact" style="margin-top:12px">${[1, 2, 3, 4].map(n => { const v = stats(n).validated; return `<li><span class="ck">${ic(v ? 'check' : 'lock')}</span><div><b>Niveau ${n} · ${L(n).title}</b><small>${v ? 'Validé' : 'À valider'}</small></div></li>`; }).join('')}</ul></div>`;
    return;
  }
  // Tentative en cours
  if (q.cur) {
    const cur = q.cur, n = Object.keys(cur.ans).length;
    el.innerHTML = `${head}<div class="qz-list">${cur.items.map((it, i) => qzItemHTML(it, i, cur.ans[it.id], false)).join('')}</div>
      <div class="card qz-bar"><span class="muted">${n} / ${cur.items.length} réponses</span><button class="btn pri" id="qzSend" ${n < cur.items.length ? 'disabled' : ''}>${ic('check')} Valider mes réponses</button></div>`;
    $$('.qz-item .opt', el).forEach(b => b.onclick = () => { cur.ans[b.dataset.q] = +b.dataset.k; save(); const y = window.scrollY; renderQuizPage(key, el); window.scrollTo(0, y); });
    $('#qzSend', el).onclick = () => { submitQuiz(key); renderQuizPage(key, el); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    return;
  }
  // Accueil du quiz + dernier résultat
  const last = q.last, st = isFinal ? null : stats(key);
  const after = isFinal ? '' : q.passed && !st.validated ? `<div class="note" style="margin-top:12px">${ic('alert')}<span>Quiz réussi. Pour valider le niveau, il faut aussi au moins 80 % sur la séance et les scénarios (actuellement ${st.score} %).</span></div>` : '';
  el.innerHTML = `${head}
    <div class="grid qz-top">
      <div class="card pad qz-intro">
        <h3 style="margin-bottom:8px">${q.passed ? `${ic('check')} ${isFinal ? 'Évaluation réussie' : 'Quiz réussi'}` : q.attempts ? 'Pas encore réussi' : 'Prêt ?'}</h3>
        <p class="muted">${rule} Tentatives illimitées : chaque tentative tire de nouvelles questions.</p>
        <div class="qz-stats"><div><small>Tentatives</small><b>${q.attempts}</b></div><div><small>Meilleur score</small><b>${q.best ?? '—'}${q.best != null ? ' %' : ''}</b></div><div><small>Statut</small><b>${q.passed ? 'Réussi' : q.attempts ? 'À retenter' : 'À passer'}</b></div></div>
        ${after}
        <div class="row" style="margin-top:16px"><button class="btn pri" id="qzGo">${ic(q.attempts ? 'reset' : 'play')} ${q.attempts ? 'Nouvelle tentative' : `Commencer ${isFinal ? 'l\'évaluation' : 'le quiz'}`}</button>${!isFinal && st.validated ? `<a class="btn sec" href="#recap">Récap & rapport ${ic('right')}</a>` : ''}${isFinal && q.passed && !SC ? `<button class="btn sec" id="qzAtt">${ic('down')} Attestation de suivi</button>` : ''}</div>
      </div>
      ${last ? `<div class="card pad qz-res">${ring(last.score, 120, last.passed ? 'var(--ok)' : 'var(--a)')}<div><b>Dernière tentative : ${last.correct} / ${last.total}</b><p class="muted">${last.passed ? 'Réussie' : 'Sous le seuil'} · ${fdate(last.date)}</p></div></div>` : ''}
    </div>
    ${last ? `<h3 style="margin:28px 0 12px">Correction de la dernière tentative</h3><div class="qz-list">${last.items.map((it, i) => qzItemHTML(it, i, last.ans[it.id], true)).join('')}</div>` : ''}`;
  $('#qzGo', el).onclick = () => { startQuiz(key); renderQuizPage(key, el); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const at = $('#qzAtt', el); if (at) at.onclick = printAttestation;
}
function renderQuiz() { renderQuizPage(state.lvl, $('#p-quiz')); }
function renderFinal() { renderQuizPage('final', $('#p-final')); }

/* ---------- Temps régulé (option de démonstration, réglage dans « Mon profil ») ----------
   Pages de cours : rester au moins un tiers du temps indiqué (pas de minimum sur les questions et les mises en situation). Vidéos : les voir en entier, sans avancer dans la barre.
   Pour retirer l'option : supprimer ce bloc, les appels à regulate / isLocked / canReach / trVideo et l'encadré du profil. */
let trTick = null;
const tKey = (n, i) => `${n}-${i}`;
const tNeed = s => { if (s.type === 'question' || s.type === 'situation') return 0; const m = /(\d+)\s*min(?:\s*(\d+))?/.exec(s.time || ''), sec = /^(\d+)\s*s/.exec(s.time || ''); return Math.ceil((m ? +m[1] * 60 + (+m[2] || 0) : sec ? +sec[1] : 0) / 3); };
const isLocked = (n, i, s) => !!state.prefs.tr && !state.tdone[tKey(n, i)] && (s.type === 'video' || tNeed(s) > 0);
const canReach = (n, k) => { if (!state.prefs.tr) return true; for (let j = 0; j < k; j++) if (isLocked(n, j, L(n).steps[j])) return false; return true; };
const mmss = t => `${Math.floor(t / 60)}:${String(Math.max(0, Math.ceil(t % 60))).padStart(2, '0')}`;
function waitLabel(n, i, s) { return s.type === 'video' ? 'Regardez la vidéo en entier' : `Suivant dans ${mmss(tNeed(s) - (state.tspent[tKey(n, i)] || 0))}`; }
function unlock(n, i) {
  state.tdone[tKey(n, i)] = 1; delete state.tspent[tKey(n, i)]; clearInterval(trTick); save();
  const w = $('#wait'); if (!w || state.lvl !== n || (state.step[n] || 0) !== i || state.page !== 'seance') return;
  w.outerHTML = footBtn(n, i, L(n).steps[i]); bindFoot(n);
}
function regulate(n, i, s) {
  clearInterval(trTick);
  if (!isLocked(n, i, s) || s.type === 'video') return;
  const k = tKey(n, i), need = tNeed(s);
  trTick = setInterval(() => {
    if (document.hidden || state.page !== 'seance') return;
    state.tspent[k] = (state.tspent[k] || 0) + 1;
    if (state.tspent[k] >= need) return unlock(n, i);
    const t = $('#waitT'); if (t) t.textContent = waitLabel(n, i, s);
    if (state.tspent[k] % 5 === 0) save();
  }, 1000);
}
function trVideo(v) {
  const n = state.lvl, i = state.step[n] || 0;
  if (!isLocked(n, i, L(n).steps[i])) return;
  let max = 0;
  v.addEventListener('timeupdate', () => { if (!v.seeking && v.currentTime > max && v.currentTime - max < 2) max = v.currentTime; });
  v.addEventListener('seeking', () => { if (v.currentTime > max + 0.5) v.currentTime = max; });
  v.addEventListener('ratechange', () => { if (v.playbackRate > 1) v.playbackRate = 1; });
  v.addEventListener('ended', () => { if (max >= v.duration - 1.5) unlock(n, i); });
}

/* ---------- Simulateur d'amendes (art. 99) ---------- */
const INF = [['Pratique interdite (art. 5)', 35, 7], ['Opérateurs, transparence (art. 50)', 15, 3], ['Informations inexactes', 7.5, 1], ['Maîtrise de l\'IA (art. 4)', null, null]];
const CA_STEPS = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
const fmt = m => m >= 1000 ? (m / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' Md€' : m >= 1 ? m.toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' M€' : Math.round(m * 1e6).toLocaleString('fr-FR') + ' €';
function calcHTML() {
  const c = state.calc, inf = INF[c.inf], ca = c.ca;
  let res, formula;
  if (inf[1] === null) { res = 'Aucun plafond'; formula = 'L\'article 4 n\'apparaît pas dans le barème de l\'article 99. Mais un défaut de formation aggrave une autre infraction (art. 99(7)(g)), et le droit national peut sanctionner.'; }
  else {
    const pct = ca * inf[2] / 100, low = c.type === 'pme' || (c.type === 'smc' && c.inf > 0);
    res = fmt(low ? Math.min(inf[1], pct) : Math.max(inf[1], pct));
    formula = `Le plus ${low ? 'bas' : 'élevé'} entre ${fmt(inf[1])} et ${inf[2]} % × ${fmt(ca)} (= ${fmt(pct)}).${c.type === 'smc' && c.inf === 0 ? ' Pour les SMC, pas d\'allègement sur les pratiques interdites.' : ''}`;
  }
  return `
  <div class="row between" style="margin-bottom:6px"><h2 style="margin:0">Jusqu'à 7 % du chiffre d'affaires mondial</h2>${tagChip('Loi')}</div>
  <p class="lead" style="margin-bottom:18px">L'article 99 fixe trois niveaux d'amendes. Testez le simulateur : <b>ce sont des plafonds, pas des amendes probables</b>.</p>
  <div class="calc">
    <div class="ctl">
      <div><label>Type d'entreprise</label><div class="seg" id="cType">${[['grand', 'Entreprise'], ['pme', 'PME'], ['smc', 'SMC']].map(([k, t]) => `<button data-k="${k}" class="${c.type === k ? 'on' : ''}" aria-pressed="${c.type === k}">${t}</button>`).join('')}</div></div>
      <div><label for="cCa">Chiffre d'affaires mondial : <b style="color:var(--d)">${fmt(ca)}</b></label><input type="range" id="cCa" min="0" max="${CA_STEPS.length - 1}" step="1" value="${Math.max(0, CA_STEPS.indexOf(ca))}"></div>
      <div><label>Manquement</label><div class="seg" id="cInf">${INF.map((x, k) => `<button data-k="${k}" class="${c.inf === k ? 'on' : ''}" aria-pressed="${c.inf === k}">${x[0]}</button>`).join('')}</div></div>
      <div><label>Exemples du cours</label><div class="ex">
        <button data-ex="pme,20,0">PME 20 M€ · art. 5</button><button data-ex="pme,20,1">PME 20 M€ · art. 50</button><button data-ex="grand,2000,0">Groupe 2 Md€ · art. 5</button>
      </div></div>
    </div>
    <div>
      <div class="calcres" aria-live="polite"><p>Plafond d'amende</p><div class="big">${res}</div><p>${inf[0]}</p><div class="formula">${formula}</div></div>
      <ul class="checks compact" style="margin-top:14px">
        <li><span class="ck">${ic('check')}</span><div><b>Qui paie ?</b><small>L'entreprise. Le salarié répond sur le plan disciplinaire, contractuel ou pénal.</small></div></li>
        <li><span class="ck">${ic('check')}</span><div><b>Ce qui pèse sur le montant</b><small>Gravité, durée, personnes touchées, coopération, auto-signalement, mesures prises (art. 99(7)).</small></div></li>
      </ul>
    </div>
  </div>`;
}
function bindCalc() {
  const r = () => { $('#p-seance .stage-body').innerHTML = calcHTML(); bindCalc(); };
  $$('#cType button').forEach(b => b.onclick = () => { state.calc.type = b.dataset.k; r(); });
  $$('#cInf button').forEach(b => b.onclick = () => { state.calc.inf = +b.dataset.k; r(); });
  $('#cCa').oninput = e => { state.calc.ca = CA_STEPS[+e.target.value]; r(); };
  $$('[data-ex]').forEach(b => b.onclick = () => { const [t, ca, inf] = b.dataset.ex.split(','); Object.assign(state.calc, { type: t, ca: +ca, inf: +inf }); r(); });
}

/* =========================================================
   FICHES
   ========================================================= */
function renderFiches() {
  const n = state.lvl, fs = FICHES[n];
  if (guard(n, $('#p-fiches'))) return;
  if (state.fiche > fs.length - 1) state.fiche = 0;
  const unl = ficheUnlocked(n, state.fiche);
  $('#p-fiches').innerHTML = `
  <div class="head"><div><p class="eyebrow">Niveau ${n} · ${L(n).title}</p><h1>Fiches pratiques</h1><p>Une fiche se débloque à la fin de chaque module. Gardez-les sous la main.</p></div>
    <div class="row"><div class="tabs" id="ftabs" role="tablist">${fs.map((f, k) => `<button role="tab" aria-selected="${k === state.fiche}" data-f="${k}" class="${k === state.fiche ? 'on' : ''}">${ficheUnlocked(n, k) ? '' : '🔒 '}Fiche ${ficheNum(n, k)}</button>`).join('')}</div><button class="btn sec" id="fPdf" ${unl ? '' : 'disabled'}>${ic('down')} Télécharger en PDF</button></div></div>
  <div class="card pad" style="padding:32px">
    ${unl ? `<p class="eyebrow">Fiche pratique ${ficheNum(n, state.fiche)}</p><h2 style="margin:4px 0 20px">${fs[state.fiche].title}</h2>${fs[state.fiche].render()}`
      : `<div class="empty"><div class="stepico" style="margin:0 auto 12px;width:48px;height:48px">${ic('lock')}</div><h3>${fs[state.fiche].title}</h3><p style="margin-top:6px">Cette fiche se débloque quand vous atteignez la fin du module ${state.fiche + 1} de la séance.</p><a class="btn pri" style="margin-top:16px" href="#seance">Aller à la séance ${ic('right')}</a></div>`}
  </div>`;
  $$('#ftabs button').forEach(b => b.onclick = () => { state.fiche = +b.dataset.f; save(); renderFiches(); });
  $('#fPdf').onclick = () => printFiche(n, state.fiche);
}

/* =========================================================
   SCÉNARIOS
   ========================================================= */
const RISK = [['interdit', 'Interdit', 'var(--ko)'], ['haut', 'Haut risque', 'var(--a)'], ['transp', 'Transparence', 'var(--s)'], ['minimal', 'Minimal', '#A99AD6']];
function renderScenarios() {
  const n = state.lvl;
  if (guard(n, $('#p-scenarios'))) return;
  const list = L(n).scn, k = state.scn[n] || 0, sc = list[k], a = state.answers[sc.id];
  const good = sc.opts.find(o => o[1] === 'ok');
  $('#p-scenarios').innerHTML = `
  <div class="head"><div><p class="eyebrow">Niveau ${n} · Partie 2</p><h1>S'entraîner avec des scénarios</h1><p>Mettez-vous à la place d'un collègue de Nexalis. Chaque choix a une conséquence, sans risque réel : c'est fait pour s'entraîner.</p></div><span class="chip">${ic('clock')} ≈ 7 min</span></div>
  <div class="scn-top"><div class="scn-tabs" role="tablist">${list.map((x, j) => { const d = state.answers[x.id] !== undefined; return `<button role="tab" aria-selected="${j === k}" class="scn-tab ${j === k ? 'on' : ''} ${d && j !== k ? 'ok' : ''}" data-i="${j}"><span class="n">${d && j !== k ? ic('check') : j + 1}</span>${x.t}</button>`; }).join('')}</div></div>
  <div class="card scn">
    <div class="l">
      <div class="illus">${ILLUS[sc.illus]()}</div>
      <p class="eyebrow" style="margin-top:20px">Scénario ${k + 1} · ${sc.theme}</p>
      <h2 style="margin:4px 0 4px">${sc.title}</h2>
      <p class="muted">${sc.who}</p>
      <div class="ctx">${sc.ctx.map((c, j) => `<div>${ic(['users', 'alert', 'clock'][j])}<span>${c}</span></div>`).join('')}</div>
    </div>
    <div class="r">
      <div class="q" style="font-size:24px">${sc.q}</div>
      <div class="opts ${a !== undefined ? 'locked' : ''}" id="sopts">${sc.opts.map((o, j) => {
        let cls = '';
        if (a !== undefined) cls = j === a ? (o[1] === 'ok' ? 'right' : 'wrong') : (o[1] === 'ok' ? 'right' : 'dim');
        return `<button class="opt ${cls}" data-i="${j}" ${a !== undefined ? 'disabled' : ''}><span class="k">${'ABC'[j]}</span><span class="tx">${o[0]}</span></button>`;
      }).join('')}</div>
      <div aria-live="polite">${a !== undefined ? `<div class="fb show ${sc.opts[a][1]} conseq"><h4>${ic(sc.opts[a][1] === 'ok' ? 'check' : sc.opts[a][1] === 'mid' ? 'alert' : 'x')} ${sc.opts[a][2]}</h4><p><b>Conséquence :</b> ${sc.opts[a][3]}</p>${sc.opts[a][1] !== 'ok' ? `<p style="margin-top:8px"><b>La bonne pratique :</b> ${good[0]} ${good[3]}</p>` : ''}<span class="lawchip">${ic('scale')} ${sc.law}</span></div>
        ${sc.risk ? `<div class="gauge"><small>Jauge de risque de la situation</small><div class="segs">${RISK.map(r => `<div class="${r[0] === sc.risk ? 'on' : ''}" style="${r[0] === sc.risk ? `background:${r[2]}` : ''}">${r[1]}</div>`).join('')}</div></div>` : ''}`
        : `<div class="tip">${ic('bulb')}<span>Prenez le temps de lire chaque option. Votre réponse compte pour le rapport de niveau.</span></div>`}</div>
      <div class="row between" style="margin-top:24px">
        <button class="btn sec" id="sprev" ${k === 0 ? 'disabled' : ''}>${ic('left')} Précédent</button>
        ${(() => { const ms = missingScn(n).filter(j => j !== k);
          if (k < list.length - 1) return `<button class="btn pri" id="snext">Scénario suivant ${ic('right')}</button>`;
          if (ms.length) return `<button class="btn pri" id="sgo" data-i="${ms[0]}">${ic('help')} Répondre ${ms.length > 1 ? `aux ${ms.length} scénarios restants` : 'au scénario restant'}</button>`;
          const mq = missingSteps(n).length;
          return mq ? `<button class="btn pri" id="qgo">${ic('help')} Répondre ${mq > 1 ? `aux ${mq} questions restantes` : 'à la question restante'}</button>` : stats(n).quizPassed ? `<a class="btn pri" href="#recap" data-tab="1">Voir mon rapport ${ic('right')}</a>` : `<a class="btn pri" href="#quiz">${ic('target')} Passer le quiz de validation</a>`; })()}
      </div>
    </div>
  </div>`;
  $$('.scn-tab').forEach(b => b.onclick = () => { state.scn[n] = +b.dataset.i; save(); renderScenarios(); });
  if (a === undefined) $$('#sopts .opt').forEach(b => b.onclick = () => { answer({ ...sc, kind2: 's' }, +b.dataset.i); renderScenarios(); });
  $('#sprev').onclick = () => { state.scn[n] = k - 1; save(); renderScenarios(); };
  const nx = $('#snext'); if (nx) nx.onclick = () => { state.scn[n] = k + 1; save(); renderScenarios(); };
  const sg = $('#sgo'); if (sg) sg.onclick = () => { state.scn[n] = +sg.dataset.i; save(); renderScenarios(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const qg = $('#qgo'); if (qg) qg.onclick = () => { state.catchup[n] = 1; state.step[n] = missingSteps(n)[0]; go('seance'); };
  renderBell();
}

/* =========================================================
   RÉCAP & RAPPORT
   ========================================================= */
function renderRecap() {
  const n = state.lvl;
  if (guard(n, $('#p-recap'))) return;
  $('#p-recap').innerHTML = `
  <div class="head"><div><p class="eyebrow">Niveau ${n} · Fin de niveau</p><h1>${state.recapTab ? 'Rapport de niveau' : 'Fiche récap'}</h1><p>${state.recapTab ? 'Chacune de vos réponses, la bonne réponse et l\'explication. Le rapport se met à jour à chaque réponse.' : `Tout le niveau « ${L(n).title} » sur une seule page.`}</p></div>
    <div class="row"><div class="tabs" id="rtabs" role="tablist"><button role="tab" data-t="0">Fiche récap</button><button role="tab" data-t="1">Rapport de niveau</button></div><button class="btn sec" id="rPdf">${ic('down')} PDF</button></div></div>
  ${state.recapTab ? reportHTML(n) : recapHTML(n)}`;
  $$('#rtabs button').forEach(b => { b.classList.toggle('on', +b.dataset.t === state.recapTab); b.setAttribute('aria-selected', +b.dataset.t === state.recapTab); b.onclick = () => { state.recapTab = +b.dataset.t; save(); renderRecap(); }; });
  $('#rPdf').onclick = () => state.recapTab ? printDoc(`Rapport de niveau · Niveau ${n}`, reportHTML(n, true), n) : printDoc(`Fiche récap · Niveau ${n} · ${L(n).title}`, recapHTML(n, true), n);
  const rb = $('#retry'); if (rb) rb.onclick = () => retry(n);
}
function recapHTML(n, print) {
  return `<div class="grid recap">${L(n).recap.map((r, k) => `
    <div class="card rc ${r[3] ? 'dark' : ''}"><span class="n">0${k + 1}</span><h3>${r[0]}</h3>${r[1].startsWith('<ul') ? r[1] : `<p>${r[1]}</p>`}<p class="muted" style="margin-top:8px;font-size:12px;${r[3] ? 'color:#fff;opacity:.7' : ''}">${r[2]}</p></div>`).join('')}
  </div>
  ${print ? '' : `<div class="uptodate">${ic('clock')}<span>Contenu à jour au <b>${CONTENT_DATE}</b>. Les points marqués ${tagChip('À vérifier')} ou ${tagChip('Projet')} peuvent évoluer.</span></div>`}`;
}
function reportHTML(n, print) {
  const st = stats(n), qs = questionsOf(n), mq = qs.filter(q => q.kind2 === 'q');
  const half = Math.ceil(mq.length / 2);
  const parts = [[L(n).modules[0], mq.slice(0, half)], [L(n).modules[1], mq.slice(half)], ['Scénarios', qs.filter(q => q.kind2 === 's')]];
  const pp = list => { const v = list.map(q => credit(q, state.answers[q.id])).filter(c => c !== null); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length * 100) : null; };
  const goodOf = q => q.kind2 === 'q' ? q.opts.find(o => o[1])[0] : q.opts.find(o => o[1] === 'ok')[0];
  const explain = (q, a) => q.kind2 === 'q' ? (q.opts[a][1] ? q.ok : q.ko) : q.opts.find(o => o[1] === 'ok')[3];
  const weak = KNOW.filter(k => k[0] === n && knowPct(k[3]) < 80 && k[3].some(id => state.answers[id] !== undefined));
  const action = st.validated ? (!SC && n < 4 ? `<a class="btn pri wide" href="#seance" data-lvl-go="${n + 1}">Commencer le niveau ${n + 1} ${ic('right')}</a>` : `<p class="muted" style="margin-top:20px;font-size:13px">${SC ? 'Niveau validé : votre résultat est transmis à la plateforme.' : 'Parcours terminé, bravo !'}</p>`)
    : st.complete && st.score >= 80 ? `<a class="btn pri wide" href="#quiz">${ic('target')} ${st.quizTries ? 'Retenter' : 'Passer'} le quiz de validation</a>`
    : st.complete ? `<button class="btn pri wide" id="retry">${ic('reset')} Retenter les questions ratées</button>`
    : `<a class="btn pri wide" href="#seance">Reprendre la séance ${ic('right')}</a>`;
  return `<div class="grid report">
    <div class="card score">
      ${st.validated ? `<span class="chip ok">${ic('check')} Niveau ${n} validé</span>` : st.complete && st.score >= 80 ? `<span class="chip pk">${ic('target')} Quiz à réussir</span>` : st.complete ? `<span class="chip ko">${ic('x')} Sous le seuil</span>` : `<span class="chip pk">${st.ans ? 'En cours' : 'Pas commencé'}</span>`}
      ${ring(st.score, 168, st.validated ? 'var(--ok)' : 'var(--a)')}
      <p class="muted" style="font-size:13px">Seuil de validation : <b style="color:var(--d)">80 %</b></p>
      <div class="kv">
        <div><b>${st.ans} / ${st.total}</b><small>réponses données</small></div>
        <div><b>${Number.isInteger(st.pts) ? st.pts : st.pts.toFixed(1)}</b><small>points</small></div>
      </div>
      <div class="parts">${parts.map(p => { const v = pp(p[1]); return `<div><div class="row"><span>${p[0].replace(/^Module \d · /, '')}</span><b>${v === null ? '—' : v + ' %'}</b></div><div class="bar thin" style="margin-top:6px"><i style="width:${v || 0}%;${v !== null && v < 100 ? 'background:var(--a)' : ''}"></i></div></div>`; }).join('')}</div>
      ${print ? '' : action}
    </div>
    <div>
      <div class="card pad" style="margin-bottom:20px">
        <div class="row between"><h4>Trace de formation · registre art. 4</h4>${tagChip('Loi')}</div>
        <div class="trace">
          <div><small>Apprenant</small><b>${displayName() || '—'}</b></div>
          <div><small>Date</small><b>${state.val[n] ? fdate(state.val[n]) : st.complete ? fdate(state.last) : '—'}</b></div>
          <div><small>Version</small><b>${CONTENT_VERSION}</b></div>
          <div><small>Score</small><b>${st.score} %</b></div>
          <div><small>Statut</small><b>${st.validated ? 'Validé' : st.complete ? 'À retenter' : st.ans ? 'En cours' : 'Pas commencé'}</b></div>
        </div>
      </div>
      ${weak.length && !print ? `<div class="card" style="margin-bottom:20px;padding:18px 20px;display:flex;gap:14px;align-items:center;background:var(--pk);border-color:#F4C6DB">
        <span class="stepico" style="background:#fff;color:var(--a)">${ic('target')}</span>
        <div style="flex:1"><b>À revoir : ${weak.map(w => w[1]).join(', ')}</b><p class="muted" style="font-size:13px">Relisez la fiche pratique correspondante, puis retentez la question.</p></div>
        <a class="btn sec" href="#fiches">Réviser</a></div>` : ''}
      <div class="card">
        ${qs.map(q => {
          const a = state.answers[q.id], c = credit(q, a);
          return `<div class="qa">
            <div class="st ${c === null ? 'pending' : c === 1 ? 'ok' : 'ko'}">${ic(c === null ? 'clock' : c === 1 ? 'check' : c === .5 ? 'alert' : 'x')}</div>
            <div>
              <p class="eyebrow" style="font-size:11px">${q.kind2 === 's' ? 'Scénario · ' + q.theme : q.label}</p>
              <h4>${q.kind2 === 's' ? q.title + ' : ' + q.q : q.q}</h4>
              <div class="ans">
                <div class="you ${c === null ? 'pend' : c === 1 ? 'ok' : 'ko'}"><small>Votre réponse</small>${a === undefined ? 'Pas encore répondu' : q.opts[a][0]}</div>
                <div><small>Bonne réponse</small>${a === undefined ? '<span class="muted">Visible après votre réponse</span>' : goodOf(q)}</div>
              </div>
              ${a !== undefined ? `<p class="exp">${ic('bulb')}<span>${explain(q, a)}</span></p>` : print ? '' : `<a class="btn sec answer-now" href="#${q.kind2 === 's' ? 'scenarios' : 'seance'}" ${q.kind2 === 's' ? `data-scn="${L(n).scn.findIndex(x => x.id === q.id)}"` : `data-step="${L(n).steps.findIndex(x => x.id === q.id)}" data-catch="1"`}>${ic('help')} Répondre maintenant</a>`}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

/* =========================================================
   CONNAISSANCES
   ========================================================= */
function renderConnaissances() {
  const K = knowList(), vals = K.map(k => knowPct(k[3]));
  const avg = globalKnow(), mastered = vals.filter(v => v >= 80).length, prog = vals.filter(v => v > 0 && v < 80).length;
  const list = K.map((k, j) => [...k, vals[j]]).filter(k => SC || !state.kFilter || k[0] === state.kFilter);
  const lv = [...new Set(list.map(k => k[0]))];
  $('#p-connaissances').innerHTML = `
  <div class="head"><div><h1>Mes connaissances</h1><p>Chaque notion ${SC ? 'du niveau' : 'du parcours'}, avec votre taux de maîtrise. Il se calcule à partir de vos réponses aux questions et aux scénarios qui la travaillent.</p></div></div>
  <div class="grid kn-top">
    <div class="card kpi">${ring(avg, 84)}<div><b>Maîtrise globale</b><small>sur ${K.length} notions</small></div></div>
    <div class="card kpi"><span class="stepico" style="background:var(--okbg);color:var(--ok)">${ic('check')}</span><div><b>${mastered}</b><small>notions maîtrisées</small></div></div>
    <div class="card kpi"><span class="stepico" style="background:var(--pk);color:var(--a)">${ic('target')}</span><div><b>${prog}</b><small>en cours d'acquisition</small></div></div>
    <div class="card kpi"><span class="stepico">${ic('lock')}</span><div><b>${K.length - mastered - prog}</b><small>à découvrir</small></div></div>
  </div>
  ${SC ? '' : `<div class="filters" id="kf">${['Toutes', 'Niveau 1', 'Niveau 2', 'Niveau 3', 'Niveau 4'].map((t, k) => `<button class="fbtn ${state.kFilter === k ? 'on' : ''}" data-i="${k}" aria-pressed="${state.kFilter === k}">${t}</button>`).join('')}</div>`}
  ${lv.map(l => `
    <div class="sec-title"><span class="lv">${l}</span><h3>${L(l).name} · ${L(l).title}</h3><span class="line"></span></div>
    <div class="grid kn">${list.filter(k => k[0] === l).map(k => {
      const v = k[4], st = v >= 80 ? ['ok', 'Maîtrisée'] : v > 0 ? ['pk', 'En cours'] : ['grey', 'À découvrir'];
      const first = k[3][0], isS = first[0] === 's';
      return `<div class="card kc ${v === 0 ? 'lock' : ''}">
        <div class="row between">${ring(v, 52, v >= 80 ? 'var(--ok)' : v > 0 ? 'var(--a)' : 'var(--l2)')}<span class="chip ${st[0]}">${st[1]}</span></div>
        <h4>${k[1]}</h4><p>${k[2]}</p>
        <small class="muted" style="font-size:11.5px">${k[3].length} question${k[3].length > 1 ? 's' : ''} liée${k[3].length > 1 ? 's' : ''}</small>
        <a class="btn ghost" style="padding:6px 0;justify-content:flex-start" href="#${isS ? 'scenarios' : 'seance'}" data-lvl-go="${l}" ${isS ? `data-scn="${L(l).scn.findIndex(s => s.id === first)}"` : `data-step="${L(l).steps.findIndex(s => s.id === first)}"`}>${v >= 80 ? 'Revoir' : v > 0 ? 'Continuer' : 'Découvrir'} ${ic('right')}</a>
      </div>`;
    }).join('')}</div>`).join('')}`;
  $$('#kf .fbtn').forEach(b => b.onclick = () => { state.kFilter = +b.dataset.i; save(); renderConnaissances(); });
}

/* =========================================================
   RESSOURCES
   ========================================================= */
function renderRessources() {
  const f = SC ? CFG.level : state.rLevel;
  const lvls = f ? [f] : LEVELS;
  const off = OFFICIAL.filter(o => !f || o[4] === 0 || o[4] === f);
  $('#p-ressources').innerHTML = `
  <div class="head"><div><h1>Ressources</h1><p>Les fiches ${SC ? 'du niveau' : 'du parcours'}, les textes officiels et les guides cités dans le cours. Les ressources externes se citent et se consultent en lien.</p></div></div>
  ${SC ? '' : `<div class="tabs" id="rl" role="tablist" style="margin-bottom:8px">${['Tous les niveaux', 'Niveau 1', 'Niveau 2', 'Niveau 3', 'Niveau 4'].map((t, k) => `<button role="tab" aria-selected="${f === k}" class="${f === k ? 'on' : ''}" data-i="${k}">${t}</button>`).join('')}</div>`}
  <div class="res-layout">
    <div>
      ${lvls.map(l => `
        <div class="sec-title"><span class="lv" style="${status(l) === 'lock' ? 'background:var(--l2)' : ''}">${l}</span><h3>Niveau ${l} · ${L(l).title}</h3>${status(l) === 'lock' ? `<span class="chip grey">${ic('lock')} Après le niveau ${l - 1}</span>` : ''}<span class="line"></span></div>
        <div class="card">
          ${FICHES[l].map((fi, k) => { const u = ficheUnlocked(l, k) && status(l) !== 'lock'; return `<div class="res"><span class="ty fiche">${ic('file')}</span><div class="t"><b>Fiche pratique ${ficheNum(l, k)} · ${fi.title}</b><small>${u ? 'Débloquée' : 'Se débloque à la fin du module ' + (k + 1)}</small></div><span class="fmt">PDF · A4</span>
            ${u ? `<button class="btn sec icon" data-pdf="${l}-${k}" aria-label="Télécharger la fiche ${ficheNum(l, k)} en PDF">${ic('down')}</button><a class="btn sec icon" href="#fiches" data-lvl-go="${l}" data-fiche="${k}" aria-label="Ouvrir la fiche">${ic('right')}</a>` : `<span class="btn sec icon" aria-disabled="true">${ic('lock')}</span>`}</div>`; }).join('')}
          <div class="res"><span class="ty quiz">${ic('award')}</span><div class="t"><b>Fiche récap · Niveau ${l}</b><small>Le niveau sur une page</small></div><span class="fmt">PDF · A4</span>
            ${status(l) !== 'lock' ? `<button class="btn sec icon" data-recap="${l}" aria-label="Télécharger la fiche récap en PDF">${ic('down')}</button><a class="btn sec icon" href="#recap" data-lvl-go="${l}" data-tab="0" aria-label="Ouvrir la fiche récap">${ic('right')}</a>` : `<span class="btn sec icon" aria-disabled="true">${ic('lock')}</span>`}</div>
        </div>`).join('')}
      <div class="sec-title"><span class="lv" style="background:var(--d)">${ic('scale')}</span><h3>Textes et guides officiels</h3><span class="line"></span></div>
      <div class="card">${off.map(o => `<a class="res ext" href="${o[2]}" target="_blank" rel="noopener"><span class="ty ${o[3] === 'Loi' ? 'loi' : 'modele'}">${ic(o[3] === 'Loi' ? 'scale' : 'book')}</span><div class="t"><b>${o[0]}</b><small>${o[1]}</small></div>${tagChip(o[3])}<span class="btn sec icon">${ic('link')}</span></a>`).join('')}</div>
      <div class="sec-title"><span class="lv" style="background:var(--s)">${ic('compass')}</span><h3>Pour aller plus loin</h3><span class="line"></span></div>
      <div class="card">${FURTHER.map(o => `<a class="res ext" href="${o[1]}" target="_blank" rel="noopener"><span class="ty video">${ic('link')}</span><div class="t"><b>${o[0]}</b><small>Ressource externe · à citer, pas à recopier</small></div><span class="btn sec icon">${ic('link')}</span></a>`).join('')}</div>
    </div>
    <aside class="side-col">
      <div class="card pad">
        <h3 style="margin-bottom:12px">Lire les étiquettes</h3>
        <div class="legend">
          <div>${tagChip('Loi')}<span>Texte adopté : AI Act modifié par l'Omnibus, ou loi luxembourgeoise votée.</span></div>
          <div>${tagChip('Guide')}<span>Lignes directrices, Q&R, codes de bonnes pratiques : non contraignants.</span></div>
          <div>${tagChip('Projet')}<span>Texte non adopté.</span></div>
          <div>${tagChip('À vérifier')}<span>Point ambigu ou confirmé seulement par une source secondaire.</span></div>
        </div>
      </div>
      <div class="card pad">
        <h3 style="margin-bottom:6px">Glossaire officiel</h3>
        <p class="muted" style="font-size:12px;margin-bottom:8px">Termes du texte anglais et du texte officiel français.</p>
        <div class="gl">${GLOSSARY.map(g => `<div>${g[0]}</div><div>${g[1]}</div>`).join('')}</div>
      </div>
      <div class="card pad" style="background:var(--d);border-color:var(--d);color:#fff">
        <p class="eyebrow" style="color:#F7A8CC">Une question sur l'IA ?</p>
        <p style="margin-top:6px;font-size:13.5px">En interne, contactez votre DPO. La CNPD répond aussi aux questions à l'adresse <b>ia@cnpd.lu</b>.</p>
      </div>
    </aside>
  </div>`;
  $$('#rl button').forEach(b => b.onclick = () => { state.rLevel = +b.dataset.i; save(); renderRessources(); });
  $$('[data-pdf]').forEach(b => b.onclick = () => { const [l, k] = b.dataset.pdf.split('-').map(Number); printFiche(l, k); });
  $$('[data-recap]').forEach(b => b.onclick = () => { const l = +b.dataset.recap; printDoc(`Fiche récap · Niveau ${l} · ${L(l).title}`, recapHTML(l, true), l); });
}

/* =========================================================
   PROFIL
   ========================================================= */
function fmtTime(sec) { const h = Math.floor(sec / 3600), m = Math.round(sec % 3600 / 60); return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`; }
function renderProfil() {
  const all = LEVELS.flatMap(questionsOf);
  const answered = all.filter(q => state.answers[q.id] !== undefined);
  const good = answered.filter(q => credit(q, state.answers[q.id]) === 1).length;
  const fichesU = LEVELS.reduce((s, n) => s + [0, 1].filter(k => ficheUnlocked(n, k)).length, 0);
  const scnOk = LEVELS.flatMap(n => L(n).scn).filter(s => { const a = state.answers[s.id]; return a !== undefined && s.opts[a][1] === 'ok'; }).length;
  const prof = PROFILES.find(p => p[0] === state.role);
  const K = knowList();
  $('#p-profil').innerHTML = `
  <div class="head"><div><h1>Mon profil</h1><p>Vos informations, votre progression et vos préférences. ${SC ? 'Votre identité vient de la plateforme de formation.' : 'Ces informations restent enregistrées dans ce navigateur.'}</p></div>
    <button class="btn sec" id="attest">${ic('down')} Attestation de suivi (PDF)</button></div>
  <div class="grid profile">
    <div class="card pad idcard">
      <div class="avatar xl">${initials()}</div>
      ${SC ? `<h2>${displayName() || 'Apprenant'}</h2><p class="muted">${learner.id ? 'Identifiant : ' + learner.id : 'Identifiant fourni par la plateforme'}</p>`
        : `<label class="fld"><span>Prénom et nom</span><input id="pName" type="text" value="${state.name.replace(/"/g, '&quot;')}" placeholder="Ex. : Camille Laurent" autocomplete="name"></label><p class="muted" style="font-size:12px">Utilisé pour l'attestation et le rapport.</p>`}
      <div class="kvlist">
        <div><small>Début de la formation</small><b>${fdate(state.start)}</b></div>
        <div><small>Dernière activité</small><b>${fdate(state.last)}</b></div>
        <div><small>Temps passé</small><b>${fmtTime(state.time)}</b></div>
        <div><small>Version du contenu</small><b>${CONTENT_VERSION} · ${CONTENT_DATE}</b></div>
        <div><small>Suivi</small><b>${SC ? (lmsOk ? 'Connecté à la plateforme (SCORM 1.2)' : 'Hors plateforme : sauvegarde locale') : 'Sauvegarde dans ce navigateur'}</b></div>
      </div>
    </div>
    <div style="display:grid;gap:20px;align-content:start">
      <div class="grid stats4">
        ${[['help', answered.length + ' / ' + all.length, 'questions répondues'], ['check', answered.length ? Math.round(good / answered.length * 100) + ' %' : '—', 'de bonnes réponses'], ['file', fichesU + ' / ' + LEVELS.length * 2, 'fiches débloquées'], ['compass', scnOk + ' / ' + LEVELS.length * 3, 'scénarios réussis'], ['brain', K.filter(k => knowPct(k[3]) >= 80).length + ' / ' + K.length, 'notions maîtrisées'], ['award', LEVELS.filter(n => stats(n).validated).length + ' / ' + LEVELS.length, SC ? 'niveau validé' : 'niveaux validés']].map(x => `<div class="card kpi sm"><span class="stepico">${ic(x[0])}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('')}
      </div>
      <div class="card pad">
        <div class="row between" style="margin-bottom:6px"><h3>Mon métier</h3><span class="muted" style="font-size:12px">Ce que chaque profil doit retenir</span></div>
        <p class="muted" style="font-size:13px;margin-bottom:12px">Choisissez votre profil : le parcours reste le même, mais vous voyez ce qui vous concerne en priorité.</p>
        <div class="seg" id="role">${PROFILES.map(p => `<button data-r="${p[0]}" class="${state.role === p[0] ? 'on' : ''}" aria-pressed="${state.role === p[0]}">${p[1].split(',')[0]}</button>`).join('')}</div>
        ${prof ? `<div class="profbox">
          <p class="quote">${prof[4]}</p>
          <div class="two" style="gap:14px;margin-top:12px;align-items:start">
            <div><small>Ce qui s'applique déjà</small><p>${prof[2]}</p></div>
            <div><small>Ce qui arrive</small><p>${prof[3]}</p></div>
          </div></div>` : ''}
      </div>
      <div class="card pad">
        <h3 style="margin-bottom:10px">Progression et trace de formation</h3>
        <table><tr><th>Niveau</th><th>Statut</th><th>Score</th><th>Validé le</th><th>Prochains rappels</th></tr>
          ${LEVELS.map(n => { const st = stats(n), v = state.val[n]; return `<tr><td><b>${n} · ${L(n).title}</b></td><td>${st.validated ? '<span class="chip ok">Validé</span>' : st.complete && st.score >= 80 ? '<span class="chip pk">Quiz à réussir</span>' : st.complete ? '<span class="chip ko">À retenter</span>' : st.ans ? '<span class="chip pk">En cours</span>' : status(n) === 'lock' ? '<span class="chip grey">Verrouillé</span>' : '<span class="chip grey">À commencer</span>'}</td><td>${st.ans ? st.score + ' %' : '—'}</td><td>${fdate(v)}</td><td>${v ? `J+7 : ${fdate(addDays(v, 7))}<br>J+30 : ${fdate(addDays(v, 30))}` : '—'}</td></tr>`; }).join('')}
        </table>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr">
        <div class="card pad">
          <h3 style="margin-bottom:10px">Confort de lecture</h3>
          <label class="muted" style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em">Taille du texte</label>
          <div class="seg" id="fs" style="margin:8px 0 16px">${['Normale', 'Grande', 'Très grande'].map((t, k) => `<button data-k="${k}" class="${state.prefs.fs === k ? 'on' : ''}" aria-pressed="${state.prefs.fs === k}">${t}</button>`).join('')}</div>
          <label class="switch"><input type="checkbox" id="rm" ${state.prefs.rm ? 'checked' : ''}><span></span>Réduire les animations</label>
          <label class="switch" style="margin-top:12px"><input type="checkbox" id="ns" ${state.prefs.ns ? 'checked' : ''}><span></span>Masquer le menu de gauche</label>
        </div>
        <div class="card pad">
          <h3 style="margin-bottom:10px">Contacts utiles</h3>
          <ul class="checks compact">
            <li><span class="ck">${ic('user')}</span><div><b>Votre DPO</b><small>Pour signaler un outil d'IA ou poser une question en interne.</small></div></li>
            <li><span class="ck">${ic('msg')}</span><div><b>CNPD · ia@cnpd.lu</b><small>Questions sur l'IA à l'autorité luxembourgeoise.</small></div></li>
            <li><span class="ck">${ic('link')}</span><div><b><a href="https://ai-act-service-desk.ec.europa.eu/en" target="_blank" rel="noopener" style="text-decoration:underline">AI Act Service Desk</a></b><small>Le guichet officiel de la Commission.</small></div></li>
          </ul>
        </div>
        <div class="card pad treg">
          <div class="row between" style="align-items:flex-start;gap:12px"><h3 style="margin-bottom:6px">Temps régulé</h3><span class="chip grey">Option</span></div>
          <p class="muted" style="font-size:14px;margin-bottom:12px">Chaque page de cours reste affichée au moins un tiers du temps indiqué, et chaque vidéo doit être vue en entier avant de passer à la suite.</p>
          <div class="seg" id="tr" role="group" aria-label="Temps régulé">${[['Oui', 1], ['Non', 0]].map(([t, k]) => `<button data-k="${k}" class="${(state.prefs.tr ? 1 : 0) === k ? 'on' : ''}" aria-pressed="${(state.prefs.tr ? 1 : 0) === k}">${t}</button>`).join('')}</div>
        </div>
      </div>
    </div>
  </div>`;
  const nm = $('#pName'); if (nm) nm.onchange = () => { state.name = nm.value.trim().slice(0, 60); save(); renderNav(); renderProfil(); };
  $$('#role button').forEach(b => b.onclick = () => { state.role = state.role === b.dataset.r ? '' : b.dataset.r; save(); renderNav(); renderProfil(); });
  $$('#fs button').forEach(b => b.onclick = () => { state.prefs.fs = +b.dataset.k; applyPrefs(); save(); renderProfil(); });
  $('#rm').onchange = e => { state.prefs.rm = e.target.checked ? 1 : 0; applyPrefs(); save(); };
  $('#ns').onchange = e => { state.prefs.ns = e.target.checked ? 1 : 0; applyPrefs(); save(); };
  $$('#tr button').forEach(b => b.onclick = () => { state.prefs.tr = +b.dataset.k; save(); renderProfil(); });
  $('#attest').onclick = printAttestation;
}
function applyPrefs() {
  document.documentElement.style.setProperty('--zoom', [1, 1.1, 1.2][state.prefs.fs || 0]);
  document.body.classList.toggle('rm', !!state.prefs.rm);
  document.body.classList.toggle('noside', !!state.prefs.ns);
  const t = $('#sideT'); if (t) { t.setAttribute('aria-expanded', !state.prefs.ns); t.setAttribute('aria-label', state.prefs.ns ? 'Afficher le menu' : 'Masquer le menu'); t.title = t.getAttribute('aria-label'); }
}
$('#sideT').onclick = () => { state.prefs.ns = state.prefs.ns ? 0 : 1; applyPrefs(); save(); if (state.page === 'profil') renderProfil(); };

/* =========================================================
   PDF (impression A4 aux couleurs BA)
   ========================================================= */
function printDoc(title, html, n) {
  const logo = $('.side .logo').getAttribute('src');
  $('#print').innerHTML = `
    <header class="ph"><img src="${logo}" alt="Blockchain AkademIA"><div><b>${title}</b><small>AI Act · L'essentiel${n ? ` · Niveau ${n} · ${L(n).title}` : ''}</small></div></header>
    <main>${html}</main>
    <footer class="pf">Blockchain AkademIA · Contenu à jour au ${CONTENT_DATE} (${CONTENT_VERSION})${displayName() ? ' · ' + displayName() : ''} · Édité le ${fdate(new Date().toISOString())}</footer>`;
  const old = document.title; document.title = title;
  setTimeout(() => { window.print(); document.title = old; }, 60);
}
/* Fiche d'information PDF : la synthèse visuelle + tout le contenu du module correspondant (fiche k = module k + 1) */
const pdStrip = h => String(h || '').replace(/<[^>]+>/g, ' ');
function ficheDossier(n, k) {
  const lv = L(n), m = k + 1, steps = lv.steps.filter(s => s.mod === m);
  const goals = MODULE_GOALS[`${n}-${m}`] || [];
  const law = l => l ? `<div class="pd-law"><div class="pd-lh"><b>${l.ref}</b>${l.tag ? `<span>${l.tag}</span>` : ''}${l.title ? ` · ${l.title}` : ''}</div><p>${l.text}</p></div>` : '';
  const items = (list, x) => list && list.length ? `<ul class="pd-list">${list.map(c => `<li>${x ? ic(x) : ''}<div><b>${c[0]}</b>${c[1] ? ` : ${c[1]}` : ''}${c[2] ? ` <span class="pd-ref">${c[2]}</span>` : ''}</div></li>`).join('')}</ul>` : '';
  const person = pp => pp ? `<span class="pd-who">${pp[1]}${pp[2] ? ` · ${pp[2]}` : ''}</span>` : '';
  const cours = [], cas = [], qs = [];
  steps.forEach(s => {
    if (s.type === 'situation') cas.push(`<div class="pd-case ${s.problem ? 'pb' : ''}"><div class="pd-ct">${s.problem ? 'Le problème' : 'Cas pratique'} · <b>${s.title}</b> ${person(s.persona)}</div>${s.body.map(t => `<p>${t}</p>`).join('')}${s.prompt ? `<p class="pd-note">${s.prompt}</p>` : ''}</div>`);
    else if (s.type === 'explain') cours.push(`<section class="pd-sec"><h3>${s.title}</h3><p>${s.intro}</p>${s.critTitle ? `<p><b>${s.critTitle}</b></p>` : ''}<ol class="pd-crit">${s.crit.map(c => `<li><b>${c[0]}</b> : ${c[1]}</li>`).join('')}</ol>${law(s.law)}${s.clair ? `<p class="pd-tip">${s.clair}</p>` : ''}${s.mentor ? `<p class="pd-mentor">« ${pdStrip(s.mentor).trim()} »</p>` : ''}</section>`);
    else if (s.type === 'law') cours.push(`<section class="pd-sec"><h3>${s.title}</h3>${law(s.law)}${s.why ? `<p class="pd-tip">${s.why}</p>` : ''}${s.mustTitle ? `<h4>${s.mustTitle}</h4>` : ''}${items(s.must, 'check')}${s.mentor ? `<p class="pd-mentor">« ${pdStrip(s.mentor).trim()} »</p>` : ''}</section>`);
    else if (s.type === 'compare') cours.push(`<section class="pd-sec"><h3>${s.title}</h3><p>${s.intro}</p><div class="pd-cmp"><div><h4>${ic('x')} ${s.left[0]}</h4><ul>${s.left[1].map(t => `<li>${t}</li>`).join('')}</ul></div><div><h4>${ic('check')} ${s.right[0]}</h4><ul>${s.right[1].map(t => `<li>${t}</li>`).join('')}</ul></div></div>${s.mentor ? `<p class="pd-mentor">« ${pdStrip(s.mentor).trim()} »</p>` : ''}</section>`);
    else if (s.type === 'calc') cours.push(`<section class="pd-sec"><h3>${s.title}</h3><table class="pd-tab"><tr><th>Infraction</th><th>Plafond</th><th>Ou % du CA mondial</th></tr>${INF.map(r => `<tr><td>${r[0]}</td><td>${r[1] === null ? 'Pas d\'amende propre' : r[1].toLocaleString('fr-FR') + ' M€'}</td><td>${r[2] === null ? '—' : r[2] + ' %'}</td></tr>`).join('')}</table><p class="pd-tip">On retient le montant le plus élevé des deux ; pour une PME ou une start-up, le plus bas. Ce sont des plafonds, pas des amendes probables.</p></section>`);
    else if (s.type === 'wrap') cours.push(`<section class="pd-sec pd-wrap"><h3>${s.title}</h3><p>${s.body}</p><div class="pd-keys">${s.keys.map(x => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div></section>`);
    else if (s.type === 'question') { const r = s.opts.find(o => o[1]); qs.push(`<li><p class="pd-q">${s.kind === 'vf' ? 'Vrai ou faux : ' : ''}${s.q}</p><p class="pd-a">${ic('check')} <b>${r ? r[0] : ''}</b></p><p class="pd-e">${s.ok}</p></li>`); }
  });
  const refs = [...new Set((pdStrip(JSON.stringify(steps)).match(/(?:[Aa]rt(?:icle|\.)\s?\d+[a-z]?(?:\(\d+\))?(?:\s?\([a-z]\))?|[Aa]nnexe\s[IVX]+|RGPD|DORA|[Pp]rojet de loi n°\s?\d+)/g) || []).map(r => r.replace(/^[Aa]rticle\s?/, 'Art. ').replace(/^art\./, 'Art.').replace(/^Art\.(\d)/, 'Art. $1').replace(/^annexe/, 'Annexe')))].sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
  return `
  <section class="pd-intro"><div><p class="pd-eye">Fiche d'information · ${lv.modules[k]}</p><h2>Ce que couvre cette fiche</h2>${goals.length ? `<ul class="pd-goals">${goals.map(g => `<li>${ic('target')}${g}</li>`).join('')}</ul>` : ''}</div>
    <div class="pd-meta"><div><small>Niveau</small><b>${n} · ${lv.title}</b></div><div><small>Module</small><b>${lv.modules[k].replace(/^Module \d+ · /, '')}</b></div><div><small>À jour au</small><b>${CONTENT_DATE}</b></div></div></section>
  <h2 class="pd-h">1. L'essentiel en un coup d'œil</h2>
  ${FICHES[n][k].render()}
  <h2 class="pd-h pd-break">2. Le cours en détail</h2>
  ${cours.join('')}
  ${cas.length ? `<h2 class="pd-h">3. Les cas pratiques du module</h2>${cas.join('')}` : ''}
  ${qs.length ? `<h2 class="pd-h">${cas.length ? 4 : 3}. Questions clés et réponses</h2><ol class="pd-qs">${qs.join('')}</ol>` : ''}
  <h2 class="pd-h">${(cas.length ? 4 : 3) + (qs.length ? 1 : 0)}. Textes de référence et contacts</h2>
  <div class="pd-foot2"><div><h4>Textes cités dans le module</h4><p>${refs.join(' · ') || '—'}</p><p class="pd-small">Règlement (UE) 2024/1689 (AI Act), modifié par l'Omnibus sur l'IA de 2026. Les points marqués « Projet » ou « À vérifier » restent à confirmer.</p></div>
    <div><h4>Vers qui se tourner</h4><p><b>Votre DPO</b> : pour signaler un outil d'IA ou poser une question en interne.<br><b>CNPD</b> · ia@cnpd.lu : questions sur l'IA à l'autorité luxembourgeoise.<br><b>AI Act Service Desk</b> : le guichet officiel de la Commission européenne.</p></div></div>`;
}
const printFiche = (n, k) => printDoc(`Fiche pratique ${ficheNum(n, k)} · ${FICHES[n][k].title}`, ficheDossier(n, k), n);
function printAttestation() {
  const fq = state.quiz.final || {};
  const rows = (FINAL ? [] : LEVELS).map(n => { const st = stats(n); return `<tr><td>Niveau ${n} · ${L(n).title}</td><td>${st.validated ? 'Validé' : st.complete ? 'Non validé' : st.ans ? 'En cours' : 'Non commencé'}</td><td>${st.ans ? st.score + ' %' : '—'}${st.quizBest != null ? ` · quiz ${st.quizBest} %` : ''}</td><td>${fdate(state.val[n])}</td></tr>`; }).join('')
    + (SC && !FINAL ? '' : `<tr><td><b>Évaluation finale</b></td><td>${fq.passed ? 'Réussie' : fq.attempts ? 'Non réussie' : 'Non passée'}</td><td>${fq.best != null ? fq.best + ' %' : '—'}</td><td>${fdate(state.finalDate)}</td></tr>`);
  printDoc('Attestation de suivi · Maîtrise de l\'IA', `
    <div class="attest">
      <p>Blockchain AkademIA atteste que <b>${displayName() || '……………………………'}</b>${learner.id ? ` (identifiant ${learner.id})` : ''} a suivi la formation <b>« AI Act · L'essentiel »</b>, au titre des mesures de maîtrise de l'IA prévues par l'article 4 du règlement (UE) 2024/1689.</p>
      <table><tr><th>Niveau</th><th>Statut</th><th>Score</th><th>Date de validation</th></tr>${rows}</table>
      <p class="muted" style="margin-top:14px">Temps passé : ${fmtTime(state.time)} · Début : ${fdate(state.start)} · Version du contenu : ${CONTENT_VERSION} (à jour au ${CONTENT_DATE}). Aucun certificat officiel n'est exigé par l'article 4 : ce document complète le registre interne des formations.</p>
    </div>`);
}

/* =========================================================
   RECHERCHE
   ========================================================= */
let INDEX = [];
function buildIndex() {
  INDEX = [];
  LEVELS.forEach(n => {
    const lv = L(n);
    lv.steps.forEach((s, i) => {
      const title = s.title || s.q || (s.type === 'fiche' ? FICHES[n][s.fiche].title : s.type === 'video' ? lv.modules[s.mod - 1] : s.label);
      const text = [s.body && [].concat(s.body).join(' '), s.prompt, s.intro, s.why, s.law && s.law.text, s.law && s.law.ref, s.must && s.must.flat().join(' '), s.crit && s.crit.flat().join(' '), s.left && s.left[1].join(' '), s.right && s.right[1].join(' '), s.goals && s.goals.join(' ')].filter(Boolean).join(' ');
      INDEX.push({ kind: s.type === 'question' ? 'Question' : s.type === 'fiche' ? 'Fiche' : 'Séance', n, title: strip(title), text: strip(text), go: () => { state.lvl = n; state.step[n] = i; go('seance'); } });
    });
    lv.scn.forEach((s, i) => INDEX.push({ kind: 'Scénario', n, title: s.title, text: strip([s.q, s.ctx.join(' '), s.law, s.theme].join(' ')), go: () => { state.lvl = n; state.scn[n] = i; go('scenarios'); } }));
    FICHES[n].forEach((f, k) => INDEX.push({ kind: 'Fiche', n, title: `Fiche ${ficheNum(n, k)} · ${f.title}`, text: strip(f.render()), go: () => { state.lvl = n; state.fiche = k; go('fiches'); } }));
  });
  knowList().forEach(k => INDEX.push({ kind: 'Notion', n: k[0], title: k[1], text: k[2], go: () => { state.kFilter = SC ? 0 : k[0]; go('connaissances'); } }));
  GLOSSARY.forEach(g => INDEX.push({ kind: 'Glossaire', n: 0, title: `${g[1]} (${g[0]})`, text: '', go: () => go('ressources') }));
  OFFICIAL.forEach(o => INDEX.push({ kind: 'Ressource', n: o[4], title: o[0], text: o[1], go: () => go('ressources') }));
  INDEX.forEach(e => { e.nt = norm(e.title); e.nx = norm(e.text); });
}
function search(q) {
  const words = norm(q).split(/\s+/).filter(w => w.length > 1);
  if (!words.length) return [];
  return INDEX.map(e => {
    if (!words.every(w => e.nt.includes(w) || e.nx.includes(w))) return null;
    let score = words.reduce((s, w) => s + (e.nt.includes(w) ? 3 : 1), 0);
    if (e.kind === 'Fiche' || e.kind === 'Notion') score += .5;
    return { e, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 8).map(x => x.e);
}
function snippet(e, q) {
  const w = norm(q).split(/\s+/).filter(x => x.length > 1)[0] || '';
  const i = e.nx.indexOf(w);
  if (i < 0) return e.text.slice(0, 90) + (e.text.length > 90 ? '…' : '');
  const a = Math.max(0, i - 40);
  return (a ? '…' : '') + e.text.slice(a, a + 110) + '…';
}
function bindSearch() {
  const inp = $('#q'), box = $('#qres');
  let res = [], sel = 0;
  const close = () => { box.hidden = true; inp.setAttribute('aria-expanded', 'false'); };
  const pick = e => { if (!e) return; close(); inp.value = ''; if (status(e.n || LEVELS[0]) === 'lock' && e.n) { state.lvl = e.n; go('seance'); } else e.go(); };
  const draw = () => {
    const v = inp.value.trim();
    if (v.length < 2) { close(); return; }
    res = search(v); sel = 0;
    box.innerHTML = res.length ? res.map((e, i) => `<button class="qr ${i === sel ? 'sel' : ''}" data-i="${i}" role="option" aria-selected="${i === sel}"><span class="chip ${e.kind === 'Fiche' ? 'ok' : e.kind === 'Scénario' ? 'pk' : e.kind === 'Question' ? 'pk' : ''}">${e.kind}</span><span class="qt"><b>${e.title}</b><small>${e.n ? `Niveau ${e.n}${status(e.n) === 'lock' ? ' · verrouillé' : ''} · ` : ''}${snippet(e, v)}</small></span></button>`).join('')
      : `<div class="qempty">Aucun résultat pour « ${v.replace(/</g, '&lt;')} ». Essayez : émotions, deepfake, article 4, CNPD…</div>`;
    box.hidden = false; inp.setAttribute('aria-expanded', 'true');
    $$('.qr', box).forEach(b => b.onmousedown = ev => { ev.preventDefault(); pick(res[+b.dataset.i]); });
  };
  inp.oninput = draw;
  inp.onfocus = draw;
  inp.onblur = () => setTimeout(close, 120);
  inp.onkeydown = ev => {
    if (ev.key === 'Escape') { close(); inp.blur(); }
    if (box.hidden || !res.length) return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); sel = (sel + (ev.key === 'ArrowDown' ? 1 : res.length - 1)) % res.length; $$('.qr', box).forEach((b, i) => { b.classList.toggle('sel', i === sel); b.setAttribute('aria-selected', i === sel); }); }
    if (ev.key === 'Enter') { ev.preventDefault(); pick(res[sel]); }
  };
  document.addEventListener('keydown', ev => { if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') { ev.preventDefault(); inp.focus(); } });
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */
function notifications() {
  const out = [];
  out.push({ id: 'welcome', icon: 'flag', t: 'Bienvenue dans la formation AI Act', s: SC ? `Niveau ${CFG.level} · commencez par la vidéo de présentation.` : 'Commencez par le niveau 1 · Prologue.', go: () => go('seance') });
  if (!state.role) out.push({ id: 'role', icon: 'user', t: 'Complétez votre profil', s: 'Choisissez votre métier pour voir ce qui vous concerne en priorité.', go: () => go('profil') });
  LEVELS.forEach(n => {
    [0, 1].forEach(k => { if (ficheUnlocked(n, k) && status(n) !== 'lock') out.push({ id: `f${n}${k}`, icon: 'file', t: `Fiche pratique ${ficheNum(n, k)} débloquée`, s: FICHES[n][k].title, go: () => { state.lvl = n; state.fiche = k; go('fiches'); } }); });
    const st = stats(n);
    if (st.validated) {
      out.push({ id: `v${n}`, icon: 'award', t: `Niveau ${n} validé avec ${st.score} %`, s: !SC && n < 4 ? `Le niveau ${n + 1} est débloqué.` : 'Votre résultat est enregistré.', go: () => { state.lvl = n; state.recapTab = 1; go('recap'); } });
      const v = state.val[n];
      [[7, 'J+7'], [30, 'J+30']].forEach(([d, l]) => { if (new Date(addDays(v, d)) <= new Date()) out.push({ id: `r${n}${d}`, icon: 'clock', t: `Rappel ${l} disponible`, s: `Deux idées reçues du niveau ${n} à vérifier en 1 minute.`, go: () => go('accueil') }); });
    } else if (st.complete) out.push({ id: `x${n}-${st.score}`, icon: 'alert', t: `Niveau ${n} : ${st.score} %, sous le seuil de 80 %`, s: 'Retentez les questions ratées depuis votre rapport.', go: () => { state.lvl = n; state.recapTab = 1; go('recap'); } });
  });
  out.push({ id: 'ver' + CONTENT_VERSION, icon: 'shield', t: `Contenu à jour au ${CONTENT_DATE}`, s: `Version ${CONTENT_VERSION} · intègre l'Omnibus sur l'IA de 2026.`, go: () => go('ressources') });
  return out.reverse();
}
function renderBell() {
  const list = notifications(), unread = list.filter(x => !state.read.includes(x.id));
  $('#bell .dot').hidden = !unread.length;
  $('#bell').setAttribute('aria-label', `Notifications (${unread.length} non lues)`);
  $('#npanel').innerHTML = `<div class="nh"><b>Notifications</b>${unread.length ? `<button id="nall">Tout marquer comme lu</button>` : ''}</div>
    ${list.map(x => `<button class="ni ${state.read.includes(x.id) ? '' : 'unread'}" data-id="${x.id}"><span class="stepico">${ic(x.icon)}</span><span><b>${x.t}</b><small>${x.s}</small></span></button>`).join('')}`;
  $$('#npanel .ni').forEach(b => b.onclick = () => { const x = list.find(y => y.id === b.dataset.id); if (!state.read.includes(x.id)) state.read.push(x.id); $('#npanel').hidden = true; save(); x.go(); });
  const all = $('#nall'); if (all) all.onclick = () => { state.read = [...new Set([...state.read, ...list.map(x => x.id)])]; save(); renderBell(); };
}

/* =========================================================
   ROUTAGE
   ========================================================= */
const PAGES = {
  accueil: [() => SC ? `Niveau ${CFG.level} · Accueil` : 'Tableau de bord', renderAccueil],
  seance: [() => `Niveau ${state.lvl} · Séance`, renderSeance],
  fiches: [() => `Niveau ${state.lvl} · Fiches pratiques`, renderFiches],
  scenarios: [() => `Niveau ${state.lvl} · Scénarios`, renderScenarios],
  quiz: [() => `Niveau ${state.lvl} · Quiz de validation`, renderQuiz],
  recap: [() => `Niveau ${state.lvl} · Récap & rapport`, renderRecap],
  final: [() => 'Évaluation finale', renderFinal],
  connaissances: [() => 'Connaissances', renderConnaissances],
  ressources: [() => 'Ressources', renderRessources],
  profil: [() => 'Mon profil', renderProfil],
};
function go(id) {
  let p = PAGES[id] ? id : 'accueil';
  if (FINAL && !['final', 'ressources', 'profil'].includes(p)) p = 'final';
  if (!LEVELS.includes(state.lvl)) state.lvl = LEVELS[0];
  if (p !== 'seance') LEVELS.forEach(n => { if (state.catchup[n] && !missingSteps(n).length) delete state.catchup[n]; });
  state.page = p; save();
  $$('.page').forEach(x => x.classList.toggle('on', x.id === 'p-' + p));
  PAGES[p][1]();
  renderNav(); renderBell();
  $('#crumb').innerHTML = `AI Act · L'essentiel ${ic('right')} <b>${PAGES[p][0]()}</b>`;
  try { history.replaceState(null, '', location.pathname + location.search + '#' + p); } catch (_) {}
  window.scrollTo(0, 0);
  const h = $('#p-' + p + ' h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  e.preventDefault();
  if (a.getAttribute('aria-disabled') === 'true') return;
  if (a.dataset.lvlGo) state.lvl = +a.dataset.lvlGo;
  if (a.dataset.fiche !== undefined) state.fiche = +a.dataset.fiche;
  if (a.dataset.tab !== undefined) state.recapTab = +a.dataset.tab;
  if (a.dataset.step !== undefined) state.step[state.lvl] = +a.dataset.step;
  if (a.dataset.scn !== undefined) state.scn[state.lvl] = +a.dataset.scn;
  if (a.dataset.catch) state.catchup[state.lvl] = 1;
  go(a.getAttribute('href').slice(1));
});
$('#bell').onclick = e => { e.stopPropagation(); const p = $('#npanel'); p.hidden = !p.hidden; $('#bell').setAttribute('aria-expanded', !p.hidden); };
document.addEventListener('click', e => { if (!e.target.closest('#npanel') && !e.target.closest('#bell')) $('#npanel').hidden = true; });
/* Langue (version web) : FR par défaut, EN = démonstration du niveau 1 */
const enLockedHTML = () => `<div class="card pad" style="max-width:640px;margin:40px auto;text-align:center"><div class="stepico" style="margin:0 auto 12px">${ic('lock')}</div><h2 style="font-size:22px">Available in French only for now</h2><p class="muted" style="margin-top:8px">The English version currently covers Level 1. Switch to FR to access the full course.</p><a class="btn pri" href="#seance" data-lvl-go="1" style="margin-top:16px">${ic('play')} Go to Level 1</a></div>`;
(() => {
  const sw = $('#langsw'); if (!sw) return;
  if (SC) { sw.remove(); return; }
  const cur = state.prefs.lang === 'en' ? 'en' : 'fr';
  $$('button', sw).forEach(b => { b.classList.toggle('on', b.dataset.l === cur); b.setAttribute('aria-pressed', b.dataset.l === cur);
    b.onclick = () => { if (b.dataset.l === cur) return; state.prefs.lang = b.dataset.l; const keep = { ...state }; delete keep.calc; try { localStorage.setItem(KEY, JSON.stringify(keep)); } catch (_) {} location.reload(); }; });
})();
$('#ver').innerHTML = `${ic('clock')} À jour au ${CONTENT_DATE} · ${CONTENT_VERSION}`;

/* Fin de session SCORM */
const end = () => { if (lmsOk) { const keep = { ...state }; delete keep.calc; SCORM.save(JSON.stringify(keep)); SCORM.finish(FINAL ? !!(state.quiz.final || {}).passed : stats(CFG.level).validated); } };
window.addEventListener('pagehide', end);
window.addEventListener('beforeunload', end);

applyPrefs();
buildIndex();
bindSearch();
go(location.hash.slice(1) || state.page || 'accueil');
