# Niveau 4 · Module 2 · version anglaise (mêmes cartes que la vidéo française)
SUBS = [(0, 1.7, "To finish this course,"),
(1.8, 4.9, "let's see what happens when something **goes wrong**."),
(5.0, 7.7, "Imagine a **chatbot** that, by mistake,"),
(7.8, 10.4, "displays **one client's data** to another."),
(10.5, 13.6, "Several texts then apply **at the same time**."),
(13.7, 16.6, "The **GDPR** requires the data breach to be reported"),
(16.7, 18.1, "within **72 hours**."),
(18.2, 20.5, "And for clients in the **financial sector**,"),
(20.6, 23.7, "other rules, such as **DORA**, also come into play."),
(23.8, 26.7, "The right reflex: never **fix it quietly**,"),
(26.8, 28.9, "but **raise the alarm immediately**."),
(29.0, 32.5, "On the AI Act side, penalties can be **heavy**:"),
(32.6, 37.1, "up to **€35 million** or **7%** of worldwide turnover"),
(37.2, 38.9, "for a **prohibited practice**,"),
(39.0, 41.4, "and up to **€15 million** or **3%**"),
(41.5, 43.6, "for a breach of the **transparency** rules."),
(43.7, 48.1, "These are **ceilings**, and it is **the company that pays**, not the employee."),
(48.2, 52.2, "**SMEs** benefit from lower ceilings, but they are **not exempt**."),
(52.3, 55.5, "And in **Luxembourg**, who will supervise?"),
(55.6, 58.2, "The regulation **already applies directly**."),
(58.3, 62.1, "A draft law plans to entrust this role mainly to the **CNPD**,"),
(62.2, 66.1, "but in October 2026, it had **not yet been passed**."),
(66.2, 70.4, "The CNPD is nevertheless **already answering** your questions about AI."),
(70.5, 73.6, "In this module, you will learn to **respond to an incident**,"),
(73.7, 77.4, "to understand the **penalty regime**, and to know **who to turn to**."),
(77.5, 80.4, "This is the **last step** before completing your course."),
(80.5, 81.92, "**Enjoy the end of your training!**")]

def c1(d, im, x, y):
    logo(im, x, y)
    d.text((x, y + 120), "Final step", font=f(80), fill=VIO); d.text((x, y + 240), "When something goes wrong", font=f(34), fill=PK)

def c2(d, im, x, y):
    pill(d, x, y, "INCIDENT", PK, 34)
    t = "GDPR: report within"; d.text((x, y + 80), t, font=f(34, "Medium"), fill=DK); d.text((x + f(34, "Medium").getlength(t) + 14, y + 66), "72 h", font=f(54), fill=VIO)
    d.text((x, y + 140), "Financial sector: DORA too", font=f(34, "Medium"), fill=DK)
    d.text((x, y + 214), "The reflex", font=f(40), fill=VIO)
    crs(d, x, y + 274); d.text((x + 50, y + 270), "Fixing it quietly", font=f(36, "Medium"), fill=DK)
    chk(d, x, y + 334); d.text((x + 50, y + 330), "Raising the alarm now", font=f(36), fill=PK)

def c3(d, im, x, y):
    d.text((x, y), "AI Act penalties", font=f(56), fill=VIO)
    for i, (a, b) in enumerate([("Prohibited practice", "€35M or 7%"), ("Transparency", "€15M or 3%")]):
        yy = y + 100 + i * 120; d.text((x, yy), a, font=f(32, "Medium"), fill=DK); d.text((x, yy + 38), b, font=f(56), fill=PK if i == 0 else VIO)
    d.text((x, y + 346), "of worldwide turnover", font=f(28, "Medium"), fill=DK)

def c4(d, im, x, y):
    d.text((x, y), "Key points", font=f(60), fill=VIO)
    for i, t in enumerate(["These are ceilings", "The company pays, not the employee", "SMEs: lower ceilings,", "but not exempt"]):
        yy = y + 100 + i * 58
        if i < 3: chk(d, x, yy)
        d.text((x + 50, yy - 2), t, font=f(32, "Medium"), fill=DK)

def c5(d, im, x, y):
    d.text((x, y), "Luxembourg", font=f(64), fill=VIO); d.text((x, y + 80), "Who supervises?", font=f(38), fill=PK)
    d.text((x, y + 150), "Regulation already applies", font=f(34, "Medium"), fill=DK)
    t = "Draft law:"; d.text((x, y + 204), t, font=f(34, "Medium"), fill=DK); d.text((x + f(34, "Medium").getlength(t) + 14, y + 194), "CNPD", font=f(50), fill=VIO)
    d.text((x, y + 258), "not yet passed (Oct. 2026)", font=f(28, "Medium"), fill=DK)
    chk(d, x, y + 318); d.text((x + 50, y + 314), "The CNPD already answers", font=f(34), fill=PK)

def c6(d, im, x, y):
    d.text((x, y), "In this module", font=f(60), fill=VIO)
    for i, t in enumerate(["Responding to an incident", "The penalties", "Who to turn to"]):
        yy = y + 100 + i * 76; d.rounded_rectangle((x, yy, x + 52, yy + 52), 14, fill=PK); d.text((x + 14, yy + 2), str(i + 1), font=f(38), fill=WH); d.text((x + 76, yy + 2), t, font=f(38, "Medium"), fill=DK)
    d.text((x, y + 346), "Enjoy the end of your training!", font=f(34), fill=PK)

CARDS = [(440, 0.2, 4.9, c1), (540, 5.0, 28.9, c2), (520, 29.0, 43.6, c3), (440, 43.7, 52.2, c4), (540, 52.3, 70.4, c5), (540, 70.5, 81.92, c6)]
