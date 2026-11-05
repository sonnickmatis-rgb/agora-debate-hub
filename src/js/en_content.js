/* =====================================================================
   VERSION ANGLAISE — niveaux 2 à 4, fiches, quiz, notions, rappels, ressources
   Même ordre que content.js et quiz.js. Utilisé par en.js quand la langue est EN.
   ===================================================================== */
const EN_PP = {
  karim: ["KA", "Karim", "Pre-sales"],
  tom: ["TO", "Tom", "Developer"],
  nora: ["NO", "Nora", "Data consultant"],
  sofia: ["SO", "Sofia", "Nexalis HR director"],
  marc: ["MA", "Marc", "Rejected candidate"],
};

const EN_LEVELS = {
  /* ------------------------------ NIVEAU 2 ------------------------------ */
  2: {
    steps: [
      { label: "Situation", title: "Two hats for Nexalis", persona: EN_PP.karim,
        body: [
          "At Nexalis, the teams use <b>Copilot</b> and <b>ChatGPT Enterprise</b> every day.",
          "Karim is preparing an offer for an e-commerce client: a <b>chatbot</b> developed by Nexalis and sold <b>under the Nexalis brand</b>.",
          "The client asks him: “Under the AI Act, who is responsible for what?”"
        ],
        prompt: "The role is determined <b>system by system</b> and <b>use by use</b>." },
      { label: "Question", q: "When Nexalis sells this chatbot under its own brand, it is…",
        opts: ["A deployer, as with Copilot, since it only configured it.", "The provider of the chatbot, since it is sold under its brand.", "Neither: it is the end client who uses it every day."],
        ok: "Yes. A provider is anyone who places a system on the market <b>under its own name or trademark</b>, whether for payment or free of charge (Art. 3(3)). For Copilot, Nexalis remains a deployer.",
        ko: "No. By delivering the chatbot <b>under its brand</b>, Nexalis becomes the <b>provider</b> (Art. 3(3)). It only remains a deployer for the tools it uses, such as Copilot.",
        tip: "Hint: under what name is the chatbot sold?" },
      { label: "Explanation", title: "Provider or deployer?",
        intro: "Both roles are defined in <b>Article 3</b>. The same company often wears both hats, depending on the system.",
        crit: [
          ["Deployer", "Uses a system “under its authority”, outside personal use (Art. 3(4)). E.g. the Nexalis teams with Copilot."],
          ["Provider", "Develops a system, or has it developed, and places it on the market under its name or trademark (Art. 3(3)). E.g. a SaaS product, an off-the-shelf chatbot."],
          ["Custom development", "Developed for a client and put into service under the client's name: the client is in principle the provider, the IT services company a subcontractor."],
        ],
        law: { ref: "Art. 3(3) and 3(4)", title: "Definitions",
          text: "The provider places the system on the market or puts it into service <mark>under its own name or trademark</mark>, whether for payment or free of charge. The deployer uses a system <mark>under its authority</mark>, except for personal non-professional use." },
        clair: "<b>To be written into every contract:</b> this reading of Art. 3(3) for custom development remains an interpretation." },
      { label: "The problem", title: "Tom's small setting", persona: EN_PP.tom,
        body: [
          "A client asks for a service: “Your general-purpose assistant is great. Can you set it up to <b>score our candidates</b>?”",
          "Tom thinks it is a simple configuration: a few instructions, a scoring grid, and it's delivered."
        ],
        prompt: "For an IT services company, this is the <b>main trap</b>: reconfiguring a general-purpose assistant to score candidates creates a high-risk system." },
      { label: "Legal text", title: "Becoming a provider without meaning to",
        law: { ref: "Art. 25(1)", title: "Value chain",
          text: "Any operator becomes the provider of a high-risk system if it: <mark>puts its name or trademark</mark> on a high-risk system; makes a <mark>substantial modification</mark> to it; or <mark>modifies the intended purpose</mark> of a system not classified as high-risk, including a general-purpose AI system, in such a way that it becomes high-risk." },
        why: "Scoring candidates falls under <b>recruitment</b> (Annex III): by reconfiguring the assistant, Nexalis would become the provider of a high-risk system.",
        mustTitle: "What the Omnibus clarified",
        must: [
          ["The initial provider must help", "Technical documentation, known limitations and failure modes, targeted technical access.", "Art. 25(2)"],
          ["A written agreement", "Mandatory between the provider of a high-risk system and its own suppliers, AI models included.", "Art. 25(4)"],
          ["Penalties", "Up to €15M or 3% of worldwide turnover.", "Art. 99(4)(da)"],
          ["From when?", "With Chapter III: 2 December 2027 for Annex III.", "Art. 113"],
        ] },
      { label: "Question", q: "If Tom reconfigures the assistant to score candidates, what happens?",
        opts: ["Nothing: it is still the same assistant, only the instructions change.", "Nexalis becomes the provider of a high-risk system.", "The client becomes the provider, since it uses the tool."],
        ok: "Exactly. By <b>changing the intended purpose</b> of a general-purpose system to make it a recruitment tool, Nexalis becomes the provider of a high-risk system (Art. 25(1)).",
        ko: "No. Changing the <b>intended purpose</b> of a general-purpose system to score candidates makes Nexalis the <b>provider</b> of a high-risk system (Art. 25(1)).",
        tip: "Hint: recruitment is listed in Annex III." },
      { label: "New situation", title: "What the team takes away",
        body: "Karim sets out each party's role in his offer. Tom adopts a reflex: <b>alert his project manager before any configuration that changes a tool's purpose.</b>",
        keys: [["2", "roles: provider and deployer"], ["3", "ways to become a provider (Art. 25)"], ["1", "reflex: qualify before delivering"]],
        next: ["Module 2", "On Friday, the data team fine-tunes an open-source model for a client…"] },
      { label: "Practical sheet 3" },
      { label: "Situation", title: "Friday's fine-tuning", persona: EN_PP.nora,
        body: [
          "Nora's team is fine-tuning <b>Mistral 7B</b> with the <b>LoRA</b> technique on a client's documentation.",
          "The goal: deliver an assistant that answers the client teams' questions.",
          "Tom is worried: “If we modify a model, do we become the provider of a general-purpose AI model?”"
        ],
        prompt: "Using or fine-tuning a model is not the same as creating it." },
      { label: "Question", q: "Does the team become the provider of a general-purpose AI (GPAI) model?",
        opts: ["Yes: any modification of a model, however small, makes you its provider.", "Usually not: the modification stays below a third of the original training compute.", "Yes, because Mistral's model is open source and can therefore be freely modified."],
        ok: "Correct. But be careful: the <b>assistant delivered</b> is a generative chatbot, subject to <b>Article 50</b>.",
        ko: "No. You only become a model provider if the modification compute <b>exceeds one third</b> of the original training compute. This threshold is rarely reached. The assistant delivered, however, is subject to Article 50.",
        tip: "Hint: there is a compute threshold." },
      { label: "Explanation", title: "General-purpose AI models: where is the line?",
        intro: "Building with a large model does not make you its provider.",
        crit: [
          ["Calling an API", "Using GPT, Claude or Mistral via an API does not make Nexalis a GPAI model provider. It is the provider of the system it builds."],
          ["Fine-tuning a model", "Model provider only if the modification compute exceeds one third of the original training compute."],
          ["The benchmarks", "GPAI model: more than 10²³ FLOP of training (indicative criterion). Systemic risk presumed from 10²⁵ FLOP (Art. 51(2))."],
        ],
        law: { ref: "GPAI guidelines · July 2025", title: "Modifying a model",
          text: "Fine-tuning a model (fine-tuning, LoRA) only makes a company a model provider if the modification compute <mark>exceeds one third</mark> of the compute used to train the original model." },
        mentor: "The model isn't us. But the assistant we deliver is." },
      { label: "The problem", title: "“Julie, adviser”", persona: EN_PP.karim,
        body: [
          "For the e-commerce client, the team set up the chatbot to introduce itself as <b>“Julie, adviser”</b>, with a photo.",
          "No mention of AI: “It's warmer that way,” explains the client. The chatbot has been live since September 2026."
        ],
        prompt: "The client is happy. But is the chatbot compliant?" },
      { label: "Legal text", title: "Transparency: the 4 obligations of Article 50",
        law: { ref: "Art. 50(1) and 50(5)", title: "Applicable since 2 August 2026",
          text: "The provider designs any system that interacts with people so that they <mark>know they are talking to an AI</mark>, unless this is obvious to a reasonably well-informed, observant and circumspect person. The information is given <mark>at the latest at the time of the first interaction</mark>." },
        why: "“Julie” has been <b>non-compliant since 2 August 2026</b>: its AI nature must be shown from the first exchange, and this must be provided for in the contract.",
        mustTitle: "The 4 obligations",
        must: [
          ["Chatbots", "Say that people are talking to an AI.", "50(1)"],
          ["Marking", "Providers of generative systems mark outputs in a machine-readable format.", "50(2)"],
          ["Emotions and biometrics", "Deployers inform the people exposed.", "50(3)"],
          ["Deepfakes and texts of public interest", "Deployers disclose them.", "50(4)"],
        ] },
      { label: "True or false", q: "“Using Copilot internally to write an email does not trigger Article 50.”",
        ok: "Correct: <b>true</b>. Internal use of Copilot for an email or code does not trigger any Article 50 obligation. The obligation arises when Nexalis <b>publishes a deepfake</b> or <b>delivers a chatbot</b>.",
        ko: "It is <b>true</b>. Internal use for an email or code triggers nothing. The obligation arises when Nexalis publishes a deepfake or delivers a chatbot.",
        tip: "Hint: Article 50 protects the people exposed to the system." },
      { label: "Practical sheet 4" },
    ],
    scn: [
      { t: "Product", who: "Product management", title: "The screening SaaS under our brand", theme: "Provider role",
        ctx: ["Nexalis wants to sell its SME clients a candidate pre-screening module.", "It would be sold as SaaS, under the Nexalis brand.", "Target launch: early 2028."],
        q: "What is Nexalis's situation?",
        opts: [
          ["A mere deployer: it is the SME clients who use the tool every day, not Nexalis.", "Avoid", "By selling under its brand, Nexalis is the provider (Art. 3(3))."],
          ["Provider of a high-risk system, with a file to produce by December 2027.", "Right answer", "Technical documentation, quality management system, internal control, EU declaration, CE marking, registration and instructions for use. For an HR tool, conformity assessment is internal control, without a notified body (Art. 43)."],
          ["No obligation before 2028: high risk was postponed by the AI Omnibus.", "Partly", "The postponement sets a date; it removes nothing. For a launch in early 2028, everything must be ready from 2 December 2027."],
        ], law: "Art. 9 to 17, 43, 47 to 49" },
      { t: "Pre-sales", who: "Karim, pre-sales", title: "The custom assistant for a bank", theme: "Contract",
        ctx: ["A bank asks for a custom-built assistant.", "It will be put into service under the bank's name and brand.", "The contract is being drafted."],
        q: "How should Karim handle the question of roles?",
        opts: [
          ["Consider that Nexalis is necessarily the provider, since it develops the tool.", "Partly", "Not necessarily: put into service under the client's name, the client is in principle the provider."],
          ["Write nothing in the contract: the law will settle the question of roles if there is a dispute.", "Avoid", "This reading of Art. 3(3) remains an interpretation: it must be written into every contract."],
          ["State in the contract that the bank is in principle the provider and Nexalis a subcontractor.", "Right answer", "This is the reading of Art. 3(3), to be set out in every contract and validated by legal. With a financial client, also think of DORA clauses."],
        ], law: "Art. 3(3) · to be checked" },
      { t: "Communications", who: "Inès, communications", title: "The AI-written article", theme: "Transparency",
        ctx: ["Inès publishes a news article about AI in Luxembourg on the Nexalis website.", "It was written by an AI; Inès corrected two spelling mistakes.", "The article informs the public on a matter of public interest."],
        q: "Must the text be disclosed as AI-generated?",
        opts: [
          ["No: unlike an image or a video, a text never needs a label.", "Avoid", "A text published to inform the public on matters of public interest must be disclosed (Art. 50(4))."],
          ["No, since Inès reread the text before publishing it on the website.", "Partly", "A simple spelling correction is not editorial control (Commission FAQ)."],
          ["Yes, unless there is genuine human review with an editorial manager.", "Right answer", "This is the exception provided by Art. 50(4): genuine editorial control, with someone holding editorial responsibility."],
        ], law: "Art. 50(4) · Art. 50 FAQ" },
    ],
    recap: [
      ["Deployer", "Uses a system under its authority. This is the case for Nexalis with Copilot, ChatGPT Enterprise or an HR tool.", "Art. 3(4)"],
      ["Provider", "Places a system on the market under its name or trademark. <b>“As soon as we deliver under our own name, we are a provider.”</b>", "Art. 3(3)"],
      ["The Article 25 trap", "<ul><li>Putting your brand on a high-risk system</li><li>Substantially modifying it</li><li>Changing the purpose of a general-purpose tool</li></ul>", "Art. 25(1)"],
      ["GPAI models", "Calling an API does not make you a model provider. Nor does fine-tuning, unless it exceeds <b>one third</b> of the original compute.", "GPAI guidelines"],
      ["Transparency", "<ul><li>Chatbot: say it is an AI</li><li>Generated content: marking</li><li>Deepfakes and texts of public interest: disclose</li></ul>", "Art. 50"],
      ["Not for internal use", "Writing an email or code with Copilot triggers <b>no</b> Article 50 obligation.", "Art. 50", true],
    ],
  },
  /* ------------------------------ NIVEAU 3 ------------------------------ */
  3: {
    steps: [
      { label: "Situation", title: "The “well-being” dashboard", persona: EN_PP.karim,
        body: [
          "A banking client contacts Karim. It wants to add a module to its call-centre tool that <b>analyses the advisers' voices</b> to detect stress and anger.",
          "The module would automatically alert managers. “It's for their well-being,” the client says."
        ],
        prompt: "Karim has a big contract in sight. But can he accept?" },
      { label: "Question", q: "What should Karim answer?",
        opts: ["Accept: the stated goal is the employees' well-being, not monitoring them.", "Refuse: it is emotion recognition in the workplace, which is prohibited.", "Accept, provided the advisers are informed and give their written consent."],
        ok: "Correct. Art. 5(1)(f) prohibits emotion recognition in the workplace, except for medical or safety reasons. And <b>general well-being is not a “medical reason”</b>.",
        ko: "No. It is emotion recognition in the workplace, <b>prohibited</b> since 2 February 2025 (Art. 5(1)(f)). General well-being is not a medical reason, and informing people is not enough.",
        tip: "Hint: the tool tries to read what employees feel." },
      { label: "Legal text", title: "Eight practices prohibited since 2 February 2025",
        law: { ref: "Art. 5(1)(f)", title: "Prohibited practices",
          text: "<mark>Emotion recognition in the workplace</mark> and in education is prohibited, except for medical or safety reasons. This is the most concrete point for an IT services company." },
        why: "The workplace <b>extends to candidates</b> and to <b>probation periods</b>.",
        mustTitle: "The eight practices of Article 5(1)",
        must: [
          ["(a) Manipulation", "Subliminal, manipulative or deceptive techniques causing significant harm.", ""],
          ["(b) Vulnerabilities", "Exploiting age, disability or a social or economic situation.", ""],
          ["(c) Social scoring", "", ""],
          ["(d) Crime prediction", "Based solely on profiling.", ""],
          ["(e) Facial image scraping", "Untargeted.", ""],
          ["(f) Emotions at work and at school", "Except for medical or safety reasons.", ""],
          ["(g) Biometric categorisation", "To infer sensitive data.", ""],
          ["(h) Real-time biometric identification", "By law enforcement, except for regulated exceptions.", ""],
        ] },
      { label: "The problem", title: "“What if we listened to the customers instead?”", persona: EN_PP.karim,
        body: [
          "The client comes back with a variant: “Fine for our advisers. But what if we analyse the <b>emotions of the customers who call</b> instead?”",
          "Karim is no longer sure."
        ],
        prompt: "Careful: “not prohibited” does not mean “free”." },
      { label: "Question", q: "Analysing customers' emotions on the phone is…",
        opts: ["Prohibited, exactly like the recognition of employees' emotions.", "Not prohibited, but high-risk, with information for the people concerned.", "Free: the prohibition only covers the workplace, with no other rule."],
        ok: "Correct: not prohibited, but <b>high-risk</b> (Annex III, point 1(c)) and the people exposed <b>must be informed</b> (Art. 50(3)).",
        ko: "No. Monitoring <b>customers'</b> emotions is not prohibited, but it is <b>high-risk</b> (Annex III, 1(c)) and the people must be informed (Art. 50(3)).",
        tip: "Hint: prohibition (f) covers the workplace." },
      { label: "Explanation", title: "Emotions: prohibited or not?",
        intro: "Examples taken from the Commission guidelines of 4 February 2025.",
        left: ["Prohibited", [
          "Call-centre webcams and voice recognition that track employees' emotions",
          "Inferring emotions during recruitment",
          "Analysing keystrokes or facial expressions",
          "A system to detect burnout or depression at work",
        ]],
        right: ["Not covered by the prohibition", [
          "Tracking the emotions of a call centre's customers (but high-risk)",
          "Detecting physical states such as pain or fatigue",
          "Inferring emotions from written text (but the GDPR applies)",
          "Measuring the stress of an employee operating dangerous machinery (safety)",
        ]],
        mentor: "At work, one question only: does the tool read what our colleagues feel? If so, we stop." },
      { label: "New situation", title: "Two more points on 2 December 2026",
        body: "The Omnibus adds two prohibitions: realistic images, videos or sounds of the intimate parts of an identifiable person, or showing them in sexually explicit activity, <b>without their consent</b> (point ba), and <b>child sexual abuse material</b> (point bb). Providers are expected to have safeguards: refusals, filters, abuse detection, reporting.",
        keys: [["8", "practices prohibited since February 2025"], ["+2", "points added on 2 December 2026"], ["0", "exception for “well-being”"]],
        next: ["Module 2", "Sofia, the HR director, receives 800 applications and wants a tool to sort them…"] },
      { label: "Practical sheet 5" },
      { label: "Situation", title: "Sorting 800 CVs", persona: EN_PP.sofia,
        body: [
          "Nexalis is recruiting 30 consultants. Sofia receives <b>800 applications</b>.",
          "She wants a tool that <b>ranks</b> the applications and only shows the <b>top 20</b>. “Of course, I'll be the one signing the decisions.”"
        ],
        prompt: "A human signs at the end. Is that enough?" },
      { label: "True or false", q: "“Sorting CVs with AI is allowed as long as a human signs.”",
        ok: "Correct: <b>false</b>, or at least incomplete. Filtering applications is <b>high-risk</b> (Annex III, 4(a)), profiling rules out the exemption, and signing is not enough if the AI <b>shapes the judgement</b>.",
        ko: "It is <b>false</b> or incomplete. Filtering applications is high-risk (Annex III, 4(a)) and signing is not enough if the AI output <b>shapes the judgement</b>.",
        tip: "Hint: who really chose the 20 candidates shown?" },
      { label: "Legal text", title: "High risk: the way out… and its lock",
        law: { ref: "Art. 6(3) and 6(4)", title: "High-risk classification",
          text: "An Annex III system is not high-risk if it does not materially influence the decision and is limited to a narrow procedural task, improving a previously completed human activity, detecting deviations without replacing the human assessment, or a preparatory task. But it is <mark>always high-risk if it performs profiling</mark> of natural persons." },
        why: "According to the draft guidelines of 19 May 2026, recruitment tools “usually perform profiling”. On the other hand, <b>structuring CVs, removing duplicates or scheduling interviews</b> can remain outside high risk, provided this is documented and registered.",
        mustTitle: "Annex III, closest to an IT services company",
        must: [
          ["Recruitment", "Analysing and filtering applications, evaluating candidates.", "4(a)"],
          ["Workforce management", "Promotion, dismissal, task allocation, monitoring and evaluating performance.", "4(b)"],
          ["Credit", "Credit scoring of individuals, excluding fraud detection.", "5(b)"],
          ["Insurance", "Pricing in life and health insurance.", "5(c)"],
        ] },
      { label: "The problem", title: "Deployment Monday", persona: EN_PP.sofia,
        body: [
          "A few months later, Sofia announces one Monday morning: “From today, an AI tool assesses everyone's <b>quarterly performance</b>.”",
          "Employees find out at the same time as the announcement. Nexalis has <b>180 employees</b>."
        ],
        prompt: "What was forgotten?" },
      { label: "Legal text", title: "Before deploying: the AI Act… and the Labour Code",
        law: { ref: "Art. 26 · from 2 December 2027", title: "Deployer obligations",
          text: "Before putting a system into service in the workplace, the deployer <mark>informs workers' representatives and the workers concerned</mark> (Art. 26(7)). It assigns human oversight to people with <mark>the necessary competence, training and authority</mark> (Art. 26(2))." },
        why: "The information of representatives that the AI Act will only require from 2 December 2027 is <b>already required in Luxembourg</b> for some HR tools.",
        mustTitle: "What the Luxembourg Labour Code already provides",
        must: [
          ["Staff delegation", "Mandatory from 15 employees. Below 150, it is informed and consulted.", "Labour Code"],
          ["Co-decision from 150 employees", "For technical installations that monitor behaviour and performance: decided “by mutual agreement”.", "L.414-9"],
          ["Employee monitoring", "Detailed prior information of the delegation. Within 15 days, a prior opinion from the CNPD can be requested, given within a month and with suspensive effect.", "L.261-1"],
        ] },
      { label: "Question", q: "What did Sofia forget?",
        opts: ["Nothing for now: the high-risk obligations only apply from December 2027.", "The delegation's agreement, informing employees, trained supervisors and a DPIA.", "Only to send employees an information email before going live."],
        ok: "Correct. With 180 employees, this type of tool requires <b>co-decision</b> with the delegation (L.414-9). The GDPR applies today (DPIA), and human oversight must be entrusted to trained supervisors.",
        ko: "No. Luxembourg labour law and the GDPR apply <b>today</b>: co-decision with the delegation (180 employees), prior information, trained supervisors, DPIA.",
        tip: "Hint: think about Nexalis's headcount." },
      { label: "Practical sheet 6" },
    ],
    scn: [
      { t: "Marketing", who: "Inès, communications", title: "The CEO's season's greetings in Luxembourgish", theme: "Deepfake",
        ctx: ["For the end-of-year greetings, Inès creates a video in which the CEO's AI avatar speaks Luxembourgish.", "The CEO does not speak Luxembourgish.", "The video will be published on social media."],
        q: "What should Inès do?",
        opts: [
          ["Publish it as it is: the CEO agreed to the video.", "Partly", "Consent is useful, but it does not exempt you from disclosing the deepfake."],
          ["Drop the video: deepfakes are prohibited by the AI Act.", "Avoid", "No: only non-consensual intimate deepfakes will be prohibited from 2 December 2026. Others must be disclosed."],
          ["Disclose the deepfake with a notice or an icon.", "Right answer", "It is a deepfake (Art. 3(60)) that must be disclosed (Art. 50(4)). The code of practice of 10 June 2026 provides for an EU icon or an equivalent label."],
        ], law: "Art. 3(60) and 50(4)" },
      { t: "All employees", who: "A colleague", title: "The colleague's deepfake", theme: "Prohibited practice",
        ctx: ["It is January 2027.", "An employee uses the company's image-generation tool to create an intimate image of a female colleague.", "He says “it was just a joke”."],
        q: "How should this behaviour be described?",
        opts: [
          ["A bad joke between colleagues: regrettable, but unrelated to the AI Act or labour law.", "Avoid", "Wrong: it is one of the prohibitions added by the Omnibus."],
          ["Prohibited in professional use since 2 December 2026, on top of disciplinary and criminal penalties.", "Right answer", "Point 5(1)(ba). Purely personal use would fall outside the AI Act, but not outside criminal law."],
          ["Allowed as long as the image stays private and is not shared outside the team.", "Avoid", "No: the prohibition covers generation without consent, not just sharing."],
        ], law: "Art. 5(1)(ba) and 2(10)" },
      { t: "Management", who: "Julien, manager", title: "The productivity dashboard", theme: "High-risk HR",
        ctx: ["Julien wants to score each developer based on Copilot and Jira data.", "The scores would be used to prepare promotions.", "He wants to launch it next month."],
        q: "What does Julien need to know?",
        opts: [
          ["It is prohibited: scoring employee performance with AI is one of the practices banned by Article 5.", "Avoid", "No: it is regulated (Annex III, 4(b)), not prohibited, as long as the tool does not infer emotions."],
          ["High-risk from December 2027; already today: GDPR, informing the delegation, co-decision from 150 employees.", "Right answer", "High risk arrives in 2027, but the GDPR and Luxembourg labour law already apply."],
          ["Nothing is required before December 2027: the tool can be launched now and brought into compliance later.", "Partly", "For the AI Act, yes. But the GDPR and the Labour Code (L.261-1, L.414-9) apply today."],
        ], law: "Annex III 4(b) · L.261-1 · L.414-9" },
    ],
    recap: [
      ["Eight prohibited practices", "Since 2 February 2025: manipulation, vulnerabilities, social scoring, crime prediction, facial scraping, <b>emotions at work</b>, biometric categorisation, real-time identification.", "Art. 5(1)"],
      ["Emotions: the nuance", "Prohibited for employees and candidates. For customers: not prohibited, but high-risk and information is mandatory.", "Art. 5(1)(f) · Annex III 1(c)"],
      ["Deepfakes", "<ul><li>Disclose every deepfake published</li><li>Prohibited from 2 December 2026: non-consensual intimate deepfakes</li></ul>", "Art. 50(4) · 5(1)(ba)"],
      ["High-risk HR", "Recruitment and workforce management. <b>Always</b> high-risk in case of profiling. Applies from <b>2 December 2027</b>.", "Annex III 4 · Art. 6(3)"],
      ["The deployer must", "<ul><li>Use according to the instructions</li><li>Trained human oversight</li><li>Keep logs for 6 months</li><li>Inform representatives and people</li></ul>", "Art. 26"],
      ["In Luxembourg, already today", "Delegation from 15 employees, <b>co-decision from 150</b> for performance-monitoring tools, possible CNPD opinion.", "L.414-9 · L.261-1", true],
    ],
  },
  /* ------------------------------ NIVEAU 4 ------------------------------ */
  4: {
    steps: [
      { label: "Situation", title: "Friday's copy and paste", persona: EN_PP.nora,
        body: [
          "Friday, 5 p.m. Nora has to analyse an HR export for a client: employees' <b>names, salaries and IBANs</b>.",
          "To save time, she pastes everything into a <b>consumer chatbot</b> and asks for a summary table."
        ],
        prompt: "The real everyday risk for an IT services company is not an AI Act fine: it is a <b>client data leak</b> into a consumer tool." },
      { label: "Question", q: "What is the main problem?",
        opts: ["None: this chatbot is not a prohibited practice under Article 5.", "A GDPR and contractual breach: an approved tool and dummy data were needed.", "Only a transparency issue: the AI should have been disclosed (Article 50)."],
        ok: "Correct. It is first of all a <b>GDPR and contractual breach</b> (NDA, internal policy). The right reflex: a <b>tool approved</b> by the company and <b>anonymised or dummy</b> data.",
        ko: "No. The problem is first of all the <b>GDPR</b> and the <b>contract</b> with the client. An approved tool and anonymised or dummy data were needed.",
        tip: "Hint: what data left the company?" },
      { label: "Explanation", title: "The AI Act adds to the GDPR, it does not replace it",
        intro: "In almost all everyday uses (client data in a prompt, HR tool, monitoring), it is the <b>GDPR</b> that applies first, and already today.",
        critTitle: "Three questions before any use of AI",
        crit: [
          ["Is it prohibited or high-risk?", "Check the risk level of the use: Articles 5 and 6, Annex III."],
          ["What data goes into the tool?", "Personal or confidential data: approved tool only, anonymised data where possible."],
          ["Who needs to be informed?", "The people concerned, the staff delegation, the client, the DPO…"],
        ],
        law: { ref: "Art. 2(7)", title: "Relationship with the GDPR",
          text: "The regulation <mark>shall not affect</mark> the GDPR (Regulation (EU) 2016/679), without prejudice to Articles 4a and 59." },
        clair: "<b>In 2025, the CNPD</b> received 846 complaints (+40%) and 425 data breach notifications, <b>49% of them due to human error</b>." },
      { label: "The problem", title: "“Did an AI reject me?”", persona: EN_PP.marc,
        body: [
          "Marc applied to a Nexalis client that uses a screening tool. Rejected, he writes: “Did an AI reject me? And why?”",
          "The client offers to send him the <b>algorithm's source code</b>: “That way, he'll have everything.”"
        ],
        prompt: "Is the source code an explanation?" },
      { label: "Legal text", title: "The right to a real explanation",
        law: { ref: "GDPR Art. 22 · CJEU C-203/22", title: "Automated decisions",
          text: "In February 2025, the CJEU ruled that communicating <mark>a complex mathematical formula, such as an algorithm</mark>, is not a sufficient explanation. The controller must explain <mark>the procedure and principles actually applied</mark>." },
        why: "The AI Act obligations for this case will apply from 2 December 2027. Whether Article 86 applies before that date is uncertain.",
        mustTitle: "What to tell Marc",
        must: [
          ["Inform him", "Tell him that an AI system was used.", "Art. 26(11)"],
          ["Explain the AI's role", "Right to clear and meaningful explanations of the system's role in the decision.", "Art. 86"],
          ["Give the main elements", "The procedure and principles applied, not the code.", "GDPR · C-203/22"],
        ] },
      { label: "True or false", q: "“Sending the source code to the candidate gives him an explanation.”",
        ok: "Correct: <b>false</b>. You must explain the <b>role</b> of the AI and the <b>main elements</b> of the decision: the procedure and principles applied.",
        ko: "It is <b>false</b>. The CJEU said so: an algorithm is not an explanation. The procedure and principles actually applied are needed.",
        tip: "Hint: Marc must be able to understand the answer." },
      { label: "New situation", title: "What Nora changed",
        body: "Nora deleted her conversation and alerted her manager and the DPO. She now works with the <b>tool approved</b> by Nexalis and <b>dummy data</b> for her tests.",
        keys: [["3", "questions before any use of AI"], ["49%", "of reported breaches due to human error"], ["1", "reflex: approved tool, protected data"]],
        next: ["Module 2", "One Saturday morning, a chatbot delivered to a bank shows one client's data… to another."] },
      { label: "Practical sheet 7" },
      { label: "Situation", title: "The leaking banking chatbot", persona: EN_PP.tom,
        body: [
          "A chatbot delivered by Nexalis to a bank shows <b>one client's data… to another user</b>.",
          "The bank calls Tom on a Saturday morning."
        ],
        prompt: "Several texts apply at the same time: the GDPR, DORA and, later, the AI Act." },
      { label: "Question", q: "Which reaction is the right one?",
        opts: ["Quietly fix the bug overnight, then check that it doesn't happen again.", "Help the bank report the breach within 72 hours and handle the incident under DORA.", "Wait to find out whether the chatbot is high-risk before telling anyone."],
        ok: "Correct. GDPR Art. 33: <b>notification within 72 hours</b> by the bank, with help from Nexalis. A possible ICT incident under <b>DORA</b>. A serious incident under the AI Act (Art. 73) would only concern a high-risk system, from December 2027.",
        ko: "No. The bank must <b>report the breach within 72 hours</b> (GDPR Art. 33), with Nexalis's help, and handle any ICT incident under DORA.",
        tip: "Hint: the GDPR applies today." },
      { label: "Legal text", title: "Up to 7% of worldwide turnover" },
      { label: "Exercise", q: "An SME with €20M turnover commits an Article 5 infringement. What is the maximum fine?",
        opts: ["€35M", "€1.4M", "€600,000"],
        ok: "Correct. For an SME, it is the <b>lower</b> of the two: 7% × €20M = <b>€1.4M</b>. These are ceilings, not likely fines.",
        ko: "No. For an SME, the <b>lower</b> of €35M and 7% × €20M applies, i.e. <b>€1.4M</b>. (€600,000 corresponds to an Article 50 infringement.)",
        tip: "Hint: for an SME, take the lower of the two amounts." },
      { label: "Explanation", title: "In Luxembourg: who will supervise?",
        law: { ref: "Draft law No. 8476", title: "Implementing law in Luxembourg",
          text: "Tabled on 23 December 2024, the draft law makes the CNPD <mark>the default market surveillance authority</mark>, the single point of contact and the operator of at least one sandbox. As of 12 October 2026, its latest step is the <mark>Council of State opinion of 10 July 2026</mark>, with formal objections: <mark>no vote</mark>." },
        why: "The right wording: <b>“the CNPD is the expected authority; the regulation already applies directly.”</b>",
        mustTitle: "The planned sectoral competences",
        must: [
          ["CSSF", "Entities it supervises (finance).", "Projet"],
          ["CAA", "Insurance.", "Projet"],
          ["ILR", "Deployers of critical infrastructure that are NIS2 entities.", "Projet"],
          ["ALIA", "Marking and deepfakes (Art. 50(2) and (4)).", "Projet"],
        ] },
      { label: "True or false", q: "“In Luxembourg, the AI Act already applies, even without a national law being passed.”",
        ok: "Correct: <b>true</b>. The regulation applies directly. Only the designation of the authorities awaits draft law 8476, not passed as of 12 October 2026: the CNPD is the expected authority and already answers questions at ia@cnpd.lu.",
        ko: "It is <b>true</b>. The regulation applies directly, without a national law. Draft law 8476, not passed as of 12 October 2026, only designates the authorities: the CNPD is the expected authority.",
        tip: "Hint: a draft law is not a law." },
      { label: "Practical sheet 8" },
    ],
    scn: [
      { t: "Pre-sales", who: "Karim, pre-sales", title: "The 100% automated decision", theme: "High risk · GDPR",
        ctx: ["An insurer client wants to automatically reject health insurance applications when the “score” is low.", "No human would be involved.", "It asks Karim for a quote."],
        q: "What should Karim explain?",
        opts: [
          ["It is prohibited by the AI Act: a decision taken by an AI without a human is a prohibited practice.", "Avoid", "It is not a prohibited practice: it is regulated."],
          ["Solely automated decision: GDPR today; high risk, FRIA and human oversight from December 2027.", "Right answer", "“We assess the risk before we quote.” GDPR Art. 22, Annex III 5(c), Art. 14, 26(2) and 27."],
          ["No rule applies before 2027: the tool can be delivered and used as it is in the meantime.", "Partly", "For high risk, yes. But the GDPR (Art. 22) already regulates solely automated decisions."],
        ], law: "GDPR Art. 22 · Annex III 5(c) · Art. 27" },
      { t: "Management", who: "Nexalis management", title: "Launching this module on Monday", theme: "Social dialogue",
        ctx: ["Management wants to launch this training module for its 180 employees on Monday.", "Nobody has mentioned it to the staff delegation.", "“It's mandatory training, there's no need to consult.”"],
        q: "What do you think?",
        opts: [
          ["Management is right: Article 4 is enough, the training does not need to be discussed with the delegation.", "Avoid", "The AI Act does not override Luxembourg labour law."],
          ["It is enough to inform the staff delegation once the programme has been launched.", "Partly", "Too late: social dialogue starts before the launch, not after."],
          ["From 150 employees, collective continuing training may require co-decision: discuss it before the launch.", "Right answer", "L.414-9 also covers “any collective continuing vocational training programme or action”. A point to be confirmed by legal."],
        ], law: "L.414-9 · to be checked" },
      { t: "Finance", who: "Finance department", title: "The subsidiary and SME status", theme: "Penalties",
        ctx: ["Nexalis has 180 employees, but belongs to an international group.", "The CFO is counting on the “lower amount” ceiling reserved for SMEs.", "He wants to write it into the risk analysis."],
        q: "Is it a given?",
        opts: [
          ["Yes: Nexalis has 180 employees, so it is an SME under the AI Act.", "Avoid", "SME status takes linked enterprises into account (Recommendation 2003/361/EC)."],
          ["Not necessarily: belonging to a group can mean losing SME status. To be confirmed.", "Right answer", "This is the point to watch for group subsidiaries, as is the turnover basis used."],
          ["Yes, and the “lower of the two amounts” rule also applies to SMCs at every level.", "Avoid", "For SMCs, the lower-amount rule only applies to the two lower tiers (Art. 99(6a))."],
        ], law: "Art. 3(14a), 99(6) and 99(6a)" },
    ],
    recap: [
      ["GDPR first", "The AI Act does not affect the GDPR. Client data in a prompt: <b>approved tool, anonymised or dummy data</b>.", "Art. 2(7)"],
      ["Three questions", "<ul><li>Is it prohibited or high-risk?</li><li>What data goes into the tool?</li><li>Who needs to be informed?</li></ul>", "Reflex"],
      ["Incidents", "<ul><li>GDPR: notification within 72 h</li><li>NIS2: early warning within 24 h, notification within 72 h</li><li>DORA for financial clients</li></ul>", "GDPR · NIS2 · DORA"],
      ["Penalties", "€35M or 7% (prohibited) · €15M or 3% (operators, transparency) · €7.5M or 1% (incorrect information). <b>The company pays</b>, not the employee.", "Art. 99"],
      ["Article 4 and fines", "No specific ceiling in the regulation, but lack of training <b>aggravates</b> another infringement.", "Art. 99(7)(g)"],
      ["In Luxembourg", "The regulation already applies. The <b>CNPD is the expected authority</b> (draft law 8476, not passed). Contact: ia@cnpd.lu.", "Draft law 8476", true],
    ],
  },
};

