# Niveau 3 · Module 1 · version anglaise (mêmes cartes que la vidéo française)
SUBS = [(0, 3.8, "Welcome to **Level 3**: the **red lines**."),
(3.9, 7.8, "Some uses of AI are simply **prohibited in Europe**."),
(7.9, 14.0, "Since **2 February 2025**, **Article 5** has listed **eight banned practices**."),
(14.1, 17.7, "Among them: **manipulating behaviour** in a deceptive way,"),
(17.8, 20.4, "**exploiting the vulnerability** of certain people,"),
(20.5, 23.3, "or giving individuals a **social score**."),
(23.4, 27.2, "For a company, one prohibition is particularly concrete:"),
(27.3, 29.9, "**emotion recognition** in the workplace."),
(30.0, 33.5, "A tool that analyses employees' **voices** or **faces**"),
(33.6, 36.9, "to detect their stress, anger or engagement **is prohibited**,"),
(37.0, 40.2, "even if it is presented as a **well-being tool**."),
(40.3, 43.7, "Only **medical** or **safety** reasons are exceptions."),
(43.8, 46.9, "And this prohibition also applies to **job candidates**."),
(47.0, 49.1, "But watch out for the **nuances**:"),
(49.2, 51.8, "what is not prohibited **is not necessarily free**."),
(51.9, 54.8, "Analysing **customers' emotions**, for example,"),
(54.9, 57.9, "remains possible, but **strictly regulated**."),
(58.0, 59.7, "And the list **is growing**."),
(59.8, 64.2, "From **2 December 2026**, **two new prohibitions** are added:"),
(64.3, 67.3, "realistic **intimate images or videos** of a person,"),
(67.4, 69.0, "created **without their consent**,"),
(69.1, 71.5, "and **child sexual abuse material**."),
(71.6, 76.2, "In this module, you will follow **Karim** as he faces a **tricky client request**."),
(76.3, 78.4, "You will learn to **recognise a red line**,"),
(78.5, 81.04, "and to **dare to say no** when necessary.")]

def c1(d, im, x, y):
    logo(im, x, y)
    d.text((x, y + 120), "Level 3", font=f(100), fill=VIO); d.text((x, y + 260), "The red lines", font=f(50), fill=PK)

def c2(d, im, x, y):
    d.text((x, y), "Article 5", font=f(84), fill=VIO); d.text((x, y + 104), "8 prohibited practices · since Feb. 2025", font=f(30, "Medium"), fill=PK)
    for i, t in enumerate(["Deceptive manipulation", "Exploiting vulnerabilities", "Social scoring"]):
        yy = y + 176 + i * 62; crs(d, x, yy); d.text((x + 50, yy), t, font=f(36, "Medium"), fill=DK)

def c3(d, im, x, y):
    d.text((x, y), "Emotions at work", font=f(56), fill=VIO); pill(d, x, y + 86, "PROHIBITED", PK, 36)
    d.text((x, y + 176), "Employees' voices or faces", font=f(34, "Medium"), fill=DK)
    d.text((x, y + 220), "Even “well-being” · Candidates too", font=f(30, "Medium"), fill=DK)
    d.text((x, y + 290), "Exceptions: medical, safety", font=f(32), fill=VIO)

def c4(d, im, x, y):
    d.text((x, y), "Nuance", font=f(64), fill=VIO)
    d.text((x, y + 96), "Not prohibited", font=f(40), fill=DK); d.text((x, y + 146), "doesn't mean free", font=f(40), fill=PK)
    d.text((x, y + 224), "Customers' emotions:", font=f(34, "Medium"), fill=DK); d.text((x, y + 266), "possible but strictly regulated", font=f(34), fill=VIO)

def c5(d, im, x, y):
    d.text((x, y), "From 2 Dec. 2026", font=f(36, "Medium"), fill=DK); d.text((x, y + 48), "+ 2 prohibitions", font=f(64), fill=VIO)
    for i, (a, b) in enumerate([("Intimate images or videos", "without consent"), ("Child sexual", "abuse material")]):
        yy = y + 160 + i * 104; crs(d, x, yy); d.text((x + 50, yy - 2), a, font=f(34, "Medium"), fill=DK); d.text((x + 50, yy + 40), b, font=f(34, "Medium"), fill=DK)

def c6(d, im, x, y):
    d.ellipse((x, y, x + 110, y + 110), fill=VIO); w = f(56).getlength("K"); d.text((x + 55 - w / 2, y + 16), "K", font=f(56), fill=WH)
    d.text((x + 140, y + 6), "Karim", font=f(56), fill=VIO); d.text((x + 140, y + 72), "A tricky client request", font=f(30, "Medium"), fill=DK)
    for i, t in enumerate(["Recognise a red line", "Dare to say no"]):
        yy = y + 160 + i * 66; chk(d, x, yy); d.text((x + 50, yy - 4), t, font=f(38, "Medium"), fill=DK)

CARDS = [(480, 0.2, 3.8, c1), (480, 3.9, 23.3, c2), (500, 23.4, 46.9, c3), (460, 47.0, 57.9, c4), (480, 58.0, 71.5, c5), (430, 71.6, 81.04, c6)]
