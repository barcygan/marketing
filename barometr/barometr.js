// Barometr Małżeński / Marriage Barometer Logic with Category Analysis

const CONFIG = {
  pl: {
    categories: {
      communication: "Komunikacja",
      intimacy: "Intymność i Seks",
      trust: "Zaufanie i Wsparcie",
      vision: "Wspólna Wizja"
    },
    questions: [
      {
        category: "communication",
        text: "Czy czujesz, że partner słucha Cię z uwagą i zrozumieniem, gdy dzielisz się swoimi troskami?"
      },
      {
        category: "communication",
        text: "Czy potraficie rozmawiać o trudnych sprawach (finanse, kryzysy) bez wzajemnego oskarżania się i kłótni?"
      },
      {
        category: "communication",
        text: "Czy po konfliktach potraficie wyciągnąć do siebie rękę i szczerze się przeprosić?"
      },
      {
        category: "intimacy",
        text: "Jak oceniasz poziom czułości i fizycznego dotyku (niezwiązanego bezpośrednio z seksem) w Waszej codzienności?",
        options: [
          { text: "Bardzo wysoki — czułość jest obecna każdego dnia", score: 3 },
          { text: "Zadowalający — okazujemy sobie bliskość, ale mogłoby być lepiej", score: 2 },
          { text: "Niski — dotykamy się rzadko, czuję pewien niedosyt", score: 1 },
          { text: "Bardzo niski — w naszej relacji prawie w ogóle nie ma czułości", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "Jak często uprawiacie seks i na ile ta częstotliwość oraz jakość odpowiada Waszym potrzebom?",
        options: [
          { text: "Zdecydowanie satysfakcjonująca", score: 3 },
          { text: "Umiarkowanie satysfakcjonująca (chcemy popracować)", score: 2 },
          { text: "Rzadziej niż bym chciał/a (odczuwam frustrację)", score: 1 },
          { text: "Bardzo rzadko lub wcale (źródło kryzysu)", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "Na ile bezpiecznie i swobodnie czujesz się, rozmawiając z partnerem o swoich potrzebach seksualnych i fantazjach?"
      },
      {
        category: "trust",
        text: "Czy możesz w pełni liczyć na emocjonalne i praktyczne wsparcie partnera w trudnych momentach życiowych?"
      },
      {
        category: "trust",
        text: "Czy w Waszej relacji panuje poczucie bezpieczeństwa (brak chorobliwej zazdrości i chęci kontrolowania)?"
      },
      {
        category: "trust",
        text: "Czy czujesz się kochana/y i akceptowana/y przez partnera taka/im jaka/i jesteś, ze wszystkimi słabościami?"
      },
      {
        category: "vision",
        text: "Czy macie spójną wizję wspólnej przyszłości oraz kluczowych życiowych wartości?"
      },
      {
        category: "vision",
        text: "Czy spędzacie wartościowy czas tylko we dwoje (randki, pasje), dbając o związek poza pracą i dziećmi?"
      },
      {
        category: "vision",
        text: "Czy czujesz, że partner docenia Twój wkład w związek i okazuje Ci wdzięczność?"
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
        strength: "Komunikacja jest filarem Waszego związku. Potraficie słuchać siebie nawzajem i rozwiązywać spory z szacunkiem.",
        work: "Zwróćcie uwagę na to, jak rozmawiacie. Często pojawiają się oskarżenia lub ciche dni. Warto popracować nad konstruktywnym dialogiem bez oceniania."
      },
      intimacy: {
        strength: "Bliskość fizyczna i seksualna jest Waszą mocną stroną. Dbacie o dotyk, pożądanie i otwarcie rozmawiacie o potrzebach.",
        work: "Sfera intymna i seksualna uległa ochłodzeniu lub rodzi frustrację. Rutyna, zmęczenie lub brak dialogu oddalają Was fizycznie. Odbudowa bliskości wymaga uwagi."
      },
      trust: {
        strength: "Czujecie się w związku bezpiecznie i możecie na siebie liczyć. Macie silne oparcie emocjonalne, co daje ogromną stabilność.",
        work: "Pojawił się kryzys zaufania lub poczucie braku wsparcia w trudnych chwilach. Odbudowa poczucia bezpieczeństwa jest teraz Waszym priorytetem."
      },
      vision: {
        strength: "Patrzycie w tym samym kierunku. Spójne cele życiowe i dbanie o czas tylko we dwoje pozwalają Wam rozwijać relację w harmonii.",
        work: "Wasze drogi zaczęły się rozchodzić w codziennym pośpiechu. Brakuje wspólnego czasu (randek) lub spójnej wizji przyszłości. Warto usiąść i porozmawiać o priorytetach."
      }
    },
    thresholds: [
      { min: 0, max: 12, status: "Głęboki Kryzys", class: "status-crisis", title: "Wasza relacja przechodzi przez trudny czas.", feedback: "Ogólny wynik wskazuje na znaczne osłabienie więzi. Kryzys to jednak punkt wyjścia do zmiany. Analiza filarów poniżej pokaże Wam, od czego zacząć odbudowę." },
      { min: 13, max: 24, status: "Wymaga Pracy", class: "status-work", title: "Wasza więź jest stabilna, ale wymaga uwagi.", feedback: "Wasza relacja ma solidne fundamenty, ale codzienna rutyna uśpiła czujność. Sprawdźcie poniżej, które obszary wymagają wdrożenia nowych nawyków partnerskich." },
      { min: 25, max: 36, status: "Silna Więź", class: "status-good", title: "Gratulacje! Wasz związek ma zdrowe i silne podstawy.", feedback: "Wynik pokazuje wysoki poziom zaufania i satysfakcji. Poniższy podział pomoże Wam zidentyfikować drobne niuanse, by wejść na jeszcze wyższy poziom intymności." }
    ],
    labels: {
      progress: "Pytanie {current} z {total}",
      back: "Wstecz",
      scoreTitle: "Twój Wynik",
      sharePreFill: "Wyniki mojego Barometru Małżeńskiego:\n- Wynik ogólny: {score}/36 ({status})\n- Komunikacja: {comm}%\n- Intymność i Seks: {intim}%\n- Zaufanie: {trust}%\n- Wspólna Wizja: {vision}%\n\nSiła związku: {strength}\nObszar do pracy: {work}\nChcemy umówić konsultację partnerską."
    },
    ebookRecommendations: {
      communication: {
        title: "E-Book: Trudne Rozmowy",
        subtitle: "Jak słuchać, mówić i zostać razem",
        desc: "Z diagnozy wynika, że komunikacja jest sferą wymagającą uwagi. Ten skondensowany e-book zawiera syntezę kluczowych myśli i pytań refleksyjnych dla par, które chcą nauczyć się szczerego dialogu.",
        badge: "Dopasowane do Twojego Wyniku • Rabat 25% — już w linku!",
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
        desc: "Wasz wynik wskazuje na potrzebę odbudowy sfery fizycznej i namiętności. Poznaj esencję wiedzy o tym, dlaczego bliskość gaśnie oraz jak w prostych krokach przywrócić pożądanie.",
        badge: "Dopasowane do Twojego Wyniku • Rabat 25% — już w linku!",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Kup E-Book ze Zniżką 25% →",
        link: "https://cart.easy.tools/checkout/kcygan/bliskosc-i-namietnosc-po-latach-jak-znow-chciec-i-byc-chcianaym?promo=BAROMETR",
        coverImage: "../ebook/okladka-bliskosc-i-namietnosc.jpg",
        coverAlt: "Okładka e-booka Bliskość i Namiętność po latach"
      },
      trust: {
        title: "E-Book: Partner czy dzieci?",
        subtitle: "Jak nie zgubić dwójki w rodzinie",
        desc: "Zaufanie i poczucie bezpieczeństwa rozwijają się, gdy partner znów staje się centrum. Zobacz skondensowane myśli o tym, jak nie zagubić relacji partnerskiej pod presją codzienności.",
        badge: "Dopasowane do Twojego Wyniku • Rabat 25% — już w linku!",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Kup E-Book ze Zniżką 25% →",
        link: "https://cart.easy.tools/checkout/kcygan/partner-czy-dzieci-jak-nie-zgubic-dwojki-w-rodzinie?promo=BAROMETR",
        coverImage: "../ebook/okladka-partner-czy-dzieci.jpg",
        coverAlt: "Okładka e-booka Partner czy dzieci?"
      },
      vision: {
        title: "E-Book: Partner czy dzieci?",
        subtitle: "Jak nie zgubić dwójki w rodzinie",
        desc: "Spójność wizji i dbanie o czas tylko we dwoje to fundament rodziny. Przeczytaj skondensowany przewodnik, który pomógł wielu parom odzyskać właściwą hierarchię i bliskość.",
        badge: "Dopasowane do Twojego Wyniku • Rabat 25% — już w linku!",
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
        desc: "Twój wynik wskazuje na głęboki kryzys w relacji. Rekomendujemy kompletny pakiet 3 przewodników. Rabat 25% zostanie zastosowany automatycznie!",
        badge: "Rekomendacja Główna • Rabat 25% — już w linku!",
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
      communication: "Communication",
      intimacy: "Intimacy & Sex",
      trust: "Trust & Support",
      vision: "Shared Vision"
    },
    questions: [
      {
        category: "communication",
        text: "Do you feel your partner listens to you with attention and understanding when you share your concerns?"
      },
      {
        category: "communication",
        text: "Are you able to discuss difficult issues (finances, crises) without blaming each other and fighting?"
      },
      {
        category: "communication",
        text: "After conflicts, are you able to reach out to each other and sincerely apologize?"
      },
      {
        category: "intimacy",
        text: "How do you rate the level of affection and physical touch (not directly related to sex) in your daily life?",
        options: [
          { text: "Very high — affection is present every day", score: 3 },
          { text: "Satisfying — we show each other closeness, but it could be better", score: 2 },
          { text: "Low — we rarely touch, I feel a certain lack of connection", score: 1 },
          { text: "Very low — there is almost no affection in our relationship", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "How often do you have sex, and to what extent does its frequency and quality meet your needs?",
        options: [
          { text: "Definitely satisfying", score: 3 },
          { text: "Moderately satisfying (we want to work on it)", score: 2 },
          { text: "Less often than I would like (causes frustration)", score: 1 },
          { text: "Very rarely or not at all (source of crisis)", score: 0 }
        ]
      },
      {
        category: "intimacy",
        text: "How safe and comfortable do you feel discussing your sexual needs and fantasies with your partner?"
      },
      {
        category: "trust",
        text: "Can you fully count on your partner's emotional and practical support during difficult life moments?"
      },
      {
        category: "trust",
        text: "Is there a sense of security in your relationship (free of unhealthy jealousy and control)?"
      },
      {
        category: "trust",
        text: "Do you feel loved and accepted by your partner exactly as you are, with all your weaknesses?"
      },
      {
        category: "vision",
        text: "Do you share an aligned vision of your future and key life values?"
      },
      {
        category: "vision",
        text: "Do you spend quality time just the two of you (dates, hobbies) to nurture your bond away from work/kids?"
      },
      {
        category: "vision",
        text: "Do you feel your partner appreciates your contribution to the relationship and shows gratitude?"
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
        strength: "Communication is the cornerstone of your relationship. You listen to each other and resolve issues with mutual respect.",
        work: "Pay attention to how you communicate. Accusations or silent treatments occur. It is worth working on constructive, judgment-free dialogue."
      },
      intimacy: {
        strength: "Physical and sexual intimacy is a strong suit. You nurture touch, passion, and talk openly about your physical needs.",
        work: "The intimate and sexual sphere has cooled down or causes frustration. Routine, fatigue, or lack of dialogue are creating physical distance."
      },
      trust: {
        strength: "You feel safe and can rely on each other. You have strong emotional support, which provides immense stability.",
        work: "A crisis of trust or a feeling of lacking support has arisen. Rebuilding your sense of safety is your primary priority."
      },
      vision: {
        strength: "You look in the same direction. Aligned life goals and quality time together allow you to grow your relationship in harmony.",
        work: "Your paths have begun to drift in the daily rush. There is a lack of quality time (dates) or a shared future vision."
      }
    },
    thresholds: [
      { min: 0, max: 12, status: "Deep Crisis", class: "status-crisis", title: "Your relationship is going through a challenging time.", feedback: "The overall score indicates a significant weakening of the bond. However, a crisis is the starting point for change. The breakdown below shows where to start rebuilding." },
      { min: 13, max: 24, status: "Needs Attention", class: "status-work", title: "Your bond is stable, but requires work.", feedback: "Your relationship has solid foundations, but daily routine has dulled awareness. Check below which areas require introducing new partner habits." },
      { min: 25, max: 36, status: "Strong Bond", class: "status-good", title: "Congratulations! Your relationship has healthy, strong roots.", feedback: "The score shows a high level of trust and satisfaction. The breakdown below will help you identify small nuances to reach an even higher level of intimacy." }
    ],
    labels: {
      progress: "Question {current} of {total}",
      back: "Back",
      scoreTitle: "Your Score",
      sharePreFill: "My Marriage Barometer results:\n- Overall Score: {score}/36 ({status})\n- Communication: {comm}%\n- Intimacy & Sex: {intim}%\n- Trust & Support: {trust}%\n- Shared Vision: {vision}%\n\nRelationship Strength: {strength}\nArea to work on: {work}\nWe would like to book a partner consultation."
    },
    ebookRecommendations: {
      communication: {
        title: "E-Book: Difficult Conversations",
        subtitle: "How to listen, speak and stay together",
        desc: "Your diagnostic results show communication needs focus. This condensed guide offers core takeaways and reflection questions for couples.",
        badge: "Recommended for Your Result • 25% off — already in the link!",
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
        desc: "Your score points to a need to nurture physical intimacy and passion. Learn the essence of keeping closeness alive.",
        badge: "Recommended for Your Result • 25% off — already in the link!",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Buy E-Book with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/bliskosc-i-namietnosc-po-latach-jak-znow-chciec-i-byc-chcianaym?promo=BAROMETR",
        coverImage: "../ebook/okladka-bliskosc-i-namietnosc.jpg",
        coverAlt: "Intimacy & Passion e-book cover"
      },
      trust: {
        title: "E-Book: Partner or Children?",
        subtitle: "How not to lose your couple bond in family life",
        desc: "Trust and security flourish when your partner becomes your primary focus again. A condensed guide on keeping the relationship at the centre of the family.",
        badge: "Recommended for Your Result • 25% off — already in the link!",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Buy E-Book with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/partner-czy-dzieci-jak-nie-zgubic-dwojki-w-rodzinie?promo=BAROMETR",
        coverImage: "../ebook/okladka-partner-czy-dzieci.jpg",
        coverAlt: "Partner or Children e-book cover"
      },
      vision: {
        title: "E-Book: Partner or Children?",
        subtitle: "Partner or children? How not to lose your bond in daily routine",
        desc: "Shared vision and quality time for just the two of you is the true core of a resilient family.",
        badge: "Recommended for Your Result • 25% off — already in the link!",
        price: "19,99 PLN",
        discountPrice: "14,99 PLN",
        cta: "Buy E-Book with 25% Discount →",
        link: "https://cart.easy.tools/checkout/kcygan/partner-czy-dzieci-jak-nie-zgubic-dwojki-w-rodzinie?promo=BAROMETR",
        coverImage: "../ebook/okladka-partner-czy-dzieci.jpg",
        coverAlt: "Partner or Children e-book cover"
      },
      crisisBundle: {
        title: "Bundle: Complete Relationship Bond (3 E-Books)",
        subtitle: "All 3 condensed guides (Essence + Reflection Questions for Couples)",
        desc: "Your score indicates a deep crisis. We recommend the complete 3-guide bundle. 25% discount is applied automatically!",
        badge: "Top Recommendation • 25% off — already in the link!",
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

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.documentElement.lang === "en" ? "en" : "pl";
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
      setTimeout(() => {
        screenQuiz.classList.add("active");
        showQuestion();
      }, 50);
    }, 400);

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

    // Handle tie cases (optional, defaults to first processed category)
    const strengthFeedback = t.categoryFeedback[maxCat].strength;
    const workFeedback = t.categoryFeedback[minCat].work;

    // Render Dynamic Diagnostic Boxes
    if (diagnosticStrengthBox) {
      diagnosticStrengthBox.innerHTML = `
        <strong style="display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; margin-bottom: 0.5rem; color: #10b981;">
          ✓ ${t.categories[maxCat]} (${maxVal}%) — Siła Waszej relacji
        </strong>
        <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.5;">${strengthFeedback}</p>
      `;
    }

    if (diagnosticWorkBox) {
      diagnosticWorkBox.innerHTML = `
        <strong style="display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--color-primary);">
          ⚠ ${t.categories[minCat]} (${minVal}%) — Obszar wymagający pracy
        </strong>
        <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted); line-height: 1.5;">${workFeedback}</p>
      `;
    }

    // Render Dynamic E-book Recommendation Box
    const recommendationContainer = document.getElementById("recommendation-box");
    if (recommendationContainer && t.ebookRecommendations) {
      let recKey = minCat;
      if (totalScore <= 12) {
        recKey = "crisisBundle";
      }
      const rec = t.ebookRecommendations[recKey] || t.ebookRecommendations.communication;

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
            <p class="recommendation-desc">${rec.desc}</p>
            <div class="recommendation-pricing-row">
              <div class="recommendation-price">
                <span class="price-regular">${rec.price}</span>
                <span class="price-discount">${rec.discountPrice}</span>
              </div>
              <a href="${rec.link}" target="_blank" rel="noopener" class="btn-recommendation">
                <span>${rec.cta}</span>
                <span>→</span>
              </a>
            </div>
            <div style="margin-top: 0.85rem; background: rgba(229,147,149,0.12); border: 1px dashed #E59395; border-radius: 0.75rem; padding: 0.6rem 1rem; text-align: center; font-size: 0.82rem; color: #2D2825;">
              ✅ Rabat 25% zostanie zastosowany <strong>automatycznie</strong> po kliknięciu przycisku
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
});
