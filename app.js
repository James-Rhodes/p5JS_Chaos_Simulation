class Ball {
  constructor(initPosX, initPosY, colour) {
    this.pos = createVector(initPosX, initPosY);
    this.vel = createVector(0, -15);
    this.acc = createVector(0, -0.5);
    this.colour = colour;

    this.prevPos = this.pos.copy();
  }

  update() {
    this.prevPos = this.pos.copy();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.pos.limit(radius - 5);

    this.offScreen();
    if (this.hitCircle(this.pos.x, this.pos.y)) {
      this.reflect();
    }
  }

  offScreen() {
    if (this.pos.x >= width / 2 || this.pos.x <= -width / 2) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height / 2 || this.pos.y < -height / 2) {
      this.vel.y *= -1;
    }
  }
  reflect() {
    const n = p5.Vector.sub(this.pos, createVector(0, 0));
    this.vel.reflect(n);
  }
  show() {
    fill(this.colour[0], this.colour[1], this.colour[2]);
    circle(this.pos.x, this.pos.y, 10);
    stroke(255);

    trailLayer.push();
    trailLayer.stroke(this.colour[0], this.colour[1], this.colour[2]);
    trailLayer.strokeWeight(4);
    trailLayer.fill(this.colour[0], this.colour[1], this.colour[2]);
    trailLayer.line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    trailLayer.pop();
  }

  hitCircle(x, y) {
    return x * x + y * y >= (radius - 10) * (radius - 10);
  }
}

let radius;
let theta = 0;
let ball1;
let ball2;

function setup() {
  createCanvas(500, 500);
  radius = (width * 8) / 9 / 2;
  ball1 = new Ball(5, 0, [255, 0, 0]);
  ball2 = new Ball(5.001, 0, [0, 255, 0]);
  trailLayer = createGraphics(500, 500);
  trailLayer.noStroke();
  trailLayer.fill(52, 25);
  trailLayer.translate(width / 2, height / 2);
  trailLayer.scale(1, -1);
  background(52);
}

function draw() {
  background(52);
  trailLayer.rect(-width / 2, -height / 2, width, height);
  image(trailLayer, 0, 0);

  // make the screen match a cartesian plane
  translate(width / 2, height / 2);
  scale(1, -1);
  stroke(255);
  noFill();
  circle(0, 0, radius * 2);
  ball1.update();
  noStroke();
  ball1.show();
  ball2.update();
  noStroke();
  ball2.show();
}
