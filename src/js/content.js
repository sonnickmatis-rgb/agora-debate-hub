/* =========================================================
   CONTENU PÉDAGOGIQUE — source unique : « Dossier AI Act BA »
   (dossier de recherche du 12 octobre 2026)
   Contexte narratif inventé : Nexalis, ESN de 180 salariés à Belval.
   ========================================================= */
const CONTENT_DATE = '12 octobre 2026';
const CONTENT_VERSION = 'v2.0';

const vf = (good) => ['Vrai', 'Faux', 'Ça dépend'].map(t => [t, t === good]);

const P = {
  lea: ['LÉ', 'Léa', 'Cheffe de projet · arrivée lundi'],
  julien: ['JU', 'Julien', 'Manager d\'équipe'],
  paul: ['PA', 'Paul', 'Développeur freelance en régie'],
  karim: ['KA', 'Karim', 'Avant-vente'],
  tom: ['TO', 'Tom', 'Développeur'],
  nora: ['NO', 'Nora', 'Consultante data'],
  sofia: ['SO', 'Sofia', 'DRH de Nexalis'],
  marc: ['MA', 'Marc', 'Candidat refusé'],
  inès: ['IN', 'Inès', 'Communication'],
};

const LV = [
/* =====================================================================
   NIVEAU 1 — OÙ EST L'IA ?
   ===================================================================== */
{
  n: 1, name: 'Découvrir', title: 'Où est l\'IA ?', thumb: 'saas',
  pitch: 'Reconnaître un système d\'IA, savoir qui est concerné et ce que change l\'Omnibus de 2026.',
  modules: ['Module 1 · Reconnaître une IA', 'Module 2 · Se former : l\'article 4'],
  steps: [
    { mod: 1, type: 'situation', label: 'Prologue', time: '1 min 30', title: 'Premier jour chez Nexalis', illus: 'office', persona: P.lea,
      body: [
        'Lundi matin, Léa rejoint <b>Nexalis</b>, une ESN (entreprise de services du numérique) de 180 salariés installée à <b>Belval</b>, comme cheffe de projet. Ses clients : des banques, des assureurs et des PME.',
        'Claire, la DPO, lui fait faire le tour des outils de l\'équipe : la messagerie, <b>Copilot</b>, <b>ChatGPT Entreprise</b>, le logiciel de gestion de projet…',
        'Puis elle lui pose une question : <b>« Parmi tous ces outils, sais-tu lesquels utilisent de l\'IA ? »</b>'
      ],
      prompt: 'Au Luxembourg, <b>33,6 %</b> des entreprises utilisaient l\'IA en 2025, contre <b>20 %</b> dans l\'UE. Et vous, sauriez-vous répondre à la question de Claire ?' },

    { mod: 1, type: 'situation', label: 'Mise en situation', time: '1 min', title: 'La fonction apparue un matin', illus: 'saas', persona: ['LÉ', 'Léa', 'Cheffe de projet'],
      body: [
        'Le lendemain, en ouvrant le logiciel de gestion de projet de l\'équipe, Léa découvre un nouveau bouton : <b>« Résumé automatique »</b>.',
        'Personne ne l\'a annoncé : l\'éditeur l\'a activé lors d\'une mise à jour. Le résumé reprend les comptes rendus clients, les tickets et les noms des interlocuteurs.',
        'Léa l\'utilise depuis une semaine… sans s\'être posé de question.'
      ],
      prompt: 'Les salariés ne remarquent souvent pas les fonctions d\'IA intégrées dans leurs logiciels. C\'est un constat relevé dans le <b>répertoire des pratiques</b> de la Commission européenne.' },

    { mod: 1, type: 'question', label: 'Question', time: '1 min', illus: 'saas', id: 'q11',
      q: 'Que doit faire Léa avec ce « résumé automatique » ?',
      opts: [
        ['Rien : c\'est l\'éditeur du logiciel qui porte les obligations, pas Nexalis qui l\'utilise.', false],
        ['Le signaler pour l\'inventaire des outils d\'IA et vérifier quelles données il traite.', true],
        ['Rien : la fonction a été activée par l\'éditeur sans que personne chez Nexalis ne la demande.', false],
      ],
      ok: 'Oui. C\'est un système d\'IA utilisé <b>sous l\'autorité</b> de Nexalis : Nexalis en est donc <b>déployeur</b> (art. 3(4)). Le bon réflexe : le signaler pour l\'inventaire et vérifier les données traitées.',
      ko: 'Pas tout à fait. Même activée sans annonce, la fonction est utilisée <b>sous l\'autorité</b> de Nexalis, qui en est <b>déployeur</b> (art. 3(4)). Il faut la signaler pour l\'inventaire et vérifier les données traitées.',
      tip: 'Indice : qui utilise l\'outil au quotidien, et pour le compte de qui ?' },

    { mod: 1, type: 'explain', label: 'Explication', time: '1 min', title: 'Qu\'est-ce qu\'un « système d\'IA » ?',
      intro: 'Tout part de la définition de l\'<b>article 3(1)</b>. Selon les lignes directrices de la Commission du 6 février 2025, le critère décisif est la <b>capacité d\'inférence</b>.',
      crit: [
        ['Il infère', 'L\'outil tire lui-même un résultat des données qu\'il reçoit : un résumé, une prédiction, une recommandation…'],
        ['Les règles humaines n\'en sont pas', 'Un système fondé uniquement sur des règles écrites par des humains sort de la définition.'],
        ['Le simple calcul non plus', 'Les heuristiques classiques et le simple traitement de données sont aussi exclus.'],
      ],
      law: { ref: 'Art. 3(1)', tag: 'Guide', title: 'Lignes directrices du 6 février 2025',
        text: 'Le critère décisif de la définition est la <mark>capacité d\'inférence</mark>. Les systèmes fondés uniquement sur des <mark>règles écrites par des humains</mark> en sortent, de même que les heuristiques classiques et le simple traitement de données.' },
      mentor: 'Dans le doute, signalez l\'outil. L\'inventaire, c\'est l\'affaire de tous.' },

    { mod: 1, type: 'situation', label: 'Le problème', time: '1 min', title: '« Notre fournisseur est américain »', illus: 'homework', persona: P.julien, problem: true,
      body: [
        'À la pause, Léa en parle à Julien. Il est catégorique : « L\'outil vient d\'un éditeur américain. L\'AI Act ne s\'applique pas. »',
        'Nora ajoute : « Et moi, j\'utilise ChatGPT à la maison pour préparer mes vacances. Je suis concernée aussi ? »'
      ],
      prompt: 'Deux idées reçues en une seule pause café. Que dit le règlement ?' },

    { mod: 1, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'Qui est concerné par l\'AI Act ?', illus: 'law',
      law: { ref: 'Art. 2(1)', tag: 'Loi', title: 'Champ d\'application',
        text: 'Le règlement vise les fournisseurs qui mettent un système sur le marché de l\'UE, <mark>où qu\'ils soient établis</mark>, les <mark>déployeurs établis dans l\'UE</mark>, et même les acteurs hors UE dont la sortie du système est utilisée dans l\'UE.' },
      why: 'L\'AI Act est un règlement « produit » d\'<b>application directe</b>, en vigueur depuis le <b>1er août 2024</b>. Le fournisseur américain ne change donc rien pour Nexalis.',
      mustTitle: 'Trois exclusions à connaître',
      must: [
        ['L\'usage personnel', 'L\'usage purement personnel et non professionnel est exclu.', 'Art. 2(10)'],
        ['La recherche', 'La recherche menée avant la mise sur le marché.', 'Art. 2(6) et 2(8)'],
        ['L\'open source, sous conditions', 'Seulement s\'il ne s\'agit ni d\'un système à haut risque, ni d\'une pratique interdite, ni d\'un système soumis à l\'article 50.', 'Art. 2(12)'],
      ] },

    { mod: 1, type: 'question', kind: 'vf', label: 'Vrai ou faux', time: '1 min', illus: 'law', id: 'q12',
      q: '« Un outil d\'IA open source échappe à l\'AI Act. »',
      opts: vf('Ça dépend'),
      ok: 'Exact : <b>ça dépend</b>. L\'exclusion de l\'open source existe (art. 2(12)), mais elle ne joue pas pour le haut risque, les pratiques interdites (art. 5) et la transparence (art. 50).',
      ko: 'La bonne réponse est <b>ça dépend</b>. L\'open source est exclu sous conditions (art. 2(12)) : l\'exclusion ne joue pas pour le haut risque, les pratiques interdites (art. 5) et la transparence (art. 50).',
      tip: 'Indice : relisez la troisième exclusion de l\'étape précédente.' },

    { mod: 1, type: 'wrap', label: 'Nouvelle mise en situation', time: '30 s', title: 'Ce que Léa retient', illus: 'pyramid',
      body: 'Julien avait tort : l\'origine du fournisseur ne change rien, Nexalis utilise l\'outil dans l\'UE. Nora peut être rassurée : ChatGPT à la maison sort de l\'AI Act. <b>Au travail, il est couvert.</b>',
      keys: [['1', 'critère décisif : l\'inférence'], ['4', 'niveaux de risque'], ['2', 'socles : maîtrise de l\'IA et modèles GPAI']],
      next: ['Module 2', 'Paul, développeur freelance, reçoit l\'invitation au module : « Je ne suis pas salarié, ça ne me concerne pas. »'] },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 1', time: '1 min 30', fiche: 0 },

    { mod: 2, type: 'situation', label: 'Mise en situation', time: '1 min', title: '« Je ne suis pas salarié »', illus: 'freelance', persona: P.paul,
      body: [
        'Paul est développeur freelance, en régie chez Nexalis depuis six mois. Il code tous les jours avec <b>GitHub Copilot</b>.',
        'Il reçoit l\'invitation au module et répond à Claire : « Je ne suis pas salarié, ça ne me concerne pas. »'
      ],
      prompt: 'Et vous, pensez-vous que Paul a raison ?' },

    { mod: 2, type: 'question', label: 'Question', time: '1 min', illus: 'freelance', id: 'q13',
      q: 'Paul doit-il suivre le module ?',
      opts: [
        ['Non : l\'article 4 ne vise que les salariés liés par un contrat de travail.', false],
        ['Oui, de préférence : l\'article 4 vise aussi ceux qui agissent pour l\'entreprise.', true],
        ['Seulement s\'il développe lui-même des systèmes d\'IA pour les clients de Nexalis.', false],
      ],
      ok: 'Oui. L\'article 4 couvre le personnel et les <b>autres personnes</b> qui utilisent l\'IA pour le compte de l\'entreprise. La Commission cite un prestataire, un sous-traitant ou un client ; la CNPD ajoute les intérimaires, stagiaires et apprentis.',
      ko: 'Non : l\'article 4 couvre aussi les <b>autres personnes</b> qui agissent pour le compte de l\'entreprise, comme un prestataire. Paul est concerné, de préférence.',
      tip: 'Indice : Paul utilise Copilot pour qui ?' },

    { mod: 2, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'La maîtrise de l\'IA : une obligation de moyens', illus: 'registry',
      law: { ref: 'Art. 4 · depuis le 27 juillet 2026', tag: 'Loi', title: 'Maîtrise de l\'IA', quote: true,
        text: '« Les fournisseurs et les déployeurs de systèmes d\'IA <mark>prennent des mesures pour favoriser</mark> le développement de la maîtrise de l\'IA par leur personnel et les autres personnes s\'occupant du fonctionnement et de l\'utilisation des systèmes d\'IA pour leur compte […]. Cette obligation <mark>ne contraint pas</mark> les fournisseurs ou les déployeurs à garantir un niveau spécifique de maîtrise de l\'IA par un individu. »' },
      why: 'La formation n\'est <b>pas devenue facultative</b> : elle passe d\'une obligation de résultat à une <b>obligation de moyens</b>. La Commission avait proposé de la supprimer ; ce n\'a pas été retenu.',
      mentor: 'Ce module, c\'est notre preuve que nous formons nos équipes : qui l\'a suivi, quand, et avec quel score.',
      mustTitle: 'Ce qu\'attendent la Commission et la CNPD',
      must: [
        ['Pas de certificat', 'Un registre interne des formations suffit.', 'Q&R Commission'],
        ['Pas d\'« AI officer » obligatoire', 'Ni comité dédié.', 'Q&R Commission'],
        ['Expliquer les risques', 'Par exemple les hallucinations. S\'en remettre à la seule notice peut être inefficace.', 'Q&R Commission'],
        ['Tracer et mesurer', 'Tenir un registre, suivre le taux de complétion et la progression.', 'CNPD'],
      ] },

    { mod: 2, type: 'situation', label: 'Le problème', time: '1 min', title: '« L\'Omnibus a tout reporté »', illus: 'calendar', persona: P.julien, problem: true,
      body: [
        'Julien revient à la charge : « J\'ai lu que l\'Omnibus avait tout reporté. On a le temps, non ? »',
        'Il parle de l\'<b>Omnibus numérique sur l\'IA</b> (Règlement (UE) 2026/1744), publié au Journal officiel le 24 juillet 2026 et en vigueur depuis le <b>27 juillet 2026</b>.',
        'Problème : beaucoup de ressources rédigées avant mai 2026 présentent comme acquises des idées finalement écartées.'
      ],
      prompt: 'Ne le confondez pas avec le « Digital Omnibus » plus large (RGPD, ePrivacy, NIS2, Data Act), qui <b>n\'était toujours pas adopté</b> fin juillet 2026.' },

    { mod: 2, type: 'law', label: 'Explication', time: '1 min', title: 'Ce que l\'Omnibus a changé… et ce qu\'il n\'a pas touché', illus: 'calendar',
      law: { ref: 'Règl. (UE) 2026/1744', tag: 'Loi', title: 'Omnibus numérique sur l\'IA',
        text: 'L\'Omnibus <mark>n\'a rien suspendu</mark>. Il a reporté les obligations « haut risque » à des dates fixes : le <mark>2 décembre 2027</mark> pour l\'annexe III et le <mark>2 août 2028</mark> pour l\'annexe I. Il ne touche pas aux huit interdictions d\'origine, aux obligations GPAI, au principe et à la date de l\'article 50, aux plafonds d\'amende ni à la définition du système d\'IA.' },
      why: '« Aujourd\'hui : interdictions, maîtrise de l\'IA, transparence. Décembre 2026 : deepfakes sexuels et pédopornographie interdits, marquage des contenus générés pour tous. Décembre 2027 : haut risque RH, crédit, assurance, éducation. Août 2028 : haut risque dans les produits réglementés. »',
      mustTitle: 'Ce qui s\'applique déjà aujourd\'hui',
      must: [
        ['Les pratiques interdites', 'Depuis le 2 février 2025.', 'Art. 5'],
        ['La maîtrise de l\'IA', 'Depuis le 2 février 2025 ; contrôlée par les autorités à partir d\'août 2026.', 'Art. 4'],
        ['La transparence', 'Chatbots, deepfakes, contenus générés : depuis le 2 août 2026.', 'Art. 50'],
      ] },

    { mod: 2, type: 'question', kind: 'vf', label: 'Vrai ou faux', time: '1 min', illus: 'calendar', id: 'q14',
      q: '« Depuis l\'Omnibus, former ses équipes à l\'IA reste une obligation. »',
      opts: vf('Vrai'),
      ok: 'Exact : <b>vrai</b>. La Commission avait proposé de la supprimer, mais ce n\'a pas été retenu : l\'obligation devient « prendre des mesures pour favoriser » la maîtrise de l\'IA, une obligation de moyens.',
      ko: 'C\'est <b>vrai</b>. La suppression proposée par la Commission n\'a pas été retenue : l\'obligation devient « prendre des mesures pour favoriser » la maîtrise de l\'IA, une obligation de moyens.',
      tip: 'Indice : relisez le texte de l\'article 4 deux étapes plus tôt.' },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 2', time: '1 min 30', fiche: 1 },
  ],

  scn: [
    { id: 's11', t: 'Management', who: 'Julien, manager', illus: 'freelance', title: 'La notice en guise de formation', risk: null, theme: 'Maîtrise de l\'IA',
      ctx: ['Julien doit former ses 12 consultants à Copilot.', 'Pour aller vite, il propose d\'envoyer par e-mail la notice d\'utilisation de l\'éditeur.', '« Comme ça, on est couverts pour l\'article 4. »'],
      q: 'Que conseillez-vous à Julien ?',
      opts: [
        ['Envoyer la notice de l\'éditeur par e-mail : c\'est la documentation officielle de l\'outil.', 'ko', 'À éviter', 'La Commission juge que s\'en remettre à la seule notice peut être inefficace. Pour la CNPD, des instructions « simples ou isolées » peuvent être insuffisantes.'],
        ['Une courte formation adaptée au métier, sur les risques, tracée dans le registre.', 'ok', 'Bonne réponse', 'C\'est le contenu minimal attendu : comprendre l\'IA utilisée, connaître son rôle et ses risques, adapter au niveau et au contexte du personnel.'],
        ['Interdire Copilot tant que chaque consultant n\'a pas obtenu un certificat officiel.', 'ko', 'À éviter', 'Aucun certificat n\'est exigé : un registre interne des formations suffit.'],
      ], law: 'Art. 4 · Q&R Commission · CNPD' },
    { id: 's12', t: 'Conformité', who: 'Claire, DPO', illus: 'registry', title: 'La preuve demandée par le client', risk: null, theme: 'Maîtrise de l\'IA',
      ctx: ['Un client bancaire demande à Nexalis la preuve que ses consultants sont formés à l\'IA.', 'Claire doit répondre d\'ici vendredi.', 'Elle se demande quelle pièce fournir.'],
      q: 'Quelle preuve Claire doit-elle pouvoir fournir ?',
      opts: [
        ['Un certificat officiel délivré par un organisme agréé pour chacun des consultants.', 'ko', 'À éviter', 'Il n\'existe pas de certificat obligatoire : « There is no need for a certificate », selon les Q&R de la Commission.'],
        ['Une attestation sur l\'honneur signée par chaque consultant, conservée par les RH.', 'mid', 'Partiellement', 'Mieux que rien, mais la CNPD recommande de tenir un registre et de mesurer l\'efficacité (taux de complétion, progression).'],
        ['Un registre interne : qui a été formé, quand, sur quel contenu, avec quel score.', 'ok', 'Bonne réponse', 'Le module est lui-même la mesure art. 4 de l\'entreprise. Sa traçabilité compte autant que son contenu.'],
      ], law: 'Art. 4 · Q&R Commission · CNPD' },
    { id: 's13', t: 'Usage quotidien', who: 'Nora, consultante data', illus: 'homework', title: 'ChatGPT, à la maison et au bureau', risk: null, theme: 'Champ d\'application',
      ctx: ['Le soir, Nora utilise ChatGPT pour organiser ses vacances.', 'Le matin, elle l\'utilise pour reformuler un compte rendu de réunion client.', 'Elle se demande ce qui relève de l\'AI Act.'],
      q: 'Quel usage entre dans le champ de l\'AI Act ?',
      opts: [
        ['Les deux : ChatGPT est un système d\'IA.', 'ko', 'À éviter', 'L\'usage purement personnel et non professionnel est exclu (art. 2(10)).'],
        ['Aucun : ChatGPT est un outil grand public.', 'ko', 'À éviter', 'Au travail, Nora agit pour Nexalis : l\'usage est couvert.'],
        ['Uniquement l\'usage au travail.', 'ok', 'Bonne réponse', 'Au travail, l\'usage est couvert. Et pour un compte rendu client, le RGPD et le secret client s\'appliquent aussi : uniquement un outil validé par l\'entreprise.'],
      ], law: 'Art. 2(10)' },
  ],

  recap: [
    ['Un système d\'IA, c\'est…', 'Un outil qui <b>infère</b> : il tire lui-même un résultat de ses données. Les règles écrites par des humains et le simple traitement de données n\'en sont pas.', 'Art. 3(1)'],
    ['Qui est concerné ?', '<ul><li>Les fournisseurs du marché de l\'UE, où qu\'ils soient</li><li>Les déployeurs établis dans l\'UE</li><li>Pas l\'usage purement personnel</li></ul>', 'Art. 2'],
    ['Quatre niveaux de risque', '<ul><li><b>Interdit</b></li><li><b>Haut risque</b></li><li><b>Risque de transparence</b></li><li><b>Risque minimal</b>, sans règle spécifique</li></ul>', 'Art. 5, 6, 50'],
    ['Se former : obligation de moyens', '« Prendre des mesures pour favoriser » la maîtrise de l\'IA, pour les salariés <b>et</b> les autres personnes qui agissent pour l\'entreprise. Pas de certificat : un registre.', 'Art. 4'],
    ['L\'Omnibus de 2026', 'Il n\'a rien suspendu. Seul le haut risque est reporté : <b>2 décembre 2027</b> (annexe III) et <b>2 août 2028</b> (annexe I).', 'Règl. 2026/1744'],
    ['Déjà applicable', '<ul><li>Pratiques interdites</li><li>Maîtrise de l\'IA</li><li>Transparence (depuis le 2 août 2026)</li></ul>', 'Art. 4, 5, 50', true],
  ],
},

/* =====================================================================
   NIVEAU 2 — QUI EST RESPONSABLE ?
   ===================================================================== */
{
  n: 2, name: 'Identifier', title: 'Qui est responsable ?', thumb: 'roles',
  pitch: 'Distinguer fournisseur et déployeur, éviter de devenir fournisseur sans le vouloir, appliquer la transparence.',
  modules: ['Module 1 · Fournisseur ou déployeur', 'Module 2 · Modèles et transparence'],
  steps: [
    { mod: 1, type: 'situation', label: 'Mise en situation', time: '1 min 30', title: 'Deux casquettes pour Nexalis', illus: 'roles', persona: P.karim,
      body: [
        'Chez Nexalis, les équipes utilisent <b>Copilot</b> et <b>ChatGPT Entreprise</b> au quotidien.',
        'Karim prépare une offre pour un client e-commerce : un <b>chatbot</b> développé par Nexalis et vendu <b>sous la marque Nexalis</b>.',
        'Le client lui demande : « Au regard de l\'AI Act, qui est responsable de quoi ? »'
      ],
      prompt: 'Le rôle se détermine <b>système par système</b> et <b>usage par usage</b>.' },

    { mod: 1, type: 'question', label: 'Question', time: '1 min', illus: 'roles', id: 'q21',
      q: 'Quand Nexalis vend ce chatbot sous sa propre marque, elle est…',
      opts: [
        ['Déployeur, comme pour Copilot, puisqu\'elle l\'a seulement configuré.', false],
        ['Fournisseur du chatbot, puisqu\'il est vendu sous sa marque.', true],
        ['Ni l\'un ni l\'autre : c\'est le client final qui l\'utilise au quotidien.', false],
      ],
      ok: 'Oui. Est fournisseur celui qui met un système sur le marché <b>sous son propre nom ou sa propre marque</b>, à titre payant ou gratuit (art. 3(3)). Pour Copilot, Nexalis reste déployeur.',
      ko: 'Non. En livrant le chatbot <b>sous sa marque</b>, Nexalis devient <b>fournisseur</b> (art. 3(3)). Elle ne reste déployeur que pour les outils qu\'elle utilise, comme Copilot.',
      tip: 'Indice : sous quel nom le chatbot est-il vendu ?' },

    { mod: 1, type: 'explain', label: 'Explication', time: '1 min', title: 'Fournisseur ou déployeur ?',
      intro: 'Les deux rôles sont définis à l\'<b>article 3</b>. Une même entreprise porte souvent les deux casquettes, selon le système.',
      crit: [
        ['Déployeur', 'Utilise un système « sous son autorité », hors usage personnel (art. 3(4)). Ex. : les équipes de Nexalis avec Copilot.'],
        ['Fournisseur', 'Développe un système, ou le fait développer, et le met sur le marché sous son nom ou sa marque (art. 3(3)). Ex. : un SaaS, un chatbot sur étagère.'],
        ['Le cas du sur-mesure', 'Développé pour un client et mis en service sous le nom du client : le client est en principe fournisseur, l\'ESN sous-traitant.'],
      ],
      law: { ref: 'Art. 3(3) et 3(4)', tag: 'Loi', title: 'Définitions',
        text: 'Le fournisseur met le système sur le marché ou en service <mark>sous son propre nom ou sa propre marque</mark>, à titre onéreux ou gratuit. Le déployeur utilise un système <mark>sous son autorité</mark>, hors usage personnel non professionnel.' },
      clair: '<b>À écrire dans chaque contrat :</b> la lecture de l\'art. 3(3) pour le sur-mesure reste une interprétation.', clairTag: 'À vérifier' },

    { mod: 1, type: 'situation', label: 'Le problème', time: '1 min', title: 'Le petit réglage de Tom', illus: 'cv', persona: P.tom, problem: true,
      body: [
        'Un client demande un service : « Votre assistant généraliste est super. Vous pouvez le régler pour qu\'il <b>note nos candidats</b> ? »',
        'Tom pense qu\'il s\'agit d\'un simple paramétrage : quelques consignes, une grille de notation, et c\'est livré.'
      ],
      prompt: 'Pour une ESN, c\'est le <b>piège principal</b> : reconfigurer un assistant généraliste pour noter des candidats crée du haut risque.' },

    { mod: 1, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'Devenir fournisseur sans le vouloir', illus: 'law',
      law: { ref: 'Art. 25(1)', tag: 'Loi', title: 'Chaîne de valeur',
        text: 'Devient fournisseur d\'un système à haut risque celui qui, au choix : <mark>appose son nom ou sa marque</mark> sur un système à haut risque ; y apporte une <mark>modification substantielle</mark> ; ou <mark>modifie la destination</mark> d\'un système non classé à haut risque, y compris un système d\'IA à usage général, de sorte qu\'il le devient.' },
      why: 'Noter des candidats relève du <b>recrutement</b> (annexe III) : en reconfigurant l\'assistant, Nexalis deviendrait fournisseur d\'un système à haut risque.',
      mustTitle: 'Ce que l\'Omnibus a précisé',
      must: [
        ['Le fournisseur initial doit aider', 'Documentation technique, limites connues et modes de défaillance, accès technique ciblé.', 'Art. 25(2)'],
        ['Un accord écrit', 'Obligatoire entre le fournisseur d\'un système à haut risque et ses propres fournisseurs, modèles d\'IA compris.', 'Art. 25(4)'],
        ['Des sanctions', 'Jusqu\'à 15 M€ ou 3 % du chiffre d\'affaires mondial.', 'Art. 99(4)(da)'],
        ['À partir de quand ?', 'Avec le chapitre III : le 2 décembre 2027 pour l\'annexe III.', 'Art. 113'],
      ] },

    { mod: 1, type: 'question', label: 'Question', time: '1 min', illus: 'cv', id: 'q22',
      q: 'Si Tom reconfigure l\'assistant pour noter les candidats, que se passe-t-il ?',
      opts: [
        ['Rien : c\'est toujours le même assistant, seule la consigne change.', false],
        ['Nexalis devient fournisseur d\'un système à haut risque.', true],
        ['C\'est le client qui devient fournisseur, puisqu\'il l\'utilise.', false],
      ],
      ok: 'Exactement. En <b>modifiant la destination</b> d\'un système généraliste pour en faire un outil de recrutement, Nexalis bascule dans le statut de fournisseur d\'un système à haut risque (art. 25(1)).',
      ko: 'Non. Changer la <b>destination</b> d\'un système généraliste pour noter des candidats fait de Nexalis le <b>fournisseur</b> d\'un système à haut risque (art. 25(1)).',
      tip: 'Indice : le recrutement figure à l\'annexe III.' },

    { mod: 1, type: 'wrap', label: 'Nouvelle mise en situation', time: '30 s', title: 'Ce que l\'équipe retient', illus: 'roles',
      body: 'Karim précise dans son offre le rôle de chacun. Tom prend un réflexe : <b>alerter son chef de projet avant tout paramétrage qui change la finalité d\'un outil.</b>',
      keys: [['2', 'rôles : fournisseur et déployeur'], ['3', 'façons de devenir fournisseur (art. 25)'], ['1', 'réflexe : qualifier avant de livrer']],
      next: ['Module 2', 'Le vendredi, l\'équipe data affine un modèle open source pour un client…'] },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 3', time: '1 min 30', fiche: 0 },

    { mod: 2, type: 'situation', label: 'Mise en situation', time: '1 min', title: 'Le fine-tuning du vendredi', illus: 'finetune', persona: P.nora,
      body: [
        'L\'équipe de Nora affine <b>Mistral 7B</b> avec la technique <b>LoRA</b> sur la documentation d\'un client.',
        'Objectif : livrer un assistant qui répond aux questions des équipes du client.',
        'Tom s\'inquiète : « Si on modifie un modèle, on devient fournisseur de modèle d\'IA à usage général ? »'
      ],
      prompt: 'Utiliser ou affiner un modèle, ce n\'est pas la même chose que le créer.' },

    { mod: 2, type: 'question', label: 'Question', time: '1 min', illus: 'finetune', id: 'q23',
      q: 'L\'équipe devient-elle fournisseur d\'un modèle d\'IA à usage général (GPAI) ?',
      opts: [
        ['Oui : toute modification d\'un modèle, même légère, fait de vous son fournisseur.', false],
        ['Non, en général : la modification reste sous le tiers du calcul d\'entraînement initial.', true],
        ['Oui, car le modèle de Mistral est open source et donc librement modifiable.', false],
      ],
      ok: 'Exact. Mais attention : l\'<b>assistant livré</b> est un chatbot génératif, soumis à l\'<b>article 50</b>.',
      ko: 'Non. On ne devient fournisseur de modèle que si le calcul de modification <b>dépasse un tiers</b> de celui de l\'entraînement initial. Ce seuil est rarement atteint. En revanche, l\'assistant livré est soumis à l\'article 50.',
      tip: 'Indice : il existe un seuil de calcul.' },

    { mod: 2, type: 'explain', label: 'Explication', time: '1 min', title: 'Modèles d\'IA à usage général : où est la limite ?',
      intro: 'Construire avec un grand modèle ne fait pas de vous son fournisseur.',
      crit: [
        ['Appeler une API', 'Utiliser GPT, Claude ou Mistral via API ne fait pas de Nexalis un fournisseur de modèle GPAI. Elle est fournisseur du système qu\'elle construit.'],
        ['Affiner un modèle', 'Fournisseur de modèle seulement si le calcul de modification dépasse un tiers de celui de l\'entraînement initial.'],
        ['Les repères chiffrés', 'Modèle GPAI : plus de 10²³ FLOP d\'entraînement (critère indicatif). Risque systémique présumé dès 10²⁵ FLOP (art. 51(2)).'],
      ],
      law: { ref: 'Lignes directrices GPAI · juillet 2025', tag: 'Guide', title: 'Modification d\'un modèle',
        text: 'Affiner un modèle (fine-tuning, LoRA) ne fait d\'une entreprise un fournisseur de modèle que si le calcul de modification <mark>dépasse un tiers</mark> de celui utilisé pour entraîner le modèle d\'origine.' },
      mentor: 'Le modèle, ce n\'est pas nous. Mais l\'assistant que nous livrons, si.' },

    { mod: 2, type: 'situation', label: 'Le problème', time: '1 min', title: '« Julie, conseillère »', illus: 'julie', persona: P.karim, problem: true,
      body: [
        'Pour le client e-commerce, l\'équipe a configuré le chatbot pour qu\'il se présente comme <b>« Julie, conseillère »</b>, avec une photo.',
        'Aucune mention d\'IA : « C\'est plus chaleureux », explique le client. Le chatbot est en ligne depuis septembre 2026.'
      ],
      prompt: 'Le client est content. Mais le chatbot est-il conforme ?' },

    { mod: 2, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'Transparence : les 4 obligations de l\'article 50', illus: 'chat',
      law: { ref: 'Art. 50(1) et 50(5)', tag: 'Loi', title: 'Applicable depuis le 2 août 2026',
        text: 'Le fournisseur conçoit tout système qui dialogue avec des personnes pour qu\'elles <mark>sachent qu\'elles parlent à une IA</mark>, sauf si c\'est évident pour une personne raisonnablement bien informée, observatrice et avisée. L\'information est donnée <mark>au plus tard lors de la première interaction</mark>.' },
      why: '« Julie » est <b>non conforme depuis le 2 août 2026</b> : il faut afficher la nature d\'IA dès le premier échange, et le prévoir au contrat.',
      mustTitle: 'Les 4 obligations',
      must: [
        ['Chatbots', 'Dire qu\'on parle à une IA.', '50(1)'],
        ['Marquage', 'Les fournisseurs de systèmes génératifs marquent les sorties dans un format lisible par machine.', '50(2)'],
        ['Émotions et biométrie', 'Les déployeurs informent les personnes exposées.', '50(3)'],
        ['Deepfakes et textes d\'intérêt public', 'Les déployeurs les signalent.', '50(4)'],
      ] },

    { mod: 2, type: 'question', kind: 'vf', label: 'Vrai ou faux', time: '1 min', illus: 'chat', id: 'q24',
      q: '« Utiliser Copilot en interne pour rédiger un e-mail ne déclenche pas l\'article 50. »',
      opts: vf('Vrai'),
      ok: 'Exact : <b>vrai</b>. L\'usage interne de Copilot pour un e-mail ou du code ne déclenche aucune obligation de l\'article 50. L\'obligation naît quand Nexalis <b>publie un deepfake</b> ou <b>livre un chatbot</b>.',
      ko: 'C\'est <b>vrai</b>. L\'usage interne pour un e-mail ou du code ne déclenche rien. L\'obligation naît quand Nexalis publie un deepfake ou livre un chatbot.',
      tip: 'Indice : l\'article 50 protège les personnes exposées au système.' },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 4', time: '1 min 30', fiche: 1 },
  ],

  scn: [
    { id: 's21', t: 'Produit', who: 'Direction produit', illus: 'cv', title: 'Le SaaS de présélection sous notre marque', risk: 'haut', theme: 'Rôle de fournisseur',
      ctx: ['Nexalis veut vendre à ses clients PME un module de préqualification des candidats.', 'Il serait vendu en SaaS, sous la marque Nexalis.', 'Lancement visé : début 2028.'],
      q: 'Quelle est la situation de Nexalis ?',
      opts: [
        ['Simple déployeur : ce sont les PME clientes qui utilisent l\'outil au quotidien, pas Nexalis.', 'ko', 'À éviter', 'En vendant sous sa marque, Nexalis est fournisseur (art. 3(3)).'],
        ['Fournisseur d\'un système à haut risque, avec un dossier à produire pour décembre 2027.', 'ok', 'Bonne réponse', 'Documentation technique, système de gestion de la qualité, contrôle interne, déclaration UE, marquage CE, enregistrement et notice. Pour un outil RH, l\'évaluation est un contrôle interne, sans organisme notifié (art. 43).'],
        ['Aucune obligation avant 2028 : le haut risque a été reporté par l\'Omnibus sur l\'IA.', 'mid', 'Partiellement', 'Le report fixe une date, il ne supprime rien : au lancement début 2028, tout doit être prêt depuis le 2 décembre 2027.'],
      ], law: 'Art. 9 à 17, 43, 47 à 49' },
    { id: 's22', t: 'Avant-vente', who: 'Karim, avant-vente', illus: 'roles', title: 'L\'assistant sur mesure pour une banque', risk: null, theme: 'Contrat',
      ctx: ['Une banque demande un assistant développé sur mesure.', 'Il sera mis en service sous le nom et la marque de la banque.', 'Le contrat est en cours de rédaction.'],
      q: 'Comment Karim doit-il traiter la question des rôles ?',
      opts: [
        ['Considérer que Nexalis est forcément fournisseur, puisque c\'est elle qui développe l\'outil.', 'mid', 'Partiellement', 'Pas forcément : mis en service sous le nom du client, le client est en principe fournisseur.'],
        ['Ne rien écrire au contrat : la loi tranchera la question des rôles en cas de litige.', 'ko', 'À éviter', 'Cette lecture de l\'art. 3(3) reste une interprétation : elle doit être écrite dans chaque contrat.'],
        ['Écrire au contrat que la banque est en principe fournisseur et Nexalis sous-traitant.', 'ok', 'Bonne réponse', 'C\'est la lecture de l\'art. 3(3), à fixer dans chaque contrat et à faire valider par le juridique. Avec un client financier, pensez aussi aux clauses DORA.'],
      ], law: 'Art. 3(3) · à vérifier' },
    { id: 's23', t: 'Communication', who: 'Inès, communication', illus: 'news', title: 'L\'article rédigé par IA', risk: 'transp', theme: 'Transparence',
      ctx: ['Inès publie sur le site de Nexalis un article d\'actualité sur l\'IA au Luxembourg.', 'Il a été rédigé par une IA ; Inès a corrigé deux fautes d\'orthographe.', 'L\'article informe le public sur une question d\'intérêt public.'],
      q: 'Faut-il signaler que le texte est généré par IA ?',
      opts: [
        ['Non : un texte, contrairement à une image ou une vidéo, n\'a jamais besoin d\'étiquette.', 'ko', 'À éviter', 'Un texte publié pour informer le public sur une question d\'intérêt public doit être signalé (art. 50(4)).'],
        ['Non, puisqu\'Inès a relu le texte avant sa publication sur le site.', 'mid', 'Partiellement', 'Une simple correction orthographique ne vaut pas contrôle éditorial (FAQ de la Commission).'],
        ['Oui, sauf relecture humaine réelle avec un responsable éditorial.', 'ok', 'Bonne réponse', 'C\'est l\'exception prévue par l\'art. 50(4) : un vrai contrôle éditorial, avec un responsable éditorial.'],
      ], law: 'Art. 50(4) · FAQ art. 50' },
  ],

  recap: [
    ['Déployeur', 'Utilise un système sous son autorité. C\'est le cas de Nexalis avec Copilot, ChatGPT Entreprise ou un outil RH.', 'Art. 3(4)'],
    ['Fournisseur', 'Met un système sur le marché sous son nom ou sa marque. <b>« Dès qu\'on livre sous notre nom, on est fournisseur. »</b>', 'Art. 3(3)'],
    ['Le piège de l\'article 25', '<ul><li>Apposer sa marque sur un système à haut risque</li><li>Le modifier substantiellement</li><li>Changer la destination d\'un outil généraliste</li></ul>', 'Art. 25(1)'],
    ['Modèles GPAI', 'Appeler une API ne fait pas de vous un fournisseur de modèle. Affiner non plus, sauf au-delà d\'<b>un tiers</b> du calcul initial.', 'Lignes directrices GPAI'],
    ['Transparence', '<ul><li>Chatbot : dire que c\'est une IA</li><li>Contenus générés : marquage</li><li>Deepfakes et textes d\'intérêt public : signaler</li></ul>', 'Art. 50'],
    ['Pas pour l\'usage interne', 'Rédiger un e-mail ou du code avec Copilot ne déclenche <b>aucune</b> obligation de l\'article 50.', 'Art. 50', true],
  ],
},

/* =====================================================================
   NIVEAU 3 — LES LIGNES ROUGES
   ===================================================================== */
{
  n: 3, name: 'Repérer', title: 'Les lignes rouges', thumb: 'callcenter',
  pitch: 'Connaître les pratiques interdites, les deepfakes et le haut risque RH, avec le droit du travail luxembourgeois.',
  modules: ['Module 1 · Les pratiques interdites', 'Module 2 · Le haut risque RH'],
  steps: [
    { mod: 1, type: 'situation', label: 'Mise en situation', time: '1 min 30', title: 'Le tableau de bord du « bien-être »', illus: 'callcenter', persona: P.karim,
      body: [
        'Un client bancaire contacte Karim. Il veut ajouter à son outil de centre d\'appels un module qui <b>analyse la voix des conseillers</b> pour détecter le stress et la colère.',
        'Le module alerterait automatiquement les managers. « C\'est pour leur bien-être », précise le client.'
      ],
      prompt: 'Karim a un beau contrat en vue. Mais peut-il accepter ?' },

    { mod: 1, type: 'question', label: 'Question', time: '1 min', illus: 'callcenter', id: 'q31',
      q: 'Que doit répondre Karim ?',
      opts: [
        ['Accepter : l\'objectif affiché est le bien-être des salariés, pas leur contrôle.', false],
        ['Refuser : c\'est de la reconnaissance des émotions au travail, interdite.', true],
        ['Accepter, à condition d\'informer les conseillers et d\'obtenir leur accord écrit.', false],
      ],
      ok: 'Exact. L\'art. 5(1)(f) interdit la reconnaissance des émotions sur le lieu de travail, sauf raisons médicales ou de sécurité. Et le <b>bien-être général n\'est pas une « raison médicale »</b>.',
      ko: 'Non. C\'est de la reconnaissance des émotions au travail, <b>interdite</b> depuis le 2 février 2025 (art. 5(1)(f)). Le bien-être général n\'est pas une raison médicale, et informer ne suffit pas.',
      tip: 'Indice : l\'outil cherche à lire ce que ressentent des salariés.' },

    { mod: 1, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'Huit pratiques interdites depuis le 2 février 2025', illus: 'emotion',
      law: { ref: 'Art. 5(1)(f)', tag: 'Loi', title: 'Pratiques interdites',
        text: 'Est interdite la <mark>reconnaissance des émotions sur le lieu de travail</mark> et dans l\'enseignement, sauf raisons médicales ou de sécurité. C\'est le point le plus concret pour une ESN.' },
      why: 'Le lieu de travail <b>s\'étend aux candidats</b> et aux <b>périodes d\'essai</b>.',
      mustTitle: 'Les huit pratiques de l\'article 5(1)', compact: true,
      must: [
        ['(a) Manipulation', 'Techniques subliminales, manipulatrices ou trompeuses causant un préjudice important.', ''],
        ['(b) Vulnérabilités', 'Exploiter l\'âge, le handicap ou la situation sociale ou économique.', ''],
        ['(c) Notation sociale', '', ''],
        ['(d) Prédiction d\'infraction', 'Fondée uniquement sur le profilage.', ''],
        ['(e) Moissonnage d\'images faciales', 'Non ciblé.', ''],
        ['(f) Émotions au travail et à l\'école', 'Sauf raisons médicales ou de sécurité.', ''],
        ['(g) Catégorisation biométrique', 'Pour déduire des données sensibles.', ''],
        ['(h) Identification biométrique en temps réel', 'Par les forces de l\'ordre, sauf exceptions encadrées.', ''],
      ] },

    { mod: 1, type: 'situation', label: 'Le problème', time: '1 min', title: '« Et si on écoutait plutôt les clients ? »', illus: 'support', persona: P.karim, problem: true,
      body: [
        'Le client revient avec une variante : « D\'accord pour nos conseillers. Mais si on analyse plutôt les <b>émotions des clients qui appellent</b> ? »',
        'Karim n\'est plus sûr de lui.'
      ],
      prompt: 'Attention : « pas interdit » ne veut pas dire « libre ».' },

    { mod: 1, type: 'question', label: 'Question', time: '1 min', illus: 'support', id: 'q32',
      q: 'Analyser les émotions des clients au téléphone, c\'est…',
      opts: [
        ['Interdit, exactement comme la reconnaissance des émotions des salariés.', false],
        ['Pas interdit, mais à haut risque, avec information des personnes.', true],
        ['Libre : l\'interdiction ne vise que le lieu de travail, sans autre règle.', false],
      ],
      ok: 'Exact : pas interdit, mais <b>haut risque</b> (annexe III, point 1(c)) et <b>information obligatoire</b> des personnes exposées (art. 50(3)).',
      ko: 'Non. Le suivi des émotions des <b>clients</b> n\'est pas interdit, mais il est <b>à haut risque</b> (annexe III, 1(c)) et les personnes doivent être informées (art. 50(3)).',
      tip: 'Indice : l\'interdiction (f) vise le lieu de travail.' },

    { mod: 1, type: 'compare', label: 'Explication', time: '1 min', title: 'Émotions : interdit ou pas ?',
      intro: 'Exemples tirés des lignes directrices de la Commission du 4 février 2025.', tag: 'Guide',
      left: ['Interdit', [
        'Webcams et reconnaissance vocale d\'un centre d\'appels qui suivent les émotions des employés',
        'Inférer les émotions pendant un recrutement',
        'Analyser la frappe au clavier ou les expressions faciales',
        'Un système pour détecter le burn-out ou la dépression au travail',
      ]],
      right: ['Pas visé par l\'interdiction', [
        'Suivre les émotions des clients d\'un centre d\'appels (mais haut risque)',
        'Détecter des états physiques comme la douleur ou la fatigue',
        'Inférer des émotions à partir d\'un texte écrit (mais le RGPD s\'applique)',
        'Mesurer le stress d\'un salarié qui manipule des machines dangereuses (sécurité)',
      ]],
      mentor: 'Au travail, une seule question : l\'outil lit-il ce que ressentent nos collègues ? Si oui, on s\'arrête.' },

    { mod: 1, type: 'wrap', label: 'Nouvelle mise en situation', time: '30 s', title: 'Deux points de plus au 2 décembre 2026', illus: 'phonelock',
      body: 'L\'Omnibus ajoute deux interdictions : les images, vidéos ou sons réalistes des parties intimes d\'une personne identifiable, ou la montrant dans une activité sexuellement explicite, <b>sans son consentement</b> (point ba), et le <b>matériel pédopornographique</b> (point bb). Pour un fournisseur, des garde-fous sont attendus : refus, filtres, détection des abus, signalement.',
      keys: [['8', 'pratiques interdites depuis février 2025'], ['+2', 'points ajoutés au 2 décembre 2026'], ['0', 'exception pour le « bien-être »']],
      next: ['Module 2', 'Sofia, la DRH, reçoit 800 candidatures et veut un outil pour les trier…'] },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 5', time: '1 min 30', fiche: 0 },

    { mod: 2, type: 'situation', label: 'Mise en situation', time: '1 min', title: 'Le tri des 800 CV', illus: 'cv', persona: P.sofia,
      body: [
        'Nexalis recrute 30 consultants. Sofia reçoit <b>800 candidatures</b>.',
        'Elle veut un outil qui <b>classe</b> les candidatures et n\'affiche que les <b>20 meilleures</b>. « Bien sûr, c\'est moi qui signerai les décisions. »'
      ],
      prompt: 'Un humain signe à la fin. Cela suffit-il ?' },

    { mod: 2, type: 'question', kind: 'vf', label: 'Vrai ou faux', time: '1 min', illus: 'cv', id: 'q33',
      q: '« Trier des CV avec l\'IA est permis tant qu\'un humain signe. »',
      opts: vf('Faux'),
      ok: 'Exact : <b>faux</b>, ou au moins incomplet. Le filtrage des candidatures est <b>à haut risque</b> (annexe III, 4(a)), le profilage exclut la dérogation, et la signature ne suffit pas si l\'IA <b>façonne le jugement</b>.',
      ko: 'C\'est <b>faux</b> ou incomplet. Filtrer des candidatures est à haut risque (annexe III, 4(a)) et la signature ne suffit pas si la sortie de l\'IA <b>façonne le jugement</b>.',
      tip: 'Indice : qui a vraiment choisi les 20 candidats affichés ?' },

    { mod: 2, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'Haut risque : la porte de sortie… et son verrou', illus: 'scoring',
      law: { ref: 'Art. 6(3) et 6(4)', tag: 'Loi', title: 'Classification à haut risque',
        text: 'Un système de l\'annexe III n\'est pas à haut risque s\'il n\'influence pas matériellement la décision et se limite à une tâche procédurale étroite, à améliorer une activité humaine déjà réalisée, à détecter des écarts sans remplacer l\'évaluation humaine, ou à une tâche préparatoire. Mais il est <mark>toujours à haut risque s\'il effectue un profilage</mark> de personnes physiques.' },
      why: 'Selon le projet de lignes directrices du 19 mai 2026, les outils de recrutement « usually perform profiling ». En revanche, <b>structurer des CV, dédoublonner ou planifier des entretiens</b> peut rester hors haut risque, à condition de documenter et d\'enregistrer.', whyTag: 'Projet',
      mustTitle: 'L\'annexe III au plus près d\'une ESN',
      must: [
        ['Recrutement', 'Analyser et filtrer les candidatures, évaluer les candidats.', '4(a)'],
        ['Gestion des travailleurs', 'Promotion, licenciement, attribution de tâches, suivi et évaluation des performances.', '4(b)'],
        ['Crédit', 'Scoring des particuliers, hors détection de fraude.', '5(b)'],
        ['Assurance', 'Tarification en assurance vie et santé.', '5(c)'],
      ] },

    { mod: 2, type: 'situation', label: 'Le problème', time: '1 min', title: 'Le lundi du déploiement', illus: 'meeting', persona: P.sofia, problem: true,
      body: [
        'Quelques mois plus tard, Sofia annonce un lundi matin : « Depuis aujourd\'hui, un outil d\'IA évalue les <b>performances trimestrielles</b> de chacun. »',
        'Les salariés le découvrent en même temps que l\'annonce. Nexalis compte <b>180 salariés</b>.'
      ],
      prompt: 'Qu\'est-ce qui a été oublié ?' },

    { mod: 2, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'Avant de déployer : l\'AI Act… et le Code du travail', illus: 'meeting',
      law: { ref: 'Art. 26 · au 2 décembre 2027', tag: 'Loi', title: 'Obligations du déployeur',
        text: 'Avant la mise en service sur le lieu de travail, le déployeur <mark>informe les représentants des travailleurs et les travailleurs concernés</mark> (art. 26(7)). Il confie le contrôle humain à des personnes ayant <mark>la compétence, la formation et l\'autorité</mark> nécessaires (art. 26(2)).' },
      why: 'L\'information des représentants que l\'AI Act n\'imposera qu\'au 2 décembre 2027 est <b>déjà exigée au Luxembourg</b> pour une partie des outils RH.', whyTag: 'À vérifier',
      mustTitle: 'Ce que le Code du travail luxembourgeois prévoit déjà',
      must: [
        ['Délégation du personnel', 'Obligatoire dès 15 salariés. En dessous de 150, elle est informée et consultée.', 'Code du travail'],
        ['Codécision dès 150 salariés', 'Pour les installations techniques qui contrôlent le comportement et les performances : décision « d\'un commun accord ».', 'L.414-9'],
        ['Surveillance des salariés', 'Information préalable détaillée de la délégation. Dans les 15 jours, avis préalable de la CNPD possible, rendu sous un mois et suspensif.', 'L.261-1'],
      ] },

    { mod: 2, type: 'question', label: 'Question', time: '1 min', illus: 'meeting', id: 'q34',
      q: 'Qu\'est-ce que Sofia a oublié ?',
      opts: [
        ['Rien pour l\'instant : les obligations du haut risque ne s\'appliquent qu\'en décembre 2027.', false],
        ['L\'accord de la délégation, l\'information des salariés, des superviseurs formés et une AIPD.', true],
        ['Seulement d\'envoyer un e-mail d\'information aux salariés avant la mise en service.', false],
      ],
      ok: 'Exact. Avec 180 salariés, ce type d\'outil relève de la <b>codécision</b> avec la délégation (L.414-9). Le RGPD s\'applique dès aujourd\'hui (AIPD), et le contrôle humain doit être confié à des superviseurs formés.',
      ko: 'Non. Le droit du travail luxembourgeois et le RGPD s\'appliquent <b>dès aujourd\'hui</b> : codécision avec la délégation (180 salariés), information préalable, superviseurs formés, AIPD.',
      tip: 'Indice : pensez au nombre de salariés de Nexalis.' },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 6', time: '1 min 30', fiche: 1 },
  ],

  scn: [
    { id: 's31', t: 'Marketing', who: 'Inès, communication', illus: 'ceo', title: 'Les vœux du dirigeant en luxembourgeois', risk: 'transp', theme: 'Deepfake',
      ctx: ['Pour les vœux de fin d\'année, Inès crée une vidéo où l\'avatar IA du dirigeant parle luxembourgeois.', 'Le dirigeant ne parle pas luxembourgeois.', 'La vidéo sera publiée sur les réseaux sociaux.'],
      q: 'Que doit faire Inès ?',
      opts: [
        ['Publier tel quel : le dirigeant a donné son accord pour la vidéo.', 'mid', 'Partiellement', 'L\'accord est utile, mais il ne dispense pas de signaler l\'hypertrucage.'],
        ['Renoncer à la vidéo : les deepfakes sont interdits par l\'AI Act.', 'ko', 'À éviter', 'Non : seuls les deepfakes intimes non consentis seront interdits au 2 décembre 2026. Les autres doivent être signalés.'],
        ['Signaler l\'hypertrucage par une mention ou une icône.', 'ok', 'Bonne réponse', 'C\'est un hypertrucage (art. 3(60)) à signaler (art. 50(4)). Le code de bonnes pratiques du 10 juin 2026 prévoit une icône UE ou un label équivalent.'],
      ], law: 'Art. 3(60) et 50(4)' },
    { id: 's32', t: 'Tous les salariés', who: 'Un collègue', illus: 'phonelock', title: 'Le deepfake du collègue', risk: 'interdit', theme: 'Pratique interdite',
      ctx: ['Nous sommes en janvier 2027.', 'Un salarié utilise l\'outil de génération d\'images de l\'entreprise pour créer une image intime d\'une collègue.', 'Il dit que « c\'était pour rire ».'],
      q: 'Comment qualifier ce comportement ?',
      opts: [
        ['Une mauvaise blague entre collègues : regrettable, mais sans lien avec l\'AI Act ni le droit du travail.', 'ko', 'À éviter', 'Faux : c\'est l\'une des interdictions ajoutées par l\'Omnibus.'],
        ['Interdit en usage professionnel depuis le 2 décembre 2026, en plus des sanctions disciplinaires et pénales.', 'ok', 'Bonne réponse', 'Point 5(1)(ba). Un usage purement personnel sortirait de l\'AI Act, mais pas du droit pénal.'],
        ['Autorisé tant que l\'image reste privée et n\'est pas diffusée en dehors de l\'équipe.', 'ko', 'À éviter', 'Non : l\'interdiction vise la génération sans consentement, pas seulement la diffusion.'],
      ], law: 'Art. 5(1)(ba) et 2(10)' },
    { id: 's33', t: 'Management', who: 'Julien, manager', illus: 'scoring', title: 'Le tableau de productivité', risk: 'haut', theme: 'Haut risque RH',
      ctx: ['Julien veut noter chaque développeur à partir des données Copilot et Jira.', 'Les notes serviraient à préparer les promotions.', 'Il veut le lancer le mois prochain.'],
      q: 'Qu\'est-ce que Julien doit savoir ?',
      opts: [
        ['C\'est interdit : noter la performance des salariés avec l\'IA fait partie des pratiques bannies par l\'article 5.', 'ko', 'À éviter', 'Non : c\'est encadré (annexe III, 4(b)), pas interdit, tant que l\'outil n\'infère pas d\'émotions.'],
        ['Haut risque en décembre 2027 ; dès aujourd\'hui : RGPD, information de la délégation, codécision dès 150 salariés.', 'ok', 'Bonne réponse', 'Le haut risque arrive en 2027, mais le RGPD et le droit du travail luxembourgeois s\'appliquent déjà.'],
        ['Rien n\'est requis avant décembre 2027 : on peut lancer l\'outil maintenant et se mettre en conformité ensuite.', 'mid', 'Partiellement', 'Pour l\'AI Act, oui. Mais le RGPD et le Code du travail (L.261-1, L.414-9) s\'appliquent dès aujourd\'hui.'],
      ], law: 'Annexe III 4(b) · L.261-1 · L.414-9' },
  ],

  recap: [
    ['Huit pratiques interdites', 'Depuis le 2 février 2025 : manipulation, vulnérabilités, notation sociale, prédiction d\'infraction, moissonnage facial, <b>émotions au travail</b>, catégorisation biométrique, identification en temps réel.', 'Art. 5(1)'],
    ['Émotions : la nuance', 'Interdit pour les salariés et les candidats. Pour les clients : pas interdit, mais haut risque et information obligatoire.', 'Art. 5(1)(f) · Annexe III 1(c)'],
    ['Deepfakes', '<ul><li>Signaler tout hypertrucage publié</li><li>Interdits au 2 décembre 2026 : deepfakes intimes non consentis</li></ul>', 'Art. 50(4) · 5(1)(ba)'],
    ['Haut risque RH', 'Recrutement et gestion des travailleurs. <b>Toujours</b> haut risque en cas de profilage. Application : <b>2 décembre 2027</b>.', 'Annexe III 4 · Art. 6(3)'],
    ['Le déployeur doit', '<ul><li>Utiliser selon la notice</li><li>Un contrôle humain formé</li><li>Garder les journaux 6 mois</li><li>Informer représentants et personnes</li></ul>', 'Art. 26'],
    ['Au Luxembourg, dès aujourd\'hui', 'Délégation dès 15 salariés, <b>codécision dès 150</b> pour les outils de contrôle des performances, avis possible de la CNPD.', 'L.414-9 · L.261-1', true],
  ],
},

/* =====================================================================
   NIVEAU 4 — NOS RÉFLEXES
   ===================================================================== */
{
  n: 4, name: 'Agir', title: 'Nos réflexes', thumb: 'copypaste',
  pitch: 'Protéger les données, réagir à un incident, connaître les sanctions et les autorités au Luxembourg.',
  modules: ['Module 1 · Données et RGPD', 'Module 2 · Incidents, sanctions, autorités'],
  steps: [
    { mod: 1, type: 'situation', label: 'Mise en situation', time: '1 min 30', title: 'Le copier-coller du vendredi', illus: 'copypaste', persona: P.nora,
      body: [
        'Vendredi, 17 h. Nora doit analyser un export RH pour un client : <b>noms, salaires et IBAN</b> des salariés.',
        'Pour gagner du temps, elle colle tout dans un <b>chatbot grand public</b> et demande un tableau de synthèse.'
      ],
      prompt: 'Le vrai risque quotidien d\'une ESN n\'est pas l\'amende AI Act : c\'est la <b>fuite de données clients</b> dans un outil grand public.' },

    { mod: 1, type: 'question', label: 'Question', time: '1 min', illus: 'copypaste', id: 'q41',
      q: 'Quel est le problème principal ?',
      opts: [
        ['Aucun : ce chatbot n\'est pas une pratique interdite au sens de l\'article 5.', false],
        ['Une faute RGPD et contractuelle : il fallait un outil validé et des données fictives.', true],
        ['Seulement une question de transparence : il fallait signaler l\'IA (article 50).', false],
      ],
      ok: 'Exact. C\'est d\'abord une <b>faute RGPD et contractuelle</b> (NDA, politique interne). Le bon réflexe : un <b>outil validé</b> par l\'entreprise et des données <b>anonymisées ou fictives</b>.',
      ko: 'Non. Le problème est d\'abord le <b>RGPD</b> et le <b>contrat</b> avec le client. Il fallait un outil validé et des données anonymisées ou fictives.',
      tip: 'Indice : quelles données sont sorties de l\'entreprise ?' },

    { mod: 1, type: 'explain', label: 'Explication', time: '1 min', title: 'L\'AI Act s\'ajoute au RGPD, il ne le remplace pas',
      intro: 'Dans presque tous les usages du quotidien (données clients dans un prompt, outil RH, surveillance), c\'est le <b>RGPD</b> qui s\'applique d\'abord, et dès aujourd\'hui.',
      crit: [
        ['Est-ce interdit ou à haut risque ?', 'Vérifiez le niveau de risque de l\'usage : articles 5 et 6, annexe III.'],
        ['Quelles données entrent dans l\'outil ?', 'Données personnelles ou confidentielles : outil validé uniquement, données anonymisées si possible.'],
        ['Qui doit être informé ?', 'Personnes concernées, délégation du personnel, client, DPO…'],
      ], critTitle: 'Trois questions avant tout usage d\'IA',
      law: { ref: 'Art. 2(7)', tag: 'Loi', title: 'Articulation avec le RGPD',
        text: 'Le règlement <mark>n\'affecte pas</mark> le RGPD (Règlement (UE) 2016/679), sous réserve des articles 4a et 59.' },
      clair: '<b>En 2025, la CNPD</b> a reçu 846 réclamations (+40 %) et 425 notifications de violations de données, dont <b>49 % dues à une erreur humaine</b>.' },

    { mod: 1, type: 'situation', label: 'Le problème', time: '1 min', title: '« Une IA m\'a-t-elle éliminé ? »', illus: 'alert', persona: P.marc, problem: true,
      body: [
        'Marc a postulé chez un client de Nexalis qui utilise un outil de tri. Refusé, il écrit : « Une IA m\'a-t-elle éliminé ? Et pourquoi ? »',
        'Le client propose de lui envoyer le <b>code source de l\'algorithme</b> : « Comme ça, il aura tout. »'
      ],
      prompt: 'Le code source, est-ce une explication ?' },

    { mod: 1, type: 'law', label: 'Article de loi', time: '1 min 30', title: 'Le droit à une vraie explication', illus: 'law',
      law: { ref: 'RGPD art. 22 · CJUE C-203/22', tag: 'Loi', title: 'Décisions automatisées',
        text: 'En février 2025, la CJUE a jugé que communiquer <mark>une formule mathématique complexe, comme un algorithme</mark>, ne suffit pas comme explication. Le responsable doit expliquer <mark>la procédure et les principes effectivement appliqués</mark>.' },
      why: 'Les obligations de l\'AI Act pour ce cas s\'appliqueront au 2 décembre 2027. L\'application de l\'article 86 avant cette date est incertaine.', whyTag: 'À vérifier',
      mustTitle: 'Ce qu\'il faut répondre à Marc',
      must: [
        ['L\'informer', 'Lui dire qu\'un système d\'IA a été utilisé.', 'Art. 26(11)'],
        ['Expliquer le rôle de l\'IA', 'Droit d\'obtenir des explications claires et pertinentes sur le rôle du système dans la décision.', 'Art. 86'],
        ['Donner les éléments principaux', 'La procédure et les principes appliqués, pas le code.', 'RGPD · C-203/22'],
      ] },

    { mod: 1, type: 'question', kind: 'vf', label: 'Vrai ou faux', time: '1 min', illus: 'alert', id: 'q42',
      q: '« Envoyer le code source au candidat, c\'est lui donner une explication. »',
      opts: vf('Faux'),
      ok: 'Exact : <b>faux</b>. Il faut expliquer le <b>rôle</b> de l\'IA et les <b>éléments principaux</b> de la décision : la procédure et les principes appliqués.',
      ko: 'C\'est <b>faux</b>. La CJUE l\'a dit : un algorithme n\'est pas une explication. Il faut la procédure et les principes effectivement appliqués.',
      tip: 'Indice : Marc doit pouvoir comprendre la réponse.' },

    { mod: 1, type: 'wrap', label: 'Nouvelle mise en situation', time: '30 s', title: 'Ce que Nora a changé', illus: 'registry',
      body: 'Nora a supprimé sa conversation et prévenu sa manager et la DPO. Elle travaille désormais avec l\'<b>outil validé</b> par Nexalis et des <b>données fictives</b> pour ses essais.',
      keys: [['3', 'questions avant tout usage d\'IA'], ['49 %', 'des violations notifiées dues à une erreur humaine'], ['1', 'réflexe : outil validé, données protégées']],
      next: ['Module 2', 'Un samedi matin, un chatbot livré à une banque affiche les données d\'un client… à un autre.'] },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 7', time: '1 min 30', fiche: 0 },

    { mod: 2, type: 'situation', label: 'Mise en situation', time: '1 min', title: 'Le chatbot bancaire qui fuit', illus: 'bankleak', persona: P.tom,
      body: [
        'Un chatbot livré par Nexalis à une banque affiche les <b>données d\'un client… à un autre utilisateur</b>.',
        'La banque appelle Tom un samedi matin.'
      ],
      prompt: 'Plusieurs textes s\'appliquent en même temps : RGPD, DORA et, plus tard, l\'AI Act.' },

    { mod: 2, type: 'question', label: 'Question', time: '1 min', illus: 'bankleak', id: 'q43',
      q: 'Quelle réaction est la bonne ?',
      opts: [
        ['Corriger discrètement le bug dans la nuit, puis vérifier qu\'il ne se reproduit pas.', false],
        ['Aider la banque à notifier la violation sous 72 h et traiter l\'incident au titre de DORA.', true],
        ['Attendre de savoir si le chatbot est à haut risque avant de prévenir qui que ce soit.', false],
      ],
      ok: 'Exact. RGPD art. 33 : <b>notification sous 72 heures</b> par la banque, aidée de Nexalis. Incident TIC possible au titre de <b>DORA</b>. L\'incident grave AI Act (art. 73) ne viserait qu\'un système à haut risque, à partir de décembre 2027.',
      ko: 'Non. La banque doit <b>notifier la violation sous 72 heures</b> (RGPD art. 33), avec l\'aide de Nexalis, et traiter un éventuel incident TIC au titre de DORA.',
      tip: 'Indice : le RGPD s\'applique dès aujourd\'hui.' },

    { mod: 2, type: 'calc', label: 'Article de loi', time: '1 min 30', title: 'Jusqu\'à 7 % du chiffre d\'affaires mondial', illus: 'fines' },

    { mod: 2, type: 'question', label: 'Exercice', time: '1 min', illus: 'fines', id: 'q44',
      q: 'Une PME de 20 M€ de chiffre d\'affaires commet une infraction à l\'article 5. Quel est le plafond d\'amende ?',
      opts: [
        ['35 M€', false],
        ['1,4 M€', true],
        ['600 000 €', false],
      ],
      ok: 'Exact. Pour une PME, c\'est le <b>plus bas</b> des deux : 7 % × 20 M€ = <b>1,4 M€</b>. Ce sont des plafonds, pas des amendes probables.',
      ko: 'Non. Pour une PME, on retient le <b>plus bas</b> entre 35 M€ et 7 % × 20 M€, soit <b>1,4 M€</b>. (600 000 € correspond à une infraction à l\'article 50.)',
      tip: 'Indice : pour une PME, on prend le plus bas des deux montants.' },

    { mod: 2, type: 'law', label: 'Explication', time: '1 min 30', title: 'Au Luxembourg : qui contrôlera ?', illus: 'lux',
      law: { ref: 'Projet de loi n° 8476', tag: 'Projet', title: 'Loi d\'application au Luxembourg',
        text: 'Déposé le 23 décembre 2024, le projet fait de la CNPD <mark>l\'autorité de surveillance du marché par défaut</mark>, le point de contact unique et l\'opératrice d\'au moins un bac à sable. Au 12 octobre 2026, sa dernière étape est l\'<mark>avis du Conseil d\'État du 10 juillet 2026</mark>, assorti d\'oppositions formelles : <mark>aucun vote</mark>.' },
      why: 'La formulation juste : <b>« la CNPD est l\'autorité pressentie ; le règlement s\'applique déjà directement. »</b>',
      mustTitle: 'Les compétences sectorielles prévues',
      must: [
        ['CSSF', 'Entités qu\'elle surveille (finance).', 'Projet'],
        ['CAA', 'Assurances.', 'Projet'],
        ['ILR', 'Déployeurs d\'infrastructures critiques qui sont des entités NIS2.', 'Projet'],
        ['ALIA', 'Marquage et deepfakes (art. 50(2) et (4)).', 'Projet'],
      ] },

    { mod: 2, type: 'question', kind: 'vf', label: 'Vrai ou faux', time: '1 min', illus: 'lux', id: 'q45',
      q: '« Au Luxembourg, l\'AI Act s\'applique déjà, même sans loi nationale votée. »',
      opts: vf('Vrai'),
      ok: 'Exact : <b>vrai</b>. Le règlement s\'applique directement. Seule la désignation des autorités attend le projet de loi 8476, non voté au 12 octobre 2026 : la CNPD est pressentie et répond déjà à ia@cnpd.lu.',
      ko: 'C\'est <b>vrai</b>. Le règlement s\'applique directement, sans loi nationale. Le projet de loi 8476, non voté au 12 octobre 2026, ne fait que désigner les autorités : la CNPD est pressentie.',
      tip: 'Indice : un projet de loi n\'est pas une loi.' },

    { mod: 'f', type: 'fiche', label: 'Fiche pratique 8', time: '1 min 30', fiche: 1 },
  ],

  scn: [
    { id: 's41', t: 'Avant-vente', who: 'Karim, avant-vente', illus: 'insurance', title: 'La décision 100 % automatique', risk: 'haut', theme: 'Haut risque · RGPD',
      ctx: ['Un assureur client veut refuser automatiquement les souscriptions santé quand le « score » est faible.', 'Aucun humain n\'interviendrait.', 'Il demande un devis à Karim.'],
      q: 'Que doit expliquer Karim ?',
      opts: [
        ['C\'est interdit par l\'AI Act : une décision prise par une IA sans humain est une pratique interdite.', 'ko', 'À éviter', 'Ce n\'est pas une pratique interdite : c\'est encadré.'],
        ['Décision exclusivement automatisée : RGPD dès aujourd\'hui ; haut risque, FRIA et contrôle humain en décembre 2027.', 'ok', 'Bonne réponse', '« On qualifie le risque avant de chiffrer. » RGPD art. 22, annexe III 5(c), art. 14, 26(2) et 27.'],
        ['Aucune règle ne s\'applique avant 2027 : l\'outil peut être livré et utilisé tel quel en attendant.', 'mid', 'Partiellement', 'Pour le haut risque, oui. Mais le RGPD (art. 22) encadre déjà les décisions exclusivement automatisées.'],
      ], law: 'RGPD art. 22 · Annexe III 5(c) · Art. 27' },
    { id: 's42', t: 'Direction', who: 'Direction de Nexalis', illus: 'meeting', title: 'Lancer ce module lundi', risk: null, theme: 'Dialogue social',
      ctx: ['La direction veut lancer ce module de formation pour ses 180 salariés dès lundi.', 'Personne n\'en a parlé à la délégation du personnel.', '« C\'est une formation obligatoire, pas besoin de consulter. »'],
      q: 'Qu\'en pensez-vous ?',
      opts: [
        ['La direction a raison : l\'article 4 suffit, la formation n\'a pas à être discutée avec la délégation.', 'ko', 'À éviter', 'L\'AI Act n\'efface pas le droit du travail luxembourgeois.'],
        ['Il suffit d\'informer la délégation du personnel une fois le programme lancé.', 'mid', 'Partiellement', 'Trop tard : le dialogue social s\'ouvre avant le lancement, pas après.'],
        ['Dès 150 salariés, la formation continue collective peut relever de la codécision : en parler avant le lancement.', 'ok', 'Bonne réponse', 'L.414-9 vise aussi « tout programme ou action collective de formation professionnelle continue ». Point à confirmer par le juridique.'],
      ], law: 'L.414-9 · à vérifier' },
    { id: 's43', t: 'Finance', who: 'Direction financière', illus: 'fines', title: 'La filiale et le statut de PME', risk: null, theme: 'Sanctions',
      ctx: ['Nexalis compte 180 salariés, mais appartient à un groupe international.', 'Le DAF compte sur le plafond « le plus bas » réservé aux PME.', 'Il veut l\'écrire dans l\'analyse de risques.'],
      q: 'Est-ce acquis ?',
      opts: [
        ['Oui : Nexalis compte 180 salariés, c\'est donc une PME au sens de l\'AI Act.', 'ko', 'À éviter', 'Le statut de PME tient compte des entreprises liées (Recommandation 2003/361/CE).'],
        ['Pas forcément : appartenir à un groupe peut faire perdre le statut de PME. À faire confirmer.', 'ok', 'Bonne réponse', 'C\'est le point de vigilance des filiales de groupe, comme la base de chiffre d\'affaires retenue.'],
        ['Oui, et la règle du « plus bas des deux montants » vaut aussi pour les SMC à tous les niveaux.', 'ko', 'À éviter', 'Pour les SMC, la règle du plus bas ne joue que pour les deux niveaux inférieurs (art. 99(6a)).'],
      ], law: 'Art. 3(14a), 99(6) et 99(6a)' },
  ],

  recap: [
    ['RGPD d\'abord', 'L\'AI Act n\'affecte pas le RGPD. Données clients dans un prompt : <b>outil validé, données anonymisées ou fictives</b>.', 'Art. 2(7)'],
    ['Trois questions', '<ul><li>Est-ce interdit ou à haut risque ?</li><li>Quelles données entrent dans l\'outil ?</li><li>Qui doit être informé ?</li></ul>', 'Réflexe'],
    ['Incidents', '<ul><li>RGPD : notification sous 72 h</li><li>NIS2 : alerte sous 24 h, notification sous 72 h</li><li>DORA pour les clients financiers</li></ul>', 'RGPD · NIS2 · DORA'],
    ['Sanctions', '35 M€ ou 7 % (interdits) · 15 M€ ou 3 % (opérateurs, transparence) · 7,5 M€ ou 1 % (informations inexactes). <b>L\'entreprise paie</b>, pas le salarié.', 'Art. 99'],
    ['Article 4 et amendes', 'Pas de plafond propre dans le règlement, mais le défaut de formation <b>aggrave</b> une autre infraction.', 'Art. 99(7)(g)'],
    ['Au Luxembourg', 'Le règlement s\'applique déjà. La <b>CNPD est pressentie</b> (projet 8476, non voté). Contact : ia@cnpd.lu.', 'Projet 8476', true],
  ],
},
];

