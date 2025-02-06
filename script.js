const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let targetColor;
let correctGuesses = 0;
let totalGuesses = 0;
let gameOver = false;
const colors = [
  "#53460D",
  "#C267C2",
  "#E94C4C",
  "#79681f",
  "#770F77",
  "#bd2b2b",
];

function generateRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setTargetColor() {
  targetColor = generateRandomColor();
  colorBox.style.backgroundColor = targetColor;
}

function initializeColorOptions() {
  colorOptions.forEach((button) => {
    button.style.backgroundColor = generateRandomColor();
    button.addEventListener("click", handleGuess);
  });

  // Ensure one button has the target color
  const randomIndex = Math.floor(Math.random() * colorOptions.length);
  colorOptions[randomIndex].style.backgroundColor = targetColor;
}

function handleGuess(event) {
  if (gameOver) return;

  const guessedColor = event.target.style.backgroundColor;
  totalGuesses++;

  // *** KEY CHANGE: Use a helper function to compare colors ***
  if (colorsAreEqual(guessedColor, targetColor)) {
    correctGuesses++;
    gameStatus.textContent = "Correct!";
    gameStatus.style.color = "#4caf50";
    setTargetColor();
    initializeColorOptions(); // Reset options after correct guess
  } else {
    gameStatus.textContent = "Incorrect!";
    gameStatus.style.color = "red";

    colorOptions.forEach((option) => {
      option.classList.add("incorrect-animation");
      setTimeout(() => {
        option.classList.remove("incorrect-animation");
      }, 500);
    });
  }

  scoreDisplay.textContent = `${correctGuesses}/4`;

  if (totalGuesses >= 4) {
    gameOver = true;
    gameStatus.textContent = "One round gone! Click 'New Game' to play again.";
    gameStatus.style.color = "black";
    newGameButton.focus();
  }
}

// *** Helper function to compare colors (handles different formats) ***
function colorsAreEqual(color1, color2) {
  // Create dummy elements to get computed styles
  const temp1 = document.createElement("div");
  temp1.style.backgroundColor = color1;
  document.body.appendChild(temp1);
  const computedColor1 = window.getComputedStyle(temp1).backgroundColor;
  document.body.removeChild(temp1);

  const temp2 = document.createElement("div");
  temp2.style.backgroundColor = color2;
  document.body.appendChild(temp2);
  const computedColor2 = window.getComputedStyle(temp2).backgroundColor;
  document.body.removeChild(temp2);

  return computedColor1 === computedColor2;
}

// ... (rest of your code: newGameButton event listener, DOMContentLoaded, colorizeText)
newGameButton.addEventListener("click", () => {
  correctGuesses = 0;
  totalGuesses = 0;
  scoreDisplay.textContent = "0/4";
  gameStatus.textContent = "";
  gameOver = false;
  setTargetColor();
  initializeColorOptions();
});

window.addEventListener("DOMContentLoaded", () => {
  setTargetColor();
  initializeColorOptions();
});

//getting the letters appear colored
const kolor = ["blue"];
function colorizeText(className, colorArray) {
  const elements = document.querySelectorAll("." + className);

  elements.forEach((element) => {
    const words = element.textContent.split(" "); // Split by spaces!
    const newHTML = words
      .map((word) => {
        const wordSpans = word
          .split("")
          .map((char, index) => {
            const colorIndex = index % colorArray.length;
            const color = colorArray[colorIndex];
            return `<span style="color: ${color};">${char}</span>`;
          })
          .join("");
        return `<span>${wordSpans}</span>`; // Wrap each word in a span
      })
      .join(" "); // Join words with spaces

    element.innerHTML = newHTML;
  });
}

colorizeText("colorfulText", kolor);
colorizeText("instructions", kolor);
