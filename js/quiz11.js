/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [

    { question: "What is the reason behind the Canada and US border?", choices: ["To improve security", "To maintain distance", "Canada wishes to remain independent of the United States", "To prevent war between the two countries"], correct: 2 },
    { question: "What is the other name for a trial court?", choices: ["The Court of King's Bench", "The Federal Court", "The Provincial Court", "The Small Claims Court"], correct: 0 },
    { question: "What is the minimum age for voting in federal, provincial, Territorial, and Municipal Elections?", choices: ["16", "18", "19", "21"], correct: 1 },
    { question: "What is the tenure of the Governor General?", choices: ["4 years", "5 years", "6 years", "7 years"], correct: 1 },
    { question: "Postwar, Canada became a more flexible and open society. Which of the following was this based on?", choices: ["Equality of men and women", "Inequality of women", "Inequality of men and women", "Equality of men"], correct: 0 },
    { question: "Which three rights are included in the Canadian Charter of Rights and Freedoms?", choices: ["Freedom of expression rights, property rights, and fair trial rights", "Mobility rights, Aboriginal people's rights, and official language rights", "Aboriginal people's rights, voting rights, and official language rights", "Employment rights, mobility rights, and freedom rights"], correct: 1 },
    { question: "Which of the following are the three founding peoples of Canada?", choices: ["American, French, and British", "Aboriginal, French, and British", "French, American, and Indian", "British, American, and Aboriginal"], correct: 1 },
    { question: "To what ocean is Newfoundland closest?", choices: ["Atlantic", "Pacific", "Labrador", "Arctic"], correct: 0 },
    { question: "What UN operation did Canada participate in from 1950 to 1953?", choices: ["Canadian forces defended Hong Kong", "The Canadian Corps captured Vimy Ridge", "Canada participated in the UN operation defending South Korea in the Korean War", "Canadians volunteered to fight in the South African war"], correct: 2 },
    { question: "From whom are the Acadians descended?", choices: ["Metis and Inuit", "First Nations who began settling in what are now the Prairie Provinces in 1600s", "British colonists who began settling in what are now the Maritime Provinces in 1604", "French colonists who began settling in what are now the Maritime Provinces in 1604"], correct: 3 },
    { question: "Who has the right to enter and leave Canada at will?", choices: ["Prisoners", "Members of the Commonwealth", "Canadian citizens", "Job seekers"], correct: 2 },
    { question: "What was the significance of June 6th, 1944 invasion of Normandy?", choices: ["Canadians made a significant contribution to the defeat of Nazism and fascism in Europe during the Second World War", "It liberated North Africa from Nazi occupation", "It results in the forcible relocation of Canadians of Japanese origin", "It led to the establishment of the Juno Awards"], correct: 0 },
    { question: "What does equality under the law mean?", choices: ["To be protected against any discrimination", "To be discriminated against", "To be like anyone else in Canada", "To be the same as anywhere in the world"], correct: 0 },
    { question: "What does mobility rights mean?", choices: ["Being able to use any mobile phone service in Canada", "Being able to live and work anywhere in Canada", "Being able to live and fish anywhere in Canada", "Being able to play hockey anywhere in Canada"], correct: 1 },
    { question: "What is the Okanagan Valley famous for?", choices: ["Coal mines", "Lakes and fishing", "Fruit orchards", "Sunrise and sunset"], correct: 2 },
    { question: "When did the name of Canada begin appearing on maps?", choices: ["By the 1750s", "By the 1580s", "By the 1550s", "By the 1650s"], correct: 2 },
    { question: "What is a minority government?", choices: ["The party in power holds less than half of the seats in the House of Commons", "The party in power holds less than half of the seats in the House of Commons and the Senate", "The party in power holds at least half of the seats in the House of Commons", "The party in power holds at least half of the seats in the Senate"], correct: 0 },
    { question: "Where are the Great Lakes?", choices: ["Atlantic Canada", "Manitoba", "Between Ontario and the United States", "Northern Quebec"], correct: 2 },
    { question: "What is the difference between the role of the Sovereign and that of the Prime Minister?", choices: ["The Sovereign links Canada to 52 other nations and the Prime Minister is the guardian of Constitutional freedoms", "The sovereign is the symbol of Canadian sovereignty and the Prime Minister is his aid", "The Sovereign is head of state. The Prime Minister oversees provincial policies", "The Sovereign is the guardian of Constitutional freedoms. The Prime Minister selects the Cabinet Ministers and is responsible for operations and policy of government"], correct: 3 },
    { question: "What is the meaning of the Remembrance Day poppy?", choices: ["To remember our Sovereign Queen Elizabeth II", "To remember the sacrifice of Canadians who have served or died in wars up to the present day", "To honor Prime Ministers who have died", "To celebrate Confederation"], correct: 1 }

];

