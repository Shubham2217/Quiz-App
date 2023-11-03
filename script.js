const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is the sum of 20 + 40 = ?",
    answers: [
      { text: "60", correct: true },
      { text: "65", correct: false },
      { text: "80", correct: false },
      { text: "69", correct: false },
    ],
  },
  {
    question: "What is the product of 2 * 4 = ?",
    answers: [
      { text: "16", correct: false },
      { text: "8", correct: true },
      { text: "12", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question: "After subtracting this what will we get 12 - 7 ?",
    answers: [
      { text: "9", correct: false },
      { text: "5", correct: true },
      { text: "6", correct: false },
      { text: "3", correct: false },
    ],
  },
  {
    question: "What is 14 + 2 ?",
    answers: [
      { text: "18", correct: false },
      { text: "16", correct: true },
      { text: "11", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "What is 9 - 4 ?",
    answers: [
      { text: "5", correct: true },
      { text: "6", correct: false },
      { text: "8", correct: false },
      { text: "9", correct: false },
    ],
  },
  {
    question: "What is 5 * 2 ?",
    answers: [
      { text: "12", correct: false },
      { text: "14", correct: false },
      { text: "16", correct: false },
      { text: "10", correct: true },
    ],
  },
  {
    question: "What is 9 + 4 ?",
    answers: [
      { text: "16", correct: false },
      { text: "18", correct: false },
      { text: "13", correct: true },
      { text: "12", correct: false },
    ],
  },
];
