/* Génère « Vue d'ensemble du contenu » à partir des fichiers de la plateforme.
   Usage : node generer_vue_ensemble.js  (puis impression PDF par Chrome) */
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..', 'src', 'js');
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');
const stub = new Proxy({}, { get: () => () => '' });
const D = new Function('ic', 'ILLUS', 'risks', read('content.js') + '\n' + read('quiz.js') +
  ';return {LV, FICHES, KNOW, OFFICIAL, FURTHER, GLOSSARY, MODULE_GOALS, SPACED, QUIZ, SETTINGS, CONTENT_DATE, CONTENT_VERSION, PROFILES};')(() => '', stub, () => '');
const EN_SCRIPTS = (() => { try {
  const md = fs.readFileSync(path.join(__dirname, '..', 'Scripts_Videos_EN_Niveau1.md'), 'utf8');
  return md.split(/\n## /).slice(1).map(b => { const lines = b.split('\n'); return [lines[0].trim(), lines.slice(1).filter(l => l.trim() && !l.startsWith('**') && !l.startsWith('---'))]; });
} catch (_) { return []; } })();
const TR = JSON.parse(fs.readFileSync(path.join(__dirname, 'transcripts.json'), 'utf8'));
const esc = s => String(s ?? '');
const plain = s => esc(s).replace(/<[^>]+>/g, '');
const ok = '<span class="ok">✓</span>', ko = '<span class="ko">✗</span>';
let toc = [], refs = new Map(), nQ = 0, nScn = 0, nQuiz = 0;
const addRefs = (txt, where) => (plain(txt).match(/(?:[Aa]rt(?:icle|\.)\s?\d+[a-z]?(?:\(\d+\))?(?:\s?\([a-z]+\))?|[Aa]nnexe\s[IVX]+(?:,?\s(?:point\s)?\d+(?:\([a-z]\))?)?|RGPD|DORA|NIS2|Data Act|[Pp]rojet de loi n°\s?\d+|L\.\d{3}-\d+)/g) || [])
  .forEach(r => { r = r.replace(/^[Aa]rticle\s?/, 'Art. ').replace(/^art\./, 'Art.').replace(/^Art\.(\d)/, 'Art. $1').replace(/^annexe/, 'Annexe'); if (!refs.has(r)) refs.set(r, new Set()); refs.get(r).add(where); });

const lawBox = l => l ? `<div class="law"><div class="lh"><b>${esc(l.ref)}</b>${l.tag ? `<i>${esc(l.tag)}</i>` : ''}${l.title ? ` · ${esc(l.title)}` : ''}</div><p>${esc(l.text)}</p></div>` : '';
const persona = p => p ? ` <span class="who">${esc(p[1])}${p[2] ? ' · ' + esc(p[2]) : ''}</span>` : '';

function question(s, n, where) {
  nQ++; addRefs(JSON.stringify(s), where);
  const opts = s.opts.map(o => `<li class="${o[1] ? 'good' : ''}">${o[1] ? ok : ko} ${esc(o[0])}</li>`).join('');
  return `<div class="q"><div class="qh"><span class="tag">${s.kind === 'vf' ? 'Vrai / faux' : 'Question'} · ${esc(s.id)}</span></div>
    <p class="qq">${esc(s.q)}</p><ul class="opts">${opts}</ul>
    <p class="fb"><b>Si juste :</b> ${esc(s.ok)}</p>${s.ko ? `<p class="fb ko2"><b>Si faux :</b> ${esc(s.ko)}</p>` : ''}${s.tip ? `<p class="fb tip"><b>Indice :</b> ${esc(s.tip).replace(/^Indice\s*:\s*/, "")}</p>` : ''}</div>`;
}
function step(s, n, k) {
  const where = `Niveau ${n}`;
  addRefs(JSON.stringify(s), where);
  const head = (lbl, title) => `<div class="sh"><span class="num">${k}</span><span class="lbl">${esc(lbl)}</span>${title ? `<b>${esc(title)}</b>` : ''}<span class="tm">${esc(s.time || '')}</span></div>`;
  switch (s.type) {
    case 'situation': return `<div class="st ${s.problem ? 'pb' : ''}">${head(s.label, s.title)}<div class="sb">${persona(s.persona) ? `<p class="persona">${persona(s.persona)}</p>` : ''}${s.body.map(p => `<p>${esc(p)}</p>`).join('')}${s.prompt ? `<p class="prompt">${esc(s.prompt)}</p>` : ''}</div></div>`;
    case 'explain': return `<div class="st">${head(s.label, s.title)}<div class="sb"><p>${esc(s.intro)}</p>${s.critTitle ? `<p><b>${esc(s.critTitle)}</b></p>` : ''}<ol>${s.crit.map(c => `<li><b>${esc(c[0])}</b> : ${esc(c[1])}</li>`).join('')}</ol>${lawBox(s.law)}${s.clair ? `<p class="clair">${esc(s.clair)}</p>` : ''}${s.mentor ? `<p class="mentor">« ${plain(s.mentor)} »</p>` : ''}</div></div>`;
    case 'law': return `<div class="st">${head(s.label, s.title)}<div class="sb">${lawBox(s.law)}${s.why ? `<p class="clair">${esc(s.why)}</p>` : ''}${s.mustTitle ? `<p><b>${esc(s.mustTitle)}</b></p>` : ''}${s.must ? `<ul>${s.must.map(c => `<li><b>${esc(c[0])}</b>${c[1] ? ' : ' + esc(c[1]) : ''}${c[2] ? ` <span class="ref">${esc(c[2])}</span>` : ''}</li>`).join('')}</ul>` : ''}${s.mentor ? `<p class="mentor">« ${plain(s.mentor)} »</p>` : ''}</div></div>`;
    case 'compare': return `<div class="st">${head(s.label, s.title)}<div class="sb"><p>${esc(s.intro)}</p><div class="cmp"><div><p><b>${ko} ${esc(s.left[0])}</b></p><ul>${s.left[1].map(t => `<li>${esc(t)}</li>`).join('')}</ul></div><div><p><b>${ok} ${esc(s.right[0])}</b></p><ul>${s.right[1].map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></div>${s.mentor ? `<p class="mentor">« ${plain(s.mentor)} »</p>` : ''}</div></div>`;
    case 'calc': return `<div class="st">${head(s.label, s.title)}<div class="sb"><p>Simulateur interactif des plafonds d'amende (art. 99) : l'apprenant choisit un chiffre d'affaires, un type d'entreprise et une infraction.</p></div></div>`;
    case 'wrap': return `<div class="st wrap">${head(s.label, s.title)}<div class="sb"><p>${esc(s.body)}</p><div class="keys">${s.keys.map(x => `<div><b>${esc(x[0])}</b>${esc(x[1])}</div>`).join('')}</div>${s.next ? `<p class="mentor">Ensuite · ${esc(s.next[0])} : ${esc(s.next[1])}</p>` : ''}</div></div>`;
    case 'question': return `<div class="st">${head(s.label, '')}<div class="sb">${question(s, n, where)}</div></div>`;
    case 'fiche': return `<div class="st fiche">${head(s.label, D.FICHES[n][s.fiche].title)}<div class="sb"><p class="mentor">Fiche pratique téléchargeable en PDF (synthèse visuelle + dossier complet du module).</p></div></div>`;
  }
  return '';
}

let body = '', total = { steps: 0 };
D.LV.forEach(lv => {
  const n = lv.n, id = `n${n}`;
  toc.push([id, `Niveau ${n} · ${lv.name} · ${lv.title}`]);
  body += `<section class="level" id="${id}"><div class="lvlhead"><span class="big">${n}</span><div><p class="eye">Niveau ${n} · ${esc(lv.name)}</p><h2>${esc(lv.title)}</h2><p class="pitch">${esc(lv.pitch)}</p></div></div>`;
  [1, 2].forEach(m => {
    const steps = lv.steps.filter(s => s.mod === m), goals = D.MODULE_GOALS[`${n}-${m}`] || [];
    body += `<h3 id="${id}m${m}">${esc(lv.modules[m - 1])}</h3>
      <div class="goals"><b>Objectifs</b><ul>${goals.map(g => `<li>${esc(g)}</li>`).join('')}</ul></div>
      <div class="video"><p class="vh">▶ Vidéo de présentation · transcription</p><p>${esc(TR[`${n}-${m}`] || '—')}</p></div>`;
    let k = 0;
    steps.forEach(s => { k++; total.steps++; body += step(s, n, k); });
    const f = lv.steps.find((s, i) => s.type === 'fiche' && s.fiche === m - 1);
    if (f) body += step(f, n, '★');
  });
  body += `<h3 id="${id}scn">Partie 2 · Les 3 scénarios</h3>`;
  lv.scn.forEach(sc => {
    nScn++; addRefs(JSON.stringify(sc), `Niveau ${n}`);
    body += `<div class="scn"><div class="sh"><span class="lbl">${esc(sc.t)} · ${esc(sc.theme || '')}</span><b>${esc(sc.title)}</b><span class="tm">${esc(sc.id)}</span></div>
      <div class="sb"><p class="persona"><span class="who">${esc(sc.who)}</span></p>${sc.ctx.map(c => `<p>${esc(c)}</p>`).join('')}<p class="qq">${esc(sc.q)}</p>
      <ul class="opts">${sc.opts.map(o => `<li class="${o[1] === 'ok' ? 'good' : o[1] === 'mid' ? 'mid' : ''}">${o[1] === 'ok' ? ok : o[1] === 'mid' ? '<span class="md">~</span>' : ko} <b>${esc(o[0])}</b><br><span class="fbi">${esc(o[2])} · ${esc(o[3])}</span></li>`).join('')}</ul>
      <p class="ref2">Base : ${esc(sc.law)}</p></div></div>`;
  });
  body += `<h3 id="${id}quiz">Quiz de validation · banque de ${D.QUIZ[n].length} questions</h3><p class="mentor">${D.SETTINGS.quizSize} questions tirées au hasard à chaque tentative, réussite à ${D.SETTINGS.quizPass} / ${D.SETTINGS.quizSize}. Les mêmes banques alimentent l'évaluation finale (${D.SETTINGS.finalPerLevel} questions par niveau).</p>`;
  D.QUIZ[n].forEach(x => {
    nQuiz++; addRefs(JSON.stringify(x), `Niveau ${n}`);
    const opts = x.vf ? ['Vrai', 'Faux', 'Ça dépend'].map(t => [t, t === x.vf]) : [[x.o[0], true], [x.o[1], false], [x.o[2], false]];
    body += `<div class="q"><div class="qh"><span class="tag">${x.vf ? 'Vrai / faux' : 'QCM'} · ${x.id}</span></div><p class="qq">${esc(x.q)}</p><ul class="opts">${opts.map(o => `<li class="${o[1] ? 'good' : ''}">${o[1] ? ok : ko} ${esc(o[0])}</li>`).join('')}</ul><p class="fb"><b>Explication :</b> ${esc(x.why)}</p></div>`;
  });
  body += `<h3 id="${id}rap">Rappels espacés (J+7 et J+30) et notions suivies</h3><table><tr><th>Affirmation</th><th style="width:22mm">Réponse</th><th>Explication</th></tr>${(D.SPACED[n] || []).map(r => `<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td><td>${esc(r[2])}</td></tr>`).join('')}</table>
    <table style="margin-top:4mm"><tr><th>Notion (page « Connaissances »)</th><th>Description</th><th style="width:30mm">Questions liées</th></tr>${D.KNOW.filter(k => k[0] === n).map(k => `<tr><td><b>${esc(k[1])}</b></td><td>${esc(k[2])}</td><td>${k[3].join(', ')}</td></tr>`).join('')}</table></section>`;
});

// Annexes
const refList = [...refs.keys()].sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
toc.push(['annexes', 'Annexes : textes cités, ressources, glossaire']);
body += `<section class="level" id="annexes"><div class="lvlhead"><span class="big">A</span><div><p class="eye">Annexes</p><h2>Textes, ressources et glossaire</h2></div></div>
  <h3>Index des textes cités</h3><table><tr><th>Texte</th><th>Cité dans</th></tr>${refList.map(r => `<tr><td><b>${esc(r)}</b></td><td>${[...refs.get(r)].sort().join(' · ')}</td></tr>`).join('')}</table>
  <h3>Sources officielles proposées aux apprenants</h3><table><tr><th>Ressource</th><th>Source</th><th>Type</th></tr>${D.OFFICIAL.map(o => `<tr><td><b>${esc(o[0])}</b><br><span class="url">${esc(o[2])}</span></td><td>${esc(o[1])}</td><td>${esc(o[3])}</td></tr>`).join('')}</table>
  <h3>Pour aller plus loin</h3><table>${D.FURTHER.map(o => `<tr><td><b>${esc(o[0])}</b><br><span class="url">${esc(o[1])}</span></td></tr>`).join('')}</table>
  <h3>Glossaire anglais / français</h3><table><tr><th>Terme anglais (texte officiel)</th><th>Terme français</th></tr>${D.GLOSSARY.map(g => `<tr><td>${esc(g[0])}</td><td><b>${esc(g[1])}</b></td></tr>`).join('')}</table>
  <h3>Version anglaise (démonstration) · niveau 1</h3>
  <p class="mentor" style="margin-bottom:3mm">Bouton FR | EN de la version web. En anglais : le niveau 1 complet (séance, fiches, scénarios, quiz, récap, rapport), le tableau de bord et le profil. Textes : src/js/en.js. Ci-dessous, les scripts des 2 vidéos anglaises.</p>
  ${EN_SCRIPTS.map(v => `<div class="video"><p class="vh">▶ ${esc(v[0])}</p>${v[1].map(p => `<p style="margin-bottom:1.2mm">${esc(p)}</p>`).join('')}</div>`).join('')}
  <h3>Profils métiers</h3><table>${D.PROFILES.map(p => `<tr><td><b>${esc(p[1])}</b></td></tr>`).join('')}</table></section>`;

const stats = [['4', 'niveaux'], ['8', 'modules et vidéos'], [String(total.steps), 'étapes de séance'], [String(nQ), 'questions de séance'], [String(nScn), 'scénarios'], [String(nQuiz), 'questions de validation'], [String(Object.values(D.SPACED).flat().length), 'rappels espacés'], [String(refList.length), 'textes cités']];
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Vue d'ensemble du contenu · AI Act · L'essentiel</title>
<style>
@font-face{font-family:'Poppins';font-weight:400;src:url(../src/fonts/poppins-400.woff2)}@font-face{font-family:'Poppins';font-weight:600;src:url(../src/fonts/poppins-600.woff2)}@font-face{font-family:'Poppins';font-weight:700;src:url(../src/fonts/poppins-700.woff2)}
@font-face{font-family:'Titillium Web';font-weight:700;src:url(../src/fonts/titilliumweb-700.woff2)}
:root{--p:#44318D;--d:#20035A;--a:#D93F87;--l1:#ECE8F7;--l3:#F7F5FC;--line:#E4DFF2;--muted:#6B6585;--ok:#1F8A5B;--okbg:#E7F5EE;--mid:#B7791F}
*{box-sizing:border-box;margin:0;padding:0}
@page{size:A4;margin:16mm 15mm 18mm;@bottom-left{content:"AI Act · L'essentiel · Vue d'ensemble du contenu · ${D.CONTENT_VERSION}";font:7.5pt Poppins;color:#6B6585}@bottom-right{content:counter(page) " / " counter(pages);font:7.5pt Poppins;color:#44318D}}
@page:first{margin:0;@bottom-left{content:none}@bottom-right{content:none}}
body{font-family:Poppins,sans-serif;font-size:9.2pt;line-height:1.5;color:var(--d);-webkit-print-color-adjust:exact;print-color-adjust:exact}
h2,h3{font-family:'Titillium Web',sans-serif;line-height:1.15}
b{font-weight:600}
mark{background:none;color:var(--p);font-weight:600}
.cover{height:297mm;background:radial-gradient(120% 80% at 85% 10%,#6b4fc4 0%,#44318D 38%,#20035A 78%);color:#fff;padding:24mm 20mm;position:relative;break-after:page}
.cover .lg{background:#fff;border-radius:5mm;padding:4mm 6mm;display:inline-block}.cover .lg img{height:12mm;display:block}
.cover h1{font-family:'Titillium Web';font-size:40pt;line-height:1.05;margin-top:55mm}.cover h1 span{color:#ffb3d6}
.cover .sub{font-size:12.5pt;color:#e4ddff;margin-top:6mm;max-width:150mm}
.cover .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-top:16mm}
.cover .stats div{border:1px solid rgba(255,255,255,.3);border-radius:4mm;padding:4mm;background:rgba(255,255,255,.07)}
.cover .stats b{display:block;font-family:'Titillium Web';font-size:22pt;color:#ffb3d6;line-height:1}.cover .stats span{font-size:8.5pt;color:#ddd5ff}
.cover .ft{position:absolute;left:20mm;bottom:16mm;font-size:8.5pt;color:#cfc4ff}
.toc{break-after:page}.toc h2{font-size:22pt;margin-bottom:6mm}
.toc a{display:flex;justify-content:space-between;padding:2.6mm 0;border-bottom:1px solid var(--line);color:var(--d);text-decoration:none;font-size:11pt}
.toc .how{margin-top:8mm;padding:4mm 5mm;background:var(--l3);border-radius:4mm;border:1px solid var(--line)}
.toc .how p{margin-bottom:1.5mm}
.level{break-before:page}
.lvlhead{display:flex;gap:5mm;align-items:center;padding:6mm;border-radius:5mm;background:var(--d);color:#fff;margin-bottom:5mm}
.lvlhead .big{font-family:'Titillium Web';font-weight:700;font-size:38pt;color:#ffb3d6;line-height:1;width:16mm;text-align:center}
.lvlhead .eye{font-size:8pt;letter-spacing:.14em;text-transform:uppercase;color:#ffb3d6}
.lvlhead h2{font-size:22pt;color:#fff}.lvlhead .pitch{color:#ddd5ff;font-size:9.5pt;margin-top:1mm}
h3{font-size:14pt;color:var(--p);margin:7mm 0 3mm;padding-bottom:1.5mm;border-bottom:2px solid var(--l1);break-after:avoid}
.goals{background:var(--l3);border:1px solid var(--line);border-radius:3mm;padding:3mm 4mm;margin-bottom:3mm;break-inside:avoid}
.goals ul{padding-left:5mm;margin-top:1mm}
.video{border-left:3px solid var(--a);background:#FDF0F6;padding:3mm 4mm;border-radius:0 3mm 3mm 0;margin-bottom:4mm;font-size:8.8pt;break-inside:avoid}
.video .vh{font-weight:600;color:var(--a);margin-bottom:1mm;font-size:8pt;letter-spacing:.06em;text-transform:uppercase}
.st,.scn{border:1px solid var(--line);border-radius:3mm;margin-bottom:3mm;break-inside:avoid;overflow:hidden}
.st.pb{border-color:#F3B8D0}.st.wrap{background:var(--l3)}.st.fiche{background:var(--okbg);border-color:#bfe3cf}
.sh{display:flex;align-items:baseline;gap:2.5mm;padding:2.2mm 3.5mm;background:var(--l3);border-bottom:1px solid var(--line);break-after:avoid}
.st.pb .sh{background:#FDF0F6}
.sh .num{font-family:'Titillium Web';font-weight:700;color:var(--a);min-width:5mm}
.sh .lbl{font-size:7.6pt;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);font-weight:600}
.sh .tm{margin-left:auto;font-size:7.6pt;color:var(--muted);white-space:nowrap}
.sb{padding:2.5mm 3.5mm}.sb p{margin-bottom:1.6mm}.sb ol,.sb ul{padding-left:5mm;margin-bottom:1.6mm}
.persona .who,.who{font-size:8pt;color:var(--p);background:var(--l1);border-radius:2mm;padding:.3mm 2mm}
.prompt{font-style:italic;color:#3b3360}.clair{background:#FDF0F6;padding:1.8mm 3mm;border-radius:2mm}.mentor{color:var(--muted);font-style:italic;font-size:8.6pt}
.law{background:var(--l1);border-radius:2mm;padding:2mm 3mm;margin:1.5mm 0 2mm}.law .lh{font-size:8pt;color:var(--p);margin-bottom:.6mm}.law .lh i{font-style:normal;font-size:7pt;text-transform:uppercase;letter-spacing:.06em;background:#fff;border-radius:1.5mm;padding:0 1.5mm;margin-left:1.5mm}.law p{font-style:italic;margin:0}
.ref{font-size:7.6pt;color:var(--p);background:var(--l1);border-radius:1.5mm;padding:0 1.5mm}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.keys{display:flex;gap:3mm;flex-wrap:wrap}.keys div{flex:1;min-width:35mm;background:#fff;border:1px solid var(--line);border-radius:2mm;padding:1.5mm 2.5mm;font-size:8.4pt}.keys b{display:block;font-family:'Titillium Web';font-size:15pt;color:var(--a);line-height:1.1}
.q{border:1px solid var(--line);border-radius:3mm;padding:2.5mm 3.5mm;margin-bottom:2.5mm;break-inside:avoid;background:#fff}
.sb .q{border:0;padding:0;margin:0}
.tag{font-size:7.4pt;text-transform:uppercase;letter-spacing:.08em;color:var(--a);font-weight:600}
.qq{font-weight:600;margin:.8mm 0 1.2mm}
ul.opts{list-style:none;padding:0;margin:0 0 1.5mm;display:grid;gap:.8mm}
ul.opts li{padding:1mm 2.5mm;border-radius:2mm;background:var(--l3)}
ul.opts li.good{background:var(--okbg)}ul.opts li.mid{background:#FFF6E5}
.ok{color:var(--ok);font-weight:700}.ko{color:#C0395B;font-weight:700}.md{color:var(--mid);font-weight:700}
.fb{font-size:8.5pt;color:#3b3360;margin-bottom:.8mm}.fb.ko2,.fb.tip{color:var(--muted)}
.fbi{font-size:8.3pt;color:#3b3360}
.ref2{font-size:8pt;color:var(--p);margin-top:1mm}
table{width:100%;border-collapse:collapse;font-size:8.6pt}th{text-align:left;font-size:7.4pt;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);padding:1.6mm 2mm;border-bottom:2px solid var(--l1)}
td{padding:1.6mm 2mm;border-bottom:1px solid var(--line);vertical-align:top}tr{break-inside:avoid}
.url{font-size:7.4pt;color:var(--muted);word-break:break-all}
</style></head><body>
<section class="cover"><div class="lg"><img src="../src/assets/logo-ba.png" alt="Blockchain AkademIA"></div>
<h1>Vue d'ensemble<br>du contenu<br><span>AI Act · L'essentiel</span></h1>
<p class="sub">Tous les sujets abordés, toutes les questions posées et leurs réponses, niveau par niveau : vidéos, séances, scénarios, quiz de validation, rappels et sources.</p>
<div class="stats">${stats.map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
<p class="ft">Version ${D.CONTENT_VERSION} · contenu à jour au ${D.CONTENT_DATE} · document généré automatiquement à partir de la plateforme</p></section>
<section class="toc"><h2>Sommaire</h2>${toc.map(t => `<a href="#${t[0]}">${esc(t[1])}</a>`).join('')}
<div class="how"><p><b>Comment lire ce document</b></p><p><span class="ok">✓</span> bonne réponse · <span class="ko">✗</span> mauvaise réponse · <span class="md">~</span> réponse à nuancer (scénarios).</p><p>Les étapes de chaque module sont présentées dans l'ordre où l'apprenant les voit. Dans la plateforme, la place de la bonne réponse (A, B ou C) varie ; ici, elle est simplement signalée.</p><p>Les mentions « Projet » ou « À vérifier » signalent des points à confirmer par le relecteur juridique.</p></div></section>
${body}</body></html>`;
fs.writeFileSync(path.join(__dirname, 'vue_ensemble.html'), html);
console.log('ok', { etapes: total.steps, questions: nQ, scenarios: nScn, quiz: nQuiz, textes: refList.length });