const EN_GOALS = {
  '2-1': ["Distinguish provider and deployer", "Avoid becoming a provider without meaning to (Art. 25)", "Qualify your role before delivering a system"],
  '2-2': ["Know when you become the provider of a general-purpose AI model", "Apply the four transparency obligations of Article 50", "Recognise the internal uses that are not concerned"],
  '3-1': ["Know the eight practices prohibited since February 2025", "Distinguish employees' emotions (prohibited) from customers' (high-risk)", "Anticipate the two prohibitions of 2 December 2026"],
  '3-2': ["Recognise a high-risk HR use (Annex III)", "Understand the Art. 6(3) way out and the profiling lock", "Respect Luxembourg labour law before any deployment"],
  '4-1': ["Protect data: the GDPR first", "Ask the three questions before any use of AI", "Give a real explanation to a person concerned"],
  '4-2': ["Respond to an incident: GDPR, DORA, NIS2", "Know the fine ceilings and who pays", "Know who will supervise in Luxembourg"],
};

// Même ordre que KNOW dans content.js (niveaux 2 à 4)
const EN_KNOW = [
  ["Provider or deployer", "Two roles, system by system."],
  ["Becoming a provider (Art. 25)", "The trap of changing the purpose."],
  ["General-purpose AI models", "API, fine-tuning and thresholds."],
  ["Transparency (Art. 50)", "Chatbots, marking, published texts."],
  ["Prohibited practices", "The eight red lines, plus two."],
  ["Emotions at work", "Prohibited for employees, not for customers."],
  ["Deepfakes", "Disclose, and what will be prohibited."],
  ["High-risk HR", "Annex III, profiling, Art. 6(3)."],
  ["Luxembourg labour law", "Delegation, co-decision, monitoring."],
  ["GDPR and AI", "Data in prompts, Art. 22."],
  ["Right to an explanation", "Explain, don't send the code."],
  ["Incidents", "GDPR, NIS2, DORA."],
  ["Penalties (Art. 99)", "Ceilings, SMEs, who pays."],
  ["Authorities in Luxembourg", "CNPD expected, draft law 8476."],
  ["Social dialogue", "Open the dialogue before launching."],
];

