# Niveau 2 · Module 1 · version anglaise (mêmes cartes que la vidéo française)
SUBS = [(0, 2.0, "Welcome to **Level 2**."),
(2.1, 4.1, "One question will guide us:"),
(4.2, 6.3, "**who is responsible?**"),
(6.4, 9.4, "The AI Act distinguishes **two main roles**."),
(9.5, 11.3, "The **deployer** is the one who **uses**"),
(11.4, 13.6, "an AI system in its business."),
(13.7, 17.0, "When your teams work with **Copilot** or with an **HR tool**,"),
(17.1, 18.9, "your company is a **deployer**."),
(19.0, 22.4, "The **provider**, on the other hand, **develops** a system"),
(22.5, 25.2, "and places it on the market under its **own name or trademark**,"),
(25.3, 27.0, "whether for **payment** or **free of charge**."),
(27.1, 29.9, "The same company can wear **both hats**."),
(30.0, 32.2, "A digital services company is a **deployer**"),
(32.3, 34.4, "when it uses AI tools **internally**…"),
(34.5, 37.8, "and it becomes a **provider** as soon as it delivers"),
(37.9, 40.9, "a **chatbot** or **software** to a client under its own brand."),
(41.0, 45.1, "The role is therefore determined **system by system**, **use by use**."),
(45.2, 46.9, "And there is **a trap**:"),
(47.0, 49.5, "you can become a provider **without meaning to**."),
(49.6, 52.7, "For example, by **reconfiguring** a general-purpose assistant"),
(52.8, 55.3, "so that it **scores candidates** in a recruitment process."),
(55.4, 59.7, "By changing the **purpose** of the tool, you create a **high-risk** system…"),
(59.8, 63.8, "and you become **responsible** for it, with **heavy obligations**."),
(63.9, 68.8, "In this module, you will follow **Karim**, in pre-sales, and **Tom**, a developer."),
(68.9, 72.6, "With them, you will learn to **identify your role** before delivering anything,"),
(72.7, 76.9, "and to spot the moment when **a simple setting** changes everything."),
(77.0, 78.8, "One **reflex** to keep in mind:"),
(78.9, 82.88, "as soon as we deliver **under our own name**, we are the **provider**.")]

def c1(d, im, x, y):
    logo(im, x, y)
    d.text((x, y + 120), "Level 2", font=f(100), fill=VIO); d.text((x, y + 260), "Who is responsible?", font=f(46), fill=PK)

def c2(d, im, x, y):
    d.text((x, y), "Two roles", font=f(64), fill=VIO)
    for i, (t, c, l1, l2) in enumerate([("Deployer", VIO, "Uses AI in its business", "Copilot, HR tool…"), ("Provider", PK, "Places it on the market", "under its name or trademark")]):
        yy = y + 110 + i * 150; d.rounded_rectangle((x, yy, x + 10, yy + 120), 5, fill=c)
        d.text((x + 32, yy - 4), t, font=f(44), fill=c); d.text((x + 32, yy + 54), l1, font=f(32, "Medium"), fill=DK); d.text((x + 32, yy + 92), l2, font=f(28, "Medium"), fill=(32, 3, 90, 170))

def c3(d, im, x, y):
    d.text((x, y), "Two hats", font=f(60), fill=VIO)
    for i, (a, b, c) in enumerate([("Internal tools", "Deployer", VIO), ("Chatbot delivered", "Provider", PK)]):
        yy = y + 110 + i * 90; d.text((x, yy), a, font=f(36, "Medium"), fill=DK); arr(d, x + 320, yy + 26)
        w = f(32).getlength(b); d.rounded_rectangle((x + 380, yy - 4, x + 380 + w + 40, yy + 52), 16, fill=c); d.text((x + 400, yy + 4), b, font=f(32), fill=WH)
    d.text((x, y + 300), "System by system, use by use", font=f(30, "Medium"), fill=PK)

def c4(d, im, x, y):
    pill(d, x, y, "THE TRAP", PK, 34)
    for i, (t, c) in enumerate([("General-purpose assistant", DK), ("Scores candidates", DK), ("High risk", PK), ("You become the provider", VIO)]):
        yy = y + 90 + i * 72
        if i: arr(d, x + 4, yy + 26, PK)
        d.text((x + 60 if i else x, yy), t, font=f(40 if i > 1 else 36, "Bold" if i > 1 else "Medium"), fill=c)

def c5(d, im, x, y):
    d.text((x, y), "You will follow", font=f(40, "Medium"), fill=DK)
    for i, (n, r, c) in enumerate([("Karim", "Pre-sales", VIO), ("Tom", "Developer", PK)]):
        yy = y + 80 + i * 140; d.ellipse((x, yy, x + 110, yy + 110), fill=c); w = f(56).getlength(n[0]); d.text((x + 55 - w / 2, yy + 16), n[0], font=f(56), fill=WH)
        d.text((x + 140, yy + 6), n, font=f(56), fill=c); d.text((x + 140, yy + 72), r, font=f(34, "Medium"), fill=DK)

def c6(d, im, x, y):
    d.text((x, y), "The reflex", font=f(44, "Medium"), fill=DK)
    d.text((x, y + 70), "Delivered under", font=f(64), fill=VIO); d.text((x, y + 148), "our own name", font=f(64), fill=VIO)
    d.text((x, y + 240), "= provider", font=f(64), fill=PK)

CARDS = [(480, 0.3, 6.3, c1), (520, 6.4, 27.0, c2), (460, 27.1, 45.1, c3), (500, 45.2, 63.8, c4), (460, 63.9, 76.9, c5), (460, 77.0, 82.88, c6)]
