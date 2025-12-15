/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [
    { question: "Canada resisted U.S. invasion during which years?", choices: ["1939-1945", "1914-1918", "1812-1814", "1999"], correct: 2 },
    { question: "This document was signed in 1215.", choices: ["Confederation", "Magna Carta", "Constitutional Act", "Alberta Act"], correct: 1 },
    { question: "Rebellions in Upper and Lower Canada occurred in:", choices: ["1833", "1837-1838", "1937-1938", "1749"], correct: 1 },
    { question: "Upper and Lower Canada were created with the Constitutional Act signed in:", choices: ["1967", "1867", "1791", "1767"], correct: 2 },
    { question: "Confederation was achieved in which year?", choices: ["1791", "1891", "1867", "1949"], correct: 2 },
    { question: "Manitoba was created after the Red River Rebellion in:", choices: ["1791", "1867", "1870", "1949"], correct: 2 },
    { question: "First World War?", choices: ["1939-1945", "1837-1838", "1914-1918", "1814-1818"], correct: 2 },
    { question: "Second World War?", choices: ["1914-1918", "1965-1975", "1939-1945", "1839-1845"], correct: 2 },
    { question: "The Battle of the Plains of Abraham occurred in:", choices: ["1749", "1759", "1763", "1812"], correct: 1 },
    { question: "In 1905, these two provinces were created:", choices: ["Ontario & Quebec", "P.E.I. and Nova Scotia", "Alberta & Saskatchewan", "Newfoundland & Labrador"], correct: 2 },
    { question: "Which province was the last to join the Confederation in 1949?", choices: ["New Alberta", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia"], correct: 2 },
    { question: "Which group of people gained the right to vote in 1960?", choices: ["Newfies", "Women", "Indigenous", "Men"], correct: 2 },
    { question: "The current Canadian flag was first adopted in which year?", choices: ["1999", "1791", "1965", "1865"], correct: 2 },
    { question: "Which document was entrenched in 1982?", choices: ["Confederation", "Charter of Laws and Bylaws", "Charter of Rights and Freedoms", "Constitution"], correct: 2 },
    { question: "In which year was the territory of Nunavut created?", choices: ["1791", "1799", "1999", "1899"], correct: 2 },
    { question: "British Columbia joined the Confederation soon after Manitoba in which year?", choices: ["1867", "1870", "1871", "1971"], correct: 2 },
    { question: "In which decade did the name Canada begin appearing on maps?", choices: ["1210s", "1600s", "1550s", "1750s"], correct: 2 },
    { question: "John Cabot reached Canada’s east coast in:", choices: ["1453", "1497", "1534", "1608"], correct: 1 },
    { question: "In which year did the British Parliament abolish slavery throughout the Empire?", choices: ["1933", "1929", "1829", "1833"], correct: 3 },
    { question: "In which year did women gain the right to vote in Canada?", choices: ["1812", "1945", "1918", "1215"], correct: 2 }
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
    questions = originalQuestions.map(q => {
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
    HAPTIC FEEDBACK (FOR MOBILE)
   ========================== */
   
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(20); // tiny buzz, not a chainsaw 😏
  }
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

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (!swipeEnabled) return; // nope 🚫

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
            alert("Time is up! The quiz will be submitted automatically.");
            endQuiz();
            return;
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
    const seconds = String(remainingTime % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `Time Remaining: ${minutes}:${seconds}`;
}

/* ==========================
   LOAD QUESTION
   ========================== */
function loadQuestion() {
    const q = questions[currentQuestion];
    const savedAnswer = userAnswers[currentQuestion];

    const progressPercent = Math.round((currentQuestion / (questions.length - 1)) * 100);

    quizDiv.innerHTML = `
        <div class="question-counter">Question ${currentQuestion + 1} of ${questions.length}</div>
        <div class="progress-bar" style="background: #e0e0e0; border-radius: 5px; overflow: hidden; height: 12px; margin-bottom: 15px;">
            <div style="width: ${progressPercent}%; height: 100%; background: #007bff;"></div>
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

    // Auto-advance listener
document.querySelectorAll('input[name="choice"]').forEach(input => {
    input.addEventListener('change', (e) => {
        saveAnswer();

        // highlight the selected label
        const label = e.target.closest('label');
        label.classList.add('selected');

        setTimeout(() => {
            label.classList.remove('selected');

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                endQuiz();
            }
        }, 200); // 0.2 second delay
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
prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        saveAnswer();
        currentQuestion--;
        loadQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        endQuiz();
    }
});

/* ==========================
   END QUIZ
========================== */
function endQuiz() {
    swipeEnabled = false;
    clearInterval(timerInterval);

    let wrongAnswers = 0;
    let reviewHTML = "";

    questions.forEach((q, i) => {
        const ans = userAnswers[i];
        const correct = q.correct;
        reviewHTML += `<div class="review-item">
            <strong>${i + 1}. ${q.question}</strong>
            <div class="${ans === correct ? 'correct' : 'wrong'}">
                Your answer: ${ans !== undefined ? q.choices[ans] : 'No answer selected'}
            </div>
            ${ans !== correct ? `<div class="correct">Correct answer: ${q.choices[correct]}</div>` : ''}
        </div>`;
        if (ans !== correct) wrongAnswers++;
    });

    const total = questions.length;
    const correctCount = total - wrongAnswers;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 75;
    const totalElapsed = TOTAL_TIME - remainingTime;
    const minutes = Math.floor(totalElapsed / 60);
    const seconds = totalElapsed % 60;

    quizDiv.innerHTML = `


        <div class="result ${passed ? 'pass' : 'fail'}">
            Result: ${passed ? 'PASS' : 'FAIL'}<br>
            Correct: ${correctCount} / ${total}<br>
            Wrong: ${wrongAnswers}<br>
            Percentage: ${percentage}%<br>
            Time Taken: ${minutes} min ${seconds} sec
        </div>

                <!-- Top buttons -->
        <div class="top-buttons" style="text-align:center; margin-bottom:20px;">
            <button onclick="window.location.href='index.html'">Home</button>
            <button onclick="window.location.href='history.html'">History Quiz</button>
            <button onclick="window.location.href='general.html'">General Quiz</button>
            <button onclick="window.location.href='random.html'">20 Qs Random Quiz</button>
        </div>

        <div class="review"><h3>Quiz Review</h3>${reviewHTML}</div>
    `;

    nextBtn.textContent = "Retake Quiz";
    nextBtn.classList.add("retake");
    nextBtn.onclick = resetQuiz;
    prevBtn.style.display = "none";
}


/* ==========================
   RESET QUIZ
   ========================== */
function resetQuiz() {
    swipeEnabled = true;
    shuffleQuestionsAndChoices();
    currentQuestion = 0;
    userAnswers = [];
    remainingTime = TOTAL_TIME;
    nextBtn.classList.remove("retake");
    prevBtn.style.display = "inline-block";
    startTimer();
    loadQuestion();
}

/* ==========================
   START QUIZ
   ========================== */
shuffleQuestionsAndChoices();
startTimer();
loadQuestion();
