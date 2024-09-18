const sketchpad = document.querySelector("#sketchpad");
const gridSize = document.querySelector("#size");
const slider = document.querySelector("#slider");
const gridBtn = document.querySelector("#grid-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const clearBtn = document.querySelector("#clear-btn");
let colorPicker = document.querySelector("#color-picker");
let color = document.querySelector("#color-picker").value;
let pixels = null;
let isMouseDown = false;
let eraserEnabled = false;

createGrid();

function createGrid(num = 16) {
  sketchpad.innerHTML = "";
  for (let i = 0; i < num * num; i++) {
    const pixel = document.createElement("div");
    let basis = 500 / num;
    pixel.classList.add("pixel");
    if (gridBtn.classList.contains("enabled")) {
      pixel.style.border = "1px solid grey";
    }
    pixel.style.flexBasis = `${basis}px`;
    sketchpad.appendChild(pixel);
  }
  pixels = document.querySelectorAll(".pixel");
}

gridBtn.addEventListener("click", () => {
  if (gridBtn.textContent === "Grid: OFF") {
    gridBtn.classList.add("enabled");
    gridBtn.textContent = "Grid: ON";
  } else {
    gridBtn.classList.remove("enabled");
    gridBtn.textContent = "Grid: OFF";
  }
});

gridBtn.addEventListener("click", () => {
  if (gridBtn.textContent === "Grid: OFF") {
    pixels.forEach((pixel) => {
      pixel.style.border = "none";
    });
  } else {
    pixels.forEach((pixel) => {
      pixel.style.border = "1px solid grey";
    });
  }
});

eraserBtn.addEventListener("click", () => {
  if (eraserBtn.textContent === "Eraser: OFF") {
    eraserBtn.classList.add("enabled");
    eraserBtn.textContent = "Eraser: ON";
    eraserEnabled = true;
  } else {
    eraserBtn.classList.remove("enabled");
    eraserBtn.textContent = "Eraser: OFF";
    eraserEnabled = false;
  }
});

clearBtn.addEventListener("click", () => {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
});

sketchpad.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  e.preventDefault();
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Using event delegation instead of an event for every pixel
sketchpad.addEventListener("mouseover", (e) => {
  const targetPixel = e.target;
  if (isMouseDown) {
    eraserEnabled
      ? (targetPixel.style.backgroundColor = "white")
      : (targetPixel.style.backgroundColor = color);
  }
});

slider.addEventListener("input", (e) => {
  const newSize = e.target.value;
  createGrid(newSize);
  gridSize.textContent = `${newSize} x ${newSize}`;
});

colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});
