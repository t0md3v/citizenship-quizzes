/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [

    { question: "Who is awarded the honor of Victoria Cross?", choices: ["Canadian politicians", "Police officers", "Best innovation of the year", "A Canadian showing conspicuous bravery or self-sacrifice"], correct: 3 },
    { question: "Federal elections are carried out to elect:", choices: ["The Premier", "The Prime Minister", "The Member of Parliament", "The Senator"], correct: 2 },
    { question: "What is a part of our heritage under the Canadian legal system?", choices: ["Freedom under law", "Democratic principles and due process", "Rule of law", "All of these"], correct: 3 },
    { question: "What is Canada's largest city and main financial center?", choices: ["Vancouver", "Toronto", "Montreal", "Calgary"], correct: 1 },
    { question: "Which of the following describe two responsibilities of provincial or territorial government?", choices: ["Policing and citizenship", "Policing and firefighting", "National defense and highways", "Education and healthcare"], correct: 3 },
    { question: "Where do Inuit people live?", choices: ["Ontario", "Reserve land", "In scattered communities across the Arctic", "Prairie provinces"], correct: 2 },
    { question: "Who contributed to the invention of the radio and also sent the world's first wireless voice message?", choices: ["Reginald Fessenden", "Alexander Graham Bell", "Mike Lazaridis", "Matthew Evans"], correct: 0 },
    { question: "Which region was stormed and captured on D-Day, June 6th, 1944 by Canadian troops?", choices: ["Berlin", "Juno Beach", "London", "Paris"], correct: 1 },
    { question: "Who invented the sport of basketball?", choices: ["Canadians", "French", "Germans", "Americans"], correct: 0 },
    { question: "What are the men who established Canada called?", choices: ["Fathers of Confederation", "Fathers of Dominion of Canada", "Fathers of Canada", "Fathers of Constitution"], correct: 0 },
    { question: "Which of the following describe two responsibilities of federal government?", choices: ["National Defense and Foreign Policy", "National Defense and Firefighting", "Citizenship and maintaining highways", "Healthcare and education"], correct: 0 },
    { question: "In which year was the British Parliament prohibited from buying and selling slaves?", choices: ["1793", "1877", "1807", "1833"], correct: 2 },
    { question: "Who became the first French Canadian Prime Minister since the formation of Confederation?", choices: ["Sir John Alexander Macdonald", "Sir Wilfrid Laurier", "Sir George-Etienne Cartier", "Sir Leonard Tilley"], correct: 1 },
    { question: "Which of the following is the highest court of Canada?", choices: ["A provincial court", "The small claims courts", "The Supreme Court", "The Federal Court"], correct: 2 },
    { question: "Who represents an electoral district?", choices: ["The Commissioner", "The Governor General", "The Lieutenant Governor", "A Member of Parliament"], correct: 3 },
    { question: "Which of the following was invented by Alexander Graham Bell?", choices: ["Blackberry", "Fax machine", "Telephone", "Internet"], correct: 2 },
    { question: "Which sport has the greatest number of registered players in Canada?", choices: ["Lacrosse", "Soccer", "Curling", "Basketball"], correct: 1 },
    { question: "What is celebrated on April 9th?", choices: ["Vimy Day", "Family Day", "Thanksgiving Day", "Boxing Day"], correct: 0 },
    { question: "When was employment insurance introduced by the Canadian federal government?", choices: ["1947", "1950", "1940", "1965"], correct: 2 },
    { question: "What information can be found on a voter information card?", choices: ["Confirms that your name is on the voter's list", "States when you vote", "States where you vote", "All of these"], correct: 3 }

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
        window.location.href = "quiz14.html";
    };
    document.getElementById("nextQuiz").onclick = () => {
        window.location.href = "quiz16.html";
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
