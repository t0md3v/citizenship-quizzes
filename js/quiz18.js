/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [

    { question: "What is the meaning of the phrase 'the world's longest undefended border'?", choices: ["Canada exports billions of dollars worth of energy products to the USA", "Canada enjoys close relations with the United States", "Over three-quarters of Canadian exports are destined for the USA", "Millions of Canadians and Americans cross the border every year in safety"], correct: 3 },
    { question: "When was the first representative assembly in Canada elected?", choices: ["1791", "1758", "1889", "1609"], correct: 1 },
    { question: "Which of the following are the provinces responsible for?", choices: ["Defense", "Foreign policy", "Currency", "Education"], correct: 3 },
    { question: "How is Canada ranked in terms of geographical size in the world?", choices: ["It is the largest country on Earth", "It is the second largest country on Earth", "It is the third largest country on Earth", "It is the seventh largest country on Earth"], correct: 1 },
    { question: "When is Labour Day celebrated in Canada?", choices: ["1st of July", "1st Monday of September", "1st of May", "3rd Monday of October"], correct: 1 },
    { question: "What did the government do to make immigration to Western Canada easier?", choices: ["Use the Great Lakes and Seaway to prairies", "Built a railway across the prairies", "Built a highway across the prairies", "Dig a tunnel"], correct: 1 },
    { question: "What are the three main groups of Aboriginal peoples?", choices: ["Metis, Inuit and United Empire Loyalists", "Acadians, Metis and First Nations", "Early French settlers, Metis and Indian", "Metis, First Nations, and Inuit"], correct: 3 },
    { question: "Which trade spread across Canada making it important to the economy for over 300 years?", choices: ["Beaver fur trade", "Fisheries", "Lumber", "Gold"], correct: 0 },
    { question: "What does the Governor General perform?", choices: ["After an election, invites the party with the most votes to form the new government", "Signs bills to make them law", "All of these", "None of these"], correct: 2 },
    { question: "When was the Official Languages Act passed?", choices: ["1969", "1867", "1982", "2000"], correct: 0 },
    { question: "What does BNA stand for?", choices: ["British National Alliance", "British North America Act", "Black Nation Alliance", "Bank of National Association"], correct: 1 },
    { question: "How many levels of government are there in Canada?", choices: ["10", "5", "13", "3"], correct: 3 },
    { question: "How are laws passed?", choices: ["Signed by the Governor General", "Read by the House of Commons three times", "Read by the Senate three times", "All of these"], correct: 3 },
    { question: "What does official language rights and minority language educational rights mean?", choices: ["English is more important than French in Canada", "French is more important in Quebec and English is more important in other provinces", "All languages have equal status in Canada's government", "French and English have equal status in Parliament and throughout the government"], correct: 3 },
    { question: "From whom is Canada's tallest mountain named?", choices: ["William Logan", "Louis Riel", "Terry Fox", "Wayne Gretzky"], correct: 0 },
    { question: "Who signs the bills to make them law?", choices: ["The Police Chief", "The Governor General", "The Premier", "The Prime Minister"], correct: 1 },
    { question: "What is a noble way to contribute to Canada and an excellent career choice?", choices: ["Serve in the regular Canadian forces", "Serve on a jury", "Belong to a union", "Learn both official languages"], correct: 0 },
    { question: "Which province is Canada's leading wheat producer?", choices: ["Manitoba", "New Brunswick", "Alberta", "Saskatchewan"], correct: 3 },
    { question: "What does a Member of Parliament do?", choices: ["Links Canadians to the federal government", "Represents the King", "Works for the Governor General", "Liaises with the municipal government"], correct: 0 },
    { question: "Which of the following are Canada's famous writers?", choices: ["Sir Ernest MacMillan and Healey Willan", "Paul Henderson and Mark Tewksbury", "Joy Kogawa, Michael Ondaatje and Rohinton Mistry", "Emily Carr and Louis-Philippe Hebert"], correct: 2 }

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
        window.location.href = "quiz17.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz19.html";
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
