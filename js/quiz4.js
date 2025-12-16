/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [
{ question: "What is a cabinet minister?", choices: ["Candidate picked by the Prime Minister", "MP picked by the Premier of each province", "MP selected by the Prime Minister to run federal departments", "MP selected by the king to make laws"], correct: 2 },
{ question: "Who discovered insulin?", choices: ["Dr. Wilder Penfield", "Matthew Evans and Henry Woodward", "Sir Frederick Banting and Charles Best", "Dr. John A. Hops"], correct: 2 },
{ question: "What is a major river in Quebec?", choices: ["Hudson's Bay", "Niagara", "Fraser River", "St. Lawrence River"], correct: 3 },
{ question: "Who circled the globe in a wheelchair to raise funds for spinal cord research?", choices: ["Reginald Fessendon", "Rick Hansen", "Terry Fox", "Gard Herdsburg"], correct: 1 },
{ question: "Who is the father of Manitoba and defender of Metis rights?", choices: ["Louis Riel", "Sir Louis-Hippolyte La Fontaine", "Sir John Alexander Macdonald", "Sir William Riel"], correct: 0 },
{ question: "Which of the following is a non-Canadian not allowed to do?", choices: ["Leave the country at will", "Contact his or her MP", "Take the Canada citizenship test", "Vote in federal and provincial elections"], correct: 3 },
{ question: "Why is the north sometimes called the land of the midnight sun?", choices: ["It is closer to the sun", "The northern lights appear at midnight", "It is night most of the time", "Summer daylight can last up to 24 hours"], correct: 3 },
{ question: "One-third of all Canadians live in?", choices: ["Saskatchewan", "Quebec", "Alberta", "Ontario"], correct: 3 },
{ question: "Who can ask you about whom you voted for?", choices: ["No one", "Any other Canadian", "Your local MP", "The Prime Minister"], correct: 0 },
{ question: "When did the United Empire loyalists come to Canada?", choices: ["Late 1600s", "Early 1600s", "Early 1700s", "Late 1700s"], correct: 3 },
{ question: "What happens when the federal government loses a confidence vote?", choices: ["An election is called", "The official opposition party takes power", "The Prime Minister loses his job", "The Prime Minister is no longer the leader of his party"], correct: 0 },
{ question: "What happened at the Battle of the Plains of Abraham?", choices: ["The Voyagers battled with the British for fur trading rights", "Americans fought the United Empire loyalists during the American Revolution", "The British defeated the French, marking the end of France's empire in America", "The French defeated the British in a battle for Quebec"], correct: 2 },
{ question: "Who has the right to apply for a Canadian passport?", choices: ["British citizens", "Canadian citizens", "Any immigrant who has stayed a minimum of 3 years in Canada", "Wealthy citizens"], correct: 1 },
{ question: "Who were the group of seven in modern Canada?", choices: ["A group of politicians", "A group of Canadian companies", "A group of cowboys who defended Canada", "A group of Canadian landscape painters in the 1920s"], correct: 3 },
{ question: "What is a responsible government?", choices: ["The government is responsible for the well-being of its people", "The government must take responsibility for any act of war it decides to commit", "A government that is against corruption", "The government must resign if it loses a confidence vote in the assembly"], correct: 3 },
{ question: "What outcome and significance did the War of 1812 with the USA have for Canada?", choices: ["Canada formed part of the United States", "Canada lost a lot of people in the war", "Canada protected its independence from the United States", "Canada became an independent country"], correct: 2 },
{ question: "What level of government passes bylaws?", choices: ["Provincial", "Municipal or local government", "Federal", "Senators"], correct: 1 },
{ question: "What is the meaning of the Canadian Coat of Arms and motto, A Mari Usque Ad Mare?", choices: ["From air to land", "From sea to land", "From land to sea", "From sea to sea"], correct: 3 },
{ question: "What are three key facts about Canada's system of government?", choices: ["A federal kingdom, a parliamentary democracy, and a constitutional monarchy", "A federal state, a parliamentary democracy, and a constitutional monarchy", "A socialist country, a parliamentary democracy, and a constitutional monarchy", "A federal country, a constitutional democracy, and a parliamentary monarchy"], correct: 1 },
{ question: "In which type of industry did most early European settlers work?", choices: ["Fur trading", "Oil", "Gold mining", "Hunting"], correct: 0 }
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
        window.location.href = "quiz3.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz5.html";
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
