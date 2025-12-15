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
    { question: "In which year did women gain the right to vote in Canada?", choices: ["1812", "1945", "1918", "1215"], correct: 2 },
    { question: "What happened in 1670?", choices: ["The Hudsons Bay Company was founded", "The Seven Years' War Ended", "Tim Horton's was founded", "Louis Riel was executed"], correct: 0 },
    { question: "When was the Seven Years' War?", choices: ["1756-1763", "1911-1918", "1939-1946", "2017-2024"], correct: 0 },
    { question: "TRUE or FALSE: The Battle of the Plains of Abraham happened during the Seven Years' War.", choices: ["True", "False"], correct: 0 },
    { question: "What Happened in 1763?", choices: ["This year marked the end of New France and the beginning of British control over what is now Canada", "The Seven Years' War began", "The Hudson's Bay Company was founded", "Britain lost control of Canada to the French"], correct: 0 },
    { question: "What's the significance of the year 1880?", choices: ["O Canada was first sung in Québec City", "The Royal Anthem was first sung in Montreal", "O Canada was first sung in Montreal", "The Royal Anthem was first sung in Québec City"], correct: 0 },
    { question: "O Canada was proclaimed as the National Anthem in what year?", choices: ["1980", "1880", "1940", "1965"], correct: 0 },
    { question: "What happened in 1849?", choices: ["Responsible government was achieved in Canada", "John Cabot arrived on the East Coast of Canada", "World War I began", "Canada first started appearing on maps"], correct: 0 },
    { question: "Which 2 events occurred in 1857?", choices: ["The Indian Rebellion and Ottawa was chosen as the capital of Canada by Queen Victoria", "O Canada was first sung in Quebec City and Ottawa was chosen as the capital of Canada by Queen Victoria", "The Indian Rebellion and Confederation", "The Constitutional Act and the end of the Seven Years' War"], correct: 0 },
    { question: "Which province joined Confederation in 1873?", choices: ["Prince Edward Island", "Nova Scotia", "Quebec", "Newfoundland and Labrador"], correct: 0 },
    { question: "The North West Mounted Police was founded in which year?", choices: ["1873", "1867", "1791", "1999"], correct: 0 },
    { question: "Which event(s) occurred in 1885?", choices: ["The North-West Rebellion during which Louis Riel met his demise", "The Indian Rebellion", "The Seven Years' War", "The Battle of the Plains of Abraham"], correct: 0 },
    { question: "In which year did Manitoba become the first province to grant voting rights to women?", choices: ["1916", "1870", "1816", "2016"], correct: 0 },
    { question: "What happened on June 6, 1944?", choices: ["D-Day: Juno Beach was stormed and captured", "T-Day: Tim Horton's was founded", "D-Day: Dominion Day", "World War I ended"], correct: 0 },
    { question: "Which event occurred in 1967?", choices: ["This year marked the centennial of Confederation. Canada started its own honours system with the Order of Canada", "The founding provinces of Confederation (Ontario, Quebec, Nova Scotia and New Brunswick) joined forces to create the country of Canada", "The design of the current Canada flag was first adopted", "Alberta separated from Canada and became a sovereign state."], correct: 0 },
    { question: "Which Act did Parliament pass in 1969?", choices: ["The Official Languages Act", "The Confederation Act", "The British North America Act", "The Constitutional Act"], correct: 0 }
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

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); });

function handleSwipe() {
    if (!swipeEnabled) return;
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) < 50) return;

    saveAnswer();
    if (swipeDistance < 0 && currentQuestion < questions.length - 1) { vibrate(); currentQuestion++; loadQuestion(); }
    else if (swipeDistance > 0 && currentQuestion > 0) { vibrate(); currentQuestion--; loadQuestion(); }
}

/* ==========================
   TIMER
   ========================== */
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) { clearInterval(timerInterval); alert("Time is up!"); endQuiz(); return; }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
    const seconds = String(remainingTime % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `Time Remaining: ${minutes}:${seconds}`;
}

/* ==========================
   CALCULATE MAX QUESTION HEIGHT
   ========================== */
