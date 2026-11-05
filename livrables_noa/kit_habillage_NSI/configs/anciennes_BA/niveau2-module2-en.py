# Niveau 2 · Module 2 · version anglaise (mêmes cartes que la vidéo française)
SUBS = [(0, 5.8, "In this module, we talk about **large AI models**, and about **transparency**."),
(5.9, 9.7, "Large models, such as **GPT**, **Claude** or **Mistral**,"),
(9.8, 12.6, "are called **general-purpose AI models**."),
(12.7, 17.1, "**Good news**: using them, or even **fine-tuning** them on your own documents,"),
(17.2, 20.3, "generally does **not make you the provider** of the model."),
(20.4, 24.6, "But the tool you build with them remains **your responsibility**."),
(24.7, 27.6, "This is where **transparency** comes in."),
(27.7, 33.4, "Since **2 August 2026**, **Article 50** has imposed several obligations."),
(33.5, 35.6, "When a person interacts with a **chatbot**,"),
(35.7, 40.0, "they must know they are **talking to an AI**, from the very first exchange."),
(40.1, 44.5, "**Content generated** by AI, such as images, sounds or videos,"),
(44.6, 46.2, "must be **identifiable**."),
(46.3, 49.9, "And **deepfakes**, content that imitates a real person,"),
(50.0, 51.0, "must be **disclosed**."),
(51.1, 56.8, "Imagine a chatbot that introduces itself as “**Julie, adviser**”, with a photo,"),
(56.9, 59.3, "without ever saying it is **an AI**."),
(59.4, 61.1, "Friendly? Perhaps."),
(61.2, 63.1, "Compliant? **No.**"),
(63.2, 66.4, "Conversely, using **Copilot** to write an email or code"),
(66.5, 70.0, "**internally** does not trigger **any** of these obligations."),
(70.1, 73.2, "Transparency protects the **people exposed** to the system,"),
(73.3, 74.9, "not your **internal use**."),
(75.0, 77.9, "In this module, you will learn to **tell the difference**,"),
(78.0, 80.57, "and to know **when** and **how to inform** people.")]

def c1(d, im, x, y):
    logo(im, x, y)
    d.text((x, y + 120), "Large models", font=f(76), fill=VIO); d.text((x, y + 220), "& transparency", font=f(76), fill=PK)

def c2(d, im, x, y):
    d.text((x, y), "General-purpose AI", font=f(56), fill=VIO)
    bx = x
    for t in ["GPT", "Claude", "Mistral"]: bx += pill(d, bx, y + 90, t, VIO) + 14
    chk(d, x, y + 190); d.text((x + 48, y + 184), "Using or fine-tuning them", font=f(34, "Medium"), fill=DK)
    d.text((x + 48, y + 226), "= you are not the provider", font=f(30, "Medium"), fill=(32, 3, 90, 170))
    d.ellipse((x + 2, y + 290, x + 34, y + 322), fill=PK); d.text((x + 13, y + 288), "!", font=f(28), fill=WH)
    d.text((x + 48, y + 282), "Your tool remains", font=f(34, "Medium"), fill=DK); d.text((x + 48, y + 324), "your responsibility", font=f(34), fill=PK)

def c3(d, im, x, y):
    d.text((x, y), "Article 50", font=f(84), fill=VIO); d.text((x, y + 104), "Since 2 August 2026", font=f(36, "Medium"), fill=PK)
    for i, t in enumerate(["Chatbot: say it is an AI", "Generated content identifiable", "Deepfakes disclosed"]):
        yy = y + 180 + i * 62; chk(d, x, yy + 2); d.text((x + 48, yy), t, font=f(34, "Medium"), fill=DK)

def c4(d, im, x, y):
    d.ellipse((x, y, x + 110, y + 110), fill=VIO); w = f(56).getlength("J"); d.text((x + 55 - w / 2, y + 16), "J", font=f(56), fill=WH)
    d.text((x + 140, y + 6), "Julie", font=f(56), fill=VIO); d.text((x + 140, y + 72), "Adviser", font=f(34, "Medium"), fill=DK)
    d.text((x, y + 160), "Friendly? Perhaps.", font=f(38, "Medium"), fill=DK)
    d.text((x, y + 222), "Compliant?", font=f(48), fill=DK); pill(d, x + 290, y + 218, "NO", PK, 40)

def c5(d, im, x, y):
    d.text((x, y), "Internal use", font=f(60), fill=VIO)
    d.text((x, y + 96), "Copilot: email, code…", font=f(36, "Medium"), fill=DK)
    arr(d, x + 4, y + 176, PK); d.text((x + 60, y + 150), "No obligation", font=f(44), fill=PK)
    d.text((x, y + 230), "Transparency protects", font=f(32, "Medium"), fill=DK); d.text((x, y + 270), "the people exposed", font=f(32), fill=VIO)

def c6(d, im, x, y):
    d.text((x, y), "In this module", font=f(60), fill=VIO)
    for i, t in enumerate(["Telling the difference", "When to inform", "How to inform"]):
        yy = y + 110 + i * 84; d.rounded_rectangle((x, yy, x + 52, yy + 52), 14, fill=PK); d.text((x + 12, yy + 2), str(i + 1), font=f(38), fill=WH); d.text((x + 76, yy + 2), t, font=f(42, "Medium"), fill=DK)

CARDS = [(440, 0.3, 5.8, c1), (540, 5.9, 24.6, c2), (500, 24.7, 51.0, c3), (460, 51.1, 63.1, c4), (480, 63.2, 74.9, c5), (460, 75.0, 80.57, c6)]
