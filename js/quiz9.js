/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [

{ question: "Which two provinces produce more than 3/4 of Canadian manufactured goods?", choices: ["Quebec and Manitoba", "British Columbia and Ontario", "Ontario and Quebec", "Alberta and Ontario"], correct: 2 },
  { question: "Give an example of how you can demonstrate responsibility by being involved in your community.", choices: ["Minding your own business", "Throwing a party", "Keeping your property well-maintained", "Volunteering"], correct: 3 },
  { question: "To which of the following communities do the majority of Canadians belong?", choices: ["Christian", "Jewish", "Muslim", "Hindu"], correct: 0 },
  { question: "Which Canadian province is the largest producer of oil and natural gas?", choices: ["Quebec", "Nova Scotia", "Ontario", "Alberta"], correct: 3 },
  { question: "Which is the northeastern province in Canada that has its own time zone?", choices: ["Alberta", "Newfoundland and Labrador", "Nova Scotia", "Prince Edward Island"], correct: 1 },
  { question: "What is the voting procedure in Canada?", choices: ["Whichever way you like", "Online", "Secret ballot", "Open ballot"], correct: 2 },
  { question: "Which is the Canadian province with the largest population?", choices: ["Ontario", "Quebec", "Nova Scotia", "Alberta"], correct: 0 },
  { question: "What do Canadians normally wear on Remembrance Day?", choices: ["A red poppy", "A green shirt", "A black tie", "A white shirt"], correct: 0 },
  { question: "What does CPR stand for?", choices: ["Canadian Pacific Railway", "Canadian People Railway", "Canadian Public Road", "Canadian People Resource"], correct: 0 },
  { question: "How long is the Lieutenant Governor appointed for?", choices: ["3 years", "4 years", "5 years", "6 years"], correct: 2 },
  { question: "What is the fundamental characteristic of Canadian heritage and identity?", choices: ["Multiculturalism", "French culture", "Canadian festivals", "English culture"], correct: 0 },
  { question: "When does Canada celebrate Thanksgiving?", choices: ["The second Monday of October", "The first Friday of October", "The first Monday of September", "The first Monday of July"], correct: 0 },
  { question: "What is the symbol of the Canadian government?", choices: ["The Parliament", "The Crown", "The National Flag", "The Snowbirds"], correct: 1 },
  { question: "In the 1960s, Quebec experienced an era of rapid change. What is it called?", choices: ["The East Movement", "The Quiet Revolution", "The Suffrage Movement", "The Industrial Revolution"], correct: 1 },
  { question: "Who invented the worldwide system of standard time zones?", choices: ["Joseph Armand Bombadier", "Reginald Fessendon", "Sir Sanford Fleming", "Alexander Graham Bell"], correct: 2 },
  { question: "The ancestors of the Aboriginals are believed to have migrated from which continent?", choices: ["Asia", "America", "Europe", "Australia"], correct: 0 },
  { question: "The municipal government is responsible for which of the following?", choices: ["Natural resources", "Currency", "Garbage removal", "Highways"], correct: 2 },
  { question: "Who is a Premier?", choices: ["The Prime Minister is also called the Premier", "A Premier has a role similar to that of the Prime Minister in a federal government", "The Commissioner", "The Governor General"], correct: 1 },
  { question: "Which oceans line Canada's frontiers?", choices: ["The Pacific Ocean in the west", "The Atlantic Ocean in the east", "The Arctic Ocean to the north", "All of these"], correct: 3 },
  { question: "Who is the head of the government in Canada?", choices: ["The Sovereign", "The Prime Minister", "The Premier", "The Commissioner"], correct: 1 }

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
        window.location.href = "quiz9.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz10.html";
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
