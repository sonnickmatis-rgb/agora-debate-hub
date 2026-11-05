# Niveau 3 · Module 2 · version anglaise (mêmes cartes que la vidéo française)
SUBS = [(0, 3.0, "In this module, we look at **high-risk uses**,"),
(3.1, 5.9, "and in particular at **human resources**."),
(6.0, 11.3, "The AI Act **does not ban** AI in HR, but it **regulates it strictly**."),
(11.4, 14.0, "**Sorting applications**, **assessing candidates**,"),
(14.1, 17.8, "deciding on a **promotion** or monitoring employees' **performance**:"),
(17.9, 20.6, "these uses are classified as **high risk**."),
(20.7, 23.6, "Why? Because a **mistake by the tool**"),
(23.7, 25.8, "can have serious consequences for a person's **working life**."),
(25.9, 31.6, "The obligations linked to these uses will apply from **2 December 2027**."),
(31.7, 35.9, "In particular, they will require **human oversight** by trained people,"),
(36.0, 38.2, "and **informing employees** and their representatives"),
(38.3, 40.8, "before the tool is **put into service**."),
(40.9, 43.2, "Beware of a **common misconception**:"),
(43.3, 46.6, "it is not enough for a human to **sign the final decision**."),
(46.7, 49.4, "If the tool **did the sorting** and shaped the judgement,"),
(49.5, 51.1, "it is still **high risk**."),
(51.2, 54.9, "In **Luxembourg**, labour law goes even further, and **already today**."),
(55.0, 57.7, "Before introducing a **monitoring tool**,"),
(57.8, 60.7, "the company must inform its **staff delegation**."),
(60.8, 64.3, "And from **150 employees**, a tool that monitors performance"),
(64.4, 66.8, "requires **the delegation's agreement**."),
(66.9, 73.1, "In this module, you will follow **Sofia**, HR director, who has to sort **800 applications**."),
(73.2, 76.4, "With her, you will learn to **recognise a high-risk use**,"),
(76.5, 79.68, "and to follow the **right steps** before any deployment.")]

def c1(d, im, x, y):
    logo(im, x, y)
    d.text((x, y + 120), "High risk", font=f(92), fill=VIO); d.text((x, y + 250), "Focus: human resources", font=f(40), fill=PK)

def c2(d, im, x, y):
    d.text((x, y), "HR = high risk", font=f(60), fill=VIO)
    for i, t in enumerate(["Sorting applications", "Assessing candidates", "Promotions", "Performance monitoring"]):
        yy = y + 96 + i * 58; d.ellipse((x, yy + 12, x + 20, yy + 32), fill=PK); d.text((x + 40, yy), t, font=f(34, "Medium"), fill=DK)
    d.text((x, y + 340), "A mistake can affect a career", font=f(30), fill=PK)

def c3(d, im, x, y):
    d.text((x, y), "From", font=f(36, "Medium"), fill=DK); d.text((x, y + 48), "2 Dec. 2027", font=f(84), fill=VIO)
    for i, t in enumerate(["Trained human oversight", "Inform staff and representatives"]):
        yy = y + 180 + i * 64; chk(d, x, yy); d.text((x + 50, yy - 4), t, font=f(34, "Medium"), fill=DK)

def c4(d, im, x, y):
    pill(d, x, y, "MISCONCEPTION", PK, 34)
    d.text((x, y + 90), "“A human signs,", font=f(42, "Medium"), fill=DK); d.text((x, y + 142), "so it's fine”", font=f(42, "Medium"), fill=DK)
    d.text((x, y + 226), "If the tool did the sorting:", font=f(36, "Medium"), fill=DK)
    arr(d, x + 4, y + 300, PK); d.text((x + 60, y + 274), "still high risk", font=f(42), fill=VIO)

def c5(d, im, x, y):
    d.text((x, y), "Luxembourg", font=f(64), fill=VIO); d.text((x, y + 80), "Already today", font=f(36), fill=PK)
    d.text((x, y + 150), "Monitoring:", font=f(34), fill=DK); d.text((x, y + 192), "inform the staff delegation", font=f(30, "Medium"), fill=DK)
    d.text((x, y + 252), "150 employees or more:", font=f(34), fill=DK); d.text((x, y + 294), "its agreement to monitor", font=f(30, "Medium"), fill=DK); d.text((x, y + 334), "performance", font=f(30, "Medium"), fill=DK)

def c6(d, im, x, y):
    d.ellipse((x, y, x + 110, y + 110), fill=PK); w = f(56).getlength("S"); d.text((x + 55 - w / 2, y + 16), "S", font=f(56), fill=WH)
    d.text((x + 140, y + 6), "Sofia", font=f(56), fill=VIO); d.text((x + 140, y + 72), "HR director · 800 applications", font=f(28, "Medium"), fill=DK)
    for i, t in enumerate(["Recognise high risk", "The right steps to follow"]):
        yy = y + 160 + i * 62; chk(d, x, yy); d.text((x + 50, yy - 2), t, font=f(36, "Medium"), fill=DK)

CARDS = [(460, 0.2, 5.9, c1), (540, 6.0, 25.8, c2), (440, 25.9, 40.8, c3), (480, 40.9, 51.1, c4), (540, 51.2, 66.8, c5), (420, 66.9, 79.68, c6)]
