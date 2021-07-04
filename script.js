const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 70;
canvas.height = 490;

let context = canvas.getContext("2d");
let start_background_color = "white";
// context.fillStyle = start_background_color;
// context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let restoreArray = [];
let index = -1;

let strLine = false;

function change_color(ele) {
  draw_color = ele.style.background;
}

setTimeout(() => {
  alert("Click on Pencil or Line to draw");
}, 2000);

document.getElementById("pencil").addEventListener("click", () => {
  canvas.removeEventListener("mousedown", str, false);
  canvas.removeEventListener("mouseup", end, false);

  canvas.addEventListener("touchstart", start, false);
  canvas.addEventListener("touchmove", draw, false);
  canvas.addEventListener("mousedown", start, false);
  canvas.addEventListener("mousemove", draw, false);

  canvas.addEventListener("touchend", stop, false);
  canvas.addEventListener("mouseup", stop, false);
  canvas.addEventListener("mouseout", stop, false);

  document.getElementById("pencil").classList.remove("button");
  document.getElementById("pencil").classList.add("active");
  document.getElementById("line").classList.remove("active");
  document.getElementById("line").classList.add("button");
});

document.getElementById("line").addEventListener("click", () => {
  canvas.removeEventListener("touchstart", start, false);
  canvas.removeEventListener("touchmove", draw, false);
  canvas.removeEventListener("mousedown", start, false);
  canvas.removeEventListener("mousemove", draw, false);

  canvas.removeEventListener("touchend", stop, false);
  canvas.removeEventListener("mouseup", stop, false);
  canvas.removeEventListener("mouseout", stop, false);

  canvas.addEventListener("mousedown", str, false);
  canvas.addEventListener("mouseup", end, false);

  document.getElementById("line").classList.remove("button");
  document.getElementById("line").classList.add("active");
  document.getElementById("pencil").classList.remove("active");
  document.getElementById("pencil").classList.add("button");
});

// To Darw a Line
function str(event) {
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}

function end(event) {
  context.lineTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  context.strokeStyle = draw_color;
  context.lineWidth = draw_width;
  context.stroke();
  if (event.type != "mouseout") {
    restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index++;
  }
}

// To draw with pencil
function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    context.strokeStyle = draw_color;
    context.lineWidth = draw_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();

  if (event.type != "mouseout") {
    restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index++;
  }
}

function clearCanvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);

  restoreArray = [];
  index = -1;
}

const undoLast = () => {
  if (index <= 0) {
    clearCanvas();
  } else {
    index--;
    restoreArray.pop();
    context.putImageData(restoreArray[index], 0, 0);
  }
};

function changecolor(self){
  document.getElementById('canvas').style.background = self.value;
}

