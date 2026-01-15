let quizData = [];
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];

// Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const optionsContainer = document.getElementById('options');
const quizIcon = document.getElementById('quiz-icon');
const questionNumber = document.getElementById('question-number');
const progressFill = document.getElementById('progress');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const errorReview = document.getElementById('error-review');

// Load Data
async function loadData() {
    try {
        const response = await fetch('icons/quiz_data.json');
        quizData = await response.json();
    } catch (error) {
        console.error('Error loading quiz data:', error);
    }
}

// Start Quiz
function startQuiz() {
    score = 0;
    currentIndex = 0;
    userAnswers = [];
    
    // Select 10 random questions
    currentQuestions = [...quizData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    
    showScreen(quizScreen);
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = currentQuestions[currentIndex];
    quizIcon.src = `icons/${question.icon_file}`;
    questionNumber.textContent = `第 ${currentIndex + 1} / 10 題`;
    progressFill.style.width = `${(currentIndex / 10) * 100}%`;
    
    // Generate Options
    const correctLabel = question.label;
    const distractors = quizData
        .filter(item => item.label !== correctLabel)
        .map(item => item.label);
    
    // Unique distractors
    const uniqueDistractors = [...new Set(distractors)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    const options = [correctLabel, ...uniqueDistractors]
        .sort(() => Math.random() - 0.5);
    
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => handleAnswer(option, correctLabel);
        optionsContainer.appendChild(btn);
    });
}

// Handle Answer
function handleAnswer(selected, correct) {
    const isCorrect = selected === correct;
    if (isCorrect) score++;
    
    userAnswers.push({
        question: currentQuestions[currentIndex],
        selected: selected,
        correct: correct,
        isCorrect: isCorrect
    });

    currentIndex++;
    if (currentIndex < 10) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    progressFill.style.width = '100%';
    finalScore.textContent = score;
    
    if (score === 10) {
        resultMessage.textContent = "太棒了！完美的表現！";
    } else if (score >= 8) {
        resultMessage.textContent = "表現不錯，快要全對了！";
    } else {
        resultMessage.textContent = "再加油，多練習幾次會更好！";
    }
    
    // Error Review
    errorReview.innerHTML = '';
    const mistakes = userAnswers.filter(a => !a.isCorrect);
    
    if (mistakes.length === 0) {
        errorReview.innerHTML = '<p style="color: var(--success-color)">恭喜！沒有錯題。</p>';
    } else {
        mistakes.forEach(m => {
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `
                <img class="review-icon" src="icons/${m.question.icon_file}">
                <div>
                   <div style="font-weight: bold; color: var(--error-color)">選了: ${m.selected}</div>
                   <div style="font-size: 0.9rem; color: var(--success-color)">正確: ${m.correct}</div>
                </div>
            `;
            errorReview.appendChild(item);
        });
    }
    
    showScreen(resultScreen);
}

// Utility
function showScreen(screen) {
    [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Event Listeners
startBtn.onclick = startQuiz;
restartBtn.onclick = startQuiz;

// Init
loadData();
