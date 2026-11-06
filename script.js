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
    },
    {
        question: "Messi va Ronaldo davri boshlanishidan oldin oxirgi marta kim Oltin to'pni qo'lga kiritgan?",
        options: ["Luka Modrić", "Zinedine Zidane", "Kaka", "Fabio Cannavaro"],
        correct: 2
    },
    {
        question: "Qaysi yagona darvozabon oltin topni qolga kritigan?",
        options: ["Iker Cassilas", "Lev Yashin", "Gianluigi Buffon", "Tibo Courtois"],
        correct: 1
    },
    {
        question: "Ronaldo va messi davrida oltin topni qolga kiritgan oyinchi kim?(2008-2020 oralgigida)",
        options: ["Luka Modrić", "Karim Benzema", "Neymar júnior", "kylian Mbappé"],
        correct: 0
    },
     {
        question: "Oltin top qaysi yili topshirilmagan?",
        options: ["2020", "2022", "2019", "2021"],
        correct: 0
    },
     {
        question: "Oltin top qaysi yili topshirilmagan?",
        options: ["2020", "2022", "2019", "2021"],
        correct: 0
    },
     {
        question: "Quyidagi  futbolchilardan qaysi biri faoliyati davomida biror marta ham rasmiy «Oltin top»ни yutmagan?",
        options: ["Ronaldinho", "Andrea Pirlo", "Ousmane Dembélé", "Zinedine Zidane"],
        correct: 1
    },
     {
        question: " «Oltin top» tarixidagi   mutloq ustunlik bilan yutgan hujumchi kim edi??",
        options: ["Cristiano Ronaldo", "Karim Benzema", "Lewandowski", "Harry Kane"],
        correct: 1
    },
     {
        question: " Cristiano Ronaldo ozining ilk «Oltin top» sovrinini qaysi klubda oynab yurganida qolga kiritgan",
        options: ["Manchester United", "Real Madrid", "Juventus", "PSG"],
        correct: 0
    },
     {
        question: " Tarixda «Oltin top»ни yutgan yagona afrikalik futbolchi kim?",
        options: ["Sadio Mané", "Mohamed Salah", "George Weah", "Dider Drogba"],
        correct: 2
    },
     {
        question: "qaysi klub vakillari eng kop oltin topni qola kiritishgan",
        options: ["Bayern Munich", "Real Madrid", "Juventus", "Milan"],
        correct: 1
    },
     {
        question: " XXI asrda «Oltin top» (Ballon d'Or) uchun yakuniy ovoz berish natijalariga kora, kuchli uchlikka (Top-3) kira olgan yagona osiyolik (Osiyo qit'asi vakili) futbolchi kim?",
        options: ["Son Heung-min", "Keisuke Honda", "Xech kim", "Park Ji-sung"],
        correct: 3
    },
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