const EN_SPACED = {
  2: [
    ["“The AI Act only concerns developers and the IT department.”", "Faux", "Any organisation using AI under its authority is a deployer, with Art. 4, 26 and 50."],
    ["“In principle, a chatbot must say it is an AI since 2 August 2026.”", "Vrai", "Mandatory since 2 August 2026, unless it is obvious to a reasonably attentive person."],
    ["“Fine-tuning an open-source model makes us a GPAI model provider.”", "Faux", "Usually false: only if the modification compute exceeds one third of the original training compute."],
    ["“An AI-generated text that is published never needs a label.”", "Ça dépend", "A text of public interest must be disclosed, unless there is genuine editorial review with an editorial manager."],
  ],
  3: [
    ["“All AI is high-risk.”", "Faux", "High risk is limited to the uses listed in Annexes I and III."],
    ["“Analysing customers' emotions on the phone is not prohibited, but regulated.”", "Vrai", "Not prohibited, but high-risk, with an obligation to inform the people concerned."],
    ["“Analysing the tone of emails falls under the emotion prohibition.”", "Faux", "The prohibition covers inference from biometric data; written text is not biometric data, but the GDPR applies."],
    ["“An intimate deepfake of a colleague is a bad joke, not an AI Act matter.”", "Faux", "Prohibited for professional use from 2 December 2026, on top of criminal and disciplinary law."],
  ],
  4: [
    ["“The AI Act replaces the GDPR for AI.”", "Faux", "The GDPR continues to apply in full, alongside it."],
    ["“SMEs are not exempt, but their fine ceilings are lower.”", "Vrai", "No exemption, but lower fine ceilings and simplifications, extended to SMCs."],
    ["“In the event of a breach, it is the company, not the employee, that pays the AI Act fine.”", "Vrai", "The fine targets the company; the employee is liable on a disciplinary, contractual or criminal basis."],
    ["“Not training staff directly exposes us to a €15M fine.”", "Faux", "Art. 4 is not in the Art. 99 scale, but national law can impose penalties and a lack of training aggravates another infringement."],
  ],
};

