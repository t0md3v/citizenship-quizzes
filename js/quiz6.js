/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [
{ question: "What are the main functions of the cabinet?", choices: ["Natural resources", "Navigation", "To prepare the budget and propose new laws to be implemented", "Defense"], correct: 2 },
{ question: "Who can enter and leave the country freely without time constraints?", choices: ["Canadian citizens and landed immigrants", "Commonwealth citizens", "Canadian citizens", "British citizens"], correct: 2 },
{ question: "If the government loses a confidence vote in the assembly, it must", choices: ["Call for bye-elections", "Continue governing", "Do nothing", "Resign"], correct: 3 },
{ question: "Which province was the first to grant voting rights to women?", choices: ["Quebec", "Ontario", "Nova Scotia", "Manitoba"], correct: 3 },
{ question: "What is the Great Charter of Freedom also known as?", choices: ["Habeas corpus", "Dominion of Canada", "Canadian Constitution", "Magna Carta"], correct: 3 },
{ question: "A Member of Parliament from Montreal announces that she will spend her weekend in her electoral district. This means she would be:", choices: ["In her office on Parliament Hill", "In some part of Montreal where she was elected", "Visiting the province of Quebec", "Going on a vacation"], correct: 1 },
{ question: "How is the government formed after a federal election?", choices: ["Each province elects one representative to form the government. The King then chooses the Prime Minister.", "The Governor General picks a party and a Prime Minister to run the government.", "The party with the most elected representatives becomes the party in power. The leader of this party becomes the Prime Minister.", "The party with the most elected representatives becomes the party in power. The King chooses the Prime Minister from this party."], correct: 2 },
{ question: "Who is Canada's head of state?", choices: ["The Premier of Canada", "A hereditary sovereign Queen or King", "The Governor General", "The Prime Minister"], correct: 1 },
{ question: "Who chose Ottawa as the capital of Canada?", choices: ["Queen Elizabeth I", "Queen Elizabeth II", "Queen Victoria", "Queen Anne"], correct: 2 },
{ question: "When was the current flag of Canada raised for the first time?", choices: ["1921", "1965", "1949", "1892"], correct: 1 },
{ question: "What are the Prime Minister and Cabinet Ministers together called?", choices: ["The Government", "The Cabinet", "The House of Commons", "The Senate"], correct: 1 },
{ question: "In which province are more than half of Canada's aeronautics and space industry located?", choices: ["Saskatchewan", "Ontario", "Quebec", "Manitoba"], correct: 2 },
{ question: "Who is General Sir Arthur Currie?", choices: ["Canada's greatest soldier in the First World War", "A great frontier hero", "An explorer of Western Canada", "A military leader of the Metis in the 19th century"], correct: 0 },
{ question: "Which province was split into two at Confederation?", choices: ["Lower Canada", "Newfoundland", "Upper Canada", "The Province of Canada"], correct: 3 },
{ question: "What are the territories of Northern Canada and their capital cities?", choices: ["Yukon (Whitehorse), Northwest Territories (Yellowknife), and Nunavut (Iqaluit)", "Northwest Territories (Yellowknife) and Alaska (Juneau)", "Northwest Territories (Yellowknife)", "Alaska (Juneau) and Yukon (Whitehorse)"], correct: 0 },
{ question: "What does the word Inuit mean?", choices: ["Eskimo in the Inuktitut language", "Home in English", "The people in the Inuktitut language", "The Arctic land in the Inuktitut language"], correct: 2 },
{ question: "Which party becomes the official opposition?", choices: ["The party the Prime Minister selects", "The party with the least votes", "The party with the second most votes", "Any independent candidate"], correct: 2 },
{ question: "Who played an important part in building the Canadian Pacific Railway?", choices: ["Acadian railroad workers", "Afro-American slaves", "American railroad engineers", "Chinese railroad workers"], correct: 3 },
{ question: "Which provinces are connected to Ontario by land?", choices: ["New Brunswick and Quebec", "Alberta and Quebec", "Manitoba and Quebec", "Manitoba and Alberta"], correct: 2 },
{ question: "Who do Members of Parliament represent?", choices: ["Everyone who lives in his or her electoral district", "Everyone who lives in his or her neighborhood", "Everyone who lives in his or her province", "Everyone in northern Canada"], correct: 0 }
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
   CELEBRATIONS
========================== */

function showPerfectCelebration() {
    const overlay = document.getElementById("goldOverlay");
    const text = document.getElementById("perfectText");

    if (!overlay || !text) return;

    overlay.style.opacity = "1";
    text.style.opacity = "1";
    text.style.transform = "translate(-50%, -50%) scale(1)";

    setTimeout(() => {
        overlay.style.opacity = "0";
        text.style.opacity = "0";
        text.style.transform = "translate(-50%, -50%) scale(0.9)";
    }, 6000);
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
        window.location.href = "quiz5.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz7.html";
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
        // 🎆 Fireworks for high score
if (passed && percentage >= 90 && typeof confetti === "function") {
    const duration = 5000;
    const end = Date.now() + duration;

    const fireworkInterval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(fireworkInterval);
            return;
        }

        confetti({
            particleCount: 40,
            spread: 70,
            startVelocity: 45,
            ticks: 90,
            origin: {
                x: Math.random(),
                y: 0
            }
        });
    }, 300);
}

if (percentage === 100) {
    const sound = document.getElementById("perfectSound");
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
}

if (percentage === 100) {
    showPerfectCelebration();
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
