# Niveau 4 · Module 1 · version anglaise (mêmes cartes que la vidéo française)
SUBS = [(0, 4.5, "Welcome to the **final level**: our **everyday reflexes**."),
(4.6, 6.8, "Let's start with the **most common risk**."),
(6.9, 10.9, "It's not a spectacular fine, it's a simple **copy and paste**."),
(11.0, 14.0, "Pasting **names**, **salaries** or **bank details**"),
(14.1, 15.7, "into a **consumer** AI tool"),
(15.8, 19.4, "means exposing information that should **never leave the company**."),
(19.5, 23.3, "Because the AI Act **does not replace the GDPR**:"),
(23.4, 24.8, "it **adds to it**."),
(24.9, 29.3, "As soon as **personal data** goes into an AI tool, the GDPR applies,"),
(29.4, 31.1, "and it applies **today**."),
(31.2, 34.4, "In **Luxembourg**, almost **half** of the data breaches"),
(34.5, 38.7, "reported to the CNPD in 2025 were caused by **human error**."),
(38.8, 42.5, "Before using AI, ask yourself **three questions**."),
(42.6, 45.1, "Is it a **prohibited** or **high-risk** use?"),
(45.2, 47.7, "What **data** am I going to put into the tool?"),
(47.8, 49.9, "And **who needs to be informed**?"),
(50.0, 52.4, "The people concerned also have **rights**."),
(52.5, 55.3, "If a decision about them was made with the help of AI,"),
(55.4, 59.0, "they must be able to obtain an **understandable explanation**."),
(59.1, 63.0, "And no, sending the algorithm's **source code** is **not enough**."),
(63.1, 68.3, "In this module, you will follow **Nora**, a consultant, at the end of a **Friday afternoon**."),
(68.4, 71.2, "With her, you will adopt the **right reflexes**:"),
(71.3, 74.3, "a **tool approved** by the company, **protected data**,"),
(74.4, 76.28, "and **doubts always reported**.")]

def c1(d, im, x, y):
    logo(im, x, y)
    d.text((x, y + 120), "Level 4", font=f(100), fill=VIO); d.text((x, y + 260), "Our everyday reflexes", font=f(44), fill=PK)

def c2(d, im, x, y):
    d.text((x, y), "Risk No. 1", font=f(36, "Medium"), fill=DK); d.text((x, y + 48), "Copy and paste", font=f(64), fill=VIO)
    for i, t in enumerate(["Names", "Salaries", "Bank details"]):
        yy = y + 150 + i * 58; crs(d, x, yy); d.text((x + 50, yy - 2), t, font=f(36, "Medium"), fill=DK)
    arr(d, x + 4, y + 352, PK); d.text((x + 60, y + 330), "into a consumer AI tool", font=f(34), fill=PK)

def c3(d, im, x, y):
    d.text((x, y), "AI Act + GDPR", font=f(64), fill=VIO); d.text((x, y + 80), "The GDPR already applies", font=f(34, "Medium"), fill=DK)
    d.text((x, y + 150), "Luxembourg · CNPD 2025", font=f(30, "Medium"), fill=DK)
    d.text((x, y + 190), "Almost 50%", font=f(72), fill=PK)
    d.text((x, y + 290), "of breaches: human error", font=f(32, "Medium"), fill=DK)

def c4(d, im, x, y):
    d.text((x, y), "3 questions", font=f(64), fill=VIO)
    for i, t in enumerate(["Prohibited or high-risk?", "What data?", "Who to inform?"]):
        yy = y + 110 + i * 80; d.rounded_rectangle((x, yy, x + 52, yy + 52), 14, fill=PK); d.text((x + 14, yy + 2), str(i + 1), font=f(38), fill=WH); d.text((x + 76, yy + 2), t, font=f(40, "Medium"), fill=DK)

def c5(d, im, x, y):
    d.text((x, y), "Right to", font=f(40, "Medium"), fill=DK); d.text((x, y + 50), "an explanation", font=f(72), fill=VIO)
    chk(d, x, y + 176); d.text((x + 50, y + 172), "An understandable explanation", font=f(34, "Medium"), fill=DK)
    crs(d, x, y + 238); d.text((x + 50, y + 234), "Source code is not enough", font=f(34, "Medium"), fill=DK)

def c6(d, im, x, y):
    d.ellipse((x, y, x + 110, y + 110), fill=VIO); w = f(56).getlength("N"); d.text((x + 55 - w / 2, y + 16), "N", font=f(56), fill=WH)
    d.text((x + 140, y + 6), "Nora", font=f(56), fill=VIO); d.text((x + 140, y + 72), "Consultant · Friday evening", font=f(30, "Medium"), fill=DK)
    for i, t in enumerate(["Approved tool", "Protected data", "Doubts reported"]):
        yy = y + 160 + i * 62; chk(d, x, yy); d.text((x + 50, yy - 2), t, font=f(38, "Medium"), fill=DK)

CARDS = [(460, 0.2, 4.5, c1), (540, 4.6, 19.4, c2), (500, 19.5, 38.7, c3), (460, 38.8, 49.9, c4), (440, 50.0, 63.0, c5), (500, 63.1, 76.28, c6)]