/* ==========================
   SHUFFLE HELPERS
========================== */

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

function shuffleQuestionsAndChoices() {
    let shuffledQuestions = shuffleArray(originalQuestions).slice(0, 20);

    questions = shuffledQuestions.map(q => {
        const choicesObj = q.choices.map((c, i) => ({ text: c, isCorrect: i === q.correct }));
        const shuffledChoicesObj = shuffleArray(choicesObj);
        const newCorrectIndex = shuffledChoicesObj.findIndex(c => c.isCorrect);

        return {
            question: q.question,
            choices: shuffledChoicesObj.map(c => c.text),
            correct: newCorrectIndex
        };
    });

    questions = shuffleArray(questions);
}

/* ==========================
   HAPTIC FEEDBACK
========================== */

function vibrate() {
    if (navigator.vibrate) navigator.vibrate(20);
}

/* ==========================
   QUIZ STATE
========================== */

let questions = [];
let currentQuestion = 0;
let userAnswers = [];
let TOTAL_TIME = 45 * 60;
let remainingTime = TOTAL_TIME;
let timerInterval;
let swipeEnabled = true;
let tallestHeight = 0;

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

/* ==========================
   TOUCH SWIPE
========================== */

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (!swipeEnabled) return;

    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) < 50) return;

    saveAnswer();

    if (swipeDistance < 0 && currentQuestion < questions.length - 1) {
        vibrate();
        currentQuestion++;
        loadQuestion();
    } else if (swipeDistance > 0 && currentQuestion > 0) {
        vibrate();
        currentQuestion--;
        loadQuestion();
    }
}

/* ==========================
   TIMER
========================== */

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timerInterval);
            endQuiz();
            return;
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");
    document.getElementById("timer").textContent =
        `Time Remaining: ${minutes}:${seconds}`;
}

/* ==========================
   HEIGHT CALCULATION
========================== */

function calculateTallestQuestionHeight() {
    const temp = document.createElement("div");
    temp.style.position = "absolute";
    temp.style.visibility = "hidden";
    temp.style.width = quizDiv.offsetWidth + "px";
    temp.style.padding = "20px";

    document.body.appendChild(temp);

    let maxHeight = 0;

    questions.forEach(q => {
        temp.innerHTML = `
            <div class="question">${q.question}</div>
            <div class="choices">
                ${q.choices.map(c => `<label>${c}</label>`).join("")}
            </div>
        `;
        maxHeight = Math.max(maxHeight, temp.offsetHeight);
    });

    document.body.removeChild(temp);
    return maxHeight;
}

/* ==========================
   LOAD QUESTION
========================== */

function loadQuestion() {
    const q = questions[currentQuestion];
    const savedAnswer = userAnswers[currentQuestion];
    const progressPercent = Math.round((currentQuestion / questions.length) * 100);

    quizDiv.innerHTML = `
        <div class="question-counter">Question ${currentQuestion + 1} of ${questions.length}</div>
        <div class="progress-bar" style="height:12px;margin-bottom:15px;">
            <div style="width:${progressPercent}%;height:100%;background:#007bff;"></div>
        </div>
        <div class="question">${q.question}</div>
        <div class="choices">
            ${q.choices.map((choice, i) => `
                <label>
                    <input type="radio" name="choice" value="${i}" ${savedAnswer === i ? "checked" : ""}>
                    ${choice}
                </label>
            `).join("")}
        </div>
    `;

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Score Quiz" : "Next";

    document.querySelectorAll('input[name="choice"]').forEach(input => {
        input.addEventListener("change", e => {
            saveAnswer();
            vibrate(); // vibrate on tap
            const label = e.target.closest("label");
            label.classList.add("selected");

            setTimeout(() => {
                label.classList.remove("selected");
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    loadQuestion();
                } else {
                    endQuiz();
                }
            }, 200);
        });
    });
}

/* ==========================
   SAVE ANSWER
========================== */

function saveAnswer() {
    const selected = document.querySelector('input[name="choice"]:checked');
    userAnswers[currentQuestion] = selected ? parseInt(selected.value) : undefined;
}

/* ==========================
   NAV BUTTONS
========================== */

prevBtn.onclick = () => {
    if (currentQuestion > 0) {
        saveAnswer();
        currentQuestion--;
        loadQuestion();
    }
};