const EN_QUIZ = {
  2: [
    { id: "b201", q: "Who is a “deployer” under the AI Act?",
      o: ["The one who uses an AI system under its authority, in its business.", "The one who develops an AI system and sells it under its own name.", "The one who hosts the AI system on its own servers."],
      why: "The deployer <b>uses</b> the system in its business. The provider develops it and places it on the market under its name or trademark." },
    { id: "b202", q: "An IT services company delivers a chatbot to a client, sold under its own brand. It is…",
      o: ["the provider of the chatbot delivered.", "a deployer, since the client is the one using it.", "neither, as a mere service provider."],
      why: "Placing a system on the market <b>under your name or trademark</b>, for payment or free of charge, makes you the <b>provider</b> (Art. 3(3))." },
    { id: "b203", vf: "Vrai", q: "“The same company can be the deployer of one tool and the provider of another.”",
      why: "An IT services company is the deployer of the tools it uses internally and the provider of what it delivers under its brand. The role is determined <b>system by system</b>." },
    { id: "b204", q: "Which of these actions makes you the provider of a high-risk system?",
      o: ["Reconfiguring a general-purpose assistant so that it scores candidates.", "Using Copilot to write the company's job adverts.", "Translating job descriptions with a consumer AI tool."],
      why: "Changing the <b>intended purpose</b> of a system, even a general-purpose one, so that it becomes high-risk makes you its provider (Art. 25(1))." },
    { id: "b205", vf: "Faux", q: "“Making an AI system available free of charge means you cannot be its provider.”",
      why: "You are a provider whether the system is placed on the market <b>for payment or free of charge</b> (Art. 3(3))." },
    { id: "b206", q: "Does fine-tuning a large model (GPT, Mistral…) on your documents make you the provider of the model?",
      o: ["Usually not, unless the modification exceeds one third of the original compute.", "Yes, always: any modification of a model makes you its provider.", "No, never: only the model's creator can be its provider."],
      why: "You only become the provider of the model if the modification compute <b>exceeds one third</b> of the original training compute. But the tool built with it remains your responsibility." },
    { id: "b207", q: "Since when must a chatbot say that it is an AI?",
      o: ["Since 2 August 2026.", "Since 1 August 2024.", "From 2 December 2027."],
      why: "Article 50 has applied to chatbots and deepfakes since <b>2 August 2026</b>." },
    { id: "b208", vf: "Ça dépend", q: "“A chatbot must always state that it is an AI.”",
      why: "That is the rule, from the first exchange (Art. 50(1)), <b>unless it is obvious</b> to a reasonably attentive person." },
    { id: "b209", q: "A chatbot introduces itself as “Julie, adviser”, with a photo, without saying it is an AI.",
      o: ["This does not comply with Article 50.", "This is compliant if its answers are accurate.", "This is compliant if a notice exists on the website."],
      why: "The person must know they are talking to an AI, <b>from the first exchange</b>. Friendly, perhaps; compliant, no." },
    { id: "b210", q: "A company publishes a deepfake video of its CEO, with his consent. What must it do?",
      o: ["Disclose it, for example with a notice or an icon.", "Nothing: the CEO's consent is enough to publish it.", "Remove it: deepfakes are prohibited in principle."],
      why: "Deployers must <b>disclose deepfakes</b> (Art. 50(4)). A deepfake is not prohibited as such." },
    { id: "b211", vf: "Vrai", q: "“Images, sounds and videos generated by AI must be identifiable.”",
      why: "Providers of generative systems <b>mark</b> content in a machine-readable format (Art. 50(2))." },
    { id: "b212", q: "When should you qualify your role (provider or deployer)?",
      o: ["Before delivering, system by system and use by use.", "Once and for all, for the company as a whole.", "Only if a client explicitly asks for it in writing."],
      why: "The role depends on each system and each use: you qualify it <b>before delivering</b> anything." },
  ],
  3: [
    { id: "b301", q: "How many practices has Article 5 prohibited since 2 February 2025?",
      o: ["Eight practices.", "Three practices.", "Fifteen practices."],
      why: "Article 5 lists <b>eight</b> prohibited practices, with two more added on 2 December 2026." },
    { id: "b302", q: "Which of these practices is prohibited?",
      o: ["Giving individuals a social score.", "Sorting CVs with an approved AI tool.", "Analysing customers' emotions on the phone."],
      why: "<b>Social scoring</b> is prohibited. Sorting CVs and analysing customers' emotions are high-risk, not prohibited." },
    { id: "b303", vf: "Faux", q: "“A tool that detects employees' stress is allowed if it aims at their well-being.”",
      why: "Emotion recognition in the workplace is <b>prohibited</b> (Art. 5(1)(f)). General well-being is not a medical reason." },
    { id: "b304", q: "Which reasons allow emotion recognition in the workplace?",
      o: ["Medical or safety reasons.", "Improving the team's well-being.", "The written consent of each employee concerned."],
      why: "Only <b>medical or safety reasons</b> are exceptions to the prohibition." },
    { id: "b305", vf: "Vrai", q: "“The prohibition on emotions at work also applies to job candidates.”",
      why: "Inferring emotions <b>during recruitment</b> is one of the prohibited examples cited by the Commission." },
    { id: "b306", q: "Inferring emotions from emails written by employees…",
      o: ["is not covered by the prohibition, but the GDPR applies.", "is prohibited, like any analysis of emotions at work.", "is free: no text applies to a simple email."],
      why: "The prohibition covers inference from <b>biometric data</b>. Written text is not biometric data, but the <b>GDPR</b> applies." },
    { id: "b307", q: "Which prohibitions are added on 2 December 2026?",
      o: ["Non-consensual intimate deepfakes and child sexual abuse material.", "Scoring employees and automatically sorting applications.", "Chatbots that don't say they are an AI."],
      why: "Two prohibitions are added: <b>realistic intimate content without consent</b> and <b>child sexual abuse material</b>." },
    { id: "b308", q: "Which of these HR uses is high-risk?",
      o: ["Automatically filtering applications.", "Writing a job advert with Copilot.", "Spell-checking a job description."],
      why: "<b>Filtering applications</b> is listed in Annex III (point 4(a)): it is a high-risk use." },
    { id: "b309", q: "From when do the high-risk HR obligations (Annex III) apply?",
      o: ["2 December 2027.", "2 February 2025.", "2 August 2028."],
      why: "Annex III high risk applies from <b>2 December 2027</b>. The GDPR and labour law apply today." },
    { id: "b310", vf: "Faux", q: "“If a human signs the final decision, the sorting tool is no longer high-risk.”",
      why: "Signing is not enough if the tool <b>did the sorting and shaped the judgement</b>." },
    { id: "b311", vf: "Ça dépend", q: "“A use listed in Annex III is necessarily high-risk.”",
      why: "It can fall outside if it is limited to a <b>procedural or preparatory</b> task without replacing the human, to be documented (Art. 6(4)). With <b>profiling</b>, it is always high-risk." },
    { id: "b312", q: "In Luxembourg, from how many employees does a performance-monitoring tool require the delegation's agreement?",
      o: ["150 employees.", "50 employees.", "500 employees."],
      why: "From <b>150 employees</b>, this type of tool requires co-decision with the staff delegation." },
  ],
  4: [
    { id: "b401", q: "What is the most common everyday risk?",
      o: ["Pasting client data into a consumer AI tool.", "Getting an AI Act fine for an email written with AI.", "Using an AI tool approved by the company."],
      why: "The real everyday risk is <b>copying and pasting</b> personal or confidential data into a consumer tool." },
    { id: "b402", vf: "Faux", q: "“The AI Act replaces the GDPR for AI tools.”",
      why: "The AI Act <b>adds to</b> the GDPR, which continues to apply in full (Art. 2(7))." },
    { id: "b403", q: "In 2025, what share of the breaches reported to the CNPD were caused by human error?",
      o: ["Almost half (49%).", "About one in ten (10%).", "Almost all (over 90%)."],
      why: "In Luxembourg, <b>49%</b> of the breaches reported to the CNPD in 2025 were due to human error." },
    { id: "b404", q: "Which is one of the three questions to ask before using AI?",
      o: ["What data am I going to put into the tool?", "How much does the tool's subscription cost?", "Is the tool the most widely used on the market?"],
      why: "The three questions: prohibited or high-risk use? <b>What data</b> goes into the tool? Who needs to be informed?" },
    { id: "b405", q: "A decision about you was made with the help of AI. You can obtain…",
      o: ["an understandable explanation of the AI's role in the decision.", "the full source code of the algorithm used to decide.", "only the name of the provider of the AI tool used."],
      why: "The <b>role of the AI</b> and the main elements of the decision must be explained. Source code is not an explanation." },
    { id: "b406", vf: "Vrai", q: "“The GDPR already regulates solely automated decisions.”",
      why: "<b>Article 22 of the GDPR</b> regulates solely automated decisions, already today." },
    { id: "b407", q: "The GDPR requires a personal data breach to be reported within…",
      o: ["72 hours.", "24 hours.", "30 days."],
      why: "A data breach must be reported within <b>72 hours</b> (GDPR, Art. 33)." },
    { id: "b408", q: "A chatbot shows one client's data to another by mistake. What is the right reflex?",
      o: ["Raise the alarm immediately, without fixing it quietly.", "Fix the bug discreetly so as not to cause concern.", "Wait to find out whether the tool is high-risk."],
      why: "Never fix it quietly: you must <b>raise the alarm immediately</b>, as the 72-hour deadline is running." },
    { id: "b409", q: "What is the maximum fine for a prohibited practice, for a large company?",
      o: ["€35M or 7% of worldwide turnover, whichever is higher.", "€15M or 3% of worldwide turnover, whichever is lower.", "€7.5M or 1% of worldwide turnover, whichever is higher."],
      why: "Prohibited practices: <b>€35M or 7%</b> of worldwide turnover, whichever is higher for a company (Art. 99)." },
    { id: "b410", vf: "Ça dépend", q: "“SMCs, like SMEs, benefit from the lower fine ceiling.”",
      why: "For SMCs, the lower-amount rule only applies to the <b>two lower tiers</b> of the scale, not to prohibited practices." },
    { id: "b411", q: "In Luxembourg, who should supervise the application of the AI Act?",
      o: ["Mainly the CNPD, according to draft law 8476.", "The ITM alone, designated by a law passed in 2025.", "Nobody: the regulation does not apply there yet."],
      why: "The <b>CNPD is the expected authority</b> under draft law 8476, not passed as of 12 October 2026. The regulation itself already applies." },
    { id: "b412", q: "For a financial-sector client, which text is added in case of an IT incident?",
      o: ["DORA, for ICT-related incidents.", "The Data Act, for switching cloud providers.", "NIS2 alone, instead of the GDPR."],
      why: "For financial clients, <b>DORA</b> adds to the GDPR: the ICT incident must also be handled under it." },
  ],
};

