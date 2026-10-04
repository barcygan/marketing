// Barometr Relacji / Relationship Barometer Logic
// Oparty na rzetelnej wiedzy o dynamice par i psychologii relacji (m.in. badania Gottmana i model CSI)

const CONFIG = {
  pl: {
    categories: {
      communication: "Rozmowa i konflikty",
      intimacy: "Bliskość i seks",
      trust: "Zaufanie i oparcie",
      vision: "Czas we dwoje i plany"
    },
    questions: [
      {
        category: "communication",
        text: "Czy podczas trudnej rozmowy czujesz, że partner naprawdę próbuje Cię zrozumieć, zamiast od razu się bronić, tłumaczyć lub atakować?"
      },
      {
        category: "communication",
        text: "Gdy pojawia się różnica zdań lub spór, jak najczęściej reagujecie w sytuacjach napięcia?",
        options: [
          { text: "Rozmawiamy spokojnie i szukamy porozumienia", score: 3 },
          { text: "Potrzebujemy chwili na ochłonięcie, ale szybko wracamy do dialogu", score: 2 },
          { text: "Często pojawia się chłód, wycofanie lub wielogodzinne milczenie", score: 1 },
          { text: "Prawie zawsze kończy się „cichymi dniami” i emocjonalnym murem", score: 0 }
        ]
      },
      {
        category: "communication",
        text: "Czy po sprzeczce potraficie w porę rozładować napięcie (gestem, przytuleniem, humorem) i wrócić do bliskości bez trzymania urazy?"
      },
      {
        category: "intimacy",
        text: "Czy w ciągu dnia jest między Wami spontaniczna czułość (przytulenie, pocałunek, złapanie za rękę), która nie musi prowadzić do seksu?",
        options: [
          { text: "Bardzo często — czułość i bliskość towarzyszą nam na co dzień", score: 3 },
          { text: "Umiarkowanie — okazujemy sobie bliskość, ale mogłoby być jej więcej", score: 2 },
          { text: "Rzadko — dotykamy się sporadycznie, brakuje mi tego", score: 1 },
          { text: "Prawie wcale — w naszej codzienności prawie zupełnie brakuje czułości", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "Jak oceniasz Wasze zbliżenia intymne — na ile odpowiadają Waszym potrzebom?",
        options: [
          { text: "Dają nam obojgu spełnienie i poczucie bliskości", score: 3 },
          { text: "Jest w porządku, choć wkradła się rutyna i chcemy nad tym popracować", score: 2 },
          { text: "Zbliżenia są zbyt rzadkie lub jednostronne, czuję niedosyt", score: 1 },
          { text: "Prawie zanikły lub są częstym źródłem napięć i kryzysu", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "Czy możesz swobodnie i bez wstydu rozmawiać z partnerem o swoich pragnieniach, fantazjach lub trudnościach w sypialni?"
      },
      {
        category: "trust",
        text: "Gdy masz gorszy dzień lub trudny moment, czy czujesz w partnerze oparcie, a nie kolejne źródło krytyki?"
      },
      {
        category: "trust",
        text: "Czy czujesz w relacji spokój i zaufanie — bez podejrzliwości, ukrytych pretensji i chęci kontroli?"
      },
      {
        category: "trust",
        text: "Czy czujesz, że jesteś dla partnera ważna/y i akceptowana/y taka/im, jaka/i jesteś — ze wszystkimi słabościami?"
      },
      {
        category: "vision",
        text: "Czy czujesz, że gracie w jednej drużynie i macie spójny kierunek w kluczowych sprawach (rodzina, finanse, plany)?"
      },
      {
        category: "vision",
        text: "Czy dbacie o czas wyłącznie dla Was dwojga (randki, spokojne rozmowy), czy relację zdominowały codzienne obowiązki?",
        options: [
          { text: "Regularnie planujemy randki i czas tylko we dwoje", score: 3 },
          { text: "Miewamy chwile dla siebie, ale często przegrywają z obowiązkami", score: 2 },
          { text: "Większość energii pochłania dom i praca, rzadko jesteśmy sami", score: 1 },
          { text: "Funkcjonujemy głównie jak współlokatorzy zarządzający domem", score: 0 }
        ]
      },
      {
        category: "vision",
        text: "Czy partner zauważa Twoje codzienne starania i okazuje Ci wdzięczność, sprawiając, że czujesz się doceniona/y?"
      }
    ],
    options: [
      { text: "Zdecydowanie tak", score: 3 },
      { text: "Raczej tak", score: 2 },
      { text: "Raczej nie", score: 1 },
      { text: "Zdecydowanie nie", score: 0 }
    ],
    categoryFeedback: {
      communication: {
        patternName: "Błędne koło: pretensje i milczenie",
        strength: "Potraficie ze sobą rozmawiać nawet wtedy, gdy pojawiają się trudne emocje. Słuchacie się nawzajem, potraficie przeprosić i nie zostawiacie sporów bez rozwiązania.",
        work: "W trudnych chwilach jedno z Was próbuje natychmiast wyjaśnić sprawę, a drugie czuje przytłoczenie i zamyka się w sobie lub milczy. To powszechny mechanizm obronny — nie wynika ze złej woli, ale z bezradności i lęku przed kolejną kłótnią."
      },
      intimacy: {
        patternName: "Chłód w sypialni i syndrom współlokatorów",
        strength: "Czułość i bliskość są naturalną częścią Waszego dnia. Potraficie okazywać sobie czułość bez presji i otwarcie rozmawiać o swoich potrzebach.",
        work: "Codzienność i zmęczenie zepchnęły bliskość fizyczną na dalszy plan. Dotyk pojawia się rzadko — często w obawie, że będzie odczytany jako zaproszenie do seksu, na który brakuje sił. To rodzi dystans, ale można go stopniowo przełamać."
      },
      trust: {
        patternName: "Brak poczucia bezpieczeństwa i oparcia",
        strength: "Dajecie sobie wzajemne oparcie i poczucie spokoju. Wiecie, że możecie na sobie polegać także w gorszych momentach.",
        work: "Brakuje Wam poczucia, że w trudnej chwili możecie na sobie bezwarunkowo polegać. Zamiast spokoju pojawia się obawa przed krytyką, oceną albo wzajemne pretensje. Bez poczucia bezpieczeństwa trudno o prawdziwą bliskość."
      },
      vision: {
        patternName: "Pułapka firmy 'Dom i Dzieci'",
        strength: "Czujecie, że gracie w jednej drużynie. Macie wspólne cele i dbacie o to, by poza codziennymi obowiązkami mieć czas wyłącznie dla siebie.",
        work: "Obowiązki, praca i dzieci przejęły całą Waszą uwagę. Jako zespół organizacyjny działacie sprawnie, ale zgubiliście czas tylko dla siebie. Długo odkładana relacja we dwoje zaczyna przypominać życie obok siebie."
      }
    },
    thresholds: [
      { min: 0, max: 12, status: "Głęboki kryzys", class: "status-crisis", title: "Wasz związek przechodzi przez trudny czas", feedback: "Wynik wskazuje na silne napięcie i poczucie oddalenia. Kryzys bywa wyczerpujący, ale jest też wyraźnym sygnałem, że dotychczasowe sposoby radzenia sobie przestały działać. Poniżej zobaczysz, które sfery wymagają najpilniejszej uwagi." },
      { min: 13, max: 24, status: "Dobra baza, ale rutyna daje znać", class: "status-work", title: "Macie solidne podstawy, ale rutyna uśpiła czujność", feedback: "W Waszym związku jest stabilność, ale codzienne obowiązki i zmęczenie osłabiają Waszą bliskość. Zobacz poniżej, gdzie najłatwiej zacząć wprowadzać małe zmiany." },
      { min: 25, max: 36, status: "Silna, bliska więź", class: "status-good", title: "Tworzycie bliski i bezpieczny związek", feedback: "Wasz wynik pokazuje wysoki poziom zaufania, wsparcia i satysfakcji. Poniższa analiza podpowie Wam, na czym opiera się Wasza siła i o co warto dbać na co dzień." }
    ],
    labels: {
      progress: "Pytanie {current} z {total}",
      back: "Wstecz",
      scoreTitle: "Wasz Wynik",
      sharePreFill: "Wyniki mojego Barometru Relacji:\n- Wynik ogólny: {score}/36 ({status})\n- Rozmowa i konflikty: {comm}%\n- Bliskość i seks: {intim}%\n- Zaufanie i oparcie: {trust}%\n- Czas we dwoje i plany: {vision}%\n\nSiła relacji: {strength}\nObszar do poprawy: {work}\nChcemy umówić konsultację partnerską."
    },
    ebookRecommendations: {
      communication: {
        title: "E-Book: Trudne Rozmowy",
        subtitle: "Jak słuchać, mówić i zostać razem",
        desc: "Jeśli w trudnych momentach pojawia się u Was mur milczenia lub wzajemne pretensje, ten przewodnik da Wam konkretne wskazówki, jak przerwać błędne koło i spokojnie porozmawiać.",
        badge: "Rekomendacja na podstawie wyniku • Rabat 25%",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Kup E-Book ze Zniżką 25% →",
        link: "https://cart.easy.tools/checkout/kcygan/trudne-rozmowy-jak-sluchac-mowic-i-zostac-razem?promo=BAROMETR",
        coverImage: "../ebook/okladka-trudne-rozmowy.jpg",
        coverAlt: "Okładka e-booka Trudne Rozmowy"
      },
      intimacy: {
        title: "E-Book: Bliskość i Namiętność po latach",
        subtitle: "Jak znów chcieć — i być chcianym",
        desc: "Praktyczny przewodnik o tym, jak powoli odbudować czułość i pożądanie, gdy zmęczenie, dzieci i codzienna rutyna zgasiły namiętność w sypialni.",
        badge: "Rekomendacja na podstawie wyniku • Rabat 25%",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Kup E-Book ze Zniżką 25% →",
        link: "https://cart.easy.tools/checkout/kcygan/bliskosc-i-namietnosc-po-latach-jak-znow-chciec-i-byc-chcianaym?promo=BAROMETR",
        coverImage: "../ebook/okladka-bliskosc-i-namietnosc.jpg",
        coverAlt: "Okładka e-booka Bliskość i Namiętność po latach"
      },
      trust: {
        title: "E-Book: Trudne Rozmowy",
        subtitle: "Jak słuchać, mówić i zostać razem",
        desc: "Odbudowa poczucia bezpieczeństwa zaczyna się od szczerego dialogu bez wzajemnej obrony i oskarżeń. Skondensowana wiedza i pytania do wspólnej rozmowy.",
        badge: "Rekomendacja na podstawie wyniku • Rabat 25%",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Kup E-Book ze Zniżką 25% →",
        link: "https://cart.easy.tools/checkout/kcygan/trudne-rozmowy-jak-sluchac-mowic-i-zostac-razem?promo=BAROMETR",
        coverImage: "../ebook/okladka-trudne-rozmowy.jpg",
        coverAlt: "Okładka e-booka Trudne Rozmowy"
      },
      vision: {
        title: "E-Book: Partner czy dzieci?",
        subtitle: "Jak nie zgubić dwójki w rodzinie",
        desc: "Dla par, które świetnie zarządzają domem, ale zgubiły w tym bycie razem. Zestaw 10 pytań, które pomagają odzyskać przestrzeń na relację we dwoje.",
        badge: "Rekomendacja na podstawie wyniku • Rabat 25%",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Kup E-Book ze Zniżką 25% →",
        link: "https://cart.easy.tools/checkout/kcygan/partner-czy-dzieci-jak-nie-zgubic-dwojki-w-rodzinie?promo=BAROMETR",
        coverImage: "../ebook/okladka-partner-czy-dzieci.jpg",
        coverAlt: "Okładka e-booka Partner czy dzieci?"
      },
      crisisBundle: {
        title: "Pakiet 3 E-Booków: Kompletna Więź",
        subtitle: "Trzy skondensowane przewodniki relacyjne (Esencja + Pytania dla Pary)",
        desc: "Kompleksowy pakiet poradników, który krok po kroku pomaga popracować nad rozmową, bliskością w sypialni i przestrzenią dla Waszej dwójki.",
        badge: "Kompletny pakiet • Rabat 25%",
        price: "44,99 PLN",
        discountPrice: "33,74 PLN",
        cta: "Kup Pakiet 3 E-Booków ze Zniżką →",
        link: "https://cart.easy.tools/checkout/kcygan/kompletna-wiez-wszystkie-3-e-booki-o-relacji-partnerskiej?promo=BAROMETR",
        coverImage: "../ebook/okladka-partner-czy-dzieci.jpg",
        coverAlt: "Okładki wszystkich 3 e-booków"
      }
    }
  },
  en: {
    categories: {
      communication: "Communication & Conflict",
      intimacy: "Intimacy & Sex",
      trust: "Trust & Support",
      vision: "Couple Time & Shared Goals"
    },
    questions: [
      {
        category: "communication",
        text: "During difficult conversations, do you feel your partner genuinely tries to understand you instead of immediately defending, explaining, or attacking?"
      },
      {
        category: "communication",
        text: "When disagreements or conflicts arise, how do you typically respond in moments of tension?",
        options: [
          { text: "We talk calmly and seek understanding without shutting down", score: 3 },
          { text: "We sometimes need a moment to cool off, but quickly return to dialogue", score: 2 },
          { text: "Emotional distance, withdrawal, or hours of silence often occur", score: 1 },
          { text: "It almost always ends in multi-day silent treatments and an emotional wall", score: 0 }
        ]
      },
      {
        category: "communication",
        text: "After an argument, are you able to ease the tension in time (with a gesture, a hug, humor) and reconnect without holding grudges?"
      },
      {
        category: "intimacy",
        text: "Do you share spontaneous, affectionate touch during the day (hugs, kisses, holding hands) that doesn't have to lead to sex?",
        options: [
          { text: "Very often — affection and closeness are part of our everyday life", score: 3 },
          { text: "Moderately — we show each other affection, but we could use more", score: 2 },
          { text: "Rarely — we touch infrequently, and I feel a real lack of connection", score: 1 },
          { text: "Almost never — our daily life is virtually devoid of physical affection", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "How would you describe your intimate life — to what extent does it meet your needs?",
        options: [
          { text: "It brings fulfillment and emotional connection for both of us", score: 3 },
          { text: "It is fine, though routine has set in and we want to work on it", score: 2 },
          { text: "Intimacy is too rare or one-sided, leaving me frustrated", score: 1 },
          { text: "It has almost stopped or is a frequent source of conflict and crisis", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "Do you feel comfortable talking openly with your partner about your desires, fantasies, or bedroom challenges without shame?"
      },
      {
        category: "trust",
        text: "When you are having a rough day or facing hardship, do you feel your partner is supportive rather than another source of criticism?"
      },
      {
        category: "trust",
        text: "Do you feel peace and genuine trust in your relationship — free from suspicion, hidden resentment, and control?"
      },
      {
        category: "trust",
        text: "Do you feel truly valued and accepted by your partner as you are, including your vulnerabilities?"
      },
      {
        category: "vision",
        text: "Do you feel you are playing on the same team, with an aligned direction for family, finances, and life goals?"
      },
      {
        category: "vision",
        text: "Do you deliberately protect time just for the two of you (dates, quiet conversations), or have daily duties taken over?",
        options: [
          { text: "We regularly plan dates and couple time to nurture our bond", score: 3 },
          { text: "We occasionally get time together, but chores often take over", score: 2 },
          { text: "Most energy goes into work and household logistics; we are rarely alone", score: 1 },
          { text: "We function mostly like roommates managing a household", score: 0 }
        ]
      },
      {
        category: "vision",
        text: "Does your partner notice your daily efforts and show appreciation, making you feel valued?"
      }
    ],
    options: [
      { text: "Definitely yes", score: 3 },
      { text: "Rather yes", score: 2 },
      { text: "Rather no", score: 1 },
      { text: "Definitely no", score: 0 }
    ],
    categoryFeedback: {
      communication: {
        patternName: "Demand-Withdraw Cycle: Pressure & Silence",
        strength: "You can talk through difficult moments without attacking each other. You listen with care, apologize sincerely, and repair connection quickly.",
        work: "Under stress, one partner pushes to resolve things right away while the other feels overwhelmed and shuts down. This common defense mechanism stems from exhaustion, not lack of love."
      },
      intimacy: {
        patternName: "Roommate Mode: Lost Tenderness",
        strength: "Physical closeness and affection are natural parts of your everyday life. You share touch freely and talk comfortably about your needs.",
        work: "Daily stress and fatigue have pushed physical intimacy aside. Touch is rare — often out of worry it will be seen as an expectation for sex. This creates distance, but it can be rebuilt step by step."
      },
      trust: {
        patternName: "Shaky Ground: Missing Emotional Safety",
        strength: "You provide a calm, reassuring anchor for each other. You know you can count on each other even during tough times.",
        work: "You miss feeling that you can lean on each other without reservation. Instead of feeling comforted, moments of vulnerability bring fear of criticism or blame."
      },
      vision: {
        patternName: "The Household Trap: Roommates Managing Life",
        strength: "You feel you are on the same team. You share common priorities and protect quality time just for the two of you.",
        work: "Parenting and household chores have taken over your shared life. You manage daily tasks well, but have lost intentional time as partners."
      }
    },
    thresholds: [
      { min: 0, max: 12, status: "Relationship Crisis", class: "status-crisis", title: "Your relationship is going through a difficult time", feedback: "Your score points to significant emotional distance and strain. A crisis can be exhausting, but it is also a clear signal to rethink old patterns. Below is where to start." },
      { min: 13, max: 24, status: "Good foundation, but routine has set in", class: "status-work", title: "Good foundation, but routine has taken over", feedback: "Your bond is resilient, but daily busyness has created some distance. Check below which areas are most receptive to small, intentional shifts." },
      { min: 25, max: 36, status: "Strong, close bond", class: "status-good", title: "You share a close and safe partnership", feedback: "Your results show high trust, mutual support, and intimacy. The breakdown below highlights your greatest strengths and what to keep nurturing." }
    ],
    labels: {
      progress: "Question {current} of {total}",
      back: "Back",
      scoreTitle: "Your Score",
      sharePreFill: "My Relationship Barometer results:\n- Overall score: {score}/36 ({status})\n- Communication & Conflict: {comm}%\n- Intimacy & Sex: {intim}%\n- Trust & Support: {trust}%\n- Couple Time & Shared Goals: {vision}%\n\nOur strength: {strength}\nArea to work on: {work}\nWe would like to schedule a couples consultation."
    },
    ebookRecommendations: {
      communication: {
        title: "E-Book: Difficult Conversations",
        subtitle: "How to listen, speak and stay together",
        desc: "When tough talks turn into silent walls or blame, this guide gives you practical tools to break the cycle and speak without triggering defenses.",
        badge: "Recommended for your score • 25% off",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Buy E-Book with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/trudne-rozmowy-jak-sluchac-mowic-i-zostac-razem?promo=BAROMETR",
        coverImage: "../ebook/okladka-trudne-rozmowy.jpg",
        coverAlt: "Difficult Conversations e-book cover"
      },
      intimacy: {
        title: "E-Book: Intimacy & Passion Over the Years",
        subtitle: "How to want again — and be wanted",
        desc: "A practical guide to gently rekindling tenderness and desire when exhaustion, routine, and kids have cooled down the bedroom.",
        badge: "Recommended for your score • 25% off",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Buy E-Book with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/bliskosc-i-namietnosc-po-latach-jak-znow-chciec-i-byc-chcianaym?promo=BAROMETR",
        coverImage: "../ebook/okladka-bliskosc-i-namietnosc.jpg",
        coverAlt: "Intimacy & Passion e-book cover"
      },
      trust: {
        title: "E-Book: Difficult Conversations",
        subtitle: "How to listen, speak and stay together",
        desc: "Rebuilding emotional safety starts with open, judgment-free conversations. Condensed insights and guiding questions for couples.",
        badge: "Recommended for your score • 25% off",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Buy E-Book with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/trudne-rozmowy-jak-sluchac-mowic-i-zostac-razem?promo=BAROMETR",
        coverImage: "../ebook/okladka-trudne-rozmowy.jpg",
        coverAlt: "Difficult Conversations e-book cover"
      },
      vision: {
        title: "E-Book: Partner or Children?",
        subtitle: "How not to lose your couple bond in family life",
        desc: "For couples who have become a great parenting team, but miss just being partners. 10 questions to help put the couple back at the center.",
        badge: "Recommended for your score • 25% off",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Buy E-Book with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/partner-czy-dzieci-jak-nie-zgubic-dwojki-w-rodzinie?promo=BAROMETR",
        coverImage: "../ebook/okladka-partner-czy-dzieci.jpg",
        coverAlt: "Partner or Children e-book cover"
      },
      crisisBundle: {
        title: "Bundle: Complete Relationship Bond (3 E-Books)",
        subtitle: "All 3 condensed guides (Essence + Reflection Questions)",
        desc: "A complete toolkit to guide you through repairing communication, reviving physical closeness, and restoring balance in your daily life.",
        badge: "Complete Bundle • 25% off",
        price: "44,99 PLN",
        discountPrice: "33,74 PLN",
        cta: "Buy 3 E-Book Bundle with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/kompletna-wiez-wszystkie-3-e-booki-o-relacji-partnerskiej?promo=BAROMETR",
        coverImage: "../ebook/okladka-partner-czy-dzieci.jpg",
        coverAlt: "All 3 e-book covers"
      }
    }
  }
};

function initBarometr() {
  const isEn = document.documentElement.lang === "en" || window.location.pathname.includes("/en/");
  const lang = isEn ? "en" : "pl";
  const t = CONFIG[lang];

  let currentQuestionIndex = 0;
  let answers = [];

  // DOM Elements
  const screenWelcome = document.getElementById("screen-welcome");
  const screenQuiz = document.getElementById("screen-quiz");
  const screenResults = document.getElementById("screen-results");

  const btnStart = document.getElementById("btn-start");
  const btnBack = document.getElementById("btn-back");

  const progressText = document.getElementById("progress-text");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const questionTitle = document.getElementById("question-title");
  const optionsContainer = document.getElementById("options-container");

  const gaugeFill = document.getElementById("gauge-fill");
  const gaugeScore = document.getElementById("gauge-score");
  const resultStatus = document.getElementById("result-status");
  const resultFeedbackTitle = document.getElementById("result-feedback-title");
  const resultFeedbackText = document.getElementById("result-feedback-text");

  // Dynamic feedback elements
  const scoresBreakdownContainer = document.getElementById("scores-breakdown");
  const diagnosticStrengthBox = document.getElementById("diagnostic-strength-box");
  const diagnosticWorkBox = document.getElementById("diagnostic-work-box");

  const btnPrint = document.getElementById("btn-print");
  const btnShare = document.getElementById("btn-share");

  if (btnStart) btnStart.addEventListener("click", startQuiz);
  if (btnBack) btnBack.addEventListener("click", goBack);
  if (btnPrint) btnPrint.addEventListener("click", () => window.print());
  if (btnShare) btnShare.addEventListener("click", prefillContactForm);

  function startQuiz() {
    screenWelcome.classList.remove("active");
    setTimeout(() => {
      screenWelcome.style.display = "none";
      screenQuiz.style.display = "block";
      showQuestion();
      setTimeout(() => {
        screenQuiz.classList.add("active");
      }, 50);
    }, 300);

    if (typeof gtag === 'function') {
      gtag('event', 'barometr_start');
    }
  }

  function showQuestion() {
    const qObj = t.questions[currentQuestionIndex];
    questionTitle.textContent = qObj.text;

    // Progress bar update
    const totalQuestions = t.questions.length;
    progressText.textContent = t.labels.progress
      .replace("{current}", currentQuestionIndex + 1)
      .replace("{total}", totalQuestions);

    const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
    progressBarFill.style.width = `${progressPercent}%`;

    if (typeof gtag === 'function') {
      gtag('event', 'barometr_step', { step: currentQuestionIndex + 1 });
    }

    // Render options (fallback to global options if no custom options are provided)
    const options = qObj.options || t.options;
    optionsContainer.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => selectOption(opt.score));
      optionsContainer.appendChild(btn);
    });

    // Toggle Back button
    if (currentQuestionIndex === 0) {
      btnBack.style.opacity = "0.3";
      btnBack.style.pointerEvents = "none";
    } else {
      btnBack.style.opacity = "1";
      btnBack.style.pointerEvents = "auto";
    }
  }

  function selectOption(score) {
    answers[currentQuestionIndex] = score;

    if (currentQuestionIndex < t.questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      showResults();
    }
  }

  function goBack() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  }

  function showResults() {
    screenQuiz.classList.remove("active");
    setTimeout(() => {
      screenQuiz.style.display = "none";
      screenResults.style.display = "block";
      setTimeout(() => {
        screenResults.classList.add("active");
        calculateScore();
      }, 50);
    }, 400);
  }

  function calculateScore() {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const maxOverallScore = t.questions.length * 3; // 36

    // Animate Overall Gauge SVG Ring
    const circumference = 565.48;
    const offset = circumference - (totalScore / maxOverallScore) * circumference;
    gaugeFill.style.strokeDashoffset = offset;
    gaugeScore.textContent = totalScore;

    // Retrieve Overall Threshold Feedback
    const overallResult = t.thresholds.find((th) => totalScore >= th.min && totalScore <= th.max);
    resultStatus.textContent = overallResult.status;
    resultStatus.className = `result-status-badge ${overallResult.class}`;
    resultFeedbackTitle.textContent = overallResult.title;
    resultFeedbackText.textContent = overallResult.feedback;

    if (typeof gtag === 'function') {
      gtag('event', 'barometr_complete', { score: totalScore, status: overallResult.status });
    }

    // Calculate Category Scores
    const categoryScores = {
      communication: { earned: 0, total: 0 },
      intimacy: { earned: 0, total: 0 },
      trust: { earned: 0, total: 0 },
      vision: { earned: 0, total: 0 }
    };

    t.questions.forEach((q, idx) => {
      categoryScores[q.category].earned += answers[idx];
      categoryScores[q.category].total += 3; // Max 3 points per question
    });

    const categoryPercentages = {};
    Object.keys(categoryScores).forEach((cat) => {
      const earned = categoryScores[cat].earned;
      const total = categoryScores[cat].total;
      categoryPercentages[cat] = Math.round((earned / total) * 100);
    });

    // Render Category Breakdown Progress Bars
    if (scoresBreakdownContainer) {
      scoresBreakdownContainer.innerHTML = "";
      Object.keys(categoryPercentages).forEach((cat) => {
        const percent = categoryPercentages[cat];
        const label = t.categories[cat];

        const item = document.createElement("div");
        item.className = "section-score-item";
        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--color-text);">
            <span>${label}</span>
            <span>${percent}%</span>
          </div>
          <div class="section-score-bar">
            <div class="section-score-fill" style="width: ${percent}%;"></div>
          </div>
        `;
        scoresBreakdownContainer.appendChild(item);
      });
    }

    // Determine Strongest and Weakest Categories
    let minCat = "communication";
    let maxCat = "communication";
    let minVal = 101;
    let maxVal = -1;

    Object.keys(categoryPercentages).forEach((cat) => {
      const val = categoryPercentages[cat];
      if (val < minVal) {
        minVal = val;
        minCat = cat;
      }
      if (val > maxVal) {
        maxVal = val;
        maxCat = cat;
      }
    });

    const strengthFeedback = t.categoryFeedback[maxCat].strength;
    const workFeedback = t.categoryFeedback[minCat].work;
    const isGlobalCrisis = totalScore <= 12;

    // Render Dynamic Diagnostic Boxes
    if (diagnosticStrengthBox) {
      if (maxVal < 35 || isGlobalCrisis) {
        diagnosticStrengthBox.innerHTML = `
          <strong style="display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; margin-bottom: 0.5rem; color: #3b82f6;">
            ${lang === 'en' ? 'Where to Start' : 'Od czego zacząć'}
          </strong>
          <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.5;">
            ${lang === 'en' 
              ? 'When tension is high across multiple areas, trying to fix everything at once causes overwhelm. Start with small, safe steps in communication and listening.' 
              : 'Gdy w relacji pojawia się silny kryzys, próba naprawienia wszystkiego naraz przytłacza. Warto zacząć od małych kroków — przede wszystkim od zatrzymania wzajemnych pretensji i bezpiecznej rozmowy.'}
          </p>
        `;
      } else {
        diagnosticStrengthBox.innerHTML = `
          <strong style="display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; margin-bottom: 0.5rem; color: #10b981;">
            ✓ ${t.categories[maxCat]} (${maxVal}%) — ${lang === 'en' ? 'Your Greatest Strength' : 'Wasz najsilniejszy obszar'}
          </strong>
          <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.5;">${strengthFeedback}</p>
        `;
      }
    }

    if (diagnosticWorkBox) {
      if (minVal >= 75) {
        diagnosticWorkBox.innerHTML = `
          <strong style="display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; margin-bottom: 0.5rem; color: #8b5cf6;">
            ✨ ${lang === 'en' ? 'Nurturing Your Closeness' : 'Jak dbać o tę więź'}
          </strong>
          <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.5;">
            ${lang === 'en'
              ? 'Your relationship rests on healthy, secure foundations. Keep nurturing couple time and daily affection so that closeness stays vibrant across the years.'
              : 'Wszystkie obszary funkcjonują bardzo dobrze. Najważniejsze to nie popadać w rutynę — pielęgnujcie wspólny czas tylko we dwoje i codzienną czułość, by ta bliskość nie gasła.'}
          </p>
        `;
      } else {
        const patternName = t.categoryFeedback[minCat].patternName;
        const headerTitle = patternName
          ? `⚠ ${patternName} • ${t.categories[minCat]} (${minVal}%)`
          : `⚠ ${t.categories[minCat]} (${minVal}%) — ${lang === 'en' ? 'Area to Work On' : 'Obszar do pracy'}`;

        diagnosticWorkBox.innerHTML = `
          <strong style="display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--color-primary);">
            ${headerTitle}
          </strong>
          <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.5;">${workFeedback}</p>
        `;
      }
    }

    // Render Dynamic E-book Recommendation Box
    const recommendationContainer = document.getElementById("recommendation-box");
    if (recommendationContainer && t.ebookRecommendations) {
      let recKey = minCat;
      if (totalScore <= 12) {
        recKey = "crisisBundle";
      } else if (minVal >= 75) {
        recKey = "intimacy";
      }
      const rec = t.ebookRecommendations[recKey] || t.ebookRecommendations.communication;
      const recDesc = minVal >= 75
        ? (lang === 'en'
            ? 'Your relationship has a wonderful foundation. This guide will help you keep romance, passion, and closeness alive through the years.'
            : 'Wasz związek ma wspaniałe fundamenty. Ten przewodnik pomoże Wam zadbać o to, by codzienne obowiązki nie przygasiły Waszej bliskości i pożądania.')
        : rec.desc;

      recommendationContainer.innerHTML = `
        <div class="recommendation-card" style="display: flex; gap: 1.5rem; align-items: flex-start;">
          ${rec.coverImage ? `
          <div style="flex-shrink: 0;">
            <img src="${rec.coverImage}" alt="${rec.coverAlt}" style="width: 110px; border-radius: 0.6rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: block;">
          </div>` : ''}
          <div style="flex: 1; min-width: 0;">
            <span class="recommendation-badge">✦ ${rec.badge}</span>
            <h3 class="recommendation-title">${rec.title}</h3>
            <div class="recommendation-subtitle">${rec.subtitle}</div>
            <p class="recommendation-desc">${recDesc}</p>
            <div class="recommendation-pricing-row">
              <div class="recommendation-price">
                <span class="price-regular">${rec.price}</span>
                <span class="price-discount">${rec.discountPrice}</span>
              </div>
              <a href="${rec.link}" target="_blank" rel="noopener" class="btn-recommendation">
                <span>${rec.cta}</span>
              </a>
            </div>
            <div style="margin-top: 0.85rem; background: rgba(229,147,149,0.12); border: 1px dashed #E59395; border-radius: 0.75rem; padding: 0.6rem 1rem; text-align: center; font-size: 0.82rem; color: #2D2825;">
              ${lang === 'en' 
                ? '✅ 25% discount is applied <strong>automatically</strong> upon clicking the button' 
                : '✅ Rabat 25% zostanie naliczony <strong>automatycznie</strong> po kliknięciu przycisku'}
            </div>
          </div>
        </div>
      `;
    }

    // Save values locally for sharing
    localStorage.setItem("barometr_score", totalScore);
    localStorage.setItem("barometr_status", overallResult.status);
    localStorage.setItem("barometr_c_comm", categoryPercentages.communication);
    localStorage.setItem("barometr_c_intim", categoryPercentages.intimacy);
    localStorage.setItem("barometr_c_trust", categoryPercentages.trust);
    localStorage.setItem("barometr_c_vision", categoryPercentages.vision);
    localStorage.setItem("barometr_s_strength", t.categories[maxCat]);
    localStorage.setItem("barometr_s_work", t.categories[minCat]);
  }

  function prefillContactForm() {
    const score = localStorage.getItem("barometr_score") || "0";
    const status = localStorage.getItem("barometr_status") || "";
    const comm = localStorage.getItem("barometr_c_comm") || "0";
    const intim = localStorage.getItem("barometr_c_intim") || "0";
    const trust = localStorage.getItem("barometr_c_trust") || "0";
    const vision = localStorage.getItem("barometr_c_vision") || "0";
    const strength = localStorage.getItem("barometr_s_strength") || "";
    const work = localStorage.getItem("barometr_s_work") || "";

    const messageText = t.labels.sharePreFill
      .replace("{score}", score)
      .replace("{status}", status)
      .replace("{comm}", comm)
      .replace("{intim}", intim)
      .replace("{trust}", trust)
      .replace("{vision}", vision)
      .replace("{strength}", strength)
      .replace("{work}", work);

    const formMessage = document.getElementById("message");
    if (formMessage) {
      formMessage.value = messageText;
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBarometr);
} else {
  initBarometr();
}
