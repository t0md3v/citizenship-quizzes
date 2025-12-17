/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [
{ question: "How are members of parliament chosen?", choices: ["Elected by senators", "Elected by the prime minister", "Chosen by the king", "Elected by Canadian citizens"], correct: 3 },
{ question: "In what jobs did the Metis first work with European settlers?", choices: ["Supplies, traders, guides, and interpreters", "Taking care of children", "Building housing", "Fishing"], correct: 0 },
{ question: "What does the National Register of Electors contain?", choices: ["Database of landed immigrants", "Database of Canadian citizens at least 18 years of age who are qualified to vote in federal elections and referendums", "Database of all Canadian citizens", "Database of Canadian taxpayers"], correct: 1 },
{ question: "What was the main advantage of the NAFTA agreement?", choices: ["Free trade among Canada, the USA, and Mexico", "Free trade between Canada and China", "Free trade between Canada and the UK", "Free trade between Canada and Japan"], correct: 0 },
{ question: "Who are the Metis?", choices: ["The distinct Aboriginal people of Atlantic Canada", "A people of mixed Inuit or First Nations ancestry, most of whom live on the prairies", "First Nations people speaking the mischief dialect", "A distinct people of mixed Aboriginal and European ancestry"], correct: 3 },
{ question: "Which act granted for the first time in Canada legislative assemblies elected by the people?", choices: ["The Constitutional Act of 1982", "The Constitutional Act of 1891", "The Constitutional Act of 1791", "The Constitutional Act of 1972"], correct: 2 },
{ question: "Who appoints the judges of the Supreme Court of Canada?", choices: ["The Governor General", "The Prime Minister", "Other judges", "The people"], correct: 0 },
{ question: "What does the crown mean for Canadians?", choices: ["The crown is a symbol of government including parliament, legislatures, courts, police services, and the armed forces", "The crown contains symbols of England, France, Scotland, and Ireland, as well as red maple leaves", "A national motto, Amario Admare, which in Latin means from sea to sea", "The crown reflects the Greco-Roman heritage of Western civilization in which democracy originated"], correct: 0 },
{ question: "What did the suffrage movement achieve?", choices: ["Quebec experienced an era of rapid change", "The suffrage movement abolished slavery in Canada", "The suffrage movement led to the introduction of employment insurance", "Women achieved the right to vote"], correct: 3 },
{ question: "When did settlers from France first establish communities on the St. Lawrence River?", choices: ["Late 1600s", "Early 1700s", "Late 1700s", "Early 1600s"], correct: 3 },
{ question: "Which region is known as the industrial and manufacturing heartland of Canada?", choices: ["Atlantic provinces", "Prairie provinces", "Central Canada", "West Coast"], correct: 2 },
{ question: "What types of jobs are provided by service industries?", choices: ["Communications and retail services", "Transportation and education", "Tourism and government", "All answers are correct"], correct: 3 },
{ question: "With which words does the Canadian Charter of Rights and Freedoms begin?", choices: ["Canadian citizens have rights and responsibilities", "Oh Canada, our home and native land", "Canada is a free country and home of the brave", "Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law"], correct: 3 },
{ question: "Which of the following is not a responsibility of Canadian citizens?", choices: ["Learning to speak both official languages", "Voting in elections", "Obeying the law", "Taking responsibility for oneself and one's family"], correct: 0 },
{ question: "What do Canadians remember on Remembrance Day?", choices: ["Canadian victory in World War I", "Canadian victory in the Battle of Vimy Ridge", "Canadian victory in World War II", "Sacrifices made by Canadian veterans and brave soldiers in wars"], correct: 3 },
{ question: "Why was the Canadian Pacific Railway built?", choices: ["The railway made it possible for immigrants to settle in central Canada", "British Columbia joined Canada in 1871 after Ottawa promised to build a railway to the west coast", "To provide a spectacular tourist excursion across precipitous passes and bridges", "So British Columbia could handle the trade of goods worth billions of dollars all around the world"], correct: 1 },
{ question: "Why is trade with other countries important to Canada?", choices: ["Trade with other countries changed the native way of life forever", "To increase trade and enjoy one of the world's highest standards of living", "Canada has become a member of the World Trade Organization", "The French and Aboriginal people collaborated with Canada in the vast foreign trade economy"], correct: 1 },
{ question: "Which of the following best describes the role of the King in Canada?", choices: ["To make important decisions about how the country is governed", "To peacefully oppose or try to improve government proposals", "To run the federal government departments", "To focus on citizenship and allegiance, be a symbol of Canadian sovereignty and a guardian of constitutional freedoms"], correct: 3 },
{ question: "What does it mean to say Canada is a constitutional monarchy?", choices: ["The sovereign queen or king approves bills before they become law", "The sovereign queen or king represents Canadians in parliament", "Canada's head of state is a hereditary sovereign queen or king who reigns in accordance with the constitution", "The sovereign queen or king is the lawmaker of Canada"], correct: 2 },
{ question: "Remembrance Day is celebrated on?", choices: ["July 1st", "July 4th", "November 11th", "November 20th"], correct: 2 }
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
        window.location.href = "quiz1.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz3.html";
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