/* ---------------------------------------------------------
   FICHES PRATIQUES (2 par niveau)
   --------------------------------------------------------- */
const FICHES = {
  1: [
    { title: 'Reconnaître une IA et son niveau de risque', render: () => `
      <div class="fiche">
        <div>
          <div class="illus">${ILLUS.pyramid()}</div>
          <div class="card pad flat" style="margin-top:16px">
            <h4 style="margin-bottom:8px">Deux socles transversaux</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span><div><b>La maîtrise de l'IA</b><small>Pour tous les fournisseurs et déployeurs (art. 4).</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>Les modèles d'IA à usage général</b><small>Un régime séparé pour les fournisseurs de modèles GPAI.</small></div></li>
            </ul>
          </div>
        </div>
        <div>
          ${risks([
            ['var(--ko)', 'Interdit', 'ko', 'Pratiques listées à l\'article 5.', 'Reconnaissance des émotions au travail, notation sociale.', 'Art. 5'],
            ['var(--a)', 'Haut risque', 'pk', 'Usages listés aux annexes I et III.', 'Recrutement, gestion des salariés, scoring de crédit, tarification assurance vie et santé.', 'Art. 6'],
            ['var(--s)', 'Risque de transparence', '', 'Il faut informer ou signaler.', 'Chatbots, deepfakes, contenus générés.', 'Art. 50'],
            ['#A99AD6', 'Risque minimal', 'grey', 'Sans règle spécifique.', 'Rédiger un e-mail avec Copilot en interne (le RGPD reste applicable).', '—'],
          ])}
          <div class="clair" style="margin-top:14px">${ic('bulb')}<div><b>Reconnaître une IA :</b> l'outil <b>infère</b>-t-il un résultat à partir de ses données ? Si oui, c'est un système d'IA. S'il applique seulement des règles écrites par des humains, non.</div></div>
        </div>
      </div>` },
    { title: 'Le calendrier au 12 octobre 2026', render: () => `
      <div class="fiche" style="grid-template-columns:1.25fr 1fr">
        <div><div class="tl">${[
          ['1er août 2024', 'Entrée en vigueur de l\'AI Act', 'Règlement d\'application directe.', 'past'],
          ['2 février 2025', 'Interdictions et maîtrise de l\'IA', 'Huit pratiques interdites (art. 5), article 4.', 'past'],
          ['2 août 2025', 'Modèles GPAI et gouvernance', 'Obligations des fournisseurs de modèles, régime des sanctions.', 'past'],
          ['27 juillet 2026', 'Entrée en vigueur de l\'Omnibus', 'Nouvel article 4 et article 4a.', 'past'],
          ['2 août 2026', 'Transparence', 'Article 50 : chatbots, deepfakes, contenus générés.', 'now'],
          ['2 décembre 2026', 'Nouvelles interdictions', 'Deepfakes intimes non consentis, pédopornographie ; marquage des systèmes génératifs existants.', 'fut'],
          ['2 décembre 2027', 'Haut risque annexe III', 'RH, crédit, assurance, éducation : art. 8 à 15, 16, 25, 26, 27.', 'fut'],
          ['2 août 2028', 'Haut risque annexe I', 'Composants de sécurité de produits réglementés.', 'fut'],
        ].map(t => `<div class="it ${t[3]}"><div class="d">${t[0]}</div><div class="pt"></div><div><b>${t[1]} ${t[3] === 'now' ? '<span class="chip pk">En vigueur</span>' : ''}</b><small>${t[2]}</small></div></div>`).join('')}</div></div>
        <div>
          <div class="card pad flat" style="background:var(--d);border-color:var(--d);color:#fff">
            <p class="eyebrow" style="color:#F7A8CC">Le message à retenir</p>
            <p style="margin-top:8px;font-size:14.5px;line-height:1.7">« Aujourd'hui : interdictions, maîtrise de l'IA, transparence. Décembre 2026 : deepfakes sexuels et pédopornographie interdits, marquage des contenus générés pour tous. Décembre 2027 : haut risque RH, crédit, assurance, éducation. Août 2028 : haut risque dans les produits réglementés. »</p>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:8px">Trois nuances qui évitent des erreurs</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span><div><b>Article 4</b><small>Obligatoire depuis février 2025, contrôlé par les autorités à partir d'août 2026.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>Le 2 décembre 2026 pour l'article 50</b><small>Vaut seulement pour le marquage des systèmes génératifs déjà sur le marché. Chatbots et deepfakes : depuis le 2 août 2026.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>Nouvelles interdictions</b><small>Une date d'application différée, pas un délai de grâce.</small></div></li>
            </ul>
          </div>
        </div>
      </div>` },
  ],
  2: [
    { title: 'Fournisseur ou déployeur : qui fait quoi', render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1.3fr">
        <div>
          <div class="illus">${ILLUS.roles()}</div>
          <div class="card pad flat" style="margin-top:16px">
            <h4 style="margin-bottom:8px">Trois façons de devenir fournisseur <span class="mini-art">Art. 25(1)</span></h4>
            <ul class="checks">
              <li><span class="ck">1</span>Apposer son nom ou sa marque sur un système à haut risque</li>
              <li><span class="ck">2</span>Y apporter une modification substantielle</li>
              <li><span class="ck">3</span>Changer la destination d'un système, y compris généraliste, pour qu'il devienne à haut risque</li>
            </ul>
          </div>
        </div>
        <div class="card pad flat">
          <h4 style="margin-bottom:6px">Ce que chaque profil doit retenir</h4>
          <table><tr><th>Profil</th><th>Message clé</th></tr>
            <tr><td><b>Tous les salariés</b><br><small class="muted">intérimaires, stagiaires, freelances</small></td><td>« L'IA au travail est déjà encadrée : outils validés, données protégées, doutes signalés. »</td></tr>
            <tr><td><b>Développeurs, data</b></td><td>« Dès qu'on livre sous notre nom, on est fournisseur. »</td></tr>
            <tr><td><b>RH et managers</b></td><td>« Trier, noter ou surveiller des personnes avec l'IA, c'est du haut risque. »</td></tr>
            <tr><td><b>Commerciaux, chefs de projet</b></td><td>« On qualifie le risque avant de chiffrer. »</td></tr>
            <tr><td><b>Direction, juridique, DPO</b></td><td>« Il faut pouvoir prouver ce que l'on a fait. »</td></tr>
          </table>
        </div>
      </div>` },
    { title: 'Transparence : l\'article 50 en pratique', render: () => `
      <div class="fiche" style="grid-template-columns:1.2fr 1fr">
        <div>${risks([
          ['var(--p)', 'Chatbots', '', 'Le fournisseur conçoit le système pour que la personne sache qu\'elle parle à une IA, sauf si c\'est évident.', 'Dès le premier échange.', '50(1)'],
          ['var(--s)', 'Marquage des contenus', '', 'Les fournisseurs de systèmes génératifs marquent audio, image, vidéo et texte dans un format lisible par machine.', 'Systèmes déjà sur le marché avant le 2 août 2026 : jusqu\'au 2 décembre 2026.', '50(2)'],
          ['var(--a)', 'Émotions et biométrie', 'pk', 'Les déployeurs informent les personnes exposées.', 'Ex. : analyse des émotions des clients d\'un centre d\'appels.', '50(3)'],
          ['var(--d)', 'Deepfakes et textes d\'intérêt public', 'dark', 'Les déployeurs signalent les hypertrucages et les textes générés publiés pour informer le public.', 'Sauf relecture humaine avec un responsable éditorial.', '50(4)'],
        ])}</div>
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:8px">Le code de bonnes pratiques du 10 juin 2026 ${tagChip('Guide')}</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span>Au moins deux couches de marquage si nécessaire : métadonnées et filigrane</li>
              <li><span class="ck">${ic('check')}</span>Une icône UE ou un label équivalent pour les deepfakes</li>
              <li><span class="ck">${ic('check')}</span>Environ 190 signataires fin juillet 2026, selon la Commission</li>
            </ul>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:8px">Pas d'obligation pour…</h4>
            <p class="muted" style="font-size:13.5px">L'usage interne de Copilot pour un e-mail ou du code. L'aide à l'édition standard. Une simple correction orthographique ne vaut <b>pas</b> contrôle éditorial.</p>
          </div>
          <div class="note">${ic('alert')}<span>La répartition du marquage entre le fournisseur du modèle et l'intégrateur n'est pas tranchée dans les sources consultées. ${tagChip('À vérifier')}</span></div>
        </div>
      </div>` },
  ],
  3: [
    { title: 'Les lignes rouges de l\'article 5', render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1fr">
        <div class="card pad flat">
          <h4 style="margin-bottom:10px">Huit pratiques interdites depuis le 2 février 2025</h4>
          <ol class="ban">${['Techniques subliminales, manipulatrices ou trompeuses causant un préjudice important', 'Exploitation des vulnérabilités (âge, handicap, situation sociale ou économique)', 'Notation sociale', 'Prédiction du risque d\'infraction fondée uniquement sur le profilage', 'Moissonnage non ciblé d\'images faciales', 'Reconnaissance des émotions au travail et dans l\'enseignement, sauf raisons médicales ou de sécurité', 'Catégorisation biométrique visant à déduire des données sensibles', 'Identification biométrique à distance en temps réel par les forces de l\'ordre, sauf exceptions'].map((t, i) => `<li class="${i === 5 ? 'hl' : ''}"><span>${'abcdefgh'[i]}</span>${t}</li>`).join('')}</ol>
        </div>
        <div>
          <div class="card pad flat" style="background:var(--d);border-color:var(--d);color:#fff">
            <p class="eyebrow" style="color:#F7A8CC">+2 au 2 décembre 2026</p>
            <ul style="margin:10px 0 0 18px;display:grid;gap:6px;font-size:13.5px">
              <li><b>(ba)</b> Images, vidéos ou sons réalistes intimes d'une personne identifiable, sans son consentement</li>
              <li><b>(bb)</b> Matériel pédopornographique</li>
            </ul>
            <p style="margin-top:10px;font-size:12.5px;opacity:.8">Fournisseur : interdit si c'est la destination ou un résultat prévisible sans garde-fous. Déployeur : seulement s'il l'utilise dans ce but.</p>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:6px">Exemples liés à l'emploi</h4>
            <ul class="checks">
              <li><span class="ck">${ic('x')}</span>Profiler les salariés d'après leurs réseaux sociaux pour juger leur performance (notation sociale)</li>
              <li><span class="ck">${ic('x')}</span>Cibler les seniors avec des incitations au départ fondées sur leurs faiblesses cognitives (vulnérabilités)</li>
            </ul>
          </div>
        </div>
      </div>` },
    { title: 'Haut risque RH : quand et quoi faire', render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1.15fr">
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:8px">Est-ce à haut risque ?</h4>
            <div class="flow">
              <div><b>1.</b> L'usage figure-t-il à l'annexe III ? <small>Recrutement, gestion des salariés, crédit, assurance vie et santé…</small></div>
              <div><b>2.</b> Fait-il du profilage de personnes ? <small>Si oui : <b>toujours</b> haut risque.</small></div>
              <div><b>3.</b> Sinon, se limite-t-il à une tâche procédurale, préparatoire, ou à détecter des écarts sans remplacer l'humain ? <small>Si oui : peut sortir du haut risque, à documenter et enregistrer (art. 6(4)).</small></div>
            </div>
          </div>
          <div class="note">${ic('clock')}<span>Application : <b>2 décembre 2027</b> pour l'annexe III. Le RGPD et le droit du travail s'appliquent dès aujourd'hui.</span></div>
        </div>
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:6px">Le déployeur doit <span class="mini-art">Art. 26</span></h4>
            <ul class="checks">${['Utiliser le système selon la notice', 'Confier le contrôle humain à des personnes compétentes, formées et ayant l\'autorité', 'Veiller à la pertinence des données d\'entrée', 'Surveiller le fonctionnement et suspendre l\'usage en cas de risque', 'Conserver les journaux au moins six mois', 'Informer les personnes visées par des décisions (26(11))', 'Avant la mise en service au travail : informer les représentants et les travailleurs (26(7))'].map(t => `<li><span class="ck">${ic('check')}</span>${t}</li>`).join('')}</ul>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:6px">Analyse d'impact (FRIA) <span class="mini-art">Art. 27</span></h4>
            <p class="muted" style="font-size:13px">Seulement pour les organismes publics, les entités privées qui fournissent un service public, et les déployeurs de scoring de crédit ou de tarification vie et santé. Elle peut renvoyer à l'AIPD du RGPD.</p>
          </div>
        </div>
      </div>` },
  ],
  4: [
    { title: 'Les trois questions et les autres textes', render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1.2fr">
        <div>
          <div class="card pad flat" style="background:var(--d);border-color:var(--d);color:#fff">
            <p class="eyebrow" style="color:#F7A8CC">Avant tout usage d'IA</p>
            <ol class="q3">${['Est-ce interdit ou à haut risque ?', 'Quelles données personnelles ou confidentielles entrent dans l\'outil ?', 'Qui doit être informé ?'].map(t => `<li>${t}</li>`).join('')}</ol>
          </div>
          <div class="clair" style="margin-top:14px">${ic('bulb')}<div>Le vrai risque quotidien : la <b>fuite de données clients</b> dans un outil grand public. En 2025, 49 % des violations notifiées à la CNPD étaient dues à une erreur humaine.</div></div>
        </div>
        <div class="card pad flat">
          <table><tr><th>Texte</th><th>Ce qu'il faut savoir</th></tr>
            <tr><td><b>RGPD</b></td><td>S'applique pleinement, en parallèle de l'AI Act (art. 2(7)). Décisions exclusivement automatisées encadrées (art. 22). Notification d'une violation sous 72 h.</td></tr>
            <tr><td><b>NIS2</b><br><small class="muted">loi du 5 mai 2026</small></td><td>Couvre les fournisseurs de services gérés. Autorités : ILR, et CSSF pour la finance. Alerte sous 24 h, notification sous 72 h. Jusqu'à 10 M€ ou 2 %.</td></tr>
            <tr><td><b>DORA</b></td><td>Pour les clients financiers, l'ESN est un prestataire TIC tiers : les obligations l'atteignent surtout par le contrat.</td></tr>
            <tr><td><b>Data Act</b></td><td>Applicable depuis le 12 septembre 2025 : règles de changement de fournisseur cloud et SaaS, frais de changement supprimés au 12 janvier 2027.</td></tr>
          </table>
        </div>
      </div>` },
    { title: 'Sanctions et autorités au Luxembourg', render: () => `
      <div class="fiche" style="grid-template-columns:1.15fr 1fr">
        <div class="card pad flat">
          <h4 style="margin-bottom:6px">Les plafonds de l'article 99 ${tagChip('Loi')}</h4>
          <table><tr><th>Manquement</th><th>Plafond</th><th>PME</th></tr>
            <tr><td>Pratiques interdites (art. 5)</td><td class="big">35 M€<small>ou 7 %</small></td><td>Le plus bas</td></tr>
            <tr><td>Opérateurs, transparence (art. 50), chaîne de valeur</td><td class="big">15 M€<small>ou 3 %</small></td><td>Le plus bas</td></tr>
            <tr><td>Informations inexactes aux autorités</td><td class="big">7,5 M€<small>ou 1 %</small></td><td>Le plus bas</td></tr>
            <tr><td>Maîtrise de l'IA (art. 4)</td><td colspan="2"><b>Aucun plafond</b> dans le règlement ; règles nationales</td></tr>
          </table>
          <p class="muted" style="font-size:12px;margin-top:10px">Entreprise : le plus élevé des deux montants. PME : le plus bas. SMC : le plus bas, seulement pour les deux niveaux inférieurs. <b>C'est l'entreprise qui paie</b> ; le salarié répond sur le plan disciplinaire, contractuel ou pénal.</p>
        </div>
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:6px">Au Luxembourg ${tagChip('Projet')}</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span><div><b>Le règlement s'applique déjà</b><small>Directement, sans loi nationale.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>CNPD pressentie</b><small>Projet de loi 8476, non voté au 12 octobre 2026. Contact : ia@cnpd.lu.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>Gradation prévue</b><small>Avertissement, puis blâme, puis amende.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>Droits fondamentaux</b><small>ALIA, CNPD et ITM désignées (art. 77).</small></div></li>
            </ul>
          </div>
          <div class="note">${ic('alert')}<span>Aucune amende AI Act n'a été trouvée au Luxembourg à ce jour.</span></div>
        </div>
      </div>` },
  ],
};

