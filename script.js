const sketchpad = document.querySelector("#sketchpad");
const gridSize = document.querySelector("#size");
const slider = document.querySelector("#slider");
const gridBtn = document.querySelector("#grid-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const clearBtn = document.querySelector("#clear-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
let colorPicker = document.querySelector("#color-picker");
let color = document.querySelector("#color-picker").value;
let pixels = null;
let isMouseDown = false;
let isEraserEnabled = false;
let isRainbowEnabled = false;

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

rainbowBtn.addEventListener("click", () => {
  if (rainbowBtn.textContent === "Rainbow: OFF") {
    rainbowBtn.classList.add("enabled");
    rainbowBtn.textContent = "Rainbow: ON";
    isRainbowEnabled = true;
  } else {
    rainbowBtn.classList.remove("enabled");
    rainbowBtn.textContent = "Rainbow: OFF";
    isRainbowEnabled = false;
  }
});

eraserBtn.addEventListener("click", () => {
  if (eraserBtn.textContent === "Eraser: OFF") {
    eraserBtn.classList.add("enabled");
    eraserBtn.textContent = "Eraser: ON";
    isEraserEnabled = true;
  } else {
    eraserBtn.classList.remove("enabled");
    eraserBtn.textContent = "Eraser: OFF";
    isEraserEnabled = false;
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
sketchpad.addEventListener("touchstart", (e) => {
  isMouseDown = true;
  e.preventDefault();
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});
document.addEventListener("touchend", () => {
  isMouseDown = false;
});

// Using event delegation instead of an event for every pixel
sketchpad.addEventListener("mouseover", drawWithMouse);
sketchpad.addEventListener("touchmove", drawWithTouch);
function drawWithMouse(e) {
  const targetPixel = e.target;
  if (isMouseDown) {
    if (isEraserEnabled) targetPixel.style.backgroundColor = "white";
    else if (isRainbowEnabled)
      targetPixel.style.backgroundColor = generateRandomColor();
    else targetPixel.style.backgroundColor = color;
  }
}
function drawWithTouch(e) {
  e.preventDefault();
  // Get the current touch position
  const touch = e.touches[0];
  // Get the target pixel(div) based on position coordinates
  const targetPixel = document.elementFromPoint(touch.clientX, touch.clientY);

  if (isMouseDown) {
    if (isEraserEnabled) targetPixel.style.backgroundColor = "white";
    else if (isRainbowEnabled)
      targetPixel.style.backgroundColor = generateRandomColor();
    else targetPixel.style.backgroundColor = color;
  }
}

slider.addEventListener("input", (e) => {
  const newSize = e.target.value;
  createGrid(newSize);
  gridSize.textContent = `${newSize} x ${newSize}`;
});

colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});

function generateRandomColor() {
  const hexChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    const randomPosition = Math.floor(Math.random() * 16);
    hexColor += hexChars[randomPosition];
  }

  return hexColor;
}