nextBtn.onclick = () => {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        endQuiz();
    }
};

/* ==========================
   END QUIZ
========================== */

function endQuiz() {
    swipeEnabled = false;
    clearInterval(timerInterval);

    // 🚫 Hide navigation buttons
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";

    // 🔓 Unlock height for review
    quizDiv.style.minHeight = "auto";
    quizDiv.style.maxHeight = "none";
    quizDiv.style.overflow = "visible";

    let wrongAnswers = 0;
    let reviewHTML = "";

    questions.forEach((q, i) => {
        const ans = userAnswers[i];
        reviewHTML += `
            <div class="review-item">
                <strong>${i + 1}. ${q.question}</strong>
                <div class="${ans === q.correct ? "correct" : "wrong"}">
                    Your answer: ${ans !== undefined ? q.choices[ans] : "No answer"}
                </div>
                ${ans !== q.correct
                    ? `<div class="correct">Correct: ${q.choices[q.correct]}</div>`
                    : ""}
            </div>
        `;
        if (ans !== q.correct) wrongAnswers++;
    });

    const total = questions.length;
    const correctCount = total - wrongAnswers;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = wrongAnswers < 6;

    quizDiv.innerHTML = `
        <div class="result ${passed ? "pass" : "fail"}">
            Result: ${passed ? "PASS" : "FAIL"}<br>
            Correct: ${correctCount} / ${total}<br>
            Wrong: ${wrongAnswers}<br>
            Percentage: ${percentage}%
        </div>

        <div class="top-buttons">
            <button onclick="window.location.href='index.html'">Home</button>
            <button onclick="window.location.href='history.html'">History Quiz</button>
            <button onclick="window.location.href='dates.html'">Dates Quiz</button>
            <button onclick="window.location.href='general.html'">General Quiz</button>
        </div>

        <div class="review">
            <h3>Quiz Review</h3>
            ${reviewHTML}
        </div>
    `;

    // ✅ Sticky action buttons container
    let stickyActions = document.getElementById("stickyActions");

    if (!stickyActions) {
        stickyActions = document.createElement("div");
        stickyActions.id = "stickyActions";
        stickyActions.innerHTML = `
            <button id="retakeBtnSticky">Retake Quiz</button>
            <button id="quizBank">Quiz Bank</button>
            <button id="previousQuiz">Prev. Quiz</button>
            <button id="nextQuiz">Next Quiz</button>

        `;
        document.body.appendChild(stickyActions);
    }

    stickyActions.style.display = "flex";

    document.getElementById("retakeBtnSticky").onclick = resetQuiz;
    document.getElementById("quizBank").onclick = () => {
        window.location.href = "bank21.html";
    };
    document.getElementById("previousQuiz").onclick = () => {
        window.location.href = "quiz10.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz12.html";
    };

    // 🎉 Confetti if passed
    if (passed && typeof confetti === "function") {
        const duration = 4000;
        const animationEnd = Date.now() + duration;

        const defaults = {
            spread: 120,
            ticks: 60,
            zIndex: 9999,
            origin: { y: 1 }
        };

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            confetti({
                ...defaults,
                particleCount: 50 + Math.floor(Math.random() * 20),
                scalar: 1.5 + Math.random() * 0.3,
                origin: {
                    x: 0.5 + (Math.random() - 0.5) * 0.2,
                    y: 1
                }
            });
        }, 250);
    }
}


/* ==========================
   RESET QUIZ
========================== */

function resetQuiz() {
    // 🫥 Hide sticky action buttons
    const stickyActions = document.getElementById("stickyActions");
    if (stickyActions) stickyActions.style.display = "none";

    swipeEnabled = true;
    shuffleQuestionsAndChoices();
    currentQuestion = 0;
    userAnswers = [];
    remainingTime = TOTAL_TIME;

    // 🔒 Restore fixed height
    tallestHeight = calculateTallestQuestionHeight();
    quizDiv.style.minHeight = tallestHeight + "px";
    quizDiv.style.maxHeight = tallestHeight + "px";
    quizDiv.style.overflow = "hidden";

    // 🔁 Restore nav buttons
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    prevBtn.disabled = true;
    nextBtn.textContent = "Next";

    startTimer();
    loadQuestion();
}

/* ==========================
   START QUIZ
========================== */

shuffleQuestionsAndChoices();
tallestHeight = calculateTallestQuestionHeight();
quizDiv.style.minHeight = tallestHeight + "px";
quizDiv.style.maxHeight = tallestHeight + "px";
quizDiv.style.overflow = "hidden";

startTimer();
loadQuestion();
