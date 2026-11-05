/* =====================================================================
   VERSION ANGLAISE (démonstration) — niveau 1 uniquement
   Actif seulement en version web, quand l'apprenant choisit « EN » dans la barre du haut.
   En français, ce fichier ne change rien.
   - EN_CONTENT : textes du niveau 1 (même ordre que content.js et quiz.js)
   - UI_EN / UI_RE : traduction des textes de l'interface, appliquée à l'affichage
   ===================================================================== */
const EN_ON = (() => {
  try {
    const c = window.BA_CONFIG || {};
    if (c.lang === 'en') return true;   // paquets SCORM anglais
    if (c.mode === 'scorm') return false;
    const s = JSON.parse(localStorage.getItem('ba-aiact-web-v3') || '{}');
    return !!(s.prefs && s.prefs.lang === 'en');
  } catch (_) { return false; }
})();

const EN_P = {
  lea: ['LÉ', 'Léa', 'Project manager · joined on Monday'],
  lea2: ['LÉ', 'Léa', 'Project manager'],
  julien: ['JU', 'Julien', 'Team manager'],
  paul: ['PA', 'Paul', 'Freelance developer on assignment'],
};

const EN_CONTENT = {
  meta: {
    1: { name: 'Discover', title: 'Where is AI?', pitch: 'Recognise an AI system, know who is concerned and what the 2026 Omnibus changes.', modules: ['Module 1 · Recognising AI', 'Module 2 · Training: Article 4'] },
    2: { name: 'Identify', title: 'Who is responsible?', pitch: 'Distinguish provider and deployer, avoid becoming a provider without meaning to, apply transparency.', modules: ['Module 1 · Provider or deployer', 'Module 2 · Models and transparency'] },
    3: { name: 'Spot', title: 'The red lines', pitch: 'Know the prohibited practices, deepfakes and high-risk HR, with Luxembourg labour law.', modules: ['Module 1 · Prohibited practices', 'Module 2 · High-risk HR'] },
    4: { name: 'Act', title: 'Our reflexes', pitch: 'Protect data, respond to an incident, know the penalties and the authorities in Luxembourg.', modules: ['Module 1 · Data and GDPR', 'Module 2 · Incidents, penalties, authorities'] },
  },
  // Étapes de la séance, dans l'ordre de content.js (les vidéos sont ajoutées ensuite par app.js)
  steps: [
    { label: 'Prologue', title: 'First day at Nexalis', persona: EN_P.lea,
      body: [
        'On Monday morning, Léa joins <b>Nexalis</b>, a digital services company with 180 employees based in <b>Belval</b>, as a project manager. Its clients: banks, insurers and SMEs.',
        'Claire, the DPO, shows her around the team\'s tools: email, <b>Copilot</b>, <b>ChatGPT Enterprise</b>, the project management software…',
        'Then she asks her a question: <b>“Out of all these tools, do you know which ones use AI?”</b>'
      ],
      prompt: 'In Luxembourg, <b>33.6%</b> of companies were using AI in 2025, compared with <b>20%</b> across the EU. And you: could you answer Claire\'s question?' },
    { label: 'Situation', title: 'The feature that appeared one morning', persona: EN_P.lea2,
      body: [
        'The next day, opening the team\'s project management software, Léa finds a new button: <b>“Automatic summary”</b>.',
        'Nobody announced it: the vendor switched it on during an update. The summary draws on client meeting notes, tickets and the names of contacts.',
        'Léa has been using it for a week… without asking herself any questions.'
      ],
      prompt: 'Employees often don\'t notice the AI features built into their software. This is one of the findings in the European Commission\'s <b>living repository of AI literacy practices</b>.' },
    { label: 'Question', q: 'What should Léa do with this “automatic summary”?',
      opts: ['Nothing: the software vendor bears the obligations, not Nexalis, which only uses it.', 'Report it for the inventory of AI tools and check what data it processes.', 'Nothing: the vendor switched the feature on without anyone at Nexalis asking for it.'],
      ok: 'Yes. It is an AI system used <b>under the authority</b> of Nexalis, so Nexalis is its <b>deployer</b> (Art. 3(4)). The right reflex: report it for the inventory and check the data processed.',
      ko: 'Not quite. Even though it was switched on without notice, the feature is used <b>under the authority</b> of Nexalis, which is its <b>deployer</b> (Art. 3(4)). It must be reported for the inventory and the data processed must be checked.',
      tip: 'Hint: who uses the tool every day, and on whose behalf?' },
    { label: 'Explanation', title: 'What is an “AI system”?',
      intro: 'It all starts with the definition in <b>Article 3(1)</b>. According to the Commission guidelines of 6 February 2025, the decisive criterion is the <b>capability to infer</b>.',
      crit: [
        ['It infers', 'The tool works out a result by itself from the input it receives: a summary, a prediction, a recommendation…'],
        ['Human rules don\'t count', 'A system based solely on rules defined by humans falls outside the definition.'],
        ['Nor does simple calculation', 'Classical heuristics and basic data processing are also excluded.'],
      ],
      law: { ref: 'Art. 3(1)', title: 'Guidelines of 6 February 2025',
        text: 'The decisive element of the definition is the <mark>capability to infer</mark>. Systems based solely on <mark>rules defined by humans</mark> fall outside it, as do classical heuristics and basic data processing.' },
      mentor: 'If in doubt, report the tool. The inventory is everyone\'s business.' },
    { label: 'The problem', title: '“Our vendor is American”', persona: EN_P.julien,
      body: [
        'During the break, Léa mentions it to Julien. He is adamant: “The tool comes from an American vendor. The AI Act doesn\'t apply.”',
        'Nora adds: “And I use ChatGPT at home to plan my holidays. Does that concern me too?”'
      ],
      prompt: 'Two misconceptions in a single coffee break. What does the regulation say?' },
    { label: 'Legal text', title: 'Who does the AI Act apply to?',
      law: { ref: 'Art. 2(1)', title: 'Scope',
        text: 'The regulation covers providers placing a system on the EU market, <mark>wherever they are established</mark>, <mark>deployers established in the EU</mark>, and even non-EU operators where the output of the system is used in the EU.' },
      why: 'The AI Act is a <b>directly applicable</b> “product” regulation, in force since <b>1 August 2024</b>. The American vendor therefore changes nothing for Nexalis.',
      mustTitle: 'Three exclusions to know',
      must: [
        ['Personal use', 'Purely personal, non-professional use is excluded.', 'Art. 2(10)'],
        ['Research', 'Research carried out before placing on the market.', 'Art. 2(6) and 2(8)'],
        ['Open source, under conditions', 'Only if it is not a high-risk system, a prohibited practice or a system covered by Article 50.', 'Art. 2(12)'],
      ] },
    { label: 'True or false', q: '“An open-source AI tool falls outside the AI Act.”',
      ok: 'Correct: <b>it depends</b>. The open-source exclusion exists (Art. 2(12)), but it does not apply to high-risk systems, prohibited practices (Art. 5) or transparency (Art. 50).',
      ko: 'The right answer is <b>it depends</b>. Open source is excluded under conditions (Art. 2(12)): the exclusion does not apply to high-risk systems, prohibited practices (Art. 5) or transparency (Art. 50).',
      tip: 'Hint: reread the third exclusion in the previous step.' },
    { label: 'New situation', title: 'What Léa takes away',
      body: 'Julien was wrong: where the vendor comes from changes nothing, since Nexalis uses the tool in the EU. Nora can relax: ChatGPT at home falls outside the AI Act. <b>At work, it is covered.</b>',
      keys: [['1', 'decisive criterion: inference'], ['4', 'risk levels'], ['2', 'foundations: AI literacy and GPAI models']],
      next: ['Module 2', 'Paul, a freelance developer, receives the invitation to the module: “I\'m not an employee, this doesn\'t concern me.”'] },
    { label: 'Practical sheet 1' },
    { label: 'Situation', title: '“I\'m not an employee”', persona: EN_P.paul,
      body: [
        'Paul is a freelance developer, on assignment at Nexalis for the past six months. He codes every day with <b>GitHub Copilot</b>.',
        'He receives the invitation to the module and replies to Claire: “I\'m not an employee, this doesn\'t concern me.”'
      ],
      prompt: 'What do you think: is Paul right?' },
    { label: 'Question', q: 'Should Paul take the module?',
      opts: ['No: Article 4 only covers employees with an employment contract.', 'Yes, preferably: Article 4 also covers those acting on the company\'s behalf.', 'Only if he develops AI systems himself for Nexalis\'s clients.'],
      ok: 'Yes. Article 4 covers staff and <b>other persons</b> using AI on behalf of the company. The Commission mentions a contractor, a service provider or a client; the CNPD adds temporary workers, interns and apprentices.',
      ko: 'No: Article 4 also covers <b>other persons</b> acting on behalf of the company, such as a contractor. Paul is concerned, preferably.',
      tip: 'Hint: who is Paul using Copilot for?' },
    { label: 'Legal text', title: 'AI literacy: a best-efforts obligation',
      law: { ref: 'Art. 4 · since 27 July 2026', title: 'AI literacy',
        text: '“Providers and deployers of AI systems shall <mark>take measures to promote</mark> the development of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf […]. This obligation <mark>shall not require</mark> providers or deployers to ensure a specific level of AI literacy of an individual.”' },
      why: 'Training has <b>not become optional</b>: it moves from an obligation of result to a <b>best-efforts obligation</b>. The Commission had proposed removing it; that proposal was not adopted.',
      mentor: 'This module is our proof that we train our teams: who took it, when, and with what score.',
      mustTitle: 'What the Commission and the CNPD expect',
      must: [
        ['No certificate', 'An internal training register is enough.', 'Commission Q&A'],
        ['No mandatory “AI officer”', 'Nor a dedicated committee.', 'Commission Q&A'],
        ['Explain the risks', 'Hallucinations, for example. Relying on the instructions for use alone may be ineffective.', 'Commission Q&A'],
        ['Track and measure', 'Keep a register, monitor completion rates and progress.', 'CNPD'],
      ] },
    { label: 'The problem', title: '“The Omnibus postponed everything”', persona: EN_P.julien,
      body: [
        'Julien is back on the attack: “I read that the Omnibus postponed everything. We have time, right?”',
        'He is talking about the <b>Digital Omnibus on AI</b> (Regulation (EU) 2026/1744), published in the Official Journal on 24 July 2026 and in force since <b>27 July 2026</b>.',
        'The problem: many resources written before May 2026 present as settled some ideas that were ultimately dropped.'
      ],
      prompt: 'Don\'t confuse it with the broader “Digital Omnibus” (GDPR, ePrivacy, NIS2, Data Act), which <b>had still not been adopted</b> at the end of July 2026.' },
    { label: 'Explanation', title: 'What the Omnibus changed… and what it left untouched',
      law: { ref: 'Reg. (EU) 2026/1744', title: 'Digital Omnibus on AI',
        text: 'The Omnibus <mark>suspended nothing</mark>. It postponed the “high-risk” obligations to fixed dates: <mark>2 December 2027</mark> for Annex III and <mark>2 August 2028</mark> for Annex I. It does not touch the eight original prohibitions, the GPAI obligations, the principle and date of Article 50, the fine ceilings or the definition of an AI system.' },
      why: '“Today: prohibitions, AI literacy, transparency. December 2026: sexual deepfakes and child sexual abuse material prohibited, marking of generated content for all. December 2027: high risk in HR, credit, insurance, education. August 2028: high risk in regulated products.”',
      mustTitle: 'What already applies today',
      must: [
        ['Prohibited practices', 'Since 2 February 2025.', 'Art. 5'],
        ['AI literacy', 'Since 2 February 2025; enforced by the authorities from August 2026.', 'Art. 4'],
        ['Transparency', 'Chatbots, deepfakes, generated content: since 2 August 2026.', 'Art. 50'],
      ] },
    { label: 'True or false', q: '“Since the Omnibus, training your teams in AI is still an obligation.”',
      ok: 'Correct: <b>true</b>. The Commission had proposed removing it, but that was not adopted: the obligation becomes “take measures to promote” AI literacy, a best-efforts obligation.',
      ko: 'It is <b>true</b>. The removal proposed by the Commission was not adopted: the obligation becomes “take measures to promote” AI literacy, a best-efforts obligation.',
      tip: 'Hint: reread the text of Article 4 two steps earlier.' },
    { label: 'Practical sheet 2' },
  ],
  scn: [
    { t: 'Management', who: 'Julien, manager', title: 'The user guide as training', theme: 'AI literacy',
      ctx: ['Julien has to train his 12 consultants on Copilot.', 'To save time, he suggests emailing them the vendor\'s user guide.', '“That way, we\'re covered for Article 4.”'],
      q: 'What do you advise Julien?',
      opts: [
        ['Email the vendor\'s user guide: it is the tool\'s official documentation.', 'Avoid', 'The Commission considers that relying on the instructions alone may be ineffective. For the CNPD, “simple or isolated” instructions may be insufficient.'],
        ['A short, role-specific training on the risks, recorded in the register.', 'Right answer', 'This is the minimum expected: understanding the AI used, knowing one\'s role and its risks, adapted to the staff\'s level and context.'],
        ['Ban Copilot until each consultant has obtained an official certificate.', 'Avoid', 'No certificate is required: an internal training register is enough.'],
      ], law: 'Art. 4 · Commission Q&A · CNPD' },
    { t: 'Compliance', who: 'Claire, DPO', title: 'The proof requested by the client', theme: 'AI literacy',
      ctx: ['A banking client asks Nexalis for proof that its consultants are trained in AI.', 'Claire has to reply by Friday.', 'She wonders what document to provide.'],
      q: 'What proof should Claire be able to provide?',
      opts: [
        ['An official certificate issued by an accredited body for each of the consultants.', 'Avoid', 'There is no mandatory certificate: “There is no need for a certificate”, according to the Commission Q&A.'],
        ['A sworn statement signed by each consultant, kept by HR.', 'Partly', 'Better than nothing, but the CNPD recommends keeping a register and measuring effectiveness (completion rate, progress).'],
        ['An internal register: who was trained, when, on what content, with what score.', 'Right answer', 'The module itself is the company\'s Article 4 measure. Its traceability matters as much as its content.'],
      ], law: 'Art. 4 · Commission Q&A · CNPD' },
    { t: 'Everyday use', who: 'Nora, data consultant', title: 'ChatGPT, at home and at the office', theme: 'Scope',
      ctx: ['In the evening, Nora uses ChatGPT to organise her holidays.', 'In the morning, she uses it to rephrase the minutes of a client meeting.', 'She wonders which of these falls under the AI Act.'],
      q: 'Which use falls within the scope of the AI Act?',
      opts: [
        ['Both: ChatGPT is an AI system.', 'Avoid', 'Purely personal, non-professional use is excluded (Art. 2(10)).'],
        ['Neither: ChatGPT is a consumer tool.', 'Avoid', 'At work, Nora acts for Nexalis: the use is covered.'],
        ['Only the use at work.', 'Right answer', 'At work, the use is covered. And for client minutes, the GDPR and client confidentiality also apply: only a tool approved by the company.'],
      ], law: 'Art. 2(10)' },
  ],
  recap: [
    ['An AI system is…', 'A tool that <b>infers</b>: it works out a result from its data by itself. Rules written by humans and basic data processing are not AI systems.', 'Art. 3(1)'],
    ['Who is concerned?', '<ul><li>Providers on the EU market, wherever they are</li><li>Deployers established in the EU</li><li>Not purely personal use</li></ul>', 'Art. 2'],
    ['Four risk levels', '<ul><li><b>Prohibited</b></li><li><b>High risk</b></li><li><b>Transparency risk</b></li><li><b>Minimal risk</b>, with no specific rules</li></ul>', 'Art. 5, 6, 50'],
    ['Training: a best-efforts obligation', '“Take measures to promote” AI literacy, for employees <b>and</b> other persons acting for the company. No certificate: a register.', 'Art. 4'],
    ['The 2026 Omnibus', 'It suspended nothing. Only high risk is postponed: <b>2 December 2027</b> (Annex III) and <b>2 August 2028</b> (Annex I).', 'Reg. 2026/1744'],
    ['Already applicable', '<ul><li>Prohibited practices</li><li>AI literacy</li><li>Transparency (since 2 August 2026)</li></ul>', 'Art. 4, 5, 50', true],
  ],
  goals: {
    '1-1': ['Spot an AI system using the inference criterion', 'Know who the AI Act applies to, even with a non-EU vendor', 'Know the exclusions: personal use, research, open source under conditions'],
    '1-2': ['Understand the AI literacy obligation (Art. 4)', 'Know what the 2026 Omnibus changed, and what it left untouched', 'Remember the key dates of the timeline'],
  },
  know: [['Definition of an AI system', 'Inference, the decisive criterion.'], ['Hidden AI and inventory', 'Spotting AI in your software.'], ['Scope', 'Who is concerned, and the exclusions.'], ['AI literacy (Art. 4)', 'A best-efforts obligation, with records.'], ['The Omnibus and the timeline', 'What is postponed, and what is not.']],
  spaced: [
    ['“The AI Act bans ChatGPT and generative AI.”', 'Faux', 'Only the practices listed in Art. 5 are prohibited; the risk depends on the use.'],
    ['“My use of ChatGPT at home falls under the AI Act.”', 'Faux', 'Purely personal, non-professional use is excluded; at work, it is covered.'],
    ['“An internal training register is enough to prove AI literacy.”', 'Vrai', 'No certificate is required; an internal training register is enough.'],
    ['“With the Omnibus, only the high-risk rules are postponed.”', 'Vrai', 'Only high risk is postponed (2 Dec. 2027 and 2 Aug. 2028); prohibitions, Art. 4 and Art. 50 already apply.'],
  ],
  profiles: [
    ['All employees, temporary workers, interns, freelancers on assignment', 'Art. 4 (tailored, recorded training); Art. 5; GDPR and client confidentiality in every prompt', '2 Dec. 2026: ban on non-consensual intimate deepfakes', '“AI at work is already regulated: approved tools, protected data, doubts reported.”'],
    ['Developers, data, integrators', 'Art. 50(1) and (2) for chatbots and generative systems delivered; Art. 5 for what we build', '2 Dec. 2026: marking of existing generative systems and anti-nudification safeguards; 2 Dec. 2027: high-risk provider obligations and Art. 25', '“As soon as we deliver under our own name, we are a provider.”'],
    ['HR and managers', 'Art. 5(1)(f): no emotion recognition of employees or candidates; GDPR (Art. 22, DPIA); Labour Code (L.261-1, L.414-9)', '2 Dec. 2027: deployer obligations (Art. 26), prior information of representatives (26(7)) and candidates (26(11))', '“Sorting, scoring or monitoring people with AI is high risk.”'],
    ['Sales, pre-sales, project managers', 'Qualifying client use cases (Art. 5, Art. 50, Annex III); DORA clauses with financial clients', '2 Dec. 2027: written agreement under Art. 25(4) with clients who provide high-risk systems', '“We assess the risk before we quote.”'],
    ['Management, legal, DPO', 'Register of Art. 4 measures; AI use policy; inventory of systems', 'Law 8476, final high-risk guidelines, harmonised standards', '“We must be able to prove what we have done.”'],
  ],
  quiz: [
    { id: 'b101', q: 'Which criterion determines whether a tool is an AI system?',
      o: ['Its capability to infer: it works out a result by itself from the data received.', 'The fact that its vendor presents it as an “intelligent” tool.', 'The volume of data it processes, above a certain threshold.'],
      why: 'According to Article 3(1) and the guidelines of 6 February 2025, the decisive criterion is the <b>capability to infer</b>.' },
    { id: 'b102', vf: 'Faux', q: '“A tool that only applies rules written by humans is an AI system.”',
      why: 'Systems based solely on rules written by humans <b>fall outside the definition</b>, as does simple calculation.' },
    { id: 'b103', q: 'A US vendor supplies the AI tool used by a Luxembourg company. The AI Act…',
      o: ['applies, since the tool is used in the European Union.', 'does not apply, since the vendor is established outside the Union.', 'will only apply after a Luxembourg transposition law.'],
      why: 'The regulation covers deployers established in the EU, whatever the provider\'s origin (Art. 2(1)). It is <b>directly applicable</b>.' },
    { id: 'b104', vf: 'Vrai', q: '“Using ChatGPT at home to plan your holidays falls outside the scope of the AI Act.”',
      why: 'Purely <b>personal, non-professional use</b> is excluded (Art. 2(10)). At work, it is covered.' },
    { id: 'b105', q: 'Since when has the AI Act been in force?',
      o: ['Since 1 August 2024.', 'Since 2 August 2026.', 'It will be on 2 December 2027.'],
      why: 'The regulation entered into force on <b>1 August 2024</b>. Its obligations then apply in stages.' },
    { id: 'b106', q: 'Since when have the prohibited practices and the AI literacy obligation applied?',
      o: ['Since 2 February 2025.', 'Since 2 August 2026.', 'From 2 December 2027.'],
      why: 'The prohibitions in Article 5 and Article 4 have applied since <b>2 February 2025</b>.' },
    { id: 'b107', q: 'Who is covered by the AI literacy obligation (Article 4)?',
      o: ['Staff and other persons who use AI on behalf of the company.', 'Only the company\'s developers and IT team.', 'Only permanent employees who use AI every day.'],
      why: 'Article 4 covers staff and <b>other persons</b> acting on behalf of the company: contractors, temporary workers, interns…' },
    { id: 'b108', vf: 'Faux', q: '“To comply with Article 4, every employee must obtain an official certificate.”',
      why: 'No certificate is required. An <b>internal register</b> (who was trained, when, with what result) is enough.' },
    { id: 'b109', q: 'What did the 2026 AI Omnibus change for Article 4?',
      o: ['The obligation becomes “take measures to promote” AI literacy.', 'The training obligation was simply removed.', 'The obligation now only covers companies with more than 250 employees.'],
      why: 'The removal proposed by the Commission was not adopted. It is now a <b>best-efforts obligation</b>, and training has not become optional.' },
    { id: 'b110', vf: 'Ça dépend', q: '“Publishing an AI tool as open source is enough to escape the AI Act.”',
      why: 'The open-source exclusion exists (Art. 2(12)), but it does not apply to <b>high risk</b>, <b>prohibited practices</b> or <b>transparency</b>.' },
    { id: 'b111', q: 'Which risk level does a chatbot answering customers fall into?',
      o: ['Transparency risk: the person must be informed.', 'Minimal risk: no particular rules apply.', 'High risk, like any tool in contact with customers.'],
      why: 'Chatbots, deepfakes and generated content fall under <b>transparency risk</b> (Art. 50): you must inform or disclose.' },
    { id: 'b112', q: 'An AI feature appears in your software after an update. What is the right reflex?',
      o: ['Report it for the inventory and check the data it processes.', 'Use it as normal: the vendor is responsible for it.', 'Switch it off without telling anyone, to avoid any problem.'],
      why: 'The company using the tool under its authority is its <b>deployer</b>. The right reflex: report it and check the data processed.' },
  ],
  fiches: [
    { title: 'Recognising AI and its risk level', render: () => `
      <div class="fiche">
        <div>
          <div class="illus">${ILLUS.pyramid()}</div>
          <div class="card pad flat" style="margin-top:16px">
            <h4 style="margin-bottom:8px">Two cross-cutting foundations</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span><div><b>AI literacy</b><small>For all providers and deployers (Art. 4).</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>General-purpose AI models</b><small>A separate regime for providers of GPAI models.</small></div></li>
            </ul>
          </div>
        </div>
        <div>
          ${risks([
            ['var(--ko)', 'Prohibited', 'ko', 'Practices listed in Article 5.', 'Emotion recognition at work, social scoring.', 'Art. 5'],
            ['var(--a)', 'High risk', 'pk', 'Uses listed in Annexes I and III.', 'Recruitment, employee management, credit scoring, life and health insurance pricing.', 'Art. 6'],
            ['var(--s)', 'Transparency risk', '', 'You must inform or disclose.', 'Chatbots, deepfakes, generated content.', 'Art. 50'],
            ['#A99AD6', 'Minimal risk', 'grey', 'No specific rules.', 'Drafting an email with Copilot internally (the GDPR still applies).', '—'],
          ])}
          <div class="clair" style="margin-top:14px">${ic('bulb')}<div><b>Recognising AI:</b> does the tool <b>infer</b> a result from its data? If so, it is an AI system. If it only applies rules written by humans, it is not.</div></div>
        </div>
      </div>` },
    { title: 'The timeline as of 12 October 2026', render: () => `
      <div class="fiche" style="grid-template-columns:1.25fr 1fr">
        <div><div class="tl">${[
          ['1 August 2024', 'Entry into force of the AI Act', 'Directly applicable regulation.', 'past'],
          ['2 February 2025', 'Prohibitions and AI literacy', 'Eight prohibited practices (Art. 5), Article 4.', 'past'],
          ['2 August 2025', 'GPAI models and governance', 'Obligations of model providers, penalties regime.', 'past'],
          ['27 July 2026', 'Entry into force of the Omnibus', 'New Article 4 and Article 4a.', 'past'],
          ['2 August 2026', 'Transparency', 'Article 50: chatbots, deepfakes, generated content.', 'now'],
          ['2 December 2026', 'New prohibitions', 'Non-consensual intimate deepfakes, child sexual abuse material; marking of existing generative systems.', 'fut'],
          ['2 December 2027', 'High risk, Annex III', 'HR, credit, insurance, education: Art. 8 to 15, 16, 25, 26, 27.', 'fut'],
          ['2 August 2028', 'High risk, Annex I', 'Safety components of regulated products.', 'fut'],
        ].map(t => `<div class="it ${t[3]}"><div class="d">${t[0]}</div><div class="pt"></div><div><b>${t[1]} ${t[3] === 'now' ? '<span class="chip pk">In force</span>' : ''}</b><small>${t[2]}</small></div></div>`).join('')}</div></div>
        <div>
          <div class="card pad flat" style="background:var(--d);border-color:var(--d);color:#fff">
            <p class="eyebrow" style="color:#F7A8CC">The key message</p>
            <p style="margin-top:8px;font-size:14.5px;line-height:1.7">“Today: prohibitions, AI literacy, transparency. December 2026: sexual deepfakes and child sexual abuse material prohibited, marking of generated content for all. December 2027: high risk in HR, credit, insurance, education. August 2028: high risk in regulated products.”</p>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:8px">Three nuances to avoid mistakes</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span><div><b>Article 4</b><small>Mandatory since February 2025, enforced by the authorities from August 2026.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>2 December 2026 for Article 50</b><small>Only applies to the marking of generative systems already on the market. Chatbots and deepfakes: since 2 August 2026.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>New prohibitions</b><small>A deferred application date, not a grace period.</small></div></li>
            </ul>
          </div>
        </div>
      </div>` },
  ],
};

