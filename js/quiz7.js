/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [
{ question: "What is the role of the opposition parties?", choices: ["To ensure reports about the current government are sent to the King", "To supervise the government", "To oppose or try to improve government proposals", "To regulate government proposals"], correct: 2 },
{ question: "On what date did Nunavut become a territory?", choices: ["April 1st, 1999", "May 1st, 1998", "July 1st, 1867", "July 31st, 1820"], correct: 0 },
{ question: "Why is the British North America Act important in Canadian history?", choices: ["It was agreed to by the First Nations and Inuit", "It was written by the British government", "The Aboriginal people signed the act", "It made confederation legal"], correct: 3 },
{ question: "Which of the following statements accurately describes the Quebec flag known as the Fleurdelisé?", choices: ["It features a white cross with four roses in its quadrants and was adopted in 1948", "It features a white cross with four fleurs-de-lis in its quadrants and was adopted in 1948", "It features a blue cross with four thistles and shamrocks and was adopted in 1948", "It features a white cross with four fleurs-de-lis and was adopted in 1867"], correct: 1 },
{ question: "Who built the French empire in North America?", choices: ["King Charles II", "Jean Talon, Bishop Laval and Count Frontenac", "Pierre Le Moyne and Sieur d'Iberville", "Great Britain"], correct: 1 },
{ question: "Which province is on the Pacific coast of Canada?", choices: ["Nova Scotia", "Alberta", "New Brunswick", "British Columbia"], correct: 3 },
{ question: "How many Great Lakes are located between Ontario and the United States?", choices: ["4", "5", "6", "7"], correct: 1 },
{ question: "Which one is Canada's best known symbol and national police force?", choices: ["RMCP", "CIA", "Canadian Police", "RCMP"], correct: 3 },
{ question: "Which group of Aboriginal peoples has the largest population in the Northern Territories in Nunavut?", choices: ["Acadians", "Metis", "First Nations", "Inuit"], correct: 3 },
{ question: "Where are the Parliament buildings located?", choices: ["Toronto", "Kingston", "London", "Ottawa"], correct: 3 },
{ question: "What forms a jury?", choices: ["Politicians", "Immigrants", "Judges", "Citizens"], correct: 3 },
{ question: "What is the significance of the Quebec Act of 1774?", choices: ["It allowed Quebec to gain independence", "It allowed the French to move into Quebec", "Canada's tolerance of religious tradition under the law", "It gave the French more power"], correct: 2 },
{ question: "Who has the right to be considered first for a job in the federal government?", choices: ["Canadian citizens", "Anyone with the relevant experience", "Anyone with the necessary qualifications", "Foreigners"], correct: 0 },
{ question: "Who are Anglophones?", choices: ["People who were taught English at school", "People who understand but do not speak English", "People who do not speak English as a first language", "People who speak English as a first language"], correct: 3 },
{ question: "Who were The Voyageurs?", choices: ["Montreal-based traders who traveled by canoe", "Immigrants to Canada in the 18th century", "Explorers searching for the Northwest Passage", "Geographers who first charted the coastline of British Columbia"], correct: 0 },
{ question: "Which countries fought in the Battle of the Plains of Abraham?", choices: ["British and German", "British and French", "France and China", "America and British"], correct: 1 },
{ question: "When did the Canadian Charter of Rights and Freedoms become part of the Constitution?", choices: ["1892", "1872", "1982", "1782"], correct: 2 },
{ question: "Which group of Aboriginal peoples has the largest population in Canada?", choices: ["Acadians", "First Nations", "Indigenous peoples", "Metis"], correct: 1 },
{ question: "Why is the Constitution Act of 1982 important in Canadian history?", choices: ["Canada can modify the Constitution without approval from the British government", "The Queen or King has more power in Canadian government", "It lets Canadians enjoy more freedom", "It made changes to the Citizenship Act"], correct: 0 },
{ question: "Which province has the most valuable forest industry in Canada?", choices: ["Ontario", "Alberta", "Quebec", "British Columbia"], correct: 3 }
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
        window.location.href = "quiz6.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz8.html";
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
