let current = 0;
let score = 0;
let answered = false;
let currentLanguage = "en";
const userAnswers = [];

const locations_en = [
  { name: "VDNH", image: "img/0.jpg", options: ["VDNH", "Arbat", "Moscow City", "Tretyakov Gallery", "Zaryadye Park", "Innovation Center"] },
  { name: "Moscow Kremlin", image: "img/1.jpg", options: ["Moscow Kremlin", "VDNH", "Kremlin", "Moscow City", "Christ the Savior", "Main Building"] },
  { name: "Ostankino", image: "img/2.jpg", options: ["Tretyakov Gallery", "Ostankino", "Arbat", "Zaryadye Park", "Moscow City", "Dormitory"] },
  { name: "Christ the Savior", image: "img/3.jpg", options: ["Kremlin", "VDNH", "Arbat", "Christ the Savior", "Moscow City", "Hall A"] },
  { name: "Moscow City", image: "img/4.jpg", options: ["Moscow City", "Zaryadye Park", "Tretyakov Gallery", "VDNH", "Christ the Savior", "Library"] },
  { name: "mosque", image: "img/5.jpg", options: ["Moscow City", "Zaryadye Park", "mosque", "VDNH", "Christ the Savior", "Library"] },
  { name: "Innovation Center", image: "img/6.jpg", options: ["Moscow City", "Zaryadye Park", "Innovation Center", "Tretyakov Gallery", "VDNH", "Christ the Savior"] }
];

const locations_ru = [
  { name: "ВДНХ", image: "img/0.jpg", options: ["ВДНХ", "Арбат", "Москва-Сити", "Третьяковская галерея", "Парк Зарядье", "Инновационный центр"] },
  { name: "Кремль", image: "img/1.jpg", options: ["Красная площадь", "ВДНХ", "Кремль", "Москва-Сити", "Храм Христа Спасителя", "Главный корпус"] },
  { name: "Останкино", image: "img/2.jpg", options: ["Третьяковская галерея", "Останкино", "Арбат", "Парк Зарядье", "Москва-Сити", "Общежитие"] },
  { name: "Храм Христа Спасителя", image: "img/3.jpg", options: ["Кремль", "ВДНХ", "Арбат", "Храм Христа Спасителя", "Москва-Сити", "Зал А"] },
  { name: "Москва-Сити", image: "img/4.jpg", options: ["Москва-Сити", "Парк Зарядье", "Третьяковская галерея", "ВДНХ", "Храм Христа Спасителя", "Библиотека"] },
  { name: "Мечеть", image: "img/5.jpg", options: ["Москва-Сити", "Парк Зарядье", "Кремль", "ВДНХ", "Храм Христа Спасителя", "Библиотека"] },
  { name: "Инновационный центр", image: "img/6.jpg", options: ["Москва-Сити", "Парк Зарядье", "Инновационный центр", "Третьяковская галерея", "ВДНХ", "Храм Христа Спасителя"] } 
];

function getCurrentLocations() {
  return currentLanguage === "en" ? locations_en : locations_ru;
}

