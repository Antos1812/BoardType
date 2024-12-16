const words: string[] = [
  "hello", "world", "typing", "monkey", "keyboard", "javascript", 
  "python", "developer", "computer", "internet", "typescript", 
  "programming", "software", "application", "coding", "algorithm", 
  "bug", "debugging", "function", "variable", "array", "object", 
  "html", "css", "nodejs", "react", "angular", "database", "sql", "api"
];

let displayedWord: string = "";
let currentInput: string = "";

function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)];
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

  // Pobierz aktualną wartość pola tekstowego
  currentInput = inputField.value;

  const key = event.key;

  if (key === " ") {
    event.preventDefault(); // Zablokuj wpisywanie spacji
    if (currentInput === displayedWord) {
      moveToNextWord(inputField); // Przejdź do nowego słowa
    } else {
      console.log("Niepoprawne słowo! Spróbuj ponownie.");
    }
    currentInput = ""; // Zresetuj aktualne wprowadzenie
    inputField.value = ""; // Zresetuj pole tekstowe
  }

  updateProgress();
  displayWord();
}


window.onload = () => {
  displayedWord = getRandomWord();
  displayWord();

  const inputField = document.getElementById("input-field") as HTMLInputElement;
  inputField.addEventListener("keydown", handleTyping);
};