/* ---------------------------------------------------------
   CONNAISSANCES — chaque notion est reliée à des questions
   --------------------------------------------------------- */
const KNOW = [
  [1, 'Définition du système d\'IA', 'L\'inférence, critère décisif.', ['q11']],
  [1, 'IA cachée et inventaire', 'Repérer l\'IA dans ses logiciels.', ['q11']],
  [1, 'Champ d\'application', 'Qui est concerné, et les exclusions.', ['q12', 's13']],
  [1, 'Maîtrise de l\'IA (art. 4)', 'Une obligation de moyens, tracée.', ['q13', 's11', 's12']],
  [1, 'L\'Omnibus et le calendrier', 'Ce qui est reporté, ce qui ne l\'est pas.', ['q14']],
  [2, 'Fournisseur ou déployeur', 'Deux rôles, système par système.', ['q21', 's22']],
  [2, 'Devenir fournisseur (art. 25)', 'Le piège du changement de finalité.', ['q22', 's21']],
  [2, 'Modèles d\'IA à usage général', 'API, fine-tuning et seuils.', ['q23']],
  [2, 'Transparence (art. 50)', 'Chatbots, marquage, textes publiés.', ['q24', 's23']],
  [3, 'Pratiques interdites', 'Les huit lignes rouges, plus deux.', ['q31', 's32']],
  [3, 'Émotions au travail', 'Interdit pour les salariés, pas pour les clients.', ['q31', 'q32']],
  [3, 'Deepfakes', 'Signaler, et ce qui sera interdit.', ['s31', 's32']],
  [3, 'Haut risque RH', 'Annexe III, profilage, art. 6(3).', ['q33', 's33']],
  [3, 'Droit du travail luxembourgeois', 'Délégation, codécision, surveillance.', ['q34', 's33']],
  [4, 'RGPD et IA', 'Données dans les prompts, art. 22.', ['q41', 's41']],
  [4, 'Droit à l\'explication', 'Expliquer, pas envoyer le code.', ['q42']],
  [4, 'Incidents', 'RGPD, NIS2, DORA.', ['q43']],
  [4, 'Sanctions (art. 99)', 'Plafonds, PME, qui paie.', ['q44', 's43']],
  [4, 'Autorités au Luxembourg', 'CNPD pressentie, projet 8476.', ['q45']],
  [4, 'Dialogue social', 'Ouvrir le dialogue avant de lancer.', ['s42']],
];