function startGame() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("game").style.display = "block";
  const title = document.getElementById("gameTitle");
  title.style.backgroundColor = "#2e1f4e";
  title.style.padding = "10px 20px";
  title.style.borderRadius = "12px";
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  const loc = getCurrentLocations()[current];
  document.getElementById("locationImage").src = loc.image;
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "";
  document.getElementById("nextButton").style.display = "none";
  document.getElementById("questionNumber").textContent = current + 1;
  document.getElementById("questionTotal").textContent = getCurrentLocations().length;
  document.getElementById("progressBar").style.width = ((current + 1) / getCurrentLocations().length * 100) + "%";

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  const shuffled = [...loc.options].sort(() => Math.random() - 0.5);
  shuffled.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = (event) => handleAnswerClick(option, btn, event);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswerClick(selectedOption, clickedButton, event) {
  const correctAnswer = getCurrentLocations()[current].name;

  const allButtons = document.querySelectorAll("#options button");
  allButtons.forEach(btn => btn.classList.remove("selected-option"));
  clickedButton.classList.add("selected-option");

  if (!answered) {
    if (selectedOption === correctAnswer) {
      score++;
    }
    userAnswers.push({
      question: current,
      image: getCurrentLocations()[current].image,
      selected: selectedOption,
      correct: correctAnswer,
      isCorrect: selectedOption === correctAnswer
    });

    answered = true;
    document.getElementById("nextButton").style.display = "inline-block";

    setTimeout(() => {
      document.getElementById("nextButton").scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  }
}

function nextQuestion() {
  current++;
  if (current < getCurrentLocations().length) {
    loadQuestion();
    setTimeout(() => {
      document.getElementById("locationImage").scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 300);
  } else {
    showResults();
  }
}

function showResults() {
  const total = getCurrentLocations().length;
  const mistakes = total - score;

  let html = `
    <div class="final-screen">
      <h1>${currentLanguage === "en" ? "Quiz Complete!" : "Тест завершён!"}</h1>
      <p>
        ${currentLanguage === "en"
          ? `✅ Correct: ${score}<br>❌ Incorrect: ${mistakes}`
          : `✅ Правильных: ${score}<br>❌ Неправильных: ${mistakes}`}
      </p>
  `;

  const wrongAnswers = userAnswers.filter(a => !a.isCorrect);

  if (wrongAnswers.length > 0) {
    html += `<div class="results-list">`;

    wrongAnswers.forEach(answer => {
      html += `
        <div class="result-item wrong">
          <img src="${answer.image}" alt="Wrong answer">
          <p><strong>${currentLanguage === "en" ? "Your answer:" : "Ваш ответ:"}</strong> ${answer.selected}</p>
          <p><strong>${currentLanguage === "en" ? "Correct answer:" : "Правильный ответ:"}</strong> ${answer.correct}</p>
        </div>
      `;
    });

    html += `</div>`;
  }

  html += `
      <button onclick="location.reload()">
        ${currentLanguage === "en" ? "Try Again" : "Попробовать снова"}
      </button>
    </div>
  `;

  document.body.innerHTML = html;
}


function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ru" : "en";
  updateTextContent();
  if (document.getElementById("game").style.display === "block") {
    loadQuestion();
  }
}

function updateTextContent() {
  document.getElementById("siteLogo").textContent =
    currentLanguage === "en" ? "Moscow Polytechnic" : "Московский Политех";

  document.getElementById("welcomeTitle").textContent =
    currentLanguage === "en" ? "Welcome to Moscow Polytechnic" : "Добро пожаловать в Московский Политех";

  document.getElementById("welcomeText").textContent =
    currentLanguage === "en" ? "Your journey starts here. Discover iconic places of our campus." : "Ваше путешествие начинается здесь. Узнайте знаковые места нашего кампуса.";

  document.getElementById("startButton").textContent =
    currentLanguage === "en" ? "Start" : "Начать";

  document.getElementById("nextButton").textContent =
    currentLanguage === "en" ? "Next" : "Далее";

  document.getElementById("gameTitle").textContent =
    currentLanguage === "en" ? "Guess the Place" : "Угадай место";

  document.getElementById("aboutTitle").textContent =
    currentLanguage === "en" ? "About Moscow Polytechnic" : "О Московском Политехе";

  document.getElementById("aboutText").textContent =
    currentLanguage === "en"
      ? "Moscow Polytechnic University is one of the leading engineering and technical universities in Russia. With modern infrastructure, international programs, and innovative projects, it is a great place for students from all over the world."
      : "Московский Политех — один из ведущих инженерно-технических вузов России. Современная инфраструктура, международные программы и инновационные проекты делают его отличным местом для студентов со всего мира.";

  document.getElementById("footerText").innerHTML =
    currentLanguage === "en"
      ? `&copy; 2025 Moscow Polytechnic · <a href="https://mospolytech.ru/en/" target="_blank" id="footerLink">Visit Official Website</a>`
      : `&copy; 2025 Московский Политех · <a href="https://mospolytech.ru/" target="_blank" id="footerLink">Перейти на сайт вуза</a>`;
}
