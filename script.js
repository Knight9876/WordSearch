const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const h1 = document.querySelector(".tracking-in-contract-bck");
const h4 = document.querySelector(".sub-heading");
const levels = document.querySelector(".levels");
const toggleBg = document.getElementById("toggle-bg");
const theme = document.getElementById("theme");
const themeFill = document.querySelector(".theme__fill");
const themeIcon = document.querySelector(".theme__icon");
const body = document.body;

let bgChanged = JSON.parse(localStorage.getItem("bgChanged"));

if (bgChanged) {
  body.style.transition = "background 1s ease";
  body.style.background = "linear-gradient(135deg, white, black)";
  theme.checked = true;
} else {
  body.style.transition = "background 1s ease";
  body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
  theme.checked = false;
}

easy.addEventListener("click", () => {
  sessionStorage.setItem("gridSize", 10);
  h1.classList.toggle("tracking-out-expand-fwd");
  h4.classList.toggle("sub-heading-fade");
  levels.classList.toggle("levels-fade");
  setTimeout(() => {
    window.location.href = "./search/search.html";
  }, 1000);
});

medium.addEventListener("click", () => {
  sessionStorage.setItem("gridSize", 15);
  h1.classList.toggle("tracking-out-expand-fwd");
  h4.classList.toggle("sub-heading-fade");
  levels.classList.toggle("levels-fade");
  setTimeout(() => {
    window.location.href = "./search/search.html";
  }, 1000);
});

hard.addEventListener("click", () => {
  sessionStorage.setItem("gridSize", 20);
  h1.classList.toggle("tracking-out-expand-fwd");
  h4.classList.toggle("sub-heading-fade");
  levels.classList.toggle("levels-fade");
  setTimeout(() => {
    window.location.href = "./search/search.html";
  }, 1000);
});

easy.addEventListener("mouseover", () => {
  h1.style.color = "lime";
  h4.style.color = "limegreen";
});

easy.addEventListener("mouseout", () => {
  h1.style.color = h4.style.color = "white";
});

medium.addEventListener("mouseover", () => {
  h1.style.color = "yellow";
  h4.style.color = "gold";
});

medium.addEventListener("mouseout", () => {
  h1.style.color = h4.style.color = "white";
});

hard.addEventListener("mouseover", () => {
  h1.style.color = "tomato";
  h4.style.color = "red";
});

hard.addEventListener("mouseout", () => {
  h1.style.color = h4.style.color = "white";
});

toggleBg.addEventListener("click", () => {
  if (bgChanged) {
    body.style.transition = "background 1s ease";
    body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
    bgChanged = false;
    localStorage.setItem("bgChanged", bgChanged);
  } else {
    body.style.transition = "background 1s ease";
    body.style.background = "linear-gradient(135deg, white, black)";
    bgChanged = true;
    localStorage.setItem("bgChanged", bgChanged);
  }
});

themeFill.addEventListener("click", () => {
  if (bgChanged) {
    body.style.transition = "background 1s ease";
    body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
    bgChanged = false;
    localStorage.setItem("bgChanged", bgChanged);
  } else {
    body.style.transition = "background 1s ease";
    body.style.background = "linear-gradient(135deg, white, black)";
    bgChanged = true;
    localStorage.setItem("bgChanged", bgChanged);
  }
});

themeIcon.addEventListener("click", () => {
  if (bgChanged) {
    body.style.transition = "background 1s ease";
    body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
    bgChanged = false;
    localStorage.setItem("bgChanged", bgChanged);
  } else {
    body.style.transition = "background 1s ease";
    body.style.background = "linear-gradient(135deg, white, black)";
    bgChanged = true;
    localStorage.setItem("bgChanged", bgChanged);
  }
});