/* ---------------------------------------------------------
   RESSOURCES — sources citées dans le dossier
   --------------------------------------------------------- */
const OFFICIAL = [
  ['Texte de l\'AI Act (FR)', 'Règlement (UE) 2024/1689 · EUR-Lex', 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/fra', 'Loi', 0],
  ['Omnibus sur l\'IA (FR)', 'Règlement (UE) 2026/1744 · EUR-Lex', 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/fra', 'Loi', 0],
  ['Q&R sur la maîtrise de l\'IA', 'Commission · mise à jour le 27 juillet 2026', 'https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers', 'Guide', 1],
  ['FAQ sur l\'article 50', 'Commission · transparence', 'https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act', 'Guide', 2],
  ['AI Act Service Desk', 'Explorateur, Compliance Checker, questions', 'https://ai-act-service-desk.ec.europa.eu/en', 'Guide', 0],
  ['AI Act Explorer', 'Article par article, avec les modifications de l\'Omnibus', 'https://artificialintelligenceact.eu/', 'Guide', 0],
  ['CNPD · Maîtrise de l\'IA', 'L\'article 4 vu par l\'autorité luxembourgeoise', 'https://cnpd.public.lu/fr/dossiers-thematiques/intelligence-artificielle/regulation-ia/ria-maitrise-ia.html', 'Guide', 1],
  ['CNPD · Régulation de l\'IA', 'Pratiques interdites et maîtrise de l\'IA', 'https://cnpd.public.lu/fr/dossiers-thematiques/intelligence-artificielle/regulation-ia.html', 'Guide', 3],
  ['Code de bonnes pratiques : contenus générés', 'Commission · marquage et étiquetage', 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content', 'Guide', 2],
  ['Projet de lignes directrices haut risque', 'Commission · 19 mai 2026', 'https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems', 'Projet', 3],
  ['Guichet.lu · Informer les salariés', 'Surveillance et protection des données', 'https://guichet.public.lu/fr/entreprises/ressources-humaines/conditions-travail/protection-donnees/informer-salaries.html', 'Guide', 3],
  ['Dossier du projet de loi 8476', 'Chambre des députés', 'https://www.chd.lu/fr/dossier/8476', 'Projet', 4],
];
const FURTHER = [
  ['Cursus de l\'EDPB pour les DPO', 'https://www.edpb.europa.eu/documents/support-pool-of-experts/law-compliance-in-ai-security-data-protection_en'],
  ['Cours HELP du Conseil de l\'Europe', 'https://www.coe.int/en/web/artificial-intelligence/-/updated-help-online-course-on-artificial-intelligence-and-human-rights-is-now-available-and-opened-for-enrolment-to-interested-participants'],
  ['Cadre AILit (OCDE et Commission)', 'https://ailiteracyframework.org/'],
  ['Elements of AI', 'https://elementsofai.com/'],
  ['Objectif IA (France Travail)', 'https://www.francetravail.fr/actualites/a-laffiche/objectif-ia--se-former-a-ia.html'],
];
const GLOSSARY = [
  ['AI system', 'système d\'IA'], ['provider', 'fournisseur'], ['deployer', 'déployeur'], ['AI literacy', 'maîtrise de l\'IA'],
  ['general-purpose AI model', 'modèle d\'IA à usage général'], ['deep fake', 'hypertrucage'], ['AI Board', 'Comité IA'],
  ['intended purpose', 'destination'], ['substantial modification', 'modification substantielle'],
];

/* ---------------------------------------------------------
   VIDÉOS DE PRÉSENTATION (1 min 30 à 2 min, début de chaque module)
   Déposer les fichiers dans videos/ : niveau{N}-module{M}.mp4
   (+ sous-titres optionnels niveau{N}-module{M}.vtt)
   --------------------------------------------------------- */
const MODULE_GOALS = {
  '1-1': ['Repérer un système d\'IA grâce au critère d\'inférence', 'Savoir qui est concerné par l\'AI Act, même avec un fournisseur hors UE', 'Connaître les exclusions : usage personnel, recherche, open source sous conditions'],
  '1-2': ['Comprendre l\'obligation de maîtrise de l\'IA (art. 4)', 'Savoir ce que l\'Omnibus de 2026 a changé, et ce qu\'il n\'a pas touché', 'Retenir les dates clés du calendrier'],
  '2-1': ['Distinguer fournisseur et déployeur', 'Éviter de devenir fournisseur sans le vouloir (art. 25)', 'Qualifier son rôle avant de livrer un système'],
  '2-2': ['Savoir quand on devient fournisseur d\'un modèle d\'IA à usage général', 'Appliquer les quatre obligations de transparence de l\'article 50', 'Reconnaître les usages internes non concernés'],
  '3-1': ['Connaître les huit pratiques interdites depuis février 2025', 'Distinguer les émotions des salariés (interdit) et des clients (haut risque)', 'Anticiper les deux interdictions du 2 décembre 2026'],
  '3-2': ['Reconnaître un usage RH à haut risque (annexe III)', 'Comprendre la porte de sortie de l\'art. 6(3) et le verrou du profilage', 'Respecter le droit du travail luxembourgeois avant tout déploiement'],
  '4-1': ['Protéger les données : le RGPD d\'abord', 'Poser les trois questions avant tout usage d\'IA', 'Donner une vraie explication à une personne concernée'],
  '4-2': ['Réagir à un incident : RGPD, DORA, NIS2', 'Connaître les plafonds d\'amende et savoir qui paie', 'Savoir qui contrôlera au Luxembourg'],
};

/* ---------------------------------------------------------
   PROFILS MÉTIER (tableau « Ce que chaque profil doit retenir »)
   --------------------------------------------------------- */
const PROFILES = [
  ['tous', 'Tous les salariés, intérimaires, stagiaires, freelances en régie', 'Art. 4 (formation adaptée et tracée) ; art. 5 ; RGPD et secret client dans chaque prompt', '2 déc. 2026 : interdiction des deepfakes intimes non consentis', '« L\'IA au travail est déjà encadrée : outils validés, données protégées, doutes signalés. »'],
  ['dev', 'Développeurs, data, intégrateurs', 'Art. 50(1) et (2) pour les chatbots et systèmes génératifs livrés ; art. 5 pour ce qu\'on construit', '2 déc. 2026 : marquage des systèmes génératifs existants et garde-fous anti-nudification ; 2 déc. 2027 : obligations de fournisseur haut risque et art. 25', '« Dès qu\'on livre sous notre nom, on est fournisseur. »'],
  ['rh', 'RH et managers', 'Art. 5(1)(f) : pas de reconnaissance des émotions des salariés ni des candidats ; RGPD (art. 22, AIPD) ; Code du travail (L.261-1, L.414-9)', '2 déc. 2027 : obligations de déployeur (art. 26), information préalable des représentants (26(7)) et des candidats (26(11))', '« Trier, noter ou surveiller des personnes avec l\'IA, c\'est du haut risque. »'],
  ['com', 'Commerciaux, avant-vente, chefs de projet', 'Qualification des cas d\'usage clients (art. 5, art. 50, annexe III) ; clauses DORA avec les clients financiers', '2 déc. 2027 : accord écrit de l\'art. 25(4) avec les clients fournisseurs de systèmes à haut risque', '« On qualifie le risque avant de chiffrer. »'],
  ['dir', 'Direction, juridique, DPO', 'Registre des mesures art. 4 ; politique d\'usage de l\'IA ; inventaire des systèmes', 'Loi 8476, lignes directrices haut risque finales, normes harmonisées', '« Il faut pouvoir prouver ce que l\'on a fait. »'],
];

/* ---------------------------------------------------------
   RAPPELS ESPACÉS : 4 idées reçues par niveau
   (J+7 : les deux premières · J+30 : les deux suivantes)
   --------------------------------------------------------- */
const SPACED = {
  1: [
    ['« L\'AI Act interdit ChatGPT et l\'IA générative. »', 'Faux', 'Seules les pratiques listées à l\'art. 5 sont interdites ; le risque dépend de l\'usage.'],
    ['« Mon usage de ChatGPT chez moi relève de l\'AI Act. »', 'Faux', 'L\'usage purement personnel et non professionnel est exclu ; au travail, il est couvert.'],
    ['« Un registre interne des formations suffit comme preuve de maîtrise de l\'IA. »', 'Vrai', 'Aucun certificat n\'est exigé ; un registre interne des formations suffit.'],
    ['« Avec l\'Omnibus, seules les règles du haut risque sont reportées. »', 'Vrai', 'Seul le haut risque est reporté (2 déc. 2027 et 2 août 2028) ; interdictions, art. 4 et art. 50 s\'appliquent déjà.'],
  ],
  2: [
    ['« L\'AI Act ne concerne que les développeurs et la DSI. »', 'Faux', 'Toute organisation qui utilise l\'IA sous son autorité est déployeur, avec les art. 4, 26 et 50.'],
    ['« En principe, un chatbot doit dire qu\'il est une IA depuis le 2 août 2026. »', 'Vrai', 'Obligatoire depuis le 2 août 2026, sauf si c\'est évident pour une personne raisonnablement attentive.'],
    ['« Affiner un modèle open source fait de nous un fournisseur de modèle GPAI. »', 'Faux', 'Généralement faux : seulement si le calcul de modification dépasse un tiers du calcul d\'entraînement initial.'],
    ['« Un texte généré par IA et publié n\'a jamais besoin d\'étiquette. »', 'Ça dépend', 'Un texte d\'intérêt public doit être signalé, sauf relecture éditoriale réelle avec un responsable éditorial.'],
  ],
  3: [
    ['« Toute IA est à haut risque. »', 'Faux', 'Le haut risque se limite aux usages listés aux annexes I et III.'],
    ['« Analyser les émotions des clients au téléphone n\'est pas interdit, mais encadré. »', 'Vrai', 'Pas interdit, mais à haut risque, avec obligation d\'informer les personnes.'],
    ['« Analyser le ton des e-mails tombe sous l\'interdiction des émotions. »', 'Faux', 'L\'interdiction vise l\'inférence à partir de données biométriques ; un texte écrit n\'en est pas, mais le RGPD s\'applique.'],
    ['« Un deepfake intime d\'un collègue, c\'est une mauvaise blague, pas un sujet AI Act. »', 'Faux', 'Interdit pour un usage professionnel dès le 2 décembre 2026, en plus du droit pénal et disciplinaire.'],
  ],
  4: [
    ['« L\'AI Act remplace le RGPD pour l\'IA. »', 'Faux', 'Le RGPD continue de s\'appliquer pleinement, en parallèle.'],
    ['« Les PME ne sont pas exemptées, mais leurs plafonds d\'amende sont plus bas. »', 'Vrai', 'Pas d\'exemption, mais des plafonds d\'amende plus bas et des simplifications, étendues aux SMC.'],
    ['« En cas de manquement, c\'est l\'entreprise, et non le salarié, qui paie l\'amende AI Act. »', 'Vrai', 'L\'amende vise l\'entreprise ; le salarié répond sur le plan disciplinaire, contractuel ou pénal.'],
    ['« Ne pas former nous expose directement à 15 M€ d\'amende. »', 'Faux', 'L\'art. 4 n\'est pas dans le barème de l\'art. 99, mais le droit national peut sanctionner et le défaut de formation aggrave une autre infraction.'],
  ],
};
