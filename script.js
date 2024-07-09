const easy = document.getElementById("easy")
const medium = document.getElementById("medium")
const hard = document.getElementById("hard")
const h = document.getElementsByClassName("tracking-in-contract-bck")
const levels = document.querySelector(".levels")

easy.addEventListener("click", () => {
    sessionStorage.setItem("gridSize", 10)
    h[0].classList.toggle("tracking-out-expand-fwd")
    h[1].classList.toggle("tracking-out-expand-fwd")
    levels.classList.toggle("levels-fade")
    setTimeout(() => {
        window.location.href = "./search/search.html"
    }, 1000);
})

medium.addEventListener("click", () => {
    sessionStorage.setItem("gridSize", 15)
    h[0].classList.toggle("tracking-out-expand-fwd")
    h[1].classList.toggle("tracking-out-expand-fwd")
    levels.classList.toggle("levels-fade")
    setTimeout(() => {
        window.location.href = "./search/search.html"
    }, 1000);
})

hard.addEventListener("click", () => {
    sessionStorage.setItem("gridSize", 20)
    h[0].classList.toggle("tracking-out-expand-fwd")
    h[1].classList.toggle("tracking-out-expand-fwd")
    levels.classList.toggle("levels-fade")
    setTimeout(() => {
        window.location.href = "./search/search.html"
    }, 1000);
})

easy.addEventListener("mouseover", () => {
    h[0].style.color = "lime"
    h[1].style.color = "limegreen"
})

easy.addEventListener("mouseout", () => {
    h[0].style.color = h[1].style.color = "white"
})

medium.addEventListener("mouseover", () => {
    h[0].style.color = "yellow"
    h[1].style.color = "gold"
})

medium.addEventListener("mouseout", () => {
    h[0].style.color = h[1].style.color = "white"
})

hard.addEventListener("mouseover", () => {
    h[0].style.color = "tomato"
    h[1].style.color = "red"
})

hard.addEventListener("mouseout", () => {
    h[0].style.color = h[1].style.color = "white"
})