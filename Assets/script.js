/* ****************************/
// QUESTIONS + ANSWERS = ARRAY
/**************************** */

const questions = [
  {
    question: "Where is the Great Barrier Reef located?",
    answers: [
      {
        text: "Australia",
        correct: true,
      },
      {
        text: "Europe",
        correct: false,
      },
      {
        text: "Your backyard",
        correct: false,
      },
      {
        text: "Hawaii",
        correct: false,
      },
    ],
  },
  {
    question: "Which house was Harry Potter almost sorted into?",
    answers: [
      {
        text: "Hufflepuff",
        correct: false,
      },
      {
        text: "Slytherin",
        correct: true,
      },
      {
        text: "Ravenclaw",
        correct: false,
      },
      {
        text: "Gryffindor",
        correct: false,
      },
    ],
  },
  {
    question: "Which country gifted the statue of Liberty to the US?",
    answers: [
      {
        text: "Germany",
        correct: false,
      },
      {
        text: "England",
        correct: false,
      },
      {
        text: "Canada",
        correct: false,
      },
      {
        text: "France",
        correct: true,
      },
    ],
  },
];

/* ****************************/
// Constants made to be modified throughout code
/**************************** */
const startBtn = document.getElementById("start");
const questionEl = document.getElementById("quest1");
const answerBtn = document.getElementById("ans-btns");
const nextBtn = document.getElementById("next-btn");
const intField = document.querySelector("#intials");
const hidden1 = document.querySelector(".hidden1");
const startScreen = document.querySelector(".main");
const timerEl = document.querySelector(".timer");
let time = questions.length * 15;
let timerId;
let currentQuestionIndex = 0;
let score = 0;

/* ****************************/
/* Starting quiz function set to 0*/
/**************************** */

// ----------------------------------
function startQuiz() {
  startScreen.setAttribute("class", "hide");
  hidden1.classList.remove("hide");
  timerEl.textContent = time;
  timerId = setInterval(clockTicker, 1000);
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function clockTicker() {
  time--;
  timerEl.textContent = time;
  if (time === 0) {
    showScore();
  }
}

/* ****************************/
// Resets to the next question
/**************************** */

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) answerBtn.removeChild(answerBtn.firstChild);
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    time -= 10;
  }

  Array.from(answerBtn).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionEl.innerHTML = "You scored " + score + " out of " + questions.length;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startBtn.onclick = startQuiz;
