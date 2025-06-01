
let allQuestions = {};
let currentCategory = "";
let questions = [];
let currentIndex = 0;
let score = 0;
let timer = null;
let timePerQuestion = 30;
let countdown = timePerQuestion;

function loadCategories() {
  const categories = Object.keys(allQuestions);
  const selectDiv = document.getElementById("category-select");
  selectDiv.innerHTML = "<h2>Kategorie wählen:</h2>";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => startCategory(cat);
    selectDiv.appendChild(btn);
  });
}

function startCategory(category) {
  currentCategory = category;
  questions = [...allQuestions[category]];
  currentIndex = 0;
  score = 0;
  document.getElementById("category-select").style.display = "none";
  document.getElementById("restart-btn").style.display = "none";
  nextQuestion();
}

function nextQuestion() {
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }
  const q = questions[currentIndex];
  document.getElementById("question-box").textContent = q.frage;
  const optionsBox = document.getElementById("options-box");
  optionsBox.innerHTML = "";
  q.antworten.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, q.richtigeAntwort);
    optionsBox.appendChild(btn);
  });
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").style.display = "none";
  startTimer();
}

function checkAnswer(sel, correct) {
  clearInterval(timer);
  const feedback = document.getElementById("feedback");
  if (sel === correct) {
    score++;
    feedback.textContent = "✅ Richtig!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Falsch.";
    feedback.style.color = "red";
  }
  document.getElementById("next-btn").style.display = "block";
}

function showResult() {
  document.getElementById("question-box").textContent = "Quiz beendet.";
  document.getElementById("options-box").textContent = "";
  document.getElementById("feedback").textContent = `Punkte: ${score} / ${questions.length}`;
  document.getElementById("restart-btn").style.display = "block";
}

function restartQuiz() {
  loadCategories();
  document.getElementById("category-select").style.display = "block";
  document.getElementById("question-box").textContent = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("score-timer").textContent = "";
}

function startTimer() {
  countdown = timePerQuestion;
  document.getElementById("score-timer").textContent = `🕒 ${countdown} Sekunden`;
  timer = setInterval(() => {
    countdown--;
    document.getElementById("score-timer").textContent = `🕒 ${countdown} Sekunden`;
    if (countdown <= 0) {
      clearInterval(timer);
      checkAnswer(-1, questions[currentIndex].richtigeAntwort);
    }
  }, 1000);
}

document.getElementById("next-btn").onclick = () => {
  currentIndex++;
  nextQuestion();
};

document.getElementById("restart-btn").onclick = restartQuiz;

window.onload = loadCategories;