function calculateTallestQuestionHeight() {
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.width = quizDiv.offsetWidth + 'px';
    tempDiv.style.padding = '20px';
    document.body.appendChild(tempDiv);

    let maxHeight = 0;
    questions.forEach(q => {
        tempDiv.innerHTML = `
            <div class="question">${q.question}</div>
            <div class="choices">
                ${q.choices.map(c => `<label>${c}</label>`).join('')}
            </div>
        `;
        if (tempDiv.offsetHeight > maxHeight) maxHeight = tempDiv.offsetHeight;
    });

    document.body.removeChild(tempDiv);
    return maxHeight;
}


/* ==========================
   LOAD QUESTION
   ========================== */
function loadQuestion() {
    const q = questions[currentQuestion];
    const savedAnswer = userAnswers[currentQuestion];

    const progressPercent = Math.round((currentQuestion / (questions.length - 1)) * 100);

    // Render question HTML
    quizDiv.innerHTML = `
        <div class="question-counter">Question ${currentQuestion + 1} of ${questions.length}</div>
        <div class="progress-bar" style="background: #e0e0e0; border-radius: 5px; overflow: hidden; height: 12px; margin-bottom: 15px;">
            <div class="progress-fill" style="
                width: ${progressPercent}%;
                height: 100%;
                background: #007bff;
                transition: width 0.5s ease;
            "></div>
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

    // Lock quiz div height
    quizDiv.style.minHeight = tallestHeight + "px";
    quizDiv.style.maxHeight = tallestHeight + "px";
    quizDiv.style.overflow = "hidden";

    // Navigation button state
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Score Quiz" : "Next";

    // Auto-advance listener
    document.querySelectorAll('input[name="choice"]').forEach(input => {
        input.addEventListener('change', (e) => {
            saveAnswer();
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
prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) { saveAnswer(); currentQuestion--; loadQuestion(); }
});
nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion < questions.length - 1) { currentQuestion++; loadQuestion(); }
    else { endQuiz(); }
});

/* ==========================
   END QUIZ
========================== */
function endQuiz() {
    swipeEnabled = false;
    clearInterval(timerInterval);

    // Remove height restriction so review can expand
    quizDiv.style.minHeight = "auto";
    quizDiv.style.maxHeight = "none";
    quizDiv.style.overflow = "visible";

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

    prevBtn.style.display = "none";
    nextBtn.style.display = "none";

    quizDiv.innerHTML = `
        <div class="result ${passed ? 'pass' : 'fail'}">
            Result: ${passed ? 'PASS' : 'FAIL'}<br>
            Correct: ${correctCount} / ${total}<br>
            Wrong: ${wrongAnswers}<br>
            Percentage: ${percentage}%<br>
            Time Taken: ${minutes} min ${seconds} sec
        </div>

        <div class="top-buttons" style="text-align:center; margin-bottom:20px;">
            <button onclick="window.location.href='index.html'">Home</button>
            <button onclick="window.location.href='history.html'">History Quiz</button>
            <button onclick="window.location.href='general.html'">General Quiz</button>
            <button onclick="window.location.href='random.html'">20 Qs Random Quiz</button>
        </div>

        <div class="review"><h3>Quiz Review</h3>${reviewHTML}</div>

        <div style="position: sticky; bottom: 20px; display: inline-block; margin: 20px auto; padding: 0; z-index: 1000; left: 50%; transform: translateX(-50%);">
            <button id="retakeBtnSticky" style="
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                background-color: #28a745;
                color: #fff;
                border: none;
                border-radius: 5px;
            ">Retake Quiz</button>
        </div>
    `;

    document.getElementById("retakeBtnSticky").onclick = resetQuiz;
}


function resetQuiz() {
    swipeEnabled = true;
    shuffleQuestionsAndChoices();
    currentQuestion = 0;
    userAnswers = [];
    remainingTime = TOTAL_TIME;
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";

    // recalc tallest height for the new question set
    const newTallestHeight = calculateTallestQuestionHeight();
    quizDiv.style.minHeight = newTallestHeight + "px";
    quizDiv.style.maxHeight = newTallestHeight + "px";

    startTimer();
    loadQuestion();
}

/* ==========================
   START QUIZ
========================== */
shuffleQuestionsAndChoices();
const tallestHeight = calculateTallestQuestionHeight(); // initial question set
startTimer();
loadQuestion();