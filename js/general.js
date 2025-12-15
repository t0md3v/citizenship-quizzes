/*=========================
SHUFFLE HELPER
=========================*/
function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
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
QUESTIONS (20)
==========================*/
const originalQuestions = [
    { question: "Which of the following is referred to as an Atlantic Province?", choices: ["Prince Edward Island", "British Columbia", "Manitoba", "Quebec"], correct: 0 },
    { question: "Who is entitled to vote in Canadian federal elections?", choices: ["Blue Jays Fans", "Permanent Residents", "Temporary Foreign Workers", "Canadian Citizens"], correct: 3 },
    { question: "In Canada, are you obliged to tell other people how you voted?", choices: ["Yes", "No"], correct: 1 },
    { question: "What is the capital of Quebec?", choices: ["Montreal", "Quebectown", "Quebec City", "Quebecton"], correct: 2 },
    { question: "Who were the founding peoples of Canada?", choices: ["British, Canadian and Australian", "American, French and British", "Aboriginal, French and British", "Aboriginal, French and Latino"], correct: 2 },
    { question: "What are three responsibilities of citizenship?", choices: ["Obeying the law, taking responsibility for oneself and one’s family, serving on a jury.", "Being loyal to Canada, recycling newspapers, serving in the navy, army or air force.", "Learning both official languages, voting in elections, belonging to a union.", "Buying Canadian products, owning your own business, using less water."], correct: 0 },
    { question: "What is the meaning of the Remembrance Day poppy?", choices: ["To remember our Sovereign, Queen Elizabeth II.", "To remember the sacrifice of Canadians who have served or died in wars up to the present day.", "To celebrate Confederation.", "To honour prime ministers who have died."], correct: 1 },
    { question: "How are members of parliament chosen?", choices: ["They are elected by landowners and police chiefs.", "They are chosen by the provincial premiers.", "They are appointed by the United Nations.", "They are elected by voters in their local constituency (riding)."], correct: 3 },
    { question: "What did Sir Frederick Banting and Charles Best discover?", choices: ["Viagra", "Penicillin", "Insulin", "Aspirin"], correct: 2 },
    { question: "What is the highest honour that Canadians can receive?", choices: ["The Elizabeth Necklace", "The Elizabeth Ring", "The Victoria Cake", "The Victoria Cross"], correct: 3 },
    { question: "When was the Magna Carta signed?", choices: ["1649", "1414", "1615", "1215"], correct: 3 },
    { question: "What does the Great Charter of Freedom include?", choices: ["Aboriginal Peoples' rights", "Freedom of consience and religion", "Employment rights", "Freedom from taxes"], correct: 1 },
    { question: "What is Habeas corpus?", choices: ["The right to challenge unlawful detention by the state", "The right to live and work anywhere in Canada", "The right for peaceful assembly", "The right to Tim Hortons coffee"], correct: 0 },
    { question: "Who is above the law in Canada?", choices: ["Judges", "Police", "No one", "Everybody"], correct: 2 },
    { question: "What are the 3 branches of the Canadian government", choices: ["Executive, Senate and Judicial", "Executive, Legislative and Judicial", "Executive, Police and Judicial", "Executive, Legislative and Monarchy"], correct: 1 },
    { question: "Who governs Canada on a daily basis at the federal level?", choices: ["The King or Queen", "The Premier", "The Prime Minister", "The Governor General"], correct: 2 },
    { question: "What is a part of our heritage under the Canadian legal system?", choices: ["Freedom under law", "Democratic principles and due process", "Rule of law", "All of the above"], correct: 3 },
    { question: "What is Canada's largest city and main financial centre?", choices: ["Vancouver", "Toronto", "Montreal", "Calgary"], correct: 1 },
    { question: "Where do Inuit people live?", choices: ["Ontario", "Reserve land", "In scattered communities across the Arctic", "In scattered communities across the Antarctic"], correct: 2 },
    { question: "Which region was stormed and captured on D-Day (June 6, 1944) by the Canadian troops?", choices: ["Berlin", "Juno Beach", "London", "Paris"], correct: 1 }
];

/* ==========================
STATE
==========================*/
let questions = [];
let currentQuestion = 0;
let userAnswers = [];
const TOTAL_TIME = 45 * 60; // seconds
let remainingTime = TOTAL_TIME;
let timerInterval;
let swipeEnabled = true;

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
ELEMENTS
==========================*/
const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const timerDiv = document.getElementById("timer");

/* ==========================
TIMER (COUNTDOWN)
==========================*/
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
    timerDiv.textContent = `Time Remaining: ${minutes}:${seconds}`;
}

