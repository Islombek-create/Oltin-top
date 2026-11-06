const searchInput = document.getElementById('searchInput');
const playerCards = document.querySelectorAll('.player-card');

searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase().trim();

    playerCards.forEach(card => {
        const playerName = card.getAttribute('data-name').toLowerCase();
        if (playerName.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
// Viktorina savollari va javoblari
const questions = [
    {
        question: "Tarixda eng ko'p Oltin to'p olgan futbolchi kim?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Ronaldinho", "Zinedine Zidane"],
        correct: 1 // 1-indeks yani Messi
    },
    {
        question: "2018-yilda Oltin to'p sovrinini kim qo'lga kiritgan?",
        options: ["Luka Modrić", "Cristiano Ronaldo", "Kylian Mbappé", "Lionel Messi"],
        correct: 0
    },
    {
        question: "Cristiano Ronaldo nechta Oltin to'pga ega?",
        options: ["4 ta", "6 ta", "5 ta", "3 ta"],
        correct: 2
    },
    {
        question: "1997 va 2002-yillarda Oltin to'pni olgan braziliyalik afsona kim?",
        options: ["Rivaldo", "Ronaldinho", "Kaka", "Ronaldo Nazario"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");

// Viktorinani boshlash
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.style.display = "block";
    resultBox.style.display = "none";
    showQuestion();
}

// Savolni ekranga chiqarish
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

// Har bir savoldan keyin tugmalarni tozalash
function resetState() {
    nextBtn.style.display = "none";
    optionsContainer.innerHTML = "";
}

// Variant tanlanganda
function selectOption(selectedBtn, selectedIndex) {
    let currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsContainer.children;

    if (selectedIndex === currentQuestion.correct) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        // To'g'ri javobni ham yashil qilib ko'rsatib qo'yamiz
        buttons[currentQuestion.correct].classList.add("correct");
    }

    // Barcha tugmalarni muzlatish (boshqa bosib bo'lmasligi uchun)
    for (let btn of buttons) {
        btn.disabled = true;
    }

    nextBtn.style.display = "inline-block";
}

// Keyingi savolga o'tish
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Natijani ko'rsatish
function showResult() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    scoreText.innerText = "Siz " + questions.length + " ta savoldan " + score + " tasiga to'g'ri javob berdingiz!";
}

// Qayta o'ynash
function restartQuiz() {
    startQuiz();
}


startQuiz();