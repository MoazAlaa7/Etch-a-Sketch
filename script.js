const sketchpad = document.querySelector("#sketchpad");
const btns = document.querySelectorAll("button");
const toggle = document.querySelector(".toggle");
const gridBtn = document.querySelector("#grid-btn");
let pixels = null;
let isMouseDown = false;

createGrid();

function createGrid(num = 16) {
  sketchpad.innerHTML = "";
  for (let i = 0; i < num * num; i++) {
    const pixel = document.createElement("div");
    let basis = 500 / num;
    pixel.classList.add("pixel");
    pixel.style.flexBasis = `${basis}px`;
    sketchpad.appendChild(pixel);
  }
  pixels = document.querySelectorAll(".pixel");
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (toggle.textContent === "OFF") {
      btn.classList.add("enabled");
      toggle.textContent = "ON";
    } else {
      btn.classList.remove("enabled");
      toggle.textContent = "OFF";
    }
  });
});

document.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  e.preventDefault();
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

gridBtn.addEventListener("click", () => {
  pixels.forEach((pixel) => {
    toggle.textContent === "OFF"
      ? (pixel.style.border = "none")
      : (pixel.style.border = "1px solid grey");
  });
});

// Using event delegation instead of event for every pixel
sketchpad.addEventListener("mouseover", (e) => {
  const targetPixel = e.target;
  if (isMouseDown) {
    targetPixel.style.backgroundColor = "black";
  }
});
