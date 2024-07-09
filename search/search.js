const wordGrid = document.getElementById("word-grid");
const time = document.getElementById("time");
const scoreDiv = document.getElementById("score");
const bestScoreDiv = document.getElementById("best-score");

const gridSize = Number(sessionStorage.getItem("gridSize"));
wordGrid.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
wordGrid.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;

let popUp = document.getElementById("pop-up");

let score = 0;
let bestScore = Number(localStorage.getItem("bestScore"))
let comboMultiplier = 1;
let lastWordFoundTime = 0;
const comboTimeLimit = 5000; 

bestScoreDiv.innerHTML = `Best Score <br> ${bestScore}`

async function generatePuzzle() {
  popUp.style.visibility = "hidden";
  let seconds = 0;
  time.innerHTML = `Time <br> ${seconds}`;
  let timer;

  
  clearInterval(timer);
  timer = setInterval(() => {
    seconds += 1;
    time.innerHTML = `Time <br> ${seconds}`;
  }, 1000);

  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

  const words = await fetchRandomWords(100, gridSize);
  const selectedWords = [];

  function placeWord(word) {
    const directions = [
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
    ];

    for (const dir of directions) {
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(word, startX, startY, dir)) {
        for (let i = 0; i < word.length; i++) {
          const x = startX + i * dir.x;
          const y = startY + i * dir.y;
          grid[y][x] = word[i];
        }
        selectedWords.push(word);
        return true;
      }
    }
    return false;
  }

  function canPlaceWord(word, x, y, dir) {
    for (let i = 0; i < word.length; i++) {
      const newX = x + i * dir.x;
      const newY = y + i * dir.y;
      if (
        newX < 0 ||
        newY < 0 ||
        newX >= gridSize ||
        newY >= gridSize ||
        grid[newY][newX] !== ""
      ) {
        return false;
      }
    }
    return true;
  }

  words.forEach((word) => placeWord(word.toUpperCase()));

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === "") {
        grid[y][x] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  const wordGrid = document.getElementById("word-grid");
  wordGrid.innerHTML = "";
  grid.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement("div");
      cellDiv.textContent = cell;
      wordGrid.appendChild(cellDiv);
    });
  });

  const wordList = document.getElementById("words");
  wordList.innerHTML = "";
  selectedWords.forEach((word) => {
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
  });

  let isDragging = false;
  let startCell = null;
  let endCell = null;
  let dragCells = [];
  let highlightColor = "";

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function checkAllWordsFound() {
    const remainingWords = Array.from(
      wordList.getElementsByTagName("li")
    ).filter((li) => !li.classList.contains("found"));
    if (remainingWords.length === 0) {
      clearInterval(timer);
      popUp.style.visibility = "visible";
      document.getElementById("pop-up-text").innerHTML = `You took ${Math.floor(
        seconds / 60
      )} minutes and ${seconds % 60} seconds. <br> Your final score is: ${score} <br> Your best score was: ${bestScore}`;
    }
  }

  function startDrag(event, target) {
    isDragging = true;
    startCell = target;
    dragCells = [startCell];
    highlightColor = getRandomColor();
    startCell.style.backgroundColor = highlightColor;
    event.preventDefault();
  }

  function moveDrag(event, target) {
    if (isDragging && target.tagName === "DIV") {
      endCell = target;
      if (!dragCells.includes(endCell)) {
        dragCells.push(endCell);
        endCell.style.backgroundColor = highlightColor;
      }
    }
  }

  function endDrag() {
    if (isDragging) {
      isDragging = false;
      const formedWord = dragCells.map((cell) => cell.textContent).join("");
      const reversedFormedWord = dragCells
        .map((cell) => cell.textContent)
        .reverse()
        .join("");

      if (
        selectedWords.includes(formedWord) ||
        selectedWords.includes(reversedFormedWord)
      ) {
        const wordItem = Array.from(wordList.getElementsByTagName("li")).find(
          (li) =>
            li.textContent === formedWord ||
            li.textContent === reversedFormedWord
        );
        if (wordItem) {
          wordItem.classList.add("found");

          
          const wordLength = formedWord.length;
          const baseScore = wordLength * 10;
          const currentTime = Date.now();

          
          if (currentTime - lastWordFoundTime <= comboTimeLimit) {
            comboMultiplier += 1;
          } else {
            comboMultiplier = 1;
          }

          lastWordFoundTime = currentTime;
          const comboScore = baseScore * comboMultiplier;
          score += comboScore;

          score > bestScore ? bestScore = score : bestScore
          localStorage.setItem("bestScore", bestScore)
          bestScoreDiv.innerHTML = `Best Score <br> ${bestScore}`

          
          comboMultiplier > 1
            ? (scoreDiv.innerHTML = `Score <br> ${score} (x${comboMultiplier})`)
            : (scoreDiv.innerHTML = `Score <br> ${score}`);
        }
        checkAllWordsFound();
      } else {
        dragCells.forEach((cell) => (cell.style.backgroundColor = ""));
      }

      dragCells = [];
    }
  }

  wordGrid.addEventListener("mousedown", (event) => {
    if (event.target.tagName === "DIV") {
      startDrag(event, event.target);
    }
  });

  wordGrid.addEventListener("mousemove", (event) => {
    moveDrag(event, event.target);
  });

  wordGrid.addEventListener("mouseup", endDrag);

  wordGrid.addEventListener(
    "touchstart",
    (event) => {
      if (event.target.tagName === "DIV") {
        startDrag(event, event.target);
      }
    },
    { passive: false }
  );

  wordGrid.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      moveDrag(event, target);
    },
    { passive: false }
  );

  wordGrid.addEventListener("touchend", endDrag);

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      endDrag();
    }
  });

  document.addEventListener("touchend", () => {
    if (isDragging) {
      endDrag();
    }
  });
}

async function fetchRandomWords(count, length) {
  const response = await fetch(
    `https://random-word-api.vercel.app/api?words=${count}`
  );
  const words = await response.json();
  const wordList = words;
  const filteredWords = wordList
    .filter((word) => word.length <= length)
    .slice(0, count); 
  return filteredWords.sort(); 
}


generatePuzzle();


if (window.matchMedia("(max-width: 1100px)").matches) {
  wordGrid.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`;
  wordGrid.style.gridTemplateRows = `repeat(${gridSize}, 30px)`; 
}
