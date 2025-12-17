/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [

    { question: "You can vote in advance if", choices: ["You are elderly", "You know you will not be able to vote on election day", "Sick and physically disabled", "All of these"], correct: 3 },
    { question: "Who signs the bills if it is approved by the provincial parliament?", choices: ["The Mayor", "The Premier", "The members of the Provincial Parliament", "The Lieutenant Governor"], correct: 3 },
    { question: "What does MPP stand for?", choices: ["Member of the Provincial Parachute", "Member of the Provincial Police", "Member of the Provincial Parliament", "Member of the Provincial Publication"], correct: 2 },
    { question: "How are senators chosen?", choices: ["By the Premier of all provinces", "By the Governor General of Canada", "Appointed by the Governor General on the advice of the Prime Minister", "Appointed by the King"], correct: 2 },
    { question: "Who was the first prime minister of Canada?", choices: ["Sir John Alexander Macdonald", "Alexander Mackenzie", "Pierre Elliot Trudeau", "Sir John Macdonald"], correct: 0 },
    { question: "Which animal is an official symbol of Canada?", choices: ["Bear", "Moose", "Beaver", "Snowbird"], correct: 2 },
    { question: "What do you mark on a federal election ballot?", choices: ["A check mark", "An X", "A sticker", "A thumbprint"], correct: 1 },
    { question: "What does the blindfolded Lady Justice symbolize?", choices: ["Blind to all considerations other than facts", "The government must respect all of the legal rights a person is entitled to under the law", "Our judicial system is founded on the presumption of innocence in criminal matters", "None of these"], correct: 0 },
    { question: "When did thousands of miners first come to Yukon?", choices: ["1870s", "1980s", "1780s", "1890s"], correct: 3 },
    { question: "When is Sir Wilfrid Laurier Day celebrated?", choices: ["12th of November", "20th of November", "22nd of November", "2nd of November"], correct: 1 },
    { question: "What is the significance of the Canadian discovery of insulin?", choices: ["It saved lives of children with sickness", "It saved millions of lives of people with diabetes", "It helped the treatment of heart diseases", "It was an important medicine to save soldiers life during World War II"], correct: 1 },
    { question: "Jurisdiction is shared by federal government and provinces over which of the following sectors?", choices: ["Agriculture and immigration", "Interprovincial trade and communications", "Defense and health", "Natural resources"], correct: 0 },
    { question: "What do you call the King's representative in the territories?", choices: ["Commissioner", "Member of the Legislative Assembly", "Sir", "Lieutenant Governor"], correct: 0 },
    { question: "What are the provinces of the Atlantic region?", choices: ["Newfoundland, Nova Scotia, New Brunswick, and Quebec", "Nova Scotia, New Brunswick, Prince Edward Island, and Quebec", "Nova Scotia, Newfoundland, New Brunswick, and Prince Edward Island", "New Brunswick, Nova Scotia, Ontario, and Quebec"], correct: 2 },
    { question: "Why is the Battle of Vimy Ridge important in Canadian history?", choices: ["It was the last battle of the First World War", "It has come to symbolize Canada's becoming as a nation", "It was an important victory in the Boer War", "Out of it was formed the Canadian corps"], correct: 1 },
    { question: "From where does the name Canada come?", choices: ["From the Inuit word Kanata meaning nations", "From Kanata, the First Nations word for village", "From the Inuit word meaning home", "From the First Nations word meaning land"], correct: 1 },
    { question: "What are the three main types of industry in Canada?", choices: ["Natural resources, manufacturing, and services", "Mining, services, and manufacturing", "Oil, tourism, and manufacturing", "Fishery, tourism, and services"], correct: 0 },
    { question: "Which country lies on Canada's southern border?", choices: ["Central America", "Mexico", "Michigan", "United States of America"], correct: 3 },
    { question: "What are the prairie provinces?", choices: ["Saskatchewan and Manitoba", "Alberta, Manitoba, and British Columbia", "Saskatchewan, Alberta, and Manitoba", "Saskatchewan and Alberta"], correct: 2 },
    { question: "Where do English and French have equal status in Canada?", choices: ["In the workplace", "In schools", "In the Parliament of Canada", "At the city hall"], correct: 2 }

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
        window.location.href = "quiz11.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz13.html";
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
