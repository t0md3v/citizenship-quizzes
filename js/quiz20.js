/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [

    { question: "What is the final step before a bill becomes law?", choices: ["Approved by the King", "Approved by the Prime Minister", "Approved by the Governor General", "Approved by a judge"], correct: 2 },
    { question: "When you vote on election day, what do you do?", choices: ["Go to the voting station, tell them who you are, and mark your X. Give the ballot back to the attendant", "Go to the voting station. Remove one ballot. Mark your X and deposit it in the ballot box", "Go to the voting station. Take your voter's card with proof of identity. Highlight your choice on the ballot and deposit it in the box", "Go to the voting station. Take your voter information card and ID. Mark an X next to your chosen candidate. Fold the ballot and present it to the poll officials who will tear off the ballot number and give you the ballot to deposit in the box"], correct: 3 },
    { question: "Which of the following criteria give a Canadian the right to vote?", choices: ["Owning a house", "Being on an official voter's list", "Having a driver's license", "Being an immigrant"], correct: 1 },
    { question: "Which legal documents protect the rights of Canadians with regards to the official languages?", choices: ["British Charter of Rights and Freedoms", "Canadian Constitution and Official Languages Act", "Canadian Languages Act", "Official English Act"], correct: 1 },
    { question: "What is the government responsible for all of Canada called?", choices: ["The National Assembly", "The Legislature", "The Federal Government", "The Council"], correct: 2 },
    { question: "What is the most popular spectator sport of Canada?", choices: ["Soccer", "Canadian football", "Hockey", "Basketball"], correct: 2 },
    { question: "Which of the following represents protecting and enjoying the heritage and environment in Canada?", choices: ["Government responsibilities", "Citizenship responsibilities and the laws of Canada", "Laws of Canada", "Citizenship responsibilities"], correct: 3 },
    { question: "Who are the Quebecois?", choices: ["All the French-speaking people in Canada are called Quebecois", "They form a nation within a united Canada", "They are descendants of British settlers who live in Quebec", "They are the Canadians who only speak French"], correct: 1 },
    { question: "Approximately how many Canadians served in the First World War?", choices: ["About 170,000", "About 10,000", "More than 60,000", "More than 600,000"], correct: 3 },
    { question: "When must federal elections be held?", choices: ["Whenever the Prime Minister calls the election", "About every four years", "When the MPs want a new Prime Minister", "On the third Monday in October every four years following the most recent general election"], correct: 3 },
    { question: "Which phrase embodied the vision for the Dominion of Canada?", choices: ["The land of the strong and free", "Dominion from sea to sea and from the river to the ends of the earth", "Dominion from ocean to ocean", "Oh Canada, my home and native land"], correct: 1 },
    { question: "How are your rights and freedoms protected?", choices: ["By the Charter of Rights and Freedoms", "By the King", "By citizenship", "None of these"], correct: 0 },
    { question: "Which of the following statements is true regarding Canada's membership in international organizations?", choices: ["Canada is a founding member of the United Nations but not of NATO", "Canada is a founding member of NATO but not of the United Nations", "Canada is a founding member of both the United Nations and NATO", "Canada is not a founding member of either the United Nations or NATO"], correct: 2 },
    { question: "Who do Canadians vote for in a federal election?", choices: ["A candidate whom they want to represent them in parliament", "All candidates in their electoral district", "The best speaker running the election campaign", "Someone to become the Premier of the province"], correct: 0 },
    { question: "What year was Confederation?", choices: ["1867", "1768", "1876", "1786"], correct: 0 },
    { question: "Which of the following is the responsibility of the federal government?", choices: ["Highways", "Currency", "Health", "Education"], correct: 1 },
    { question: "What is an electoral district?", choices: ["A geographical area where the politicians reside", "An area where politicians work", "A geographical area represented by a member of the House of Commons", "The area where voting takes place in your locality"], correct: 2 },
    { question: "What is the capital city of Canada?", choices: ["Ottawa", "Victoria", "Toronto", "Ontario"], correct: 0 },
    { question: "What did the fathers of Confederation do to establish Canada?", choices: ["They worked together to create a new country, the Dominion of Canada", "They were explorers who organized an expedition to survey northern Canada", "They formed a republic state in Canada", "They were a group of politicians who attempted to join Canada to the United States"], correct: 0 },
    { question: "Which province is the most easterly point in Canada?", choices: ["Prince Edward Island", "New Brunswick", "Nova Scotia", "Newfoundland and Labrador"], correct: 3 }

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
        window.location.href = "quiz19.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz21.html";
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
