/* =========================================================
   Connecteur SCORM 1.2 — Blockchain AkademIA
   - Trouve l'API du LMS (fenêtre parente ou opener)
   - Sauvegarde : cmi.suspend_data (+ repli localStorage hors LMS)
   - Suivi : statut, score, interactions, emplacement, temps
   ========================================================= */
const SCORM = (() => {
  let api = null, started = false, finished = false, t0 = Date.now();

  function find(win) {
    let n = 0;
    try {
      while (win && !win.API && win.parent && win.parent !== win && n < 12) { n++; win = win.parent; }
      return win && win.API ? win.API : null;
    } catch (_) { return null; }
  }
  const get = k => { try { return api ? String(api.LMSGetValue(k) ?? '') : ''; } catch (_) { return ''; } };
  const set = (k, v) => { try { return api ? api.LMSSetValue(k, String(v)) === 'true' || api.LMSSetValue === undefined : false; } catch (_) { return false; } };
  const commit = () => { try { if (api) api.LMSCommit(''); } catch (_) {} };

  function hms(sec) {
    const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = Math.floor(sec % 60);
    return `${String(h).padStart(4, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  return {
    init() {
      api = find(window) || (window.opener ? find(window.opener) : null);
      if (!api) return false;
      try { started = api.LMSInitialize('') === 'true' || api.LMSInitialize === undefined; } catch (_) { started = false; }
      if (!started) { api = null; return false; }
      const st = get('cmi.core.lesson_status');
      if (!st || st === 'not attempted') { set('cmi.core.lesson_status', 'incomplete'); commit(); }
      t0 = Date.now();
      return true;
    },
    get connected() { return !!api; },
    learner() {
      const raw = get('cmi.core.student_name'), id = get('cmi.core.student_id');
      let name = raw;
      if (raw.includes(',')) { const [last, first] = raw.split(',').map(x => x.trim()); name = `${first} ${last}`.trim(); }
      return { name, id };
    },
    load() { return get('cmi.suspend_data'); },
    save(data) {
      if (!api) return;
      if (data.length > 4000) console.warn('suspend_data proche de la limite SCORM 1.2 :', data.length);
      set('cmi.suspend_data', data);
      commit();
    },
    location(v) { if (api) set('cmi.core.lesson_location', v.slice(0, 255)); },
    status() { return get('cmi.core.lesson_status'); },
    /* Score et statut d'un niveau */
    result(score, complete, passed) {
      if (!api) return;
      set('cmi.core.score.min', 0); set('cmi.core.score.max', 100); set('cmi.core.score.raw', Math.round(score));
      if (complete) set('cmi.core.lesson_status', passed ? 'passed' : 'failed');
      commit();
    },
    /* Une réponse = une interaction (rapport détaillé dans le LMS) */
    interaction(id, response, correct, result) {
      if (!api) return;
      const n = parseInt(get('cmi.interactions._count') || '0', 10) || 0;
      const p = `cmi.interactions.${n}.`;
      const d = new Date();
      set(p + 'id', id);
      set(p + 'type', 'choice');
      set(p + 'time', `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`);
      set(p + 'weighting', 1);
      set(p + 'student_response', response);
      set(p + 'correct_responses.0.pattern', correct);
      set(p + 'result', result);
      commit();
    },
    finish(passed) {
      if (!api || finished) return;
      finished = true;
      set('cmi.core.session_time', hms((Date.now() - t0) / 1000));
      set('cmi.core.exit', passed ? '' : 'suspend');
      commit();
      try { api.LMSFinish(''); } catch (_) {}
    },
  };
})();
