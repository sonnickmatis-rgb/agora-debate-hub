/* Illustrations vectorielles aux couleurs BA — sobres, fond blanc/lavande */
const C = {
  p: '#44318D', d: '#20035A', a: '#D93F87', s: '#7725BB', sd: '#391358',
  l1: '#ECE8F6', l2: '#DAD6EB', l3: '#F6F4FB', pk: '#FBE3EF', w: '#FFFFFF',
  skin: '#F2CDB3', skin2: '#C98F6B', hair: '#2A1B4A', hair2: '#6B3B2A', ok: '#17875F', ko: '#C8364F'
};

function person(x, y, s, shirt, hair, skin = C.skin, long = false) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-36 96 Q-36 44 0 44 Q36 44 36 96 Z" fill="${shirt}"/>
    <path d="M-10 44 L0 58 L10 44 Z" fill="${C.w}" opacity=".9"/>
    ${long ? `<path d="M-24 10 Q-26 40 -14 46 L14 46 Q26 40 24 10 Z" fill="${hair}"/>` : ''}
    <rect x="-7" y="30" width="14" height="16" rx="5" fill="${skin}"/>
    <circle cx="0" cy="14" r="21" fill="${skin}"/>
    <path d="M-22 12 Q-24 -12 0 -12 Q24 -12 22 8 Q10 -2 -6 1 Q-16 3 -22 12Z" fill="${hair}"/>
  </g>`;
}

function bg(extra = '') {
  return `<rect width="480" height="300" rx="22" fill="${C.l3}"/>
  <circle cx="420" cy="48" r="70" fill="${C.l1}"/>
  <circle cx="54" cy="262" r="46" fill="${C.l1}"/>
  <g fill="${C.l2}">${[0,1,2,3].map(i=>[0,1,2].map(j=>`<circle cx="${30+i*14}" cy="${30+j*14}" r="2.2"/>`).join('')).join('')}</g>${extra}`;
}

function sparkle(x, y, s = 1, col = C.a) {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -12 Q2 -2 12 0 Q2 2 0 12 Q-2 2 -12 0 Q-2 -2 0 -12Z" fill="${col}"/>`;
}

function euStars(cx, cy, r, size = 3.2, col = '#F2C14E') {
  let out = '';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    out += `<circle cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="${size}" fill="${col}"/>`;
  }
  return out;
}

