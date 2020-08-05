const home = document.getElementsByClassName("home");
const overview = document.getElementsByClassName("overview");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCountEl = document.getElementById("question-count");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("start-quiz");
const scoresBtn = document.getElementById("show-scores");
const scoreTitle = document.getElementById("score-title");
const questionTitle = document.getElementById("question-title");
const intro = document.getElementById("intro");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

startBtn.addEventListener("click", e =>{
    startGame();
})

scoresBtn.addEventListener("click", e =>{
    showHighscores();
})

const questions = [
  {
    q: "Commonly used data types DO NOT include:",
    c1: "strings",
    c2: "booleans",
    c3: "alerts",
    c4: "numbers",
    a: 3
  },
  {
    q: "The condition in an if/else statement is enclosed within ___.",
    c1: "quotes",
    c2: "curly brackets",
    c3: "parentheses",
    c4: "square brackets",
    a: 3
  },
  {
    q: "Arrays in Javascript can be used to store ___.",
    c1: "numbers and strings",
    c2: "other arrays",
    c3: "booleans",
    c4: "all of the above",
    a: 4
  },
  {
    q:
      "String values must be enclosed within ____ when being assigned to variables.",
    c1: "commas",
    c2: "curly brackets",
    c3: "quotes",
    c4: "parantheses",
    a: 3
  },
  {
    q:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    c1: "JavaScript",
    c2: "terminal/bash",
    c3: "for loops",
    c4: "console log",
    a: 4
  }
];

const correctBonus = 20;
const maxQuestions = 5;



startGame = () => {
  questionCounter = 0;
  score = 0;
  scoreEl.innerText = score
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (
    availableQuestions.length === 0 ||
    questionCounter >= maxQuestions.length
  ) {
    showHighscores();
  }
  questionCounter++;
  questionCountEl.innerText = `${questionCounter}/${maxQuestions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.q;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["c" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    console.log(e.target);
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const answerStatus =
      selectedAnswer == currentQuestion.a ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(answerStatus);

    if (answerStatus === "correct") {
      updateScore(correctBonus);
    }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(answerStatus);
      getNewQuestion();
    }, 1000);
  });
});

startGame();

updateScore = num => {
  score += num;
  scoreEl.innerText = score;
};


showHighscores = ()=>{

}