/* ==========================
SHUFFLE QUESTIONS
==========================*/
function shuffleQuestions() {
    questions = originalQuestions.map(q => {
        const shuffled = shuffleArray(
            q.choices.map((c, i) => ({ text: c, isCorrect: i === q.correct }))
        );
        return {
            question: q.question,
            choices: shuffled.map(c => c.text),
            correct: shuffled.findIndex(c => c.isCorrect)
        };
    });
    questions = shuffleArray(questions);
}

/* ==========================
LOAD QUESTION
==========================*/
function loadQuestion() {
    const q = questions[currentQuestion];
    const progress = Math.round((currentQuestion / questions.length) * 100);

    quizDiv.innerHTML = `
        <div class="question-counter">Question ${currentQuestion + 1} of ${questions.length}</div>
        <div class="progress-bar"><div style="width:${progress}%"></div></div>
        <div class="question">${q.question}</div>
        <div class="choices">
            ${q.choices.map((c, i) => `
                <label>
                    <input type="radio" name="choice" value="${i}">
                    ${c}
                </label>
            `).join("")}
        </div>
    `;

    prevBtn.disabled = currentQuestion === 0;

    quizDiv.querySelectorAll('input[name="choice"]').forEach(input => {
        input.addEventListener("change", e => {
            userAnswers[currentQuestion] = parseInt(e.target.value);

            setTimeout(() => {
                if (currentQuestion === questions.length - 1) {
                    endQuiz();
                } else {
                    currentQuestion++;
                    loadQuestion();
                }
            }, 200);
        });
    });
}

/* ==========================
END QUIZ
==========================*/
function endQuiz() {
    swipeEnabled = false;
    clearInterval(timerInterval);

    const timeUsed = TOTAL_TIME - remainingTime;
    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;

    let wrong = 0;
    let review = "";

    questions.forEach((q, i) => {
        if (userAnswers[i] !== q.correct) {
            wrong++;
            review += `
                <div class="review-item">
                    <strong>${q.question}</strong>
                    <div class="wrong">
                        Your answer: ${userAnswers[i] !== undefined ? q.choices[userAnswers[i]] : "None"}
                    </div>
                    <div class="correct">
                        Correct: ${q.choices[q.correct]}
                    </div>
                </div>
            `;
        }
    });

    const total = questions.length;
    const correctCount = total - wrong;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = wrong < 6;
    const totalElapsed = TOTAL_TIME - remainingTime;

    quizDiv.innerHTML = `


        <div class="result ${passed ? 'pass' : 'fail'}">
            Result: ${passed ? 'PASS' : 'FAIL'}<br>
            Correct: ${correctCount} / ${total}<br>
            Wrong: ${wrong}<br>
            Percentage: ${percentage}%<br>
            Time Taken: ${minutes} min ${seconds} sec
        </div>

                <!-- Sticky top buttons -->
        <div class="top-buttons" style="
            position: sticky;
            top: 0;
            background: rgba(255,255,255,0.95);
            padding: 10px 0;
            text-align: center;
            z-index: 10;
            margin-bottom: 20px;
        ">
            <button onclick="window.location.href='index.html'">Home</button>
            <button onclick="window.location.href='history.html'">History Quiz</button>
            <button onclick="window.location.href='dates.html'">Dates Quiz</button>
            <button onclick="window.location.href='random.html'">20 Qs Random Quiz</button>
        </div>

        ${review ? `<div class="review"><h3>Review</h3>${review}</div>` : ""}
    `;

    // Hide the 'Next' button and show the 'Retake Quiz' button
    nextBtn.style.display = "inline-block";
    nextBtn.textContent = "Retake Quiz";
    nextBtn.classList.add("retake");

    // Hide the 'Previous' button
    prevBtn.style.display = "none";

    // Reset the next button to allow quiz retake when clicked
    nextBtn.onclick = resetQuiz;
}

/* ==========================
RESET QUIZ
==========================*/
function resetQuiz() {
    swipeEnabled = true;
    clearInterval(timerInterval);
    // Reset state
    currentQuestion = 0;
    userAnswers = [];
    remainingTime = TOTAL_TIME;

    // Reset buttons
    nextBtn.classList.remove("retake");
    nextBtn.textContent = "Next";
    nextBtn.style.display = "inline-block";
    prevBtn.style.display = "inline-block";
    prevBtn.disabled = true;

    // Shuffle & restart
    shuffleQuestions();
    startTimer();
    loadQuestion();
}


/* ==========================
START
==========================*/
shuffleQuestions();
startTimer();
loadQuestion();
