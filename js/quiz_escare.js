/* ==========================
   QUESTIONS (NEW SET)
   ========================== */
const originalQuestions = [
{
    question: "¿Cuál es el rol principal de la policía en Canadá?",
    choices: [
      "Resolver disputas e interpretar las leyes",
      "Mantener a la gente segura y hacer cumplir la ley",
      "Proveer inteligencia de seguridad nacional",
      "Realizar operaciones militares"
    ],
    correct: 1
  },
{
    question: "¿Cuándo es el Día de Canadá (Canada Day)?",
    choices: [
      "11 de noviembre",
      "1 de julio",
      "1 de octubre",
      "4 de julio"
    ],
    correct: 1
  },
{
    question: "¿Cuáles son los dos idiomas oficiales de Canadá?",
    choices: [
      "Inuktitut e inglés",
      "Francés e inuktitut",
      "Inglés y francés",
      "Mandarín e inglés"
    ],
    correct: 2
  },
{
    question: "¿Dónde está ubicado Canadá?",
    choices: [
      "América Central",
      "Europa",
      "América del Norte",
      "América del Sur"
    ],
    correct: 2
  },
{ question: "¿Qué país es el principal socio comercial de Canadá?", choices: ["China", "Estados Unidos", "Argentina", "México"], correct: 1 },
{ question: "¿Qué es un centro de votación?", choices: ["Un lugar donde votás", "Oficinas de campaña de los candidatos", "Lugar donde se cuentan los votos", "Circunscripción de un miembro del Parlamento"], correct: 0 },
{ question: "¿Por qué al norte a veces se lo llama la tierra del sol de medianoche?", choices: ["Está más cerca del sol", "Las auroras boreales aparecen a medianoche", "Es de noche la mayor parte del tiempo", "La luz del día en verano puede durar hasta 24 horas"], correct: 3 },
{ question: "¿Quién puede preguntarte a quién votaste?", choices: ["Nadie", "Cualquier otro canadiense", "Tu diputado local", "El Primer Ministro"], correct: 0 },
{ question: "¿Quién tiene derecho a solicitar un pasaporte canadiense?", choices: ["Ciudadanos británicos", "Ciudadanos canadienses", "Cualquier inmigrante que haya vivido un mínimo de 3 años en Canadá", "Ciudadanos adinerados"], correct: 1 },
{ question: "¿Cuál es el significado del Escudo de Armas de Canadá y el lema A Mari Usque Ad Mare?", choices: ["Del aire a la tierra", "Del mar a la tierra", "De la tierra al mar", "De mar a mar"], correct: 3 },
{ question: "¿Cómo se llama el sistema de gobierno de Canadá?", choices: ["Dictadura", "Gobierno parlamentario", "Régimen militar", "Comunismo"], correct: 1 },
{ question: "¿Cuáles son los colores de la bandera canadiense?", choices: ["Azul y blanco", "Rojo y blanco", "Verde y blanco", "Rojo y azul"], correct: 1 },
{ question: "El deporte nacional de invierno de Canadá es", choices: ["Lacrosse", "Básquet", "Hockey", "Golf"], correct: 2 },
{ question: "¿Cuáles son los dos principios sobre los que se fundó Canadá?", choices: ["La supremacía de Dios y el imperio de la ley", "La supremacía de Dios y la libertad de expresión", "La supremacía de la ley y el gobierno de Dios", "Los derechos de movilidad y el imperio de la ley"], correct: 0 },
{ question: "¿Quiénes son los anglófonos?", choices: ["Personas que aprendieron inglés en la escuela", "Personas que entienden pero no hablan inglés", "Personas que no hablan inglés como lengua materna", "Personas que hablan inglés como lengua materna"], correct: 3 },
{ question: "Los canadienses tienen derechos y libertades fundamentales como", choices: ["Pensamiento y creencia", "Opinión y expresión", "Libertad de religión", "Todas las respuestas son correctas"], correct: 3 },
  { question: "¿Qué región es llamada la tierra del sol de medianoche?", choices: ["Canadá Central", "Los Territorios del Norte", "Las Praderas", "Las Provincias Marítimas"], correct: 1 },
{ question: "Da un ejemplo de cómo podés demostrar responsabilidad participando en tu comunidad.", choices: ["Ocuparte solo de tus asuntos", "Organizar una fiesta", "Descuidar tu propiedad", "Hacer voluntariado"], correct: 3 },
  { question: "¿A cuál de las siguientes comunidades pertenece la mayoría de los canadienses?", choices: ["Cristiana", "Judía", "Musulmana", "Hindú"], correct: 0 },
  { question: "¿Cuál es el procedimiento de votación en Canadá?", choices: ["De la manera que quieras", "En línea", "Voto secreto", "Voto abierto"], correct: 2 },
  { question: "¿Qué océanos bordean las fronteras de Canadá?", choices: ["El océano Pacífico al oeste", "El océano Atlántico al este", "El océano Ártico al norte", "Todas las respuestas son correctas"], correct: 3 },
 { question: "¿Quién es el jefe de gobierno en Canadá?", choices: ["El Soberano", "El Primer Ministro", "El Presidente", "El Comisionado"], correct: 1 },
{ question: "¿Qué animal es un símbolo oficial de Canadá?", choices: ["Oso", "Alce", "Castor", "Pajaro"], correct: 2 },
{ question: "¿Cuál es la importancia del descubrimiento canadiense de la insulina?", choices: ["Salvó la vida de niños con enfermedades", "Salvó millones de vidas de personas con diabetes", "Ayudó al tratamiento de enfermedades cardíacas", "Fue un medicamento importante para salvar la vida de soldados durante la Segunda Guerra Mundial"], correct: 1 },
{ question: "Fátima es una nueva inmigrante en Canadá. ¿Por qué puede elegir un trabajo como cualquier hombre?", choices: ["Por la igualdad entre el francés y el inglés", "Porque vino del Reino Unido", "Por la igualdad entre mujeres y hombres en Canadá", "Porque tiene un título universitario"], correct: 2 },
{ question: "¿Quién de los siguientes está por encima de la ley en Canadá?", choices: ["Jueces", "Policía", "Políticos", "Nadie"], correct: 3 },
{ question: "¿Cuál es la ciudad más grande de Canadá y su principal centro financiero?", choices: ["Vancouver", "Toronto", "Montreal", "Calgary"], correct: 1 }

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
   JUMPSCARE
========================== */

function triggerJumpScare() {
    const scare = document.getElementById("jumpScare");
    const img = scare.querySelector("img");
    const sound = document.getElementById("jumpScareSound");
    if (!scare || !img) return;

    scare.style.display = "block";
    img.style.animation = "shake 0.6s infinite";

    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    // 🔥 BIG vibration
    if (navigator.vibrate) {
        navigator.vibrate([400, 200, 400, 200, 600]);
    }

    setTimeout(() => {
        img.style.animation = "fallAway 1.5s ease-in forwards";
    }, 5000);

    setTimeout(() => {
        scare.style.display = "none";
        img.style.animation = "";
    }, 6500);
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
        `Tiempo restante: ${minutes}:${seconds}`;
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

    // 👻 Jump scare on question 11 (index 10)
    if (currentQuestion === 10 && !window.jumpscareDone) {
        window.jumpscareDone = true;
        triggerJumpScare();
    }
    const q = questions[currentQuestion];
    const savedAnswer = userAnswers[currentQuestion];
    const progressPercent = Math.round((currentQuestion / questions.length) * 100);

    quizDiv.innerHTML = `
        <div class="question-counter">Pregunta ${currentQuestion + 1} de ${questions.length}</div>
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
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Calificar cuestionario    " : "Siguiente";

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
                    Tu respuesta: ${ans !== undefined ? q.choices[ans] : "No answer"}
                </div>
                ${ans !== q.correct
                    ? `<div class="correct">Correcta: ${q.choices[q.correct]}</div>`
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
            Resultado: ${passed ? "PASS" : "FAIL"}<br>
            Correctas: ${correctCount} / ${total}<br>
            Incorrectas: ${wrongAnswers}<br>
            Porcentaje: ${percentage}%
        </div>

        <div class="top-buttons">
            <button onclick="window.location.href='index.html'">Principio</button>
            <button onclick="window.location.href='history.html'">Cuest. de Historia</button>
            <button onclick="window.location.href='dates.html'">Cuest. de Fechas</button>
            <button onclick="window.location.href='general.html'">Cues. General</button>
        </div>

        <div class="review">
            <h3>Repaso del Cuestionario</h3>
            ${reviewHTML}
        </div>
    `;

    // ✅ Sticky action buttons container
    let stickyActions = document.getElementById("stickyActions");

    if (!stickyActions) {
        stickyActions = document.createElement("div");
        stickyActions.id = "stickyActions";
        stickyActions.innerHTML = `
            <button id="retakeBtnSticky">Rehacer Cuestionario</button>

        `;
        document.body.appendChild(stickyActions);
    }

    stickyActions.style.display = "flex";

    document.getElementById("retakeBtnSticky").onclick = resetQuiz;

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