function svg(inner, label) {
  return `<svg viewBox="0 0 480 300" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

const ILLUS = {
  /* Léa trie des CV avec un outil IA */
  cv: () => svg(bg(`
    <rect x="40" y="236" width="400" height="10" rx="5" fill="${C.l2}"/>
    <rect x="178" y="74" width="214" height="146" rx="10" fill="${C.d}"/>
    <rect x="186" y="82" width="198" height="130" rx="6" fill="${C.w}"/>
    <path d="M160 222 H410 L398 236 H172 Z" fill="${C.p}"/>
    <rect x="196" y="92" width="96" height="16" rx="8" fill="${C.l1}"/>
    <text x="206" y="104" font-family="Poppins" font-size="9" font-weight="600" fill="${C.p}">Tri intelligent</text>
    ${sparkle(300,100,.5,C.s)}
    ${[0,1,2,3].map(i => `
      <rect x="196" y="${118+i*22}" width="178" height="17" rx="5" fill="${C.l3}"/>
      <circle cx="206" cy="${126.5+i*22}" r="5" fill="${C.l2}"/>
      <rect x="216" y="${123+i*22}" width="${70 - i*8}" height="4" rx="2" fill="${C.l2}"/>
      <rect x="216" y="${130+i*22}" width="44" height="3" rx="1.5" fill="${C.l2}"/>
      <rect x="330" y="${121+i*22}" width="36" height="11" rx="5.5" fill="${i===2||i===3 ? C.pk : '#E2F3EC'}"/>
      <text x="348" y="${129.5+i*22}" text-anchor="middle" font-family="Poppins" font-size="7" font-weight="600" fill="${i===2||i===3 ? C.ko : C.ok}">${i===2||i===3 ? 'écarté' : 'retenu'}</text>`).join('')}
    ${person(104, 128, 1.05, C.p, C.hair, C.skin, true)}
    <rect x="58" y="226" width="96" height="12" rx="6" fill="${C.sd}" opacity=".15"/>
    <g transform="translate(372 30) rotate(10)">
      <rect width="58" height="74" rx="6" fill="${C.w}" stroke="${C.l2}"/>
      <circle cx="16" cy="18" r="7" fill="${C.l1}"/><rect x="28" y="13" width="22" height="4" rx="2" fill="${C.l2}"/><rect x="28" y="20" width="16" height="3" rx="1.5" fill="${C.l2}"/>
      <rect x="9" y="34" width="40" height="3" rx="1.5" fill="${C.l2}"/><rect x="9" y="42" width="34" height="3" rx="1.5" fill="${C.l2}"/><rect x="9" y="50" width="38" height="3" rx="1.5" fill="${C.l2}"/>
    </g>
    <g transform="translate(330 46) rotate(-8)">
      <rect width="58" height="74" rx="6" fill="${C.w}" stroke="${C.l2}"/>
      <circle cx="16" cy="18" r="7" fill="${C.pk}"/><rect x="28" y="13" width="22" height="4" rx="2" fill="${C.l2}"/><rect x="28" y="20" width="16" height="3" rx="1.5" fill="${C.l2}"/>
      <rect x="9" y="34" width="40" height="3" rx="1.5" fill="${C.l2}"/><rect x="9" y="42" width="30" height="3" rx="1.5" fill="${C.l2}"/>
    </g>
    ${sparkle(318,40,.8)}${sparkle(440,120,.55,C.s)}
  `), 'Une responsable RH devant un logiciel qui trie des CV'),

  /* Le problème : un candidat écarté sans relecture humaine */
  alert: () => svg(bg(`
    <g transform="translate(70 52)">
      <rect width="170" height="210" rx="12" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <circle cx="34" cy="38" r="16" fill="${C.l1}"/>
      <rect x="60" y="28" width="86" height="7" rx="3.5" fill="${C.p}" opacity=".8"/>
      <rect x="60" y="42" width="56" height="5" rx="2.5" fill="${C.l2}"/>
      <text x="18" y="80" font-family="Poppins" font-size="9" font-weight="600" fill="${C.p}">Parcours</text>
      <rect x="18" y="90" width="134" height="16" rx="4" fill="${C.l3}"/><text x="24" y="101" font-family="Poppins" font-size="8" fill="${C.muted||'#6b6580'}">2012 – 2017 · Commercial</text>
      <rect x="18" y="112" width="134" height="18" rx="4" fill="${C.pk}" stroke="${C.a}" stroke-dasharray="3 3"/><text x="24" y="124" font-family="Poppins" font-size="8" font-weight="600" fill="${C.ko}">2018 – 2020 · Pause carrière</text>
      <rect x="18" y="136" width="134" height="16" rx="4" fill="${C.l3}"/><text x="24" y="147" font-family="Poppins" font-size="8" fill="#6b6580">2021 – 2026 · Chef de secteur</text>
      <rect x="18" y="168" width="134" height="22" rx="11" fill="${C.ko}"/>
      <text x="85" y="182.5" text-anchor="middle" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">ÉCARTÉ AUTOMATIQUEMENT</text>
    </g>
    <g transform="translate(286 66)">
      <circle cx="58" cy="58" r="50" fill="${C.w}" stroke="${C.p}" stroke-width="10"/>
      <rect x="92" y="96" width="22" height="64" rx="11" transform="rotate(-45 103 128)" fill="${C.d}"/>
      <path d="M58 30 L84 76 H32 Z" fill="${C.a}"/>
      <rect x="55" y="44" width="6" height="18" rx="3" fill="#fff"/><circle cx="58" cy="68" r="3.5" fill="#fff"/>
    </g>
    <g transform="translate(330 220)"><rect width="120" height="34" rx="17" fill="${C.d}"/><text x="60" y="21.5" text-anchor="middle" font-family="Poppins" font-size="10" font-weight="600" fill="#fff">Aucun humain n'a relu</text></g>
  `), 'Un CV écarté automatiquement à cause d\'une pause de carrière'),

  /* Document de loi européenne */
  law: () => svg(bg(`
    <g transform="translate(150 34)">
      <rect x="14" y="10" width="190" height="236" rx="12" fill="${C.l2}"/>
      <rect width="190" height="236" rx="12" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <circle cx="95" cy="56" r="34" fill="${C.p}"/>
      ${euStars(95, 56, 22, 3.2)}
      <rect x="40" y="106" width="110" height="8" rx="4" fill="${C.d}"/>
      <rect x="56" y="120" width="78" height="6" rx="3" fill="${C.l2}"/>
      ${[0,1,2,3,4].map(i=>`<rect x="24" y="${142+i*14}" width="${142 - (i%2)*28}" height="5" rx="2.5" fill="${C.l1}"/>`).join('')}
      <rect x="24" y="214" width="62" height="16" rx="8" fill="${C.pk}"/><text x="55" y="225" text-anchor="middle" font-family="Poppins" font-size="8" font-weight="700" fill="${C.a}">2024/1689</text>
    </g>
    <g transform="translate(330 168) rotate(-30)">
      <rect x="-8" y="-20" width="70" height="40" rx="8" fill="${C.d}"/>
      <rect x="22" y="18" width="10" height="70" rx="5" fill="${C.p}"/>
    </g>
    <rect x="300" y="240" width="90" height="14" rx="7" fill="${C.sd}"/>
    ${sparkle(110,70,.8)}${sparkle(390,96,.6,C.s)}
  `), 'Le texte du règlement européen sur l\'IA'),

  /* Fournisseur vs déployeur */
  roles: () => svg(bg(`
    <g transform="translate(46 70)">
      <rect width="150" height="170" rx="14" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <rect x="44" y="20" width="62" height="62" rx="14" fill="${C.l1}"/>
      <path d="M60 51 L68 43 M60 51 L68 59 M90 51 L82 43 M90 51 L82 59" stroke="${C.p}" stroke-width="4" stroke-linecap="round"/>
      <text x="75" y="108" text-anchor="middle" font-family="Titillium Web" font-size="16" font-weight="700" fill="${C.d}">Fournisseur</text>
      <text x="75" y="126" text-anchor="middle" font-family="Poppins" font-size="9" fill="#6b6580">conçoit et vend l'outil</text>
      <rect x="35" y="138" width="80" height="18" rx="9" fill="${C.p}"/><text x="75" y="150.5" text-anchor="middle" font-family="Poppins" font-size="8.5" font-weight="600" fill="#fff">L'éditeur RH</text>
    </g>
    <g transform="translate(284 70)">
      <rect width="150" height="170" rx="14" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <rect x="44" y="20" width="62" height="62" rx="14" fill="${C.pk}"/>
      <rect x="60" y="38" width="30" height="34" rx="3" fill="${C.a}"/>
      ${[0,1].map(i=>[0,1,2].map(j=>`<rect x="${65+i*12}" y="${43+j*9}" width="7" height="5" rx="1" fill="#fff"/>`).join('')).join('')}
      <text x="75" y="108" text-anchor="middle" font-family="Titillium Web" font-size="16" font-weight="700" fill="${C.d}">Déployeur</text>
      <text x="75" y="126" text-anchor="middle" font-family="Poppins" font-size="9" fill="#6b6580">l'utilise dans son activité</text>
      <rect x="25" y="138" width="100" height="18" rx="9" fill="${C.a}"/><text x="75" y="150.5" text-anchor="middle" font-family="Poppins" font-size="8.5" font-weight="600" fill="#fff">L'entreprise de Léa</text>
    </g>
    <path d="M206 155 H274" stroke="${C.p}" stroke-width="3" stroke-dasharray="6 6"/>
    <path d="M268 147 L278 155 L268 163" fill="none" stroke="${C.p}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="240" cy="155" r="18" fill="${C.d}"/><text x="240" y="160" text-anchor="middle" font-family="Titillium Web" font-size="14" font-weight="700" fill="#fff">IA</text>
  `), 'Le fournisseur conçoit l\'outil, le déployeur l\'utilise'),

  /* Chatbot sur un site */
  chat: () => svg(bg(`
    <g transform="translate(60 40)">
      <rect width="300" height="216" rx="12" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <rect width="300" height="28" rx="12" fill="${C.l1}"/><rect y="16" width="300" height="12" fill="${C.l1}"/>
      <circle cx="16" cy="14" r="4" fill="${C.a}"/><circle cx="30" cy="14" r="4" fill="${C.s}" opacity=".6"/><circle cx="44" cy="14" r="4" fill="${C.p}" opacity=".4"/>
      <rect x="20" y="44" width="120" height="10" rx="5" fill="${C.l2}"/>
      <rect x="20" y="62" width="160" height="6" rx="3" fill="${C.l1}"/><rect x="20" y="74" width="140" height="6" rx="3" fill="${C.l1}"/>
      <rect x="20" y="96" width="96" height="70" rx="8" fill="${C.l3}"/><rect x="124" y="96" width="96" height="70" rx="8" fill="${C.l3}"/>
    </g>
    <g transform="translate(250 82)">
      <rect width="176" height="190" rx="16" fill="${C.w}" stroke="${C.p}" stroke-width="2"/>
      <rect width="176" height="40" rx="16" fill="${C.p}"/><rect y="24" width="176" height="16" fill="${C.p}"/>
      <circle cx="24" cy="20" r="12" fill="#fff"/><rect x="17" y="15" width="14" height="10" rx="4" fill="${C.p}"/><circle cx="21" cy="20" r="1.8" fill="#fff"/><circle cx="27" cy="20" r="1.8" fill="#fff"/>
      <text x="44" y="18" font-family="Poppins" font-size="10" font-weight="700" fill="#fff">Max</text>
      <text x="44" y="30" font-family="Poppins" font-size="7.5" fill="#fff" opacity=".85">en ligne</text>
      <rect x="12" y="52" width="120" height="30" rx="10" fill="${C.l1}"/><rect x="20" y="60" width="96" height="5" rx="2.5" fill="${C.l2}"/><rect x="20" y="70" width="70" height="5" rx="2.5" fill="${C.l2}"/>
      <rect x="62" y="92" width="102" height="22" rx="10" fill="${C.a}"/><rect x="72" y="100" width="80" height="5" rx="2.5" fill="#fff" opacity=".8"/>
      <rect x="12" y="124" width="132" height="30" rx="10" fill="${C.l1}"/><rect x="20" y="132" width="110" height="5" rx="2.5" fill="${C.l2}"/><rect x="20" y="142" width="60" height="5" rx="2.5" fill="${C.l2}"/>
      <rect x="12" y="164" width="152" height="16" rx="8" fill="${C.l3}" stroke="${C.l2}"/>
    </g>
    <g transform="translate(398 56)"><circle r="22" fill="${C.d}"/><text y="6" text-anchor="middle" font-family="Titillium Web" font-size="18" font-weight="700" fill="#fff">?</text></g>
  `), 'Un chatbot nommé Max sur le site d\'une entreprise'),

  /* Vidéo avec avatar IA du dirigeant */
  avatar: () => svg(bg(`
    <g transform="translate(70 46)">
      <rect width="300" height="190" rx="14" fill="${C.d}"/>
      <rect x="10" y="10" width="280" height="150" rx="8" fill="${C.sd}"/>
      <circle cx="150" cy="80" r="64" fill="${C.p}" opacity=".5"/>
      ${person(150, 52, 1.05, C.s, C.hair, C.skin)}
      <rect x="10" y="166" width="280" height="4" rx="2" fill="#fff" opacity=".25"/><rect x="10" y="166" width="120" height="4" rx="2" fill="${C.a}"/>
      <path d="M22 176 L22 186 L30 181Z" fill="#fff"/>
      <g transform="translate(206 22)"><rect width="74" height="22" rx="11" fill="${C.a}"/>${sparkle(14,11,.45,'#fff')}<text x="44" y="15" text-anchor="middle" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Avatar IA</text></g>
    </g>
    <g transform="translate(390 120)">
      ${[14,30,20,40,24,34,16].map((h,i)=>`<rect x="${i*9}" y="${-h/2}" width="5" height="${h}" rx="2.5" fill="${C.p}" opacity="${0.4+i*0.08}"/>`).join('')}
    </g>
    <rect x="150" y="246" width="140" height="22" rx="11" fill="${C.w}" stroke="${C.l2}"/><text x="220" y="261" text-anchor="middle" font-family="Poppins" font-size="9" font-weight="600" fill="${C.p}">« Voix du DG » clonée</text>
  `), 'Une vidéo avec un avatar IA du dirigeant'),

  /* Analyse des émotions en visio : interdit */
  emotion: () => svg(bg(`
    <g transform="translate(56 44)">
      <rect width="290" height="200" rx="14" fill="${C.d}"/>
      ${[[0,0,C.p,C.hair,true],[1,0,C.s,C.hair2,false],[0,1,C.sd,C.hair2,true],[1,1,C.p,C.hair,false]].map(([i,j,sh,hr,lg])=>`
        <rect x="${10+i*140}" y="${10+j*90}" width="130" height="82" rx="8" fill="#2E1666"/>
        <g clip-path="url(#v${i}${j})">${person(75+i*140, 28+j*90, .62, sh, hr, i+j===1?C.skin2:C.skin, lg)}</g>
        <clipPath id="v${i}${j}"><rect x="${10+i*140}" y="${10+j*90}" width="130" height="82" rx="8"/></clipPath>
        <rect x="${16+i*140}" y="${16+j*90}" width="52" height="14" rx="7" fill="${(i+j)%2? C.a : '#fff'}" opacity=".95"/>
        <text x="${42+i*140}" y="${26+j*90}" text-anchor="middle" font-family="Poppins" font-size="7" font-weight="700" fill="${(i+j)%2? '#fff' : C.p}">${['Engagé 82%','Stressé 64%','Ennui 71%','Calme 90%'][i+j*2]}</text>
        <rect x="${44+i*140}" y="${36+j*90}" width="62" height="54" rx="4" fill="none" stroke="${C.a}" stroke-width="1.5" stroke-dasharray="4 3"/>`).join('')}
    </g>
    <g transform="translate(372 150)">
      <circle r="58" fill="#fff"/>
      <circle r="50" fill="none" stroke="${C.ko}" stroke-width="12"/>
      <path d="M-35 35 L35 -35" stroke="${C.ko}" stroke-width="12" stroke-linecap="round"/>
    </g>
  `), 'Un outil qui analyse les émotions des salariés en visioconférence, barré'),

  /* Pyramide des risques */
  pyramid: () => `<svg viewBox="0 0 340 270" role="img" aria-label="Pyramide des quatre niveaux de risque" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="270" rx="18" fill="${C.l3}"/>
    <g transform="translate(20 14)">
      <path d="M150 0 L196 62 H104 Z" fill="${C.ko}"/>
      <path d="M100 68 H200 L244 128 H56 Z" fill="${C.a}"/>
      <path d="M52 134 H248 L290 192 H10 Z" fill="${C.s}"/>
      <path d="M6 198 H294 L300 244 H0 Z" fill="${C.p}" opacity=".3"/>
      <text x="150" y="50" text-anchor="middle" font-family="Titillium Web" font-size="12" font-weight="700" fill="#fff">INTERDIT</text>
      <text x="150" y="104" text-anchor="middle" font-family="Titillium Web" font-size="16" font-weight="700" fill="#fff">HAUT RISQUE</text>
      <text x="150" y="169" text-anchor="middle" font-family="Titillium Web" font-size="17" font-weight="700" fill="#fff">RISQUE LIMITÉ</text>
      <text x="150" y="227" text-anchor="middle" font-family="Titillium Web" font-size="17" font-weight="700" fill="${C.d}">RISQUE MINIMAL</text>
    </g></svg>`,

  /* Calendrier */
  calendar: () => svg(bg(`
    <path d="M50 160 H430" stroke="${C.l2}" stroke-width="6" stroke-linecap="round"/>
    <path d="M50 160 H300" stroke="${C.p}" stroke-width="6" stroke-linecap="round"/>
    ${[['08/24',70,'Entrée en vigueur'],['02/25',150,'Interdits + maîtrise IA'],['08/25',230,'IA à usage général'],['08/26',310,'Haut risque Ann. III'],['08/27',390,'Haut risque Ann. I']].map(([d,x,t],i)=>`
      <circle cx="${x}" cy="160" r="${i===3?13:10}" fill="${i<3?C.p:(i===3?C.a:'#fff')}" stroke="${i<3?C.p:(i===3?C.a:C.l2)}" stroke-width="4"/>
      <text x="${x}" y="${i%2?120:206}" text-anchor="middle" font-family="Titillium Web" font-size="17" font-weight="700" fill="${C.d}">${d}</text>
      <text x="${x}" y="${i%2?136:222}" text-anchor="middle" font-family="Poppins" font-size="8" fill="#6b6580">${t}</text>`).join('')}
    <g transform="translate(380 40)"><rect width="64" height="58" rx="10" fill="#fff" stroke="${C.l2}"/><rect width="64" height="18" rx="9" fill="${C.a}"/><rect y="10" width="64" height="8" fill="${C.a}"/><text x="32" y="46" text-anchor="middle" font-family="Titillium Web" font-size="20" font-weight="700" fill="${C.d}">2026</text></g>
  `), 'Frise des dates d\'application de l\'AI Act'),

  /* Scénario marketing */
  marketing: () => svg(bg(`
    <g transform="translate(60 40)">
      <rect width="200" height="228" rx="16" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <circle cx="24" cy="22" r="10" fill="${C.p}"/><rect x="40" y="16" width="60" height="6" rx="3" fill="${C.d}"/><rect x="40" y="25" width="36" height="4" rx="2" fill="${C.l2}"/>
      <rect x="12" y="42" width="176" height="130" rx="8" fill="${C.l1}"/>
      <g clip-path="url(#mk)">${person(100, 80, 1.1, C.a, C.hair2, C.skin, true)}</g>
      <clipPath id="mk"><rect x="12" y="42" width="176" height="130" rx="8"/></clipPath>
      <path d="M90 104 Q100 112 110 104" stroke="${C.d}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="22" y="192" font-family="Poppins" font-size="9" font-weight="600" fill="${C.d}">« Ce produit a changé ma vie ! »</text>
      <text x="22" y="206" font-family="Poppins" font-size="8" fill="#6b6580">— Sophie, cliente depuis 2022</text>
      <text x="22" y="220" font-size="10" fill="${C.a}">★★★★★</text>
    </g>
    <g transform="translate(290 70)">
      <rect width="150" height="92" rx="12" fill="${C.d}"/>
      ${sparkle(26,26,.9,C.a)}
      <text x="44" y="31" font-family="Poppins" font-size="10" font-weight="700" fill="#fff">Générateur</text>
      <rect x="14" y="48" width="122" height="28" rx="6" fill="#fff" opacity=".12"/>
      <text x="22" y="66" font-family="Poppins" font-size="8" fill="#fff" opacity=".85">« cliente souriante, réaliste »</text>
    </g>
    <path d="M290 150 Q268 170 268 190" stroke="${C.p}" stroke-width="2.5" fill="none" stroke-dasharray="5 5"/>
    ${sparkle(420,200,.8,C.s)}${sparkle(392,236,.5)}
  `), 'Une publicité avec une cliente générée par IA'),

  /* Scénario service client */
  support: () => svg(bg(`
    ${person(140, 86, 1.25, C.p, C.hair, C.skin2)}
    <path d="M110 96 Q110 66 140 66 Q170 66 170 96" stroke="${C.d}" stroke-width="7" fill="none"/>
    <rect x="100" y="94" width="14" height="24" rx="7" fill="${C.a}"/><rect x="166" y="94" width="14" height="24" rx="7" fill="${C.a}"/>
    <path d="M114 114 Q122 130 136 130" stroke="${C.d}" stroke-width="3" fill="none"/>
    <g transform="translate(250 60)">
      <rect width="186" height="44" rx="14" fill="${C.w}" stroke="${C.l2}"/><text x="14" y="20" font-family="Poppins" font-size="9" font-weight="600" fill="${C.d}">Client</text><text x="14" y="34" font-family="Poppins" font-size="8.5" fill="#6b6580">Mon colis est arrivé cassé…</text>
      <g transform="translate(0 56)"><rect width="186" height="58" rx="14" fill="${C.p}"/><text x="14" y="20" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Assistant IA</text><text x="14" y="35" font-family="Poppins" font-size="8.5" fill="#fff" opacity=".9">Je vous rembourse 35 €.</text><text x="14" y="48" font-family="Poppins" font-size="8.5" fill="#fff" opacity=".9">Souhaitez-vous un conseiller ?</text></g>
      <g transform="translate(64 128)"><rect width="122" height="30" rx="15" fill="${C.pk}"/><text x="61" y="19" text-anchor="middle" font-family="Poppins" font-size="9" font-weight="700" fill="${C.a}">Remboursement ≤ 50 €</text></g>
    </g>
  `), 'Un conseiller et un assistant IA de service client'),

  /* Scénario direction : scoring de collaborateurs */
  scoring: () => svg(bg(`
    <g transform="translate(54 44)">
      <rect width="372" height="214" rx="14" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <text x="20" y="32" font-family="Titillium Web" font-size="15" font-weight="700" fill="${C.d}">Score de potentiel</text>
      <rect x="250" y="18" width="104" height="20" rx="10" fill="${C.l1}"/><text x="302" y="31.5" text-anchor="middle" font-family="Poppins" font-size="8.5" font-weight="600" fill="${C.p}">Promotions 2027</text>
      ${[['A. Martin',86,C.p],['K. Diallo',74,C.p],['L. Moreau',58,C.s],['S. Nguyen',41,C.a]].map(([n,v,c],i)=>`
        <circle cx="34" cy="${70+i*38}" r="13" fill="${C.l1}"/><circle cx="34" cy="${66+i*38}" r="5" fill="${C.p}" opacity=".6"/><path d="M25 ${80+i*38} Q34 ${70+i*38} 43 ${80+i*38}" fill="${C.p}" opacity=".6"/>
        <text x="56" y="${74+i*38}" font-family="Poppins" font-size="10" font-weight="600" fill="${C.d}">${n}</text>
        <rect x="140" y="${64+i*38}" width="170" height="12" rx="6" fill="${C.l3}"/>
        <rect x="140" y="${64+i*38}" width="${v*1.7}" height="12" rx="6" fill="${c}"/>
        <text x="350" y="${74+i*38}" text-anchor="end" font-family="Titillium Web" font-size="14" font-weight="700" fill="${c}">${v}</text>`).join('')}
    </g>
    <g transform="translate(400 40)"><circle r="24" fill="${C.a}"/><text y="7" text-anchor="middle" font-family="Titillium Web" font-size="22" font-weight="700" fill="#fff">!</text></g>
  `), 'Un logiciel qui attribue un score aux collaborateurs'),

  /* Accueil : bouclier AI Act */
  hero: () => svg(`
    <rect width="480" height="300" rx="22" fill="${C.l3}"/>
    <circle cx="240" cy="150" r="128" fill="${C.l1}"/>
    <circle cx="240" cy="150" r="92" fill="none" stroke="${C.l2}" stroke-width="2" stroke-dasharray="4 8"/>
    ${euStars(240, 150, 112, 4, C.p)}
    <path d="M240 64 L310 92 V150 Q310 206 240 236 Q170 206 170 150 V92 Z" fill="${C.p}"/>
    <path d="M240 64 L310 92 V150 Q310 206 240 236 Z" fill="${C.d}" opacity=".35"/>
    <rect x="208" y="118" width="64" height="64" rx="12" fill="#fff"/>
    ${[0,1,2].map(i=>`<rect x="${218+i*16}" y="108" width="4" height="12" rx="2" fill="#fff"/><rect x="${218+i*16}" y="180" width="4" height="12" rx="2" fill="#fff"/><rect x="198" y="${128+i*16}" width="12" height="4" rx="2" fill="#fff"/><rect x="270" y="${128+i*16}" width="12" height="4" rx="2" fill="#fff"/>`).join('')}
    <text x="240" y="160" text-anchor="middle" font-family="Titillium Web" font-size="28" font-weight="700" fill="${C.p}">IA</text>
    ${sparkle(352,84,1.1)}${sparkle(128,212,.8,C.s)}${sparkle(370,226,.6,C.p)}
  `, 'Bouclier européen protégeant une puce IA'),
};

/* ===== Illustrations V2 — scénarios du dossier ===== */
function win(x, y, w, h, title, col = C.p) {
  return `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="12" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
    <rect width="${w}" height="26" rx="12" fill="${C.l1}"/><rect y="14" width="${w}" height="12" fill="${C.l1}"/>
    <circle cx="14" cy="13" r="3.5" fill="${C.a}"/><circle cx="26" cy="13" r="3.5" fill="${C.s}" opacity=".6"/><circle cx="38" cy="13" r="3.5" fill="${col}" opacity=".4"/>
    ${title ? `<text x="52" y="17" font-family="Poppins" font-size="8.5" font-weight="600" fill="${C.p}">${title}</text>` : ''}</g>`;
}
function tag(x, y, w, txt, bgc = C.a, fg = '#fff') {
  return `<g transform="translate(${x} ${y})"><rect width="${w}" height="22" rx="11" fill="${bgc}"/><text x="${w/2}" y="14.5" text-anchor="middle" font-family="Poppins" font-size="9" font-weight="700" fill="${fg}">${txt}</text></g>`;
}
function lines(x, y, n, w, gap = 10, col = C.l2) {
  return Array.from({length:n}, (_, i) => `<rect x="${x}" y="${y+i*gap}" width="${w - (i%3)*18}" height="4.5" rx="2.25" fill="${col}"/>`).join('');
}
function bubble(x, y, w, h, fill = '#fff', stroke = C.l2) {
  return `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}"/><path d="M18 ${h} l6 10 l8 -10z" fill="${fill}" stroke="${stroke}"/><rect x="19" y="${h-2}" width="12" height="4" fill="${fill}"/></g>`;
}

