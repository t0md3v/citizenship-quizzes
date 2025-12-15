/* ==========================
   QUESTIONS (NEW SET)
========================== */
const originalQuestions = [
    { question: "Who first migrated to North America via Beringia?", choices: ["Vikings", "Inuit", "Ancestors of Indigenous peoples", "French settlers"], correct: 2 },
    { question: "Who led the Norse settlement at L’Anse aux Meadows?", choices: ["Erik the Red", "Leif Erikson", "John Cabot", "Jacques Cartier"], correct: 1 },
    { question: "John Cabot reached Canada’s east coast in:", choices: ["1453", "1497", "1534", "1608"], correct: 1 },
    { question: "Which country founded the first permanent European colony in Canada?", choices: ["England", "Spain", "France", "Netherlands"], correct: 2 },
    { question: "Who founded Quebec City?", choices: ["Louis XIV", "Jacques Cartier", "Samuel de Champlain", "Frontenac"], correct: 2 },
    { question: "New France distributed land using:", choices: ["Township system", "Homesteads", "Seigneurial system", "Feudal grants"], correct: 2 },
    { question: "Which fur-trading company was founded in 1670?", choices: ["North West Company", "Canadian Fur Corp", "Hudson’s Bay Company", "Compagnie des Cent-Associés"], correct: 2 },
    { question: "French rule in Canada ended after:", choices: ["War of 1812", "American Revolution", "Seven Years’ War", "Napoleonic Wars"], correct: 2 },
    { question: "The Battle of the Plains of Abraham occurred in:", choices: ["1749", "1759", "1763", "1812"], correct: 1 },
    { question: "New France was formally ceded to Britain by the:", choices: ["Treaty of Utrecht", "Treaty of Versailles", "Treaty of Paris (1763)", "Quebec Act"], correct: 2 },
    { question: "Which act protected French civil law and Catholic rights?", choices: ["Constitutional Act", "Act of Union", "Quebec Act (1774)", "British North America Act"], correct: 2 },
    { question: "Why did Loyalists move to Canada?", choices: ["Cheap land", "Religious freedom", "They stayed loyal to Britain after the American Revolution", "Fur trading"], correct: 2 },
    { question: "Upper Canada later became:", choices: ["Quebec", "Manitoba", "Ontario", "Nova Scotia"], correct: 2 },
    { question: "The War of 1812 was mainly about:", choices: ["Independence from Britain", "Expanding west", "Defending against U.S. invasion", "Ending slavery"], correct: 2 },
    { question: "The Province of Canada united:", choices: ["Nova Scotia and New Brunswick", "Quebec and Newfoundland", "Upper and Lower Canada", "Ontario and Manitoba"], correct: 2 },
    { question: "Responsible government meant:", choices: ["Rule by Britain", "Military control", "The executive is accountable to elected representatives", "Direct democracy"], correct: 2 },
    { question: "What pushed leaders toward Confederation?", choices: ["Gold rushes", "British pressure", "Political deadlock in the Province of Canada", "U.S. Civil War casualties"], correct: 2 },
    { question: "Confederation happened in:", choices: ["1841", "1861", "1867", "1873"], correct: 2 },
    { question: "Which province was NOT an original member of Confederation?", choices: ["Ontario", "Quebec", "Nova Scotia", "Manitoba"], correct: 3 },
    { question: "The main reason for Confederation was:", choices: ["Cultural unity", "Religion", "Security, economy, and political stability", "British taxation"], correct: 2 }
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

    quizDiv.innerHTML = `
        <div class="question-counter">Question ${currentQuestion + 1} of ${questions.length}</div>
        <div class="progress-bar"><div style="width:${((currentQuestion)/questions.length)*100}%"></div></div>
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

    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Score Quiz" : "Next";
    prevBtn.disabled = currentQuestion === 0;

    // Auto-advance when answer is selected
document.querySelectorAll('input[name="choice"]').forEach(input => {
    input.addEventListener('change', (e) => {
        saveAnswer();

        // highlight the selected label briefly
        const label = e.target.closest('label');
        label.classList.add('selected');

        setTimeout(() => {
            label.classList.remove('selected');

            // If it’s the last question, end the quiz
            if (currentQuestion === questions.length - 1) {
                endQuiz();
            } else {
                currentQuestion++;
                loadQuestion();
            }
        }, 200); // short delay for visual effect
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
   NEXT & PREVIOUS BUTTONS
========================== */
nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        endQuiz();
    }
});

prevBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
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
        const userAnswer = userAnswers[i];

        if (userAnswer !== q.correct) {
            wrongAnswers++;

            reviewHTML += `
                <div class="review-item">
                    <strong>${q.question}</strong>
                    <div class="wrong">
                        Your answer: ${userAnswer !== undefined ? q.choices[userAnswer] : "No answer selected"}
                    </div>
                    <div class="correct">
                        Correct answer: ${q.choices[q.correct]}
                    </div>
                </div>
            `;
        }
    });

    const total = questions.length;
    const correct = total - wrongAnswers;
    const percentage = Math.round((correct / total) * 100);
    const passed = wrongAnswers < 6;

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    quizDiv.innerHTML = `
        

        <div class="result ${passed ? "pass" : "fail"}">
            Result: ${passed ? "PASS" : "FAIL"}<br><br>
            Correct: ${correct} / ${total}<br>
            Wrong: ${wrongAnswers}<br>
            Percentage: ${percentage}%<br>
            Time: ${minutes} min ${seconds} sec
        </div>

<!-- Top buttons -->
        <div class="top-buttons">
            <button onclick="window.location.href='index.html'">Home</button>
            <button onclick="window.location.href='history.html'">History Quiz</button>
            <button onclick="window.location.href='dates.html'">Dates Quiz</button>
            <button onclick="window.location.href='random.html'">20 Qs Random Quiz</button>
        </div>

        ${reviewHTML
            ? `<div class="review"><h3>Review Incorrect Answers</h3>${reviewHTML}</div>`
            : ""
        }
    `;

    nextBtn.textContent = "Retake Quiz";
    nextBtn.classList.add("retake");
    prevBtn.style.display = "none";

    nextBtn.onclick = resetQuiz;
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
   INITIALIZE QUIZ
========================== */
shuffleQuestionsAndChoices();
startTimer();
loadQuestion();
