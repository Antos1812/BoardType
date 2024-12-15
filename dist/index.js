var words = [
    "hello", "world", "typing", "monkey", "keyboard", "javascript",
    "python", "developer", "computer", "internet", "typescript",
    "programming", "software", "application", "coding", "algorithm",
    "bug", "debugging", "function", "variable", "array", "object",
    "html", "css", "nodejs", "react", "angular", "database", "sql", "api"
];
var displayedWord = ""; // Aktualne wyświetlane słowo
var currentInput = ""; // Aktualne dane wpisywane przez użytkownika
// Funkcja losująca jedno słowo z listy
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}
// Wyświetlenie nowego słowa
function displayWord() {
    var wordContainer = document.getElementById("current-words");
    wordContainer.innerHTML = displayedWord
        .split("")
        .map(function (char, index) {
        if (index < currentInput.length) {
            return "<span class=\"".concat(char === currentInput[index] ? "correct" : "incorrect", "\">").concat(char, "</span>");
        }
        return "<span class=\"default\">".concat(char, "</span>");
    })
        .join("");
}
// Funkcja zmieniająca słowo po poprawnym wpisaniu
function moveToNextWord(inputField) {
    currentInput = ""; // Resetuj wprowadzone dane
    displayedWord = getRandomWord(); // Losuj nowe słowo
    inputField.value = ""; // Czyść pole tekstowe
    displayWord(); // Zaktualizuj wyświetlane słowo
}
// Aktualizacja postępu słowa
function updateProgress() {
    var progress = (currentInput.length / displayedWord.length) * 100;
    console.log("Post\u0119p: ".concat(progress.toFixed(2), "%")); // Debug w konsoli
}
// Obsługa zdarzeń klawiatury
function handleTyping(event) {
    var inputField = document.getElementById("input-field");
    // Pobierz aktualne słowo i klawisz
    var key = event.key;
    // Obsługa Backspace
    if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1); // Usuń ostatni znak
    }
    // Obsługa liter
    else if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
        currentInput += key; // Dodaj znak do wprowadzenia
    }
    // Obsługa spacji
    else if (key === " ") {
        event.preventDefault(); // Zablokuj dodanie spacji w polu
        if (currentInput === displayedWord) {
            moveToNextWord(inputField); // Jeśli poprawne, przejdź do nowego słowa
        }
        else {
            alert("Niepoprawne słowo! Spróbuj ponownie."); // Informacja o błędzie
        }
    }
    // Aktualizacja widoku i postępu
    updateProgress();
    displayWord();
}
// Inicjalizacja
window.onload = function () {
    displayedWord = getRandomWord(); // Pierwsze słowo
    displayWord(); // Wyświetl słowo
    var inputField = document.getElementById("input-field");
    inputField.addEventListener("keydown", handleTyping); // Obsługa wpisywania
};
