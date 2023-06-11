const canvas = document.getElementById("cw");
const context = canvas.getContext("2d");
let mouseY = 0;
let mouseX = 0;
let isDragging = false;

class StringSystem {
  constructor(N, numStrings) {
    this.strings = [];
    for (let i = 0; i < numStrings; i++) {
      const string = new String(N);
      this.strings.push(string);
    }
  }

  move() {
    for (const string of this.strings) {
      string.move();
    }
  }
}

class String {
  constructor(N) {
    this.N = N;
    this.x = [...Array(this.N)].map((_, i) => i / this.N);
    this.y_t0 = this.x.map(() => 0);
    this.y_t1 = structuredClone(this.y_t0);
    this.y_t2 = structuredClone(this.y_t0);
    this.gam = 200;
    this.l = 0.002;
    this.dx = this.x[1] - this.x[0];
    this.c = 1 / 100;
    this.dt = 0.2;
  }

  move() {
    // Boundary Conditions
    this.y_t2[0] = this.y_t1[0];
    this.y_t2[1] = this.y_t1[1];
    this.y_t2[this.N - 2] = this.y_t1[this.N - 2];
    this.y_t2[this.N - 1] = this.y_t1[this.N - 1];

    // PDE
    for (let i = 2; i < this.y_t1.length - 2; i++) {
      this.y_t2[i] = this.update(i);
    }

    this.y_t0 = structuredClone(this.y_t1);
    this.y_t1 = structuredClone(this.y_t2);
  }

  update(i) {
    const dt = this.dt;
    const dx = this.dx;
    const c = this.c;
    const gam = this.gam;
    const l = this.l;
    const y_t0 = this.y_t0;
    const y_t1 = this.y_t1;
    const y_t2 = this.y_t2;

    const term1 = (1 / (c * dt)) ** 2 + gam / (2 * dt);
    const term2 = (1 / dx ** 2) * (y_t1[i + 1] - 2 * y_t1[i] + y_t1[i - 1]);
    const term3 = (1 / (c * dt) ** 2) * (y_t0[i] - 2 * y_t1[i]);
    const term4 = (gam / (2 * dt)) * y_t0[i];
    const term5 =
      ((l / dx ** 2) ** 2) *
      (y_t1[i - 2] - 4 * y_t1[i - 1] + 6 * y_t1[i] - 4 * y_t1[i + 1] + y_t1[i + 2]);

    return (1 / term1) * (term2 - term3 + term4 - term5);
  }
}

function drawString(s, i) {
  context.beginPath();
  context.lineWidth = 5;
  context.strokeStyle = "red";
  const { x_cnv: x_cnv0, y_cnv: y_cnv0 } = strng2cnv_coords(
    s.x[i - 1],
    s.y_t2[i - 1]
  );
  const { x_cnv: x_cnv1, y_cnv: y_cnv1 } = strng2cnv_coords(s.x[i], s.y_t2[i]);
  context.moveTo(x_cnv0, y_cnv0);
  context.lineTo(x_cnv1, y_cnv1);
  context.stroke();
}

function strng2cnv_coords(x_str, y_str) {
  return {
    x_cnv: canvas.width * x_str,
    y_cnv: y_str * canvas.width + canvas.height / 2,
  };
}

function cnv2strng_coords(x_cnv, y_cnv) {
  return {
    x_str: x_cnv / canvas.width,
    y_str: (y_cnv - canvas.height / 2) / canvas.width,
  };
}

function findClosestPoint(x_str, y_str, strings) {
  let closestIndex = 0;
  let closestDistance = Number.MAX_VALUE;

  for (let i = 0; i < strings.length; i++) {
    const string = strings[i];
    const { x, y_t2 } = string;

    for (let j = 0; j < x.length; j++) {
      const distance = Math.sqrt((x[j] - x_str) ** 2 + (y_t2[j] - y_str) ** 2);

      if (distance < closestDistance) {
        closestIndex = i;
        closestDistance = distance;
      }
    }
  }

  return closestIndex;
}

addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

addEventListener("mousedown", (e) => {
  isDragging = true;
});

addEventListener("mouseup", (e) => {
  isDragging = false;
});

addEventListener("resize", setSize);

function setSize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

function anim() {
  setSize();
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 5; i++) {
    stringSystem.move();
    if (isDragging) {
      const { x_str, y_str } = cnv2strng_coords(mouseX, mouseY);
      const closestStringIndex = findClosestPoint(
        x_str,
        y_str,
        stringSystem.strings
      );
      const closestString = stringSystem.strings[closestStringIndex];
      closestString.y_t1[Math.round(closestString.N * x_str)] = y_str;
    }

    for (const string of stringSystem.strings) {
      for (let i = 1; i < string.x.length; i++) {
        drawString(string, i);
      }
    }
  }

  requestAnimationFrame(anim);
}

setSize();
const stringSystem = new StringSystem(200, 1);
anim();
