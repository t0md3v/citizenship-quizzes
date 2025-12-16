/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [

    { question: "What is a majority government?", choices: ["The party in power holds at least half of the seats in the House of Commons and the Senate", "The party in power holds at least half of the seats in the House of Commons", "The party in power holds less than half of the seats in the House of Commons", "The party in power holds at least half of the seats in the Senate"], correct: 1 },
    { question: "Which countries fought in the War of 1812?", choices: ["United Kingdom and United States of America", "France and United Kingdom", "Canada and United States of America", "France, Great Britain and United States of America"], correct: 0 },
    { question: "Name three requirements you must meet in order to vote in a federal election.", choices: ["Canadian citizen, at least 21 years old, and on the list of electors", "Canadian citizen, at least 18 years old, and on the voters' list", "Working for the government, at least 18 years old, and Canadian citizen", "Canadian citizen, at least 16 years old, and on the list of voters"], correct: 1 },
    { question: "Which two provinces are on the Atlantic coast of Canada?", choices: ["British Columbia and Yukon", "Nova Scotia and New Brunswick", "Newfoundland and British Columbia", "Prince Edward Island and Ontario"], correct: 1 },
    { question: "How many provinces and territories are there in Canada?", choices: ["Eight provinces and three territories", "Ten provinces and two territories", "Nine provinces and two territories", "Ten provinces and three territories"], correct: 3 },
    { question: "Which of the following statements about residential schools is not true?", choices: ["The federal government placed many Aboriginal children in residential schools to educate and assimilate them into mainstream Canadian culture", "The schools were poorly funded and inflicted hardship on the students", "The schools were welcomed by the Aboriginal people", "Aboriginal language and cultural practices were mostly prohibited"], correct: 2 },
    { question: "Who have major responsibilities on First Nations reserves?", choices: ["Band chiefs and counselors", "Municipal governments", "Provincial and territorial governments", "Federal government"], correct: 0 },
    { question: "What important trade did the Hudson Bay Company control?", choices: ["Gold", "Oil", "Fishery", "Fur"], correct: 3 },
    { question: "Who are exempted from the requirement of adequate knowledge of English or French in order to become a Canadian citizen?", choices: ["Anyone who doesn't live in a major city", "Any adult applicants who are 55 years of age and under", "Any adult applicants who are 55 years of age and over", "No one"], correct: 2 },
    { question: "Who played a key role in defending Canada during the War of 1812 and led a group of Shawnee warriors in support of British soldiers and Canadian volunteers?", choices: ["Major General Sir Isaac Brock", "Lieutenant Colonel Charles de Salaberry", "Chief Tecumseh", "Major General Robert Ross"], correct: 2 },
    { question: "Which of the following are the responsibilities of local government?", choices: ["Education, foreign policy and transportation", "Health care, natural resources, and transportation", "National defense, health care, and transportation", "Social and community health, snow removal, and transportation"], correct: 3 },
    { question: "What does the Canadian flag look like?", choices: ["Red with a white maple leaf", "Red and white with a bear", "White with a red border on each end and a red maple leaf in the center", "Red and white with provincial emblems"], correct: 2 },
    { question: "What does Confederation mean?", choices: ["The joining of provinces to become a new country", "The United States Confederate Army came to settle in Canada", "The combination of neighborhood to build a larger community", "The merger of colonies to form a province"], correct: 0 },
    { question: "In what year were the Aboriginal peoples granted the right to vote?", choices: ["1960", "1790", "1950", "1632"], correct: 0 },
    { question: "In which period did Canada's economy and industry experience a boom?", choices: ["1880s", "1890s and early 1900s", "1920s", "1860s"], correct: 1 },
    { question: "What are the three parts of Parliament?", choices: ["The Queen or King, Governor General and Prime Minister", "The Governor General, the Legislative Assembly, and the Senate", "The Queen or King, The House of Commons and the Senate", "The House of Commons, the Legislative Assembly, and the Senate"], correct: 2 },
    { question: "Which two are Great Lakes?", choices: ["St. Lawrence and Superior", "Ontario and Okanagan", "Michigan and Okanagan", "Huron and Erie"], correct: 3 },
    { question: "What is known as the effort by women to achieve the right to vote?", choices: ["The suffrage motion of women", "The women's voting law", "The election law", "The women's suffrage movement"], correct: 3 },
    { question: "What do political parties do?", choices: ["Follow commands from the King", "Share ideas about how government should work", "Plan for the celebration of Canada Day", "Work with the local governments"], correct: 1 },
    { question: "Who were the United Empire loyalists?", choices: ["Inuit and First Nations", "French and British settlers", "First Nations and British settlers", "Settlers from the United States during the American Revolution"], correct: 3 }

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
        window.location.href = "quiz12.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz14.html";
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
   RESET QUIZ
========================== */

function resetQuiz() {
      // ✅ HIDE sticky retake button
    const stickyBtn = document.getElementById("retakeBtnSticky");
    stickyBtn.style.display = "none";

    swipeEnabled = true;
    shuffleQuestionsAndChoices();
    currentQuestion = 0;
    userAnswers = [];
    remainingTime = TOTAL_TIME;

    tallestHeight = calculateTallestQuestionHeight();
    quizDiv.style.minHeight = tallestHeight + "px";
    quizDiv.style.maxHeight = tallestHeight + "px";
    quizDiv.style.overflow = "hidden";

    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    nextBtn.classList.remove("retake");

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