Object.assign(ILLUS, {
  /* Prologue : Léa arrive chez Nexalis à Belval */
  office: () => svg(bg(`
    <g transform="translate(250 40)">
      <rect x="0" y="40" width="80" height="190" rx="4" fill="${C.p}"/>
      <rect x="86" y="0" width="100" height="230" rx="4" fill="${C.d}"/>
      ${[0,1,2,3,4,5,6,7].map(j=>[0,1,2].map(i=>`<rect x="${10+i*22}" y="${56+j*20}" width="14" height="10" rx="2" fill="#fff" opacity="${(i+j)%3?'.25':'.6'}"/>`).join('')).join('')}
      ${[0,1,2,3,4,5,6,7,8,9].map(j=>[0,1,2,3].map(i=>`<rect x="${98+i*22}" y="${14+j*20}" width="14" height="10" rx="2" fill="#fff" opacity="${(i*j)%4?'.2':'.55'}"/>`).join('')).join('')}
      <rect x="94" y="-14" width="84" height="18" rx="9" fill="${C.a}"/><text x="136" y="-1.5" text-anchor="middle" font-family="Titillium Web" font-size="11" font-weight="700" fill="#fff">NEXALIS</text>
    </g>
    <rect x="30" y="268" width="420" height="6" rx="3" fill="${C.l2}"/>
    ${person(140, 120, 1.2, C.p, C.hair, C.skin, true)}
    <rect x="160" y="196" width="40" height="30" rx="5" fill="${C.sd}"/><rect x="172" y="190" width="16" height="8" rx="3" fill="none" stroke="${C.sd}" stroke-width="3"/>
    ${tag(60, 54, 104, 'Bienvenue Léa !', C.w, C.p)}
    <g transform="translate(46 248)"><circle r="13" fill="${C.a}"/><path d="M0 -7 a6 6 0 0 1 6 6 c0 5 -6 10 -6 10 s-6 -5 -6 -10 a6 6 0 0 1 6 -6z" fill="#fff"/><circle cy="-1" r="2.2" fill="${C.a}"/></g>
    <text x="66" y="252" font-family="Poppins" font-size="10" font-weight="600" fill="${C.d}">Belval, Luxembourg</text>
    ${sparkle(212,70,.7)}
  `), 'Léa arrive dans les bureaux de Nexalis à Belval'),

  /* IA cachée dans un logiciel SaaS */
  saas: () => svg(bg(`
    ${win(48, 44, 300, 210, 'Gestion de projet · v8.2')}
    <g transform="translate(48 44)">
      <rect x="14" y="40" width="70" height="158" rx="8" fill="${C.l3}"/>${lines(24, 54, 8, 50, 16)}
      <rect x="96" y="40" width="190" height="40" rx="8" fill="${C.l3}"/>${lines(106, 52, 2, 150, 12)}
      <rect x="96" y="88" width="190" height="40" rx="8" fill="${C.l3}"/>${lines(106, 100, 2, 130, 12)}
      <rect x="96" y="136" width="190" height="62" rx="8" fill="${C.pk}" stroke="${C.a}" stroke-dasharray="4 3"/>
      ${sparkle(114,152,.55)}<text x="126" y="156" font-family="Poppins" font-size="9" font-weight="700" fill="${C.a}">Résumé automatique</text>
      ${lines(106, 168, 3, 160, 8, '#F4BCD5')}
    </g>
    <g transform="translate(350 70)"><rect width="104" height="58" rx="12" fill="${C.d}"/><text x="52" y="24" text-anchor="middle" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Nouveau !</text><text x="52" y="40" text-anchor="middle" font-family="Poppins" font-size="8" fill="#fff" opacity=".8">activé sans annonce</text></g>
    <path d="M350 112 Q330 140 336 176" stroke="${C.a}" stroke-width="2.5" fill="none" stroke-dasharray="5 5"/>
    <g transform="translate(400 200)"><circle r="30" fill="#fff" stroke="${C.p}" stroke-width="7"/><rect x="18" y="18" width="12" height="34" rx="6" transform="rotate(-45 24 35)" fill="${C.d}"/><text y="7" text-anchor="middle" font-family="Titillium Web" font-size="20" font-weight="700" fill="${C.p}">IA</text></g>
  `), 'Une fonction d\'IA apparue sans annonce dans un logiciel'),

  /* Freelance avec Copilot */
  freelance: () => svg(bg(`
    <rect x="40" y="236" width="400" height="10" rx="5" fill="${C.l2}"/>
    <g transform="translate(190 66)"><rect width="230" height="154" rx="10" fill="${C.d}"/>
      <rect x="8" y="8" width="214" height="138" rx="6" fill="#1A0C40"/>
      ${[[0,60,C.s],[1,110,'#8f86c9'],[2,80,C.a],[3,130,'#8f86c9'],[4,50,C.s],[5,100,'#8f86c9']].map(([i,w,c])=>`<rect x="${22+(i%2)*14}" y="${22+i*16}" width="${w}" height="6" rx="3" fill="${c}" opacity=".85"/>`).join('')}
      <rect x="36" y="118" width="150" height="18" rx="5" fill="${C.p}" opacity=".7"/>${sparkle(48,127,.45,'#fff')}<text x="58" y="130" font-family="Poppins" font-size="8" fill="#fff">Suggestion Copilot…</text>
    </g>
    <path d="M176 222 H436 L424 236 H188 Z" fill="${C.p}"/>
    ${person(110, 118, 1.1, C.s, C.hair2, C.skin2)}
    ${tag(56, 60, 116, 'Freelance en régie', C.w, C.p)}
    <g transform="translate(64 96)"><rect width="100" height="34" rx="10" fill="${C.pk}"/><text x="50" y="21" text-anchor="middle" font-family="Poppins" font-size="8.5" font-weight="600" fill="${C.a}">« Pas salarié… »</text></g>
  `), 'Un développeur freelance qui code avec un assistant IA'),

  /* Fine-tuning LoRA */
  finetune: () => svg(bg(`
    <g transform="translate(60 70)">
      <rect width="130" height="150" rx="16" fill="${C.d}"/>
      ${[0,1,2,3].map(i=>`<rect x="18" y="${20+i*30}" width="94" height="20" rx="6" fill="${C.p}" opacity="${0.5+i*0.12}"/>`).join('')}
      <text x="65" y="172" text-anchor="middle" font-family="Titillium Web" font-size="14" font-weight="700" fill="${C.d}">Modèle open source</text>
    </g>
    <g transform="translate(212 120)"><rect width="56" height="50" rx="12" fill="${C.a}"/><text x="28" y="31" text-anchor="middle" font-family="Titillium Web" font-size="15" font-weight="700" fill="#fff">LoRA</text></g>
    <path d="M190 145 H210 M268 145 H290" stroke="${C.p}" stroke-width="3" stroke-dasharray="5 5"/>
    <g transform="translate(292 70)">
      <rect width="130" height="150" rx="16" fill="${C.w}" stroke="${C.p}" stroke-width="2"/>
      <rect x="16" y="18" width="98" height="28" rx="9" fill="${C.l1}"/>${lines(26, 28, 1, 70)}
      <rect x="34" y="54" width="80" height="24" rx="9" fill="${C.p}"/><rect x="44" y="64" width="56" height="4" rx="2" fill="#fff" opacity=".8"/>
      <rect x="16" y="86" width="98" height="28" rx="9" fill="${C.l1}"/>${lines(26, 96, 1, 60)}
      <text x="65" y="172" text-anchor="middle" font-family="Titillium Web" font-size="14" font-weight="700" fill="${C.d}">Assistant livré</text>
    </g>
    <g transform="translate(212 48)"><rect width="56" height="56" rx="8" fill="#fff" stroke="${C.l2}"/>${lines(10, 12, 4, 36, 9)}</g>
    <text x="240" y="40" text-anchor="middle" font-family="Poppins" font-size="8" fill="#6b6580">doc. client</text>
    ${tag(176, 238, 128, 'calcul < 1/3 du modèle', C.l1, C.p)}
  `), 'Un modèle open source affiné avec LoRA pour créer un assistant'),

  /* Chatbot « Julie » */
  julie: () => svg(bg(`
    ${win(70, 36, 340, 228, 'boutique-en-ligne.lu')}
    <g transform="translate(220 76)">
      <rect width="176" height="176" rx="14" fill="${C.w}" stroke="${C.p}" stroke-width="2"/>
      <rect width="176" height="44" rx="14" fill="${C.p}"/><rect y="28" width="176" height="16" fill="${C.p}"/>
      <circle cx="24" cy="22" r="14" fill="${C.skin}"/><path d="M10 22 Q10 6 24 6 Q38 6 38 20 Q30 12 18 16 Z" fill="${C.hair2}"/>
      <text x="46" y="20" font-family="Poppins" font-size="10" font-weight="700" fill="#fff">Julie</text>
      <text x="46" y="32" font-family="Poppins" font-size="7.5" fill="#fff" opacity=".85">Conseillère</text>
      <rect x="12" y="56" width="128" height="34" rx="10" fill="${C.l1}"/><text x="20" y="71" font-family="Poppins" font-size="8" fill="${C.d}">Bonjour, je suis Julie,</text><text x="20" y="82" font-family="Poppins" font-size="8" fill="${C.d}">votre conseillère 😊</text>
      <rect x="70" y="100" width="94" height="22" rx="10" fill="${C.a}"/><rect x="80" y="109" width="70" height="4" rx="2" fill="#fff" opacity=".8"/>
      <rect x="12" y="132" width="152" height="30" rx="10" fill="${C.pk}" stroke="${C.ko}" stroke-dasharray="4 3"/>
      <text x="88" y="151" text-anchor="middle" font-family="Poppins" font-size="8.5" font-weight="700" fill="${C.ko}">Aucune mention « IA »</text>
    </g>
    <g transform="translate(86 76)">${lines(10, 10, 3, 110, 12)}<rect x="10" y="50" width="110" height="80" rx="8" fill="${C.l3}"/><rect x="10" y="140" width="110" height="40" rx="8" fill="${C.l3}"/></g>
  `), 'Un chatbot qui se présente comme une conseillère humaine'),

  /* Centre d'appels et analyse de la voix */
  callcenter: () => svg(bg(`
    ${person(120, 92, 1.2, C.p, C.hair, C.skin2, true)}
    <path d="M92 104 Q92 72 120 72 Q148 72 148 104" stroke="${C.d}" stroke-width="7" fill="none"/>
    <rect x="82" y="100" width="14" height="24" rx="7" fill="${C.a}"/><rect x="144" y="100" width="14" height="24" rx="7" fill="${C.a}"/>
    <path d="M96 120 Q104 136 118 136" stroke="${C.d}" stroke-width="3" fill="none"/>
    <g transform="translate(220 64)">
      <rect width="220" height="180" rx="14" fill="${C.d}"/>
      <text x="16" y="26" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Analyse vocale · conseillers</text>
      <g transform="translate(16 44)">${[10,24,14,34,22,40,18,30,12,26,36,16,28,20].map((h,i)=>`<rect x="${i*13}" y="${24-h/2}" width="7" height="${h}" rx="3.5" fill="${i>8?C.a:C.s}"/>`).join('')}</g>
      ${[['Stress',72,C.a],['Colère',48,C.ko]].map(([t,v,c],i)=>`<text x="16" y="${108+i*28}" font-family="Poppins" font-size="9" fill="#fff">${t}</text><rect x="70" y="${100+i*28}" width="130" height="10" rx="5" fill="#fff" opacity=".15"/><rect x="70" y="${100+i*28}" width="${v*1.3}" height="10" rx="5" fill="${c}"/>`).join('')}
      ${tag(16, 150, 130, '⚠ Alerte manager', C.a)}
    </g>
  `), 'Un outil qui analyse la voix des conseillers pour détecter leurs émotions'),

  /* Réunion avec la délégation du personnel */
  meeting: () => svg(bg(`
    <ellipse cx="240" cy="210" rx="170" ry="40" fill="${C.l2}"/>
    <ellipse cx="240" cy="204" rx="170" ry="40" fill="${C.w}" stroke="${C.l2}"/>
    ${person(110, 108, .85, C.p, C.hair, C.skin, true)}
    ${person(190, 92, .85, C.s, C.hair2, C.skin2)}
    ${person(290, 92, .85, C.a, C.hair, C.skin, true)}
    ${person(370, 108, .85, C.sd, C.hair2, C.skin)}
    <rect x="200" y="186" width="80" height="40" rx="4" fill="${C.l1}" transform="rotate(-4 240 206)"/>${lines(210, 194, 3, 56, 9)}
    ${tag(150, 30, 180, 'Délégation du personnel', C.d)}
    ${tag(176, 248, 128, 'Codécision ≥ 150 salariés', C.pk, C.a)}
  `), 'Une réunion avec la délégation du personnel'),

  /* Copier-coller de données dans un outil grand public */
  copypaste: () => svg(bg(`
    <g transform="translate(40 60)">
      <rect width="170" height="180" rx="12" fill="${C.w}" stroke="${C.l2}" stroke-width="1.5"/>
      <rect width="170" height="28" rx="12" fill="${C.l1}"/><rect y="16" width="170" height="12" fill="${C.l1}"/>
      <text x="12" y="19" font-family="Poppins" font-size="8.5" font-weight="700" fill="${C.p}">export_RH_client.xlsx</text>
      ${['Nom','Salaire','IBAN'].map((h,i)=>`<text x="${12+i*54}" y="46" font-family="Poppins" font-size="8" font-weight="700" fill="${C.d}">${h}</text>`).join('')}
      ${[0,1,2,3,4,5].map(j=>[0,1,2].map(i=>`<rect x="${12+i*54}" y="${56+j*20}" width="${i===2?46:40}" height="8" rx="3" fill="${i===2?C.pk:C.l1}"/>`).join('')).join('')}
    </g>
    <g transform="translate(250 60)">
      <rect width="190" height="180" rx="12" fill="${C.d}"/>
      <text x="16" y="26" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Chatbot grand public</text>
      <rect x="14" y="40" width="162" height="70" rx="8" fill="#fff" opacity=".1"/>
      ${[0,1,2,3].map(j=>`<rect x="24" y="${50+j*14}" width="${130-j*16}" height="6" rx="3" fill="${C.a}" opacity=".7"/>`).join('')}
      <rect x="14" y="140" width="162" height="26" rx="13" fill="#fff" opacity=".12"/><text x="28" y="157" font-family="Poppins" font-size="8" fill="#fff" opacity=".8">Fais-moi un tableau de synthèse…</text>
    </g>
    <path d="M214 150 Q232 130 246 150" stroke="${C.a}" stroke-width="3" fill="none"/><path d="M240 142 L247 151 L237 154" fill="none" stroke="${C.a}" stroke-width="3" stroke-linecap="round"/>
    <g transform="translate(230 228)"><circle r="22" fill="${C.ko}"/><text y="7" text-anchor="middle" font-family="Titillium Web" font-size="22" font-weight="700" fill="#fff">!</text></g>
  `), 'Des données personnelles copiées dans un chatbot grand public'),

  /* Fuite d'un chatbot bancaire */
  bankleak: () => svg(bg(`
    <g transform="translate(56 58)">
      <rect width="120" height="170" rx="18" fill="${C.d}"/><rect x="8" y="16" width="104" height="138" rx="10" fill="#fff"/>
      <text x="18" y="34" font-family="Poppins" font-size="8" font-weight="700" fill="${C.p}">Client A</text>
      <rect x="16" y="44" width="80" height="22" rx="8" fill="${C.l1}"/>
      <rect x="30" y="74" width="74" height="40" rx="8" fill="${C.pk}" stroke="${C.ko}"/><text x="38" y="90" font-family="Poppins" font-size="7" font-weight="700" fill="${C.ko}">Solde de B :</text><text x="38" y="103" font-family="Poppins" font-size="7" fill="${C.ko}">12 480 € · IBAN…</text>
    </g>
    <g transform="translate(304 58)">
      <rect width="120" height="170" rx="18" fill="${C.d}"/><rect x="8" y="16" width="104" height="138" rx="10" fill="#fff"/>
      <text x="18" y="34" font-family="Poppins" font-size="8" font-weight="700" fill="${C.p}">Client B</text>
      <rect x="16" y="44" width="80" height="22" rx="8" fill="${C.l1}"/><rect x="30" y="74" width="74" height="22" rx="8" fill="${C.p}"/>
    </g>
    <path d="M300 140 Q240 90 182 140" stroke="${C.ko}" stroke-width="3" fill="none" stroke-dasharray="6 5"/>
    <g transform="translate(240 190)"><circle r="30" fill="#fff" stroke="${C.ko}" stroke-width="5"/><text y="-2" text-anchor="middle" font-family="Titillium Web" font-size="16" font-weight="700" fill="${C.ko}">72 h</text><text y="12" text-anchor="middle" font-family="Poppins" font-size="7" fill="${C.ko}">notification</text></g>
  `), 'Un chatbot bancaire qui affiche les données d\'un client à un autre'),

  /* Balance des sanctions */
  fines: () => svg(bg(`
    <path d="M240 50 V240" stroke="${C.d}" stroke-width="8" stroke-linecap="round"/>
    <rect x="180" y="236" width="120" height="16" rx="8" fill="${C.d}"/>
    <path d="M110 86 L370 70" stroke="${C.p}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="240" cy="78" r="12" fill="${C.a}"/>
    <path d="M110 86 L70 160 H150 Z" fill="none" stroke="${C.p}" stroke-width="2"/><path d="M60 160 H160 Q150 190 110 190 Q70 190 60 160Z" fill="${C.p}"/>
    <path d="M370 70 L330 144 H410 Z" fill="none" stroke="${C.p}" stroke-width="2"/><path d="M320 144 H420 Q410 174 370 174 Q330 174 320 144Z" fill="${C.a}"/>
    <text x="110" y="214" text-anchor="middle" font-family="Titillium Web" font-size="22" font-weight="700" fill="${C.d}">35 M€</text>
    <text x="370" y="200" text-anchor="middle" font-family="Titillium Web" font-size="22" font-weight="700" fill="${C.a}">7 %</text>
    <text x="370" y="216" text-anchor="middle" font-family="Poppins" font-size="8" fill="#6b6580">du CA mondial</text>
  `), 'Une balance avec les plafonds d\'amende'),

  /* Autorités au Luxembourg */
  lux: () => svg(bg(`
    <g transform="translate(150 40)">
      <path d="M60 0 L120 30 L118 92 L140 140 L100 210 L40 214 L20 160 L0 120 L14 60 Z" fill="${C.p}" opacity=".9"/>
      <g transform="translate(64 150)"><circle r="16" fill="${C.a}"/><path d="M0 -8 a7 7 0 0 1 7 7 c0 6 -7 12 -7 12 s-7 -6 -7 -12 a7 7 0 0 1 7 -7z" fill="#fff"/></g>
      <text x="90" y="160" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Belval</text>
    </g>
    ${[['CNPD',40,60,C.d,'pressentie'],['CSSF',330,60,C.s,'finance'],['ILR',330,130,C.s,'NIS2'],['ALIA',40,130,C.s,'deepfakes'],['ILNAS',330,200,C.s,'produits'],['CAA',40,200,C.s,'assurance']].map(([n,x,y,c,s])=>`<g transform="translate(${x} ${y})"><rect width="110" height="46" rx="12" fill="#fff" stroke="${C.l2}"/><rect x="8" y="8" width="30" height="30" rx="9" fill="${c}"/><text x="46" y="22" font-family="Titillium Web" font-size="13" font-weight="700" fill="${C.d}">${n}</text><text x="46" y="35" font-family="Poppins" font-size="8" fill="#6b6580">${s}</text></g>`).join('')}
    ${tag(176, 258, 128, 'Projet de loi n° 8476', C.d)}
  `), 'Les autorités luxembourgeoises prévues par le projet de loi 8476'),

  /* Registre de formation */
  registry: () => svg(bg(`
    <g transform="translate(110 40)">
      <rect x="10" y="10" width="250" height="220" rx="14" fill="${C.l2}"/>
      <rect width="250" height="220" rx="14" fill="#fff" stroke="${C.l2}" stroke-width="1.5"/>
      <text x="20" y="32" font-family="Titillium Web" font-size="15" font-weight="700" fill="${C.d}">Registre de formation IA</text>
      ${['Qui','Quand','Version','Score'].map((h,i)=>`<text x="${20+i*58}" y="58" font-family="Poppins" font-size="8" font-weight="700" fill="#6b6580">${h}</text>`).join('')}
      ${[0,1,2,3,4].map(j=>`<rect x="14" y="${66+j*28}" width="222" height="22" rx="6" fill="${j%2?C.l3:'#fff'}"/>
        <rect x="20" y="${74+j*28}" width="40" height="6" rx="3" fill="${C.l2}"/><rect x="78" y="${74+j*28}" width="38" height="6" rx="3" fill="${C.l2}"/><rect x="136" y="${74+j*28}" width="26" height="6" rx="3" fill="${C.l1}"/>
        <rect x="194" y="${71+j*28}" width="34" height="12" rx="6" fill="${j===3?C.pk:'#E2F3EC'}"/><text x="211" y="${80+j*28}" text-anchor="middle" font-family="Poppins" font-size="7" font-weight="700" fill="${j===3?C.ko:C.ok}">${[92,86,100,64,88][j]}%</text>`).join('')}
    </g>
    <g transform="translate(372 196)"><circle r="34" fill="${C.p}"/><path d="M-14 0 l9 10 l20 -22" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  `), 'Un registre interne des formations'),

  /* Maison / bureau */
  homework: () => svg(bg(`
    <g transform="translate(46 70)">
      <path d="M0 70 L80 10 L160 70 V180 H0 Z" fill="#fff" stroke="${C.l2}" stroke-width="1.5"/><path d="M-6 74 L80 6 L166 74" stroke="${C.p}" stroke-width="8" fill="none" stroke-linejoin="round"/>
      <rect x="50" y="100" width="60" height="44" rx="6" fill="${C.l1}"/><text x="80" y="127" text-anchor="middle" font-size="18">🏖️</text>
      ${tag(30, 190, 100, 'Hors AI Act', C.l1, C.p)}
    </g>
    <g transform="translate(270 60)">
      <rect width="160" height="190" rx="6" fill="${C.d}"/>
      ${[0,1,2,3,4,5,6].map(j=>[0,1,2,3].map(i=>`<rect x="${16+i*36}" y="${16+j*20}" width="22" height="10" rx="2" fill="#fff" opacity="${(i+j)%2?'.2':'.5'}"/>`).join('')).join('')}
      <rect x="40" y="158" width="80" height="32" rx="4" fill="${C.p}"/>
      ${tag(30, 200, 100, 'Couvert', C.a)}
    </g>
    <path d="M220 150 H254" stroke="${C.l2}" stroke-width="3" stroke-dasharray="4 4"/>
  `), 'Usage personnel à la maison et usage professionnel au bureau'),

  /* Article publié */
  news: () => svg(bg(`
    ${win(60, 36, 260, 228, 'nexalis.lu/actualites')}
    <g transform="translate(60 36)">
      <rect x="18" y="42" width="160" height="12" rx="6" fill="${C.d}"/><rect x="18" y="60" width="120" height="12" rx="6" fill="${C.d}"/>
      <rect x="18" y="84" width="224" height="70" rx="8" fill="${C.l1}"/>${sparkle(130,119,1,C.s)}
      ${lines(18, 166, 5, 220, 10)}
    </g>
    <g transform="translate(334 70)"><rect width="110" height="70" rx="12" fill="${C.d}"/>${sparkle(22,24,.6)}<text x="36" y="28" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Rédigé par IA</text><text x="16" y="50" font-family="Poppins" font-size="8" fill="#fff" opacity=".8">2 fautes corrigées</text></g>
    ${tag(334, 160, 110, 'Intérêt public ?', C.pk, C.a)}
  `), 'Un article d\'actualité rédigé par IA publié sur un site'),

  /* Vidéo du CEO en luxembourgeois */
  ceo: () => svg(bg(`
    <g transform="translate(60 40)">
      <rect width="300" height="196" rx="14" fill="${C.d}"/>
      <rect x="10" y="10" width="280" height="156" rx="8" fill="${C.sd}"/>
      <circle cx="150" cy="84" r="64" fill="${C.p}" opacity=".5"/>
      ${person(150, 56, 1.05, C.d, '#9a9a9a', C.skin)}
      <rect x="138" y="128" width="24" height="30" fill="${C.d}"/>
      <rect x="10" y="172" width="280" height="4" rx="2" fill="#fff" opacity=".25"/><rect x="10" y="172" width="90" height="4" rx="2" fill="${C.a}"/>
      ${tag(200, 20, 80, 'Avatar IA', C.a)}
    </g>
    ${bubble(330, 64, 120, 46, '#fff', C.l2)}<text x="390" y="92" text-anchor="middle" font-family="Titillium Web" font-size="16" font-weight="700" fill="${C.p}">Moien ! 🇱🇺</text>
    ${tag(330, 150, 120, 'Il ne parle pas lux.', C.pk, C.a)}
    ${tag(130, 252, 160, 'Mention « généré par IA »', C.w, C.p)}
  `), 'Une vidéo de vœux où l\'avatar IA du dirigeant parle luxembourgeois'),

  /* Image intime non consentie */
  phonelock: () => svg(bg(`
    <g transform="translate(170 30)">
      <rect width="140" height="240" rx="22" fill="${C.d}"/><rect x="10" y="22" width="120" height="196" rx="12" fill="#fff"/>
      <rect x="22" y="40" width="96" height="120" rx="10" fill="${C.l2}"/>
      <g opacity=".5">${person(70, 66, .8, C.s, C.hair2, C.skin, true)}</g>
      <rect x="22" y="40" width="96" height="120" rx="10" fill="${C.l1}" opacity=".7"/>
      <g transform="translate(70 100)"><circle r="26" fill="${C.ko}"/><rect x="-10" y="-4" width="20" height="16" rx="3" fill="#fff"/><path d="M-6 -4 V-9 a6 6 0 0 1 12 0 V-4" stroke="#fff" stroke-width="3" fill="none"/></g>
      <rect x="22" y="172" width="96" height="30" rx="10" fill="${C.ko}"/><text x="70" y="191" text-anchor="middle" font-family="Poppins" font-size="9" font-weight="700" fill="#fff">Interdit</text>
    </g>
    ${tag(40, 70, 110, '2 décembre 2026', C.w, C.p)}
    ${tag(330, 200, 110, 'Art. 5(1)(ba)', C.d)}
  `), 'Une image intime générée sans consentement, bloquée'),

  /* Assurance : décision automatique */
  insurance: () => svg(bg(`
    <g transform="translate(60 60)">
      <path d="M70 0 L140 24 V90 Q140 150 70 180 Q0 150 0 90 V24 Z" fill="${C.p}"/>
      <path d="M70 60 v50 M45 85 h50" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
    </g>
    <g transform="translate(240 70)">
      <rect width="200" height="160" rx="14" fill="#fff" stroke="${C.l2}" stroke-width="1.5"/>
      <text x="16" y="28" font-family="Poppins" font-size="9" font-weight="700" fill="${C.d}">Souscription santé</text>
      <text x="16" y="62" font-family="Poppins" font-size="9" fill="#6b6580">Score</text>
      <rect x="60" y="54" width="120" height="10" rx="5" fill="${C.l1}"/><rect x="60" y="54" width="34" height="10" rx="5" fill="${C.a}"/>
      <rect x="16" y="86" width="168" height="30" rx="10" fill="${C.ko}"/><text x="100" y="105" text-anchor="middle" font-family="Poppins" font-size="9.5" font-weight="700" fill="#fff">Refus automatique</text>
      <text x="100" y="140" text-anchor="middle" font-family="Poppins" font-size="8.5" fill="#6b6580">Aucun humain dans la boucle</text>
    </g>
  `), 'Un refus automatique de souscription d\'assurance santé'),
});