const EN_FICHES = {
  2: [
    { title: "Provider or deployer: who does what", render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1.3fr">
        <div>
          <div class="illus">${ILLUS.roles()}</div>
          <div class="card pad flat" style="margin-top:16px">
            <h4 style="margin-bottom:8px">Three ways to become a provider <span class="mini-art">Art. 25(1)</span></h4>
            <ul class="checks">
              <li><span class="ck">1</span>Putting your name or trademark on a high-risk system</li>
              <li><span class="ck">2</span>Making a substantial modification to it</li>
              <li><span class="ck">3</span>Changing the intended purpose of a system, including a general-purpose one, so that it becomes high-risk</li>
            </ul>
          </div>
        </div>
        <div class="card pad flat">
          <h4 style="margin-bottom:6px">What each profile should remember</h4>
          <table><tr><th>Profile</th><th>Key message</th></tr>
            <tr><td><b>All employees</b><br><small class="muted">temporary workers, interns, freelancers</small></td><td>“AI at work is already regulated: approved tools, protected data, doubts reported.”</td></tr>
            <tr><td><b>Developers, data</b></td><td>“As soon as we deliver under our own name, we are a provider.”</td></tr>
            <tr><td><b>HR and managers</b></td><td>“Sorting, scoring or monitoring people with AI is high risk.”</td></tr>
            <tr><td><b>Sales, project managers</b></td><td>“We assess the risk before we quote.”</td></tr>
            <tr><td><b>Management, legal, DPO</b></td><td>“We must be able to prove what we have done.”</td></tr>
          </table>
        </div>
      </div>` },
    { title: "Transparency: Article 50 in practice", render: () => `
      <div class="fiche" style="grid-template-columns:1.2fr 1fr">
        <div>${risks([
          ['var(--p)', 'Chatbots', '', 'The provider designs the system so that people know they are talking to an AI, unless it is obvious.', 'From the first exchange.', '50(1)'],
          ['var(--s)', 'Content marking', '', 'Providers of generative systems mark audio, image, video and text in a machine-readable format.', 'Systems already on the market before 2 August 2026: until 2 December 2026.', '50(2)'],
          ['var(--a)', 'Emotions and biometrics', 'pk', 'Deployers inform the people exposed.', 'E.g. analysing the emotions of a call centre\'s customers.', '50(3)'],
          ['var(--d)', 'Deepfakes and texts of public interest', 'dark', 'Deployers disclose deepfakes and generated texts published to inform the public.', 'Unless there is human review with an editorial manager.', '50(4)'],
        ])}</div>
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:8px">The code of practice of 10 June 2026 ${tagChip('Guide')}</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span>At least two layers of marking where necessary: metadata and watermarking</li>
              <li><span class="ck">${ic('check')}</span>An EU icon or an equivalent label for deepfakes</li>
              <li><span class="ck">${ic('check')}</span>About 190 signatories at the end of July 2026, according to the Commission</li>
            </ul>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:8px">No obligation for…</h4>
            <p class="muted" style="font-size:13.5px">Internal use of Copilot for an email or code. Standard editing assistance. A simple spelling correction is <b>not</b> editorial control.</p>
          </div>
          <div class="note">${ic('alert')}<span>How marking is split between the model provider and the integrator is not settled in the sources consulted. ${tagChip('À vérifier')}</span></div>
        </div>
      </div>` },
  ],
  3: [
    { title: "The red lines of Article 5", render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1fr">
        <div class="card pad flat">
          <h4 style="margin-bottom:10px">Eight practices prohibited since 2 February 2025</h4>
          <ol class="ban">${['Subliminal, manipulative or deceptive techniques causing significant harm', 'Exploiting vulnerabilities (age, disability, social or economic situation)', 'Social scoring', 'Predicting the risk of an offence based solely on profiling', 'Untargeted scraping of facial images', 'Emotion recognition at work and in education, except for medical or safety reasons', 'Biometric categorisation to infer sensitive data', 'Real-time remote biometric identification by law enforcement, with exceptions'].map((t, i) => `<li class="${i === 5 ? 'hl' : ''}"><span>${'abcdefgh'[i]}</span>${t}</li>`).join('')}</ol>
        </div>
        <div>
          <div class="card pad flat" style="background:var(--d);border-color:var(--d);color:#fff">
            <p class="eyebrow" style="color:#F7A8CC">+2 on 2 December 2026</p>
            <ul style="margin:10px 0 0 18px;display:grid;gap:6px;font-size:13.5px">
              <li><b>(ba)</b> Realistic intimate images, videos or sounds of an identifiable person, without their consent</li>
              <li><b>(bb)</b> Child sexual abuse material</li>
            </ul>
            <p style="margin-top:10px;font-size:12.5px;opacity:.8">Provider: prohibited if it is the intended purpose or a foreseeable result without safeguards. Deployer: only if it uses it for that purpose.</p>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:6px">Employment-related examples</h4>
            <ul class="checks">
              <li><span class="ck">${ic('x')}</span>Profiling employees based on their social media to judge their performance (social scoring)</li>
              <li><span class="ck">${ic('x')}</span>Targeting older employees with departure incentives based on their cognitive weaknesses (vulnerabilities)</li>
            </ul>
          </div>
        </div>
      </div>` },
    { title: "High-risk HR: when and what to do", render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1.15fr">
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:8px">Is it high-risk?</h4>
            <div class="flow">
              <div><b>1.</b> Is the use listed in Annex III? <small>Recruitment, employee management, credit, life and health insurance…</small></div>
              <div><b>2.</b> Does it profile people? <small>If so: <b>always</b> high-risk.</small></div>
              <div><b>3.</b> Otherwise, is it limited to a procedural or preparatory task, or to detecting deviations without replacing the human? <small>If so: it may fall outside high risk, to be documented and registered (Art. 6(4)).</small></div>
            </div>
          </div>
          <div class="note">${ic('clock')}<span>Applies from <b>2 December 2027</b> for Annex III. The GDPR and labour law apply today.</span></div>
        </div>
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:6px">The deployer must <span class="mini-art">Art. 26</span></h4>
            <ul class="checks">${['Use the system according to the instructions', 'Assign human oversight to competent, trained people with authority', 'Ensure the input data is relevant', 'Monitor operation and suspend use in case of risk', 'Keep logs for at least six months', 'Inform the people subject to decisions (26(11))', 'Before putting it into service at work: inform representatives and workers (26(7))'].map(t => `<li><span class="ck">${ic('check')}</span>${t}</li>`).join('')}</ul>
          </div>
          <div class="card pad flat" style="margin-top:14px">
            <h4 style="margin-bottom:6px">Impact assessment (FRIA) <span class="mini-art">Art. 27</span></h4>
            <p class="muted" style="font-size:13px">Only for public bodies, private entities providing a public service, and deployers of credit scoring or life and health insurance pricing. It can refer to the GDPR DPIA.</p>
          </div>
        </div>
      </div>` },
  ],
  4: [
    { title: "The three questions and the other texts", render: () => `
      <div class="fiche" style="grid-template-columns:1fr 1.2fr">
        <div>
          <div class="card pad flat" style="background:var(--d);border-color:var(--d);color:#fff">
            <p class="eyebrow" style="color:#F7A8CC">Before any use of AI</p>
            <ol class="q3">${['Is it prohibited or high-risk?', 'What personal or confidential data goes into the tool?', 'Who needs to be informed?'].map(t => `<li>${t}</li>`).join('')}</ol>
          </div>
          <div class="clair" style="margin-top:14px">${ic('bulb')}<div>The real everyday risk: a <b>client data leak</b> into a consumer tool. In 2025, 49% of the breaches reported to the CNPD were due to human error.</div></div>
        </div>
        <div class="card pad flat">
          <table><tr><th>Text</th><th>What you need to know</th></tr>
            <tr><td><b>GDPR</b></td><td>Applies in full, alongside the AI Act (Art. 2(7)). Solely automated decisions are regulated (Art. 22). A breach must be reported within 72 h.</td></tr>
            <tr><td><b>NIS2</b><br><small class="muted">law of 5 May 2026</small></td><td>Covers managed service providers. Authorities: ILR, and CSSF for finance. Early warning within 24 h, notification within 72 h. Up to €10M or 2%.</td></tr>
            <tr><td><b>DORA</b></td><td>For financial clients, the IT services company is an ICT third-party provider: the obligations reach it mainly through the contract.</td></tr>
            <tr><td><b>Data Act</b></td><td>Applicable since 12 September 2025: rules on switching cloud and SaaS providers, switching charges abolished on 12 January 2027.</td></tr>
          </table>
        </div>
      </div>` },
    { title: "Penalties and authorities in Luxembourg", render: () => `
      <div class="fiche" style="grid-template-columns:1.15fr 1fr">
        <div class="card pad flat">
          <h4 style="margin-bottom:6px">The Article 99 ceilings ${tagChip('Loi')}</h4>
          <table><tr><th>Infringement</th><th>Ceiling</th><th>SME</th></tr>
            <tr><td>Prohibited practices (Art. 5)</td><td class="big">€35M<small>or 7%</small></td><td>The lower</td></tr>
            <tr><td>Operators, transparency (Art. 50), value chain</td><td class="big">€15M<small>or 3%</small></td><td>The lower</td></tr>
            <tr><td>Incorrect information to authorities</td><td class="big">€7.5M<small>or 1%</small></td><td>The lower</td></tr>
            <tr><td>AI literacy (Art. 4)</td><td colspan="2"><b>No ceiling</b> in the regulation; national rules</td></tr>
          </table>
          <p class="muted" style="font-size:12px;margin-top:10px">Company: the higher of the two amounts. SME: the lower. SMC: the lower, only for the two lower tiers. <b>The company pays</b>; the employee is liable on a disciplinary, contractual or criminal basis.</p>
        </div>
        <div>
          <div class="card pad flat">
            <h4 style="margin-bottom:6px">In Luxembourg ${tagChip('Projet')}</h4>
            <ul class="checks">
              <li><span class="ck">${ic('check')}</span><div><b>The regulation already applies</b><small>Directly, without a national law.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>CNPD expected</b><small>Draft law 8476, not passed as of 12 October 2026. Contact: ia@cnpd.lu.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>Planned gradation</b><small>Warning, then reprimand, then fine.</small></div></li>
              <li><span class="ck">${ic('check')}</span><div><b>Fundamental rights</b><small>ALIA, CNPD and ITM designated (Art. 77).</small></div></li>
            </ul>
          </div>
          <div class="note">${ic('alert')}<span>No AI Act fine has been found in Luxembourg to date.</span></div>
        </div>
      </div>` },
  ],
};

// Ressources : titres et descriptions (même ordre que OFFICIAL et FURTHER)
const EN_OFFICIAL = [
  ["AI Act text (EN)", "Regulation (EU) 2024/1689 · EUR-Lex", "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng"],
  ["AI Omnibus (EN)", "Regulation (EU) 2026/1744 · EUR-Lex", "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng"],
  ["AI literacy Q&A", "Commission · updated on 27 July 2026"],
  ["Article 50 FAQ", "Commission · transparency"],
  ["AI Act Service Desk", "Explorer, Compliance Checker, questions"],
  ["AI Act Explorer", "Article by article, with the Omnibus amendments"],
  ["CNPD · AI literacy", "Article 4 as seen by the Luxembourg authority"],
  ["CNPD · AI regulation", "Prohibited practices and AI literacy"],
  ["Code of practice: generated content", "Commission · marking and labelling"],
  ["Draft high-risk guidelines", "Commission · 19 May 2026"],
  ["Guichet.lu · Informing employees", "Monitoring and data protection"],
  ["Draft law 8476 file", "Chamber of Deputies"],
];
const EN_FURTHER = ["EDPB curriculum for DPOs", "Council of Europe HELP course", "AILit framework (OECD and Commission)", "Elements of AI", "Objectif IA (France Travail)"];