/* Remplacement du contenu du niveau 1 (avant l'ajout des vidéos par app.js) */
if (EN_ON) {
  const E = EN_CONTENT;
  [1, 2, 3, 4].forEach(n => Object.assign(LV[n - 1], E.meta[n]));
  const SRC = { 1: { steps: E.steps, scn: E.scn, recap: E.recap }, ...EN_LEVELS };
  LV.forEach(L1 => {
    const T = SRC[L1.n]; if (!T) return;
    L1.steps.forEach((s, i) => {
      const e = T.steps[i]; if (!e) return;
      const { opts, law, ...rest } = e, law0 = s.law;
      Object.assign(s, rest);
      if (opts && s.kind !== 'vf') s.opts = s.opts.map((o, k) => [opts[k], o[1]]);
      if (law) s.law = { ...law0, ...law };
    });
    L1.scn.forEach((sc, i) => {
      const { opts, ...rest } = T.scn[i];
      Object.assign(sc, rest);
      sc.opts = sc.opts.map((o, k) => [opts[k][0], o[1], opts[k][1], opts[k][2]]);
    });
    L1.recap = T.recap;
  });
  Object.assign(MODULE_GOALS, E.goals, EN_GOALS);
  const KN = [...E.know, ...EN_KNOW];
  KNOW.forEach((k, i) => { if (KN[i]) { k[1] = KN[i][0]; k[2] = KN[i][1]; } });
  Object.assign(SPACED, { 1: E.spaced }, EN_SPACED);
  Object.assign(QUIZ, { 1: E.quiz }, EN_QUIZ);
  E.profiles.forEach((x, i) => { PROFILES[i][1] = x[0]; PROFILES[i][2] = x[1]; PROFILES[i][3] = x[2]; PROFILES[i][4] = x[3]; });
  Object.assign(FICHES, { 1: E.fiches }, EN_FICHES);
  OFFICIAL.forEach((o, i) => { const t = EN_OFFICIAL[i]; if (t) { o[0] = t[0]; o[1] = t[1]; if (t[2]) o[2] = t[2]; } });
  FURTHER.forEach((o, i) => { if (EN_FURTHER[i]) o[0] = EN_FURTHER[i]; });
  document.documentElement.lang = 'en';
  Object.keys(ILLUS).forEach(k => { const f = ILLUS[k]; if (typeof f !== 'function') return;
    ILLUS[k] = (...x) => f(...x).replace(/>([^<>]+)</g, (m, t) => '>' + trEN(t) + '<').replace(/aria-label="([^"]*)"/g, (m, t) => 'aria-label="' + trEN(t) + '"'); });
}

/* ---------------------------------------------------------------------
   Traduction de l'interface (textes fixes de l'application)
   --------------------------------------------------------------------- */
const UI_EN = {
  // Navigation et en-tête
  'Aller au contenu': 'Skip to content', 'Tableau de bord': 'Dashboard', 'Parcours en 4 niveaux': '4-level learning path', 'Mon espace': 'My space',
  'Connaissances': 'Knowledge', 'connaissances': 'knowledge', 'Ressources': 'Resources', 'Évaluation finale': 'Final assessment', 'Formation · Art. 4': 'Training · Art. 4',
  'Nouvel apprenant': 'New learner', 'Profil à compléter': 'Profile to complete', 'Notifications': 'Notifications', 'Tout marquer comme lu': 'Mark all as read',
  'Masquer le menu': 'Hide menu', 'Afficher le menu': 'Show menu', 'Navigation principale': 'Main navigation', 'Langue': 'Language', 'Ouvrir mon profil': 'Open my profile',
  'Rechercher une notion, un article…': 'Search a concept, an article…', 'Rechercher': 'Search', 'Nouveau !': 'New!',
  'Séance': 'Session', 'Fiches pratiques': 'Practical sheets', 'Scénarios': 'Scenarios', 'Quiz de validation': 'Validation quiz', 'Récap & rapport': 'Recap & report',
  // Tableau de bord
  'Formation à la maîtrise de l\'IA · Art. 4': 'AI literacy training · Art. 4', 'Bienvenue dans la formation AI Act': 'Welcome to the AI Act training',
  'Commencez par le niveau 1 · Prologue.': 'Start with Level 1 · Prologue.', 'Suivez': 'Follow',
  ', cheffe de projet chez Nexalis, une ESN (entreprise de services du numérique) de Belval. En 4 niveaux d\'environ 25 minutes, apprenez à repérer l\'IA, à savoir qui est responsable, à respecter les lignes rouges et à adopter les bons réflexes.': ', a project manager at Nexalis, an IT services company based in Belval. In 4 levels of about 25 minutes each, learn to spot AI, know who is responsible, respect the red lines and adopt the right reflexes.',
  'Compléter mon profil': 'Complete my profile', 'Complétez votre profil': 'Complete your profile', 'Choisissez votre métier pour voir ce qui vous concerne en priorité.': 'Choose your job to see what matters most for you.',
  'niveaux validés': 'levels passed', 'Votre parcours': 'Your learning path', 'Atteignez 80 % de réussite pour débloquer le niveau suivant.': 'Reach 80% to unlock the next level.',
  'Disponible': 'Available', 'En cours': 'In progress', 'Verrouillé': 'Locked', 'Pas commencé': 'Not started', 'Parcouru': 'Completed', 'Validé': 'Passed', 'Réussi': 'Passed', 'Réussite': 'Success rate',
  'Rappels J+7 et J+30': 'Reminders at D+7 and D+30', 'Des tests courts et espacés ancrent mieux que la relecture. Après la validation d\'un niveau :': 'Short, spaced tests anchor learning better than rereading. After passing a level:',
  '· deux idées reçues à vérifier': '· two misconceptions to check', '· deux autres idées reçues': '· two more misconceptions', 'Vrai, faux ou ça dépend : 30 secondes chacune.': 'True, false or it depends: 30 seconds each.',
  'Pour ancrer durablement les bons réflexes.': 'To make the right reflexes stick.', 'Vous recevrez une notification quand un rappel est disponible.': 'You will get a notification when a reminder is available.',
  'Version v2.0 · intègre l\'Omnibus sur l\'IA de 2026.': 'Version v2.0 · includes the 2026 AI Omnibus.', 'Rien à revoir pour l\'instant': 'Nothing to review for now', 'À revoir': 'To review',
  'Au fil du parcours, vos réponses à retravailler apparaîtront ici, avec un lien direct vers l\'explication.': 'As you progress, the answers you need to work on will appear here, with a direct link to the explanation.',
  'Retentez les questions ratées depuis votre rapport.': 'Retake the questions you missed from your report.', 'J+7': 'D+7', 'J+30': 'D+30',
  // Séance
  'Partie 1 · Comprendre': 'Part 1 · Understand', 'Partie 2 · S\'entraîner': 'Part 2 · Practise', 'Partie 1 · progression': 'Part 1 · progress', 'Fin de niveau': 'End of level',
  'Plan du niveau': 'Level outline', 'Entre les modules': 'Between modules', '3 scénarios': '3 scenarios', 'Fiche récap & rapport': 'Recap sheet & report',
  'Vidéo de présentation': 'Introduction video', 'Vidéo de présentation du module': 'Module introduction video', '1 min 30 à 2 min · bientôt disponible': '1 min 30 to 2 min · coming soon',
  'Dans ce module, vous allez :': 'In this module, you will:', 'Précédent': 'Previous', 'Continuer': 'Continue', 'Passer': 'Skip', 'Bonne réponse': 'Correct answer', 'Ce n\'est pas la bonne réponse': 'That\'s not the right answer',
  'Partie 2 : scénarios': 'Part 2: scenarios', 'Le conseil de Claire, DPO': 'Claire\'s advice (DPO)', 'Ouvrir en grand': 'Open full size', 'PDF': 'PDF',
  'Ce module est la preuve art. 4 de l\'entreprise : il trace qui, quand, quelle version et quel score.': 'This module is the company\'s Art. 4 proof: it records who, when, which version and what score.',
  'Loi': 'Law', 'Guide': 'Guidance', 'Projet': 'Draft', 'À vérifier': 'To be checked', 'Texte adopté': 'Adopted text', 'Non contraignant': 'Non-binding', 'Texte non adopté': 'Text not adopted',
  'Vrai': 'True', 'Faux': 'False', 'Ça dépend': 'It depends', 'V': 'T', 'Couvert': 'Covered',
  // Fiches
  'Une fiche se débloque à la fin de chaque module. Gardez-les sous la main.': 'A sheet unlocks at the end of each module. Keep them handy.', 'Télécharger en PDF': 'Download as PDF',
  'Fiche 1': 'Sheet 1', 'Fiche 2': 'Sheet 2',
  // Scénarios
  'S\'entraîner avec des scénarios': 'Practise with scenarios', 'Mettez-vous à la place d\'un collègue de Nexalis. Chaque choix a une conséquence, sans risque réel : c\'est fait pour s\'entraîner.': 'Put yourself in the shoes of a Nexalis colleague. Every choice has a consequence, with no real risk: it\'s made for practice.',
  'Prenez le temps de lire chaque option. Votre réponse compte pour le rapport de niveau.': 'Take the time to read each option. Your answer counts towards the level report.',
  'Scénario suivant': 'Next scenario', 'Conséquence :': 'Consequence:', 'La bonne pratique :': 'Best practice:', 'Cas pratique ·': 'Case study ·', 'Le problème ·': 'The problem ·',
  // Quiz
  'Prêt ?': 'Ready?', 'Quiz réussi': 'Quiz passed', 'Pas encore réussi': 'Not passed yet', 'Tentatives': 'Attempts', 'Meilleur score': 'Best score', 'Statut': 'Status',
  'À passer': 'To take', 'À retenter': 'To retake', 'Commencer le quiz': 'Start the quiz', 'Nouvelle tentative': 'New attempt', 'Valider mes réponses': 'Submit my answers',
  'Correction de la dernière tentative': 'Corrections for the last attempt', 'Passer le quiz de validation': 'Take the validation quiz', 'Retenter le quiz de validation': 'Retake the validation quiz',
  'Quiz à réussir': 'Quiz to pass', 'Sous le seuil': 'Below the threshold',
  // Récap, rapport, documents
  'Fiche récap': 'Recap sheet', 'Rapport de niveau': 'Level report', 'Seuil de validation :': 'Validation threshold:', 'réponses données': 'answers given', 'points': 'points',
  'Trace de formation · registre art. 4': 'Training record · Art. 4 register', 'Apprenant': 'Learner', 'Votre réponse': 'Your answer',
  'Chacune de vos réponses, la bonne réponse et l\'explication. Le rapport se met à jour à chaque réponse.': 'Each of your answers, the correct answer and the explanation. The report updates with every answer.',
  'Retenter les questions ratées': 'Retake the questions I missed', 'Relisez la fiche pratique correspondante, puis retentez la question.': 'Reread the corresponding practical sheet, then retake the question.', 'Réviser': 'Review', 'Registre de formation': 'Training register', 'Contenu à jour au': 'Content up to date as of', 'À jour au': 'Up to date as of',
  'Niveau': 'Level', 'Ce que couvre cette fiche': 'What this sheet covers', '1. L\'essentiel en un coup d\'œil': '1. At a glance', '2. Le cours en détail': '2. The course in detail',
  '3. Les cas pratiques du module': '3. The module\'s case studies', '4. Questions clés et réponses': '4. Key questions and answers', '5. Textes de référence et contacts': '5. Reference texts and contacts',
  'Textes cités dans le module': 'Texts cited in the module', 'Vers qui se tourner': 'Who to contact', 'Votre DPO': 'Your DPO',
  ': pour signaler un outil d\'IA ou poser une question en interne.': ': to report an AI tool or ask a question internally.',
  '· ia@cnpd.lu : questions sur l\'IA à l\'autorité luxembourgeoise.': '· ia@cnpd.lu: questions about AI for the Luxembourg authority.',
  ': le guichet officiel de la Commission européenne.': ': the European Commission\'s official help desk.',
  'Règlement (UE) 2024/1689 (AI Act), modifié par l\'Omnibus sur l\'IA de 2026. Les points marqués « Projet » ou « À vérifier » restent à confirmer.': 'Regulation (EU) 2024/1689 (AI Act), as amended by the 2026 AI Omnibus. Points marked “Draft” or “To be checked” remain to be confirmed.',
  'Les points marqués': 'Points marked', '. Les points marqués': '. Points marked', 'peuvent évoluer.': 'may change.', 'ou': 'or',
  // Profil et attestation
  'Mon profil': 'My profile', 'Vos informations, votre progression et vos préférences. Ces informations restent enregistrées dans ce navigateur.': 'Your details, your progress and your preferences. This information stays stored in this browser.',
  'Attestation de suivi (PDF)': 'Certificate of attendance (PDF)', 'Prénom et nom': 'First and last name', 'Ex. : Camille Laurent': 'e.g. Camille Laurent', 'Utilisé pour l\'attestation et le rapport.': 'Used for the certificate and the report.',
  'Début de la formation': 'Training started', 'Dernière activité': 'Last activity', 'Temps passé': 'Time spent', 'Version du contenu': 'Content version', 'Suivi': 'Tracking', 'Sauvegarde dans ce navigateur': 'Saved in this browser',
  'questions répondues': 'questions answered', 'de bonnes réponses': 'correct answers', 'fiches débloquées': 'sheets unlocked', 'scénarios réussis': 'scenarios passed', 'notions maîtrisées': 'concepts mastered',
  'Mon métier': 'My job', 'Choisissez votre profil : le parcours reste le même, mais vous voyez ce qui vous concerne en priorité.': 'Choose your profile: the learning path stays the same, but you see what matters most for you first.',
  'Ce que chaque profil doit retenir': 'What each profile should remember', 'Ce qui s\'applique déjà': 'What already applies', 'Ce qui arrive': 'What is coming',
  'Progression et trace de formation': 'Progress and training record', 'Prochains rappels': 'Next reminders', 'Date de validation': 'Date passed', 'Validé le': 'Passed on',
  'À commencer': 'To start', 'Non commencé': 'Not started', 'Non validé': 'Not passed', 'Non passée': 'Not taken', 'Réussie': 'Passed', 'Non réussie': 'Not passed',
  'Confort de lecture': 'Reading comfort', 'Taille du texte': 'Text size', 'Normale': 'Normal', 'Grande': 'Large', 'Très grande': 'Very large', 'Réduire les animations': 'Reduce animations', 'Masquer le menu de gauche': 'Hide the left menu',
  'Temps régulé': 'Timed progression', 'Option': 'Option', 'Oui': 'Yes', 'Non': 'No',
  'Chaque page de cours reste affichée au moins un tiers du temps indiqué, et chaque vidéo doit être vue en entier avant de passer à la suite.': 'Each course page stays on screen for at least a third of the indicated time, and each video must be watched in full before moving on.',
  'Contacts utiles': 'Useful contacts', 'Pour signaler un outil d\'IA ou poser une question en interne.': 'To report an AI tool or ask a question internally.',
  'Questions sur l\'IA à l\'autorité luxembourgeoise.': 'Questions about AI for the Luxembourg authority.', 'Le guichet officiel de la Commission.': 'The Commission\'s official help desk.',
  'Attestation de suivi · Maîtrise de l\'IA': 'Certificate of attendance · AI literacy', 'Blockchain AkademIA atteste que': 'Blockchain AkademIA certifies that', 'a suivi la formation': 'has taken the training',
  ', au titre des mesures de maîtrise de l\'IA prévues par l\'article 4 du règlement (UE) 2024/1689.': ', as part of the AI literacy measures required by Article 4 of Regulation (EU) 2024/1689.',
  'Date de validation ': 'Date passed',
  // Niveaux 2 à 4, Connaissances, Ressources, évaluation finale, recherche, simulateur
  'Texte non adopté.': 'Text not adopted.', 'Accueil du niveau': 'Level home', 'Mon niveau': 'My level', 'réussite (seuil 80%)': 'success rate (80% threshold)', 'durée': 'duration', 'Commencer le niveau': 'Start the level',
  'Déroulé du niveau': 'How the level works', 'Au début de chaque module': 'At the start of each module', 'Situation, question, article de loi': 'Situation, question, legal text', 'Fiche pratique': 'Practical sheet',
  'L\'essentiel à garder': 'The key points to keep', 'Nouvelle situation, problème, question': 'New situation, problem, question', 'Part 2 · 3 scénarios': 'Part 2 · 3 scenarios', 'Choix et conséquences': 'Choices and consequences',
  'Score et réponses détaillées': 'Score and detailed answers', 'Des tests courts et espacés ancrent mieux que la relecture. Après la validation du niveau:': 'Short, spaced tests anchor learning better than rereading. After passing the level:',
  'Quiz pas encore disponible': 'Quiz not available yet', 'Reprendre la séance': 'Resume the session', 'Reprendre le niveau': 'Resume the level', 'niveau validé': 'level passed', 'Question à faire': 'Question to answer',
  'Chaque notion du niveau, avec votre taux de maîtrise. Il se calcule à partir de vos réponses aux questions et aux scénarios qui la travaillent.': 'Every concept in the level, with your mastery rate. It is calculated from your answers to the questions and scenarios that cover it.',
  'Les fiches du niveau, les textes officiels et les guides cités dans le cours. Les ressources externes se citent et se consultent en lien.': 'The level\'s sheets, the official texts and the guidance cited in the course. External resources are cited and consulted via their links.',
  'Vos informations, votre progression et vos préférences. Votre identité vient de la plateforme de formation.': 'Your details, your progress and your preferences. Your identity comes from the training platform.',
  'Connecté à la plateforme (SCORM 1.2)': 'Connected to the platform (SCORM 1.2)', 'Niveau validé: votre résultat est transmis à la plateforme.': 'Level passed: your result has been sent to the platform.', 'Comprendre et appliquer l\'AI Act': 'Understand and apply the AI Act', 'Revoir': 'Review', 'Manquement': 'Infringement', 'Type d\'entreprise': 'Company type', 'Pas d\'amende propre': 'No specific fine', 'Mes connaissances': 'My knowledge', 'Pour aller plus loin': 'Further reading', 'Parcours complet · 4 niveaux': 'Full course · 4 levels', 'Haut risque': 'High risk', 'Transparence': 'Transparency', 'Notion': 'Concept', 'retenu': 'applied', 'PME': 'SME', 'Fiche': 'Sheet', 'écarté': 'rejected', 'Toutes': 'All', 'Plafond': 'Ceiling', 'Avatar IA': 'AI avatar', 'Maîtrisée': 'Mastered', 'Débloquée': 'Unlocked',
  'Glossaire': 'Glossary', 'Découvrir': 'Discover', 'À valider': 'To pass', 'Entreprise': 'Company', 'Qui paie ?': 'Who pays?',
  'Infraction': 'Infringement', 'Validez le': 'Pass', 'Conseillère': 'Adviser', 'à découvrir': 'to discover', 'À découvrir': 'To discover', 'Assistant IA': 'AI assistant',
  'Solde de B :': 'B\'s balance:', 'Rédigé par IA': 'Written by AI', 'du CA mondial': 'of worldwide turnover', 'avec au moins': 'with at least',
  'Assistant livré': 'Delivered assistant', 'Intérêt public ?': 'Public interest?', 'Plafond d\'amende': 'Fine ceiling', 'Maîtrise globale': 'Overall mastery', 'Tous les niveaux': 'All levels',
  'Ouvrir la fiche': 'Open the sheet', 'Exemples du cours': 'Examples from the course', 'Niveau verrouillé': 'Level locked', 'Modèle open source': 'Open-source model',
  '2 fautes corrigées': '2 typos corrected', 'Score de potentiel': 'Potential score', 'Souscription santé': 'Health insurance application', 'Ou % du CA mondial': 'Or % of worldwide turnover',
  'Glossaire officiel': 'Official glossary', 'Évaluation réussie': 'Assessment passed', 'votre conseillère 😊': 'your adviser 😊', 'Aucune mention “IA”': 'No “AI” mention', 'Lire les étiquettes': 'Reading the labels',
  'Il ne parle pas lux.': 'He doesn\'t speak Lux.', 'Attestation de suivi': 'Certificate of attendance', 'déployeur (deployer)': 'deployer (déployeur)', 'Aucun humain n\'a relu': 'No human reviewed it',
  'Projet de loi n° 8476': 'Draft law No. 8476', 'calcul < 1/3 du modèle': 'compute < 1/3 of the model', 'ÉCARTÉ AUTOMATIQUEMENT': 'AUTOMATICALLY REJECTED', 'en cours d\'acquisition': 'being acquired',
  'Le niveau sur une page': 'The level on one page', 'Ouvrir la fiche récap': 'Open the recap sheet', 'Commencer l\'évaluation': 'Start the assessment', 'Je vous rembourse 35 €.': 'I\'ll refund you €35.',
  'Délégation du personnel': 'Staff delegation', 'Mention “généré par IA”': '“AI-generated” notice', 'Une question sur l\'IA ?': 'A question about AI?', 'Codécision ≥ 150 salariés': 'Co-decision ≥ 150 employees',
  'Maîtrise de l\'IA (art. 4)': 'AI literacy (Art. 4)', 'Parcours terminé, bravo !': 'Course completed, well done!', 'Ce qui pèse sur le montant': 'What affects the amount', 'Textes et guides officiels': 'Official texts and guidance',
  'Mon colis est arrivé cassé…': 'My parcel arrived broken…', 'Aucun humain dans la boucle': 'No human in the loop', '2018 – 2020 · Pause carrière': '2018 – 2020 · Career break',
  'Chiffre d\'affaires mondial :': 'Worldwide turnover:', '2021 – 2026 · Chef de secteur': '2021 – 2026 · Area manager', '2012 – 2017 · Commercial': '2012 – 2017 · Sales', 'Évaluation finale verrouillée': 'Final assessment locked',
  'Souhaitez-vous un conseiller ?': 'Would you like an adviser?', 'Votre résultat est enregistré.': 'Your result has been recorded.', 'Jauge de risque de la situation': 'Risk gauge for the situation',
  'Opérateurs, transparence (art. 50)': 'Operators, transparency (Art. 50)', 'Pratique interdite (art. 5)': 'Prohibited practice (Art. 5)', 'Informations inexactes': 'Incorrect information',
  'Télécharger la fiche récap en PDF': 'Download the recap sheet as PDF', 'de réussite pour débloquer ce niveau.': 'to unlock this level.', 'Une balance avec les plafonds d\'amende': 'A scale with the fine ceilings',
  '“Pas interdit” ne veut pas dire “libre”.': '“Not prohibited” does not mean “free”.', 'Jusqu\'à 7 % du chiffre d\'affaires mondial': 'Up to 7% of worldwide turnover', 'Ressource externe · à citer, pas à recopier': 'External resource · to cite, not to copy',
  'Une réunion avec la délégation du personnel': 'A meeting with the staff delegation', 'Elle s\'ouvre quand les 4 niveaux sont validés.': 'It opens once all 4 levels have been passed.', 'ce sont des plafonds, pas des amendes probables': 'these are ceilings, not likely fines',
  'Un chatbot nommé Max sur le site d\'une entreprise': 'A chatbot called Max on a company\'s website', 'Le plus bas entre 35 M€ et 7 % × 20 M€ (= 1,4 M€).': 'The lower of €35M and 7% × €20M (= €1.4M).',
  'Un conseiller et un assistant IA de service client': 'An adviser and a customer-service AI assistant', 'Une image intime générée sans consentement, bloquée': 'An intimate image generated without consent, blocked',
  'Un logiciel qui attribue un score aux collaborateurs': 'Software that gives employees a score', 'Une responsable RH devant un logiciel qui trie des CV': 'An HR manager in front of software that sorts CVs',
  'Termes du texte anglais et du texte officiel français.': 'Terms from the English text and the official French text.', 'Un refus automatique de souscription d\'assurance santé': 'An automatic rejection of a health insurance application',
  'Un article d\'actualité rédigé par IA publié sur un site': 'An AI-written news article published on a website', 'Un chatbot qui se présente comme une conseillère humaine': 'A chatbot presenting itself as a human adviser',
  'Un CV écarté automatiquement à cause d\'une pause de carrière': 'A CV automatically rejected because of a career break', 'Point ambigu ou confirmé seulement par une source secondaire.': 'Ambiguous point, or confirmed only by a secondary source.',
  'Un modèle open source affiné avec LoRA pour créer un assistant': 'An open-source model fine-tuned with LoRA to create an assistant', 'L\'article 99 fixe trois niveaux d\'amendes. Testez le simulateur :': 'Article 99 sets three tiers of fines. Try the simulator:',
  'Les autorités luxembourgeoises prévues par le projet de loi 8476': 'The Luxembourg authorities planned by draft law 8476', 'Une vidéo de vœux où l\'avatar IA du dirigeant parle luxembourgeois': 'A greetings video in which the CEO\'s AI avatar speaks Luxembourgish',
  'Un chatbot bancaire qui affiche les données d\'un client à un autre': 'A banking chatbot showing one client\'s data to another', 'Lignes directrices, Q&R, codes de bonnes pratiques : non contraignants.': 'Guidelines, Q&As, codes of practice: non-binding.',
  'Texte adopté : AI Act modifié par l\'Omnibus, ou loi luxembourgeoise votée.': 'Adopted text: AI Act as amended by the Omnibus, or a Luxembourg law that has been passed.',
  'En interne, contactez votre DPO. La CNPD répond aussi aux questions à l\'adresse': 'Internally, contact your DPO. The CNPD also answers questions at',
  'L\'entreprise. Le salarié répond sur le plan disciplinaire, contractuel ou pénal.': 'The company. The employee is liable on a disciplinary, contractual or criminal basis.',
  'Gravité, durée, personnes touchées, coopération, auto-signalement, mesures prises (art. 99(7)).': 'Severity, duration, people affected, cooperation, self-reporting, measures taken (Art. 99(7)).',
  'On retient le montant le plus élevé des deux ; pour une PME ou une start-up, le plus bas. Ce sont des plafonds, pas des amendes probables.': 'The higher of the two amounts applies; for an SME or a start-up, the lower. These are ceilings, not likely fines.',
  'Les fiches du parcours, les textes officiels et les guides cités dans le cours. Les ressources externes se citent et se consultent en lien.': 'The course sheets, the official texts and the guidance cited in the course. External resources are cited and consulted via their links.',
  'La reconnaissance des émotions des clients reste un système à haut risque (annexe III, 1(c)) et oblige à informer les personnes (art. 50(3)).': 'Recognising customers\' emotions remains a high-risk system (Annex III, 1(c)) and requires informing the people concerned (Art. 50(3)).',
  'Chaque notion du parcours, avec votre taux de maîtrise. Il se calcule à partir de vos réponses aux questions et aux scénarios qui la travaillent.': 'Every concept in the course, with your mastery rate. It is calculated from your answers to the questions and scenarios that cover it.',
  // Textes des illustrations (niveaux 2 à 4)
  'Bonjour, je suis Julie,': 'Hello, I\'m Julie,', 'Générateur': 'Generator', 'Parcours': 'Path', 'Promotions 2027': '2027 promotions', 'Refus automatique': 'Automatic rejection', 'Remboursement ≤ 50 €': 'Refund ≤ €50',
  'Tri intelligent': 'Smart sorting', 'doc. client': 'client doc', 'en ligne': 'online', '« Ce produit a changé ma vie ! »': '“This product changed my life!”', '« Voix du DG » clonée': 'Cloned “CEO voice”',
  '« cliente souriante, réaliste »': '“smiling customer, realistic”', '— Sophie, cliente depuis 2022': '— Sophie, customer since 2022', 'Engagé 82%': 'Engaged 82%', 'Stressé 64%': 'Stressed 64%', 'Ennui 71%': 'Bored 71%',
  'Calme 90%': 'Calm 90%', 'pressentie': 'expected', 'assurance': 'insurance', 'produits': 'products', '12 480 € · IBAN…': '€12,480 · IBAN…', 'Aucune mention « IA »': 'No “AI” mention',
  // Illustrations
  'INTERDIT': 'PROHIBITED', 'HAUT RISQUE': 'HIGH RISK', 'RISQUE LIMITÉ': 'LIMITED RISK', 'RISQUE MINIMAL': 'MINIMAL RISK', 'Interdit': 'Prohibited', 'IA': 'AI',
  'Résumé automatique': 'Automatic summary', 'activé sans annonce': 'enabled without notice', 'Gestion de projet · v8.2': 'Project management · v8.2', '« Pas salarié… »': '“Not an employee…”',
  'L\'entreprise de Léa': 'Léa\'s company', 'Registre de formation IA': 'AI training register', 'Qui': 'Who', 'Quand': 'When', 'Entrée en vigueur': 'Entry into force',
  'Interdits + maîtrise IA': 'Bans + AI literacy', 'IA à usage général': 'General-purpose AI', 'Haut risque Ann. III': 'High risk Ann. III', 'Haut risque Ann. I': 'High risk Ann. I',
  'Fournisseur': 'Provider', 'Déployeur': 'Deployer', 'conçoit et vend l\'outil': 'designs and sells the tool', 'l\'utilise dans son activité': 'uses it in its business', 'L\'éditeur RH': 'The HR vendor',
  'Analyse vocale · conseillers': 'Voice analysis · advisers', 'Colère': 'Anger', '⚠ Alerte manager': '⚠ Manager alert', 'Chatbot grand public': 'Consumer chatbot', 'Nom': 'Name', 'Salaire': 'Salary',
  'Fais-moi un tableau de synthèse…': 'Make me a summary table…', 'Suggestion Copilot…': 'Copilot suggestion…', 'Freelance en régie': 'Freelancer on assignment',
  'Pyramide des quatre niveaux de risque': 'Pyramid of the four risk levels', 'Un registre interne des formations': 'An internal training register',
  'Le texte du règlement européen sur l\'IA': 'The text of the European AI regulation', 'Frise des dates d\'application de l\'AI Act': 'Timeline of the AI Act application dates',
  'Léa arrive dans les bureaux de Nexalis à Belval': 'Léa arrives at the Nexalis offices in Belval', 'Le fournisseur conçoit l\'outil, le déployeur l\'utilise': 'The provider designs the tool, the deployer uses it',
  'Un développeur freelance qui code avec un assistant IA': 'A freelance developer coding with an AI assistant', 'Une fonction d\'IA apparue sans annonce dans un logiciel': 'An AI feature that appeared without notice in a piece of software',
  'Usage personnel à la maison et usage professionnel au bureau': 'Personal use at home and professional use at the office', 'Des données personnelles copiées dans un chatbot grand public': 'Personal data copied into a consumer chatbot',
  'Un outil qui analyse la voix des conseillers pour détecter leurs émotions': 'A tool that analyses advisers\' voices to detect their emotions',
};
const MONTHS = { janvier: 'January', février: 'February', mars: 'March', avril: 'April', mai: 'May', juin: 'June', juillet: 'July', août: 'August', septembre: 'September', octobre: 'October', novembre: 'November', décembre: 'December' };
const UI_RE = [
  [/· commencez par la vidéo de présentation\./, '· start with the introduction video.'], [/^Bonjour (.+?) · /, 'Hello $1 · '], [/ sur 4 · /, ' of 4 · '],
  [/^Répondez d'abord à toutes les questions de la séance et aux 3 scénarios \((\d+) \/ (\d+) pour l'instant\)\.$/, 'First answer all the session questions and the 3 scenarios ($1 / $2 so far).'],
  [/^\((?:ID|identifiant) (.+)\) a suivi la formation$/, '(ID $1) has taken the training'],
  [/^🔒 Fiche (\d)$/, '🔒 Sheet $1'], [/^Cette fiche se débloque quand vous atteignez la fin du module (\d) de la séance\.$/, 'This sheet unlocks when you reach the end of module $1 of the session.'], [/^Aller à la séance$/, 'Go to the session'], [/^Groupe /, 'Group '],
  [/Aller au niveau (\d)/, 'Go to Level $1'], [/Après le niveau (\d)/, 'After Level $1'], [/^Fiche (\d)$/, 'Sheet $1'], [/^Fiche (\d) · /, 'Sheet $1 · '], [/^Fiche récap · /, 'Recap sheet · '],
  [/^sur (\d+) notions$/, 'out of $1 concepts'], [/^1 question liée$/, '1 linked question'], [/^(\d+) questions liées$/, '$1 linked questions'], [/· verrouillé ·/, '· locked ·'],
  [/Télécharger la fiche (\d) en PDF/, 'Download sheet $1 as PDF'], [/Se débloque à la fin du module (\d)/, 'Unlocks at the end of module $1'],
  [/^Aucun résultat pour [«“] ?(.+?) ?[»”]\. Essayez : émotions, deepfake, article 4, CNPD…$/, 'No results for “$1”. Try: emotions, deepfake, article 4, CNPD…'],
  [/^(\d+) questions tirées au hasard \((\d+) par niveau\)\. Réussite à partir de (\d+) %\. Tentatives illimitées : chaque tentative tire de nouvelles questions\.$/, '$1 questions drawn at random ($2 per level). Pass mark: $3%. Unlimited attempts: each attempt draws new questions.'],
  [/(\d{1,2}) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) (\d{4})/g, (m, d, mo, y) => `${d} ${MONTHS[mo]} ${y}`],
  [/(\d+) questions tirées au hasard parmi (\d+)\. Réussite à partir de (\d+) bonnes réponses sur (\d+)\. Tentatives illimitées : chaque tentative tire de nouvelles questions\./, '$1 questions drawn at random from $2. Pass mark: $3 correct answers out of $4. Unlimited attempts: each attempt draws new questions.'],
  [/^Étape (\d+) \/ (\d+)$/, 'Step $1 / $2'],
  [/(\d+) \/ (\d+) réponses/, '$1 / $2 answers'], [/^À revoir : /, 'To review: '], [/^Temps passé : (.+) · Début : (.+) · Version du contenu : (.+) \((?:à jour au|Up to date as of) (.+)\)\. Aucun certificat officiel n'est exigé par l'article 4 : ce document complète le registre interne des formations\.$/, 'Time spent: $1 · Started: $2 · Content version: $3 (up to date as of $4). Article 4 does not require any official certificate: this document supplements the internal training register.'], [/\(identifiant (.+)\)/, '(ID $1)'], [/^Voir le rapport$/, 'See the report'], [/En cours · (\d+)\/(\d+) réponses?/, 'In progress · $1/$2 answers'], [/^1 réponse à retravailler$/, '1 answer to work on'], [/(\d+) réponses à retravailler/, '$1 answers to work on'], [/Tout le niveau [«“] ?(.+?) ?[»”] sur une seule page\./, 'The whole “$1” level on a single page.'], [/^À faire$/i, 'To do'], [/^(\d+) à faire$/, '$1 to do'], [/^Niveau (\d) validé$/, 'Level $1 passed'], [/^Vrai ou faux : /, 'True or false: '],
  [/« ?/g, '“'], [/ ?»/g, '”'],
  [/Dernière tentative : (\d+) \/ (\d+)/, 'Last attempt: $1 / $2'],
  [/^Réussie · /, 'Passed · '], [/^Sous le seuil · /, 'Below the threshold · '],
  [/Validé le ([\d/]+)/, 'Passed on $1'], [/Niveau (\d) validé avec (\d+) %/, 'Level $1 passed with $2%'], [/Niveau (\d) validé le ([\d/]+)\. Prochain rappel le/, 'Level $1 passed on $2. Next reminder on'],
  [/^, puis le ([\d/]+)\.$/, ', then on $1.'], [/Niveau (\d) : (\d+) %, sous le seuil de 80 %/, 'Level $1: $2%, below the 80% threshold'], [/Le niveau (\d) est débloqué\./, 'Level $1 is unlocked.'],
  [/Commencer le niveau (\d)/, 'Start Level $1'], [/Reprendre le niveau (\d)/, 'Resume Level $1'], [/^Bonjour (.+) !$/, 'Hello $1!'], [/^Bienvenue (.+) !$/, 'Welcome $1!'],
  [/Notifications \((\d+) non lues?\)/, 'Notifications ($1 unread)'], [/Répondre aux (\d+) scénarios restants/, 'Answer the $1 remaining scenarios'], [/Répondre au scénario restant/, 'Answer the remaining scenario'],
  [/Répondre aux (\d+) questions restantes/, 'Answer the $1 remaining questions'], [/Répondre à la question restante/, 'Answer the remaining question'],
  [/Tout le niveau « (.+) » sur une seule page\./, 'The whole “$1” level on a single page.'], [/niveau (\d) parcouru/, 'level $1 completed'],
  [/Vidéo de présentation du module (\d)/, 'Module $1 introduction video'], [/Fiche d'information · /, 'Information sheet · '], [/Édité le/, 'Issued on'],
  [/ Vous suivez Léa, cheffe de projet chez Nexalis, une ESN \(entreprise de services du numérique\) de Belval\./, ' You follow Léa, a project manager at Nexalis, an IT services company based in Belval.'],
  [/Idée reçue · vrai, faux ou ça dépend \?/, 'Misconception · true, false or it depends?'], [/Vrai, faux ou ça dépend \?/, 'True, false or it depends?'],
  [/Réponse incorrecte/, 'Incorrect answer'], [/Bonne réponse/, 'Correct answer'], [/Fiche pratique (\d)/g, 'Practical sheet $1'], [/débloquée/, 'unlocked'],
  [/Quiz de validation/g, 'Validation quiz'], [/Récap & rapport/g, 'Recap & report'], [/Fiches pratiques/g, 'Practical sheets'], [/Scénarios/g, 'Scenarios'], [/Scénario (\d) · /, 'Scenario $1 · '], [/Scénario · /, 'Scenario · '],
  [/Fin de niveau/g, 'End of level'], [/Partie (\d)/g, 'Part $1'], [/Séance/g, 'Session'], [/\bNiveau (\d)/g, 'Level $1'], [/\bniveau (\d)/g, 'level $1'],
  [/AI Act · L'essentiel/g, 'AI Act · Essentials'], [/ · Accueil$/, ' · Home'], [/\bPME\b/g, 'SME'],
  [/(\d+(?:,\d+)?) Md€/g, (m, a) => `€${a.replace(',', '.')}bn`], [/(\d+(?:,\d+)?) M€/g, (m, a) => `€${a.replace(',', '.')}M`], [/(\d{1,3}(?:[  ]\d{3})+) €/g, (m, a) => `€${a.replace(/[  ]/g, ',')}`],
  [/(\d) %/g, '$1%'], [/ ([?!;:])(?=\s|$)/g, '$1'], [/Contenu à jour au/g, 'Content up to date as of'], [/À jour au/g, 'Up to date as of'],
];
function trEN(t) {
  const core = t.trim(); if (!core) return t;
  let out = UI_EN[core];
  if (out === undefined) { out = core; UI_RE.forEach(([re, rep]) => { out = out.replace(re, rep); }); if (UI_EN[out] !== undefined) out = UI_EN[out]; }
  return out === core ? t : t.replace(core, out);
}
const SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1 };
function trNode(root) {
  if (root.nodeType === 3) { if (root.parentElement && SKIP[root.parentElement.tagName]) return; const v = trEN(root.data); if (v !== root.data) root.data = v; return; }
  if (root.nodeType !== 1 || SKIP[root.tagName]) return;
  ['placeholder', 'aria-label', 'title'].forEach(a => { const v = root.getAttribute && root.getAttribute(a); if (v) { const w = trEN(v); if (w !== v) root.setAttribute(a, w); } });
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: n => n.nodeType === 1 && SKIP[n.tagName] ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  let n; while ((n = tw.nextNode())) {
    if (n.nodeType === 3) { const v = trEN(n.data); if (v !== n.data) n.data = v; }
    else ['placeholder', 'aria-label', 'title'].forEach(a => { const v = n.getAttribute(a); if (v) { const w = trEN(v); if (w !== v) n.setAttribute(a, w); } });
  }
}
if (EN_ON) {
  document.body.classList.add('lang-en');
  trNode(document.body);
  new MutationObserver(ms => ms.forEach(m => {
    if (m.type === 'characterData') trNode(m.target);
    else m.addedNodes.forEach(trNode);
  })).observe(document.body, { childList: true, subtree: true, characterData: true });
  new MutationObserver(ms => ms.forEach(m => { const v = m.target.getAttribute(m.attributeName); if (v) { const w = trEN(v); if (w !== v) m.target.setAttribute(m.attributeName, w); } }))
    .observe(document.body, { attributes: true, subtree: true, attributeFilter: ['aria-label', 'title', 'placeholder'] });
}
