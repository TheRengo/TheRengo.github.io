/*
 * Gincana Virtual - Script Mejorado con Transiciones Avanzadas
 */

// Array de preguntas y respuestas
const questions = [
    { question: "On va ser la teva experiència més random amb el Koldo? Parc de la ...", answer: "Ciutadella", type: "text" },
    { question: "Completa aquesta frase: Vaya ....... te metia", answer: "follada", type: "text" },
    {
        question: "Que es la cosa que més penso de tu però menys dic?",
        answer: "T'estimo",
        type: "multiple",
        options: ["Puta", "Porca", "T'estimo", "Quoriam"],
    },
    { question: "Quina persona em cau fatal però a tu et posa com una moto?", answer: "Carlos Cuevas", type: "text" },
    { question: "Què trenques cada cop que vens a casa meva?", answer: "gots", type: "text" },
    { question: "D'on em vas fotre fora per menjar-te a l'Àlex?", answer: "cuina", type: "text" },
    { question: "Quin ha sigut el millor concert que hem anat?", answer: "Lana del Rey", type: "text" },
    {
        question: "Quina és la teva beguda preferida?",
        answer: "Clara",
        type: "multiple",
        options: ["Cervesa 0%", "Clara", "Cubata", "Coca-Cola"]
    },
    {
        question: "Quin es el teu animal preferi?",
        answer: "El Cavall",
        type: "multiple",
        options: ["El Cavall", "El Gos", "El Koldo", "La Serp"]
    },
    {
        question: "Que és el que si et regalo em mates?",
        answer: "Un Viatge",
        type: "multiple",
        options: ["Un Chupa-chup", "Un Viatge", "Un Boli Bic", "Un got d'aigua"]
    },
];

// Índice de la pregunta actual
let currentQuestion = 0;

/**
 * Normaliza el texto, eliminando diferencias en mayúsculas, acentos y caracteres especiales.
 * @param {string} text - Texto a normalizar.
 * @returns {string} - Texto normalizado.
 */
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
        .replace(/[^a-z0-9\s]/g, "")    // Elimina caracteres especiales
        .trim();
}

/**
 * Compara la respuesta del usuario con la respuesta correcta de forma estricta.
 * @param {string} userAnswer - Respuesta del usuario.
 * @param {string} correctAnswer - Respuesta correcta.
 * @returns {boolean} - true si coinciden, false en caso contrario.
 */
function isCorrectAnswer(userAnswer, correctAnswer) {
    return normalizeText(userAnswer) === normalizeText(correctAnswer);
}

/**
 * Muestra la pregunta actual con transiciones. 
 * Si se acaban las preguntas, muestra la sección de resultados (QR).
 */
function showQuestion() {
    const container = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");

    // Si se han completado todas las preguntas, mostrar la sección de resultados (QR)
    if (currentQuestion >= questions.length) {
        // Animación de fade-out en el contenedor de preguntas
        container.classList.add("fade-out");
        // Esperamos 500 ms para dejar acabar la animación fade-out
        setTimeout(() => {
            container.classList.add("hidden");         // Ocultamos definitivamente el contenedor de preguntas
            resultContainer.classList.remove("hidden"); // Mostramos el contenedor de resultados
            resultContainer.classList.add("fade-in");   // Efecto fade-in en el contenedor de resultados
        }, 500);
        return;
    }

    // Obtenemos la pregunta actual
    const questionObj = questions[currentQuestion];
    let inputElement = "";

    // Creamos el campo de entrada según el tipo de pregunta (texto o selección)
    if (questionObj.type === "multiple") {
        inputElement = `<select id="answer">`;
        questionObj.options.forEach(option => {
            inputElement += `<option value="${option}">${option}</option>`;
        });
        inputElement += `</select>`;
    } else {
        inputElement = `<input id="answer" type="text" placeholder="Escriu la resposta..." />`;
    }

    // Animaciones de entrada
    container.classList.remove("fade-out");
    container.classList.add("fade-in");

    // Construimos el HTML de la pregunta
    container.innerHTML = `
        <h2>${questionObj.question}</h2>
        ${inputElement}
        <button id="check-btn">Comprovar</button>
        <p id="feedback"></p>
    `;

    // Evento para comprobar la respuesta
    document.getElementById("check-btn").addEventListener("click", checkAnswer);
}

/**
 * Comprueba la respuesta introducida por el usuario y aplica animaciones según sea correcta o incorrecta.
 */
function checkAnswer() {
    const answerInput = document.getElementById("answer");
    const feedback = document.getElementById("feedback");
    const container = document.getElementById("question-container");
    const userAnswer = answerInput.value.trim();

    // Validamos que el usuario haya introducido algo
    if (!userAnswer) {
        feedback.textContent = "Si us plau, introdueix una resposta.";
        feedback.style.color = "orange";
        return;
    }

    // Comprobamos la respuesta
    if (isCorrectAnswer(userAnswer, questions[currentQuestion].answer)) {
        // Respuesta correcta
        feedback.textContent = "Correcte! 🎉";
        feedback.style.color = "green";
        feedback.classList.add("feedback-correct");
        currentQuestion++;

        // Esperamos un segundo para mostrar la animación de feedback
        setTimeout(() => {
            feedback.classList.remove("feedback-correct");
            // Iniciamos fade-out en el contenedor de la pregunta
            container.classList.remove("fade-in");
            container.classList.add("fade-out");

            // Tras 500 ms (tiempo de la animación), mostramos la siguiente pregunta
            setTimeout(() => {
                showQuestion();
            }, 500);
        }, 1000);
    } else {
        // Respuesta incorrecta
        feedback.textContent = "Resposta incorrecta. Torna a intentar-ho!";
        feedback.style.color = "red";
        feedback.classList.add("feedback-wrong");
        // Tras 1 segundo, retiramos la clase de animación
        setTimeout(() => {
            feedback.classList.remove("feedback-wrong");
        }, 1000);
    }
}

// Iniciamos la primera pregunta al cargar la página
document.addEventListener("DOMContentLoaded", showQuestion);
