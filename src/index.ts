
// Zrobić licznik poprawnie wpisanych słów
// zrobic reset po zatwierdzeniu źle wpisanego słowa
// zrobić zmiane czcionki w jakis opcjach
// zrobić opcje do zmiany rodzaji "słów"

const words: string[] = [
  "hello", "world", "typing", "monkey", "keyboard", "javascript", 
  "python", "developer", "computer", "internet", "typescript", 
  "programming", "software", "application", "coding", "algorithm", 
  "bug", "debugging", "function", "variable", "array", "object", 
  "html", "css", "nodejs", "react", "angular", "database", "sql", "api"
];

const wordsHard: string[] = [
  "public", "point", "between", "however", "through", "though", "school",
  "because", "consider", "during", "interest", "early", "increase", "current",
  "everything", "I've", "I'd", "I'll", "strangest", "letting", "weather",
  "tomorrow", "laundry", "drying", "dying"
];

let currentType: string[] = words;
let displayedWord: string = "";
let currentInput: string = "";

function getRandomWord(): string {
  return currentType[Math.floor(Math.random() * currentType.length)];
}

function displayWord() {
  const wordContainer = document.getElementById("current-words") as HTMLElement;
  wordContainer.innerHTML = displayedWord
    .split("")
    .map((char, index) => {
      if (index < currentInput.length) {
        return `<span class="${char === currentInput[index] ? "correct" : "incorrect"}">${char}</span>`;
      }
      return `<span class="default">${char}</span>`;
    })
    .join("");
}

function moveToNextWord(inputField: HTMLInputElement) {
  currentInput = "";
  displayedWord = getRandomWord();
  inputField.value = "";
  displayWord();
}

function updateProgress() {
  const progress = (currentInput.length / displayedWord.length) * 100;
  console.log(`Postęp: ${progress.toFixed(2)}%`);
}

function handleTyping(event: KeyboardEvent) {

  const inputField = document.getElementById("input-field") as HTMLInputElement;
  currentInput = inputField.value;

  const key = event.key;

  if (key === " ") {
    event.preventDefault();
    if (currentInput === displayedWord) {
      moveToNextWord(inputField);
    } else {
      console.log("Niepoprawne słowo! Spróbuj ponownie.");
    }
    currentInput = "";
    inputField.value = ""; 
  } 
  updateProgress();
  displayWord();
}

function changeType(set: "Programming" | "Mid"){
  currentType = set === "Programming" ? words : wordsHard;
  displayedWord = getRandomWord();
  displayWord();
}
window.onload = () => {
  displayedWord = getRandomWord();
  displayWord();

  const inputField = document.getElementById("input-field") as HTMLInputElement;
  inputField.addEventListener("keydown", handleTyping);
  
  const ProgrammingButton = document.getElementById("Programm-Button") as HTMLElement;
  const MidButton = document.getElementById("Mid-Button") as HTMLElement;

  ProgrammingButton.addEventListener("click", ()=> changeType("Programming"));
  MidButton.addEventListener("click", ()=> changeType("Mid"));
};

document.getElementById('ButtonTheme0')?.addEventListener('click', () => {
  document.body.style.backgroundColor = "snow";
});
document.getElementById('ButtonTheme1')?.addEventListener('click', () => {
  document.body.style.backgroundColor = "#3d3737";
});
