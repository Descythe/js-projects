const canvas = document.getElementById("canvas"),
    increase = document.getElementById("increase"),
    decrease = document.getElementById("decrease"),
    size = document.getElementById("size"),
    colorPicker = document.getElementById("color"),
    clear = document.getElementById("clear"),
    ctx = canvas.getContext("2d");

let maxSize = 60,
    isPressed = false,
    x = undefined,
    y = undefined;
    color = "black";

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, getSize(), 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = getSize() * 2;
    ctx.stroke();
}

increase.addEventListener("click", () => {
    size.value = Math.min(getSize() + 3, maxSize);
});

decrease.addEventListener("click", () => {
    size.value = Math.max(getSize() - 3, 3);
});

colorPicker.addEventListener("change", (e) => {
    color = e.target.value;
});

clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

size.addEventListener("change", () => {
    size.value = Math.min(Math.max(getSize(), 3), maxSize);
});

function getSize() {
    return parseInt(size.value);
}