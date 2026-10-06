function preload() {
  img = loadImage('path/to/your/image.jpg');
}

function setup() {
  createCanvas(2000, 2000);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  image(img, 0, 0, 2000, 2000);
  
  push();
  translate(1000, 1000);
  scale(1.5);
  rotate(frameCount * 0.5);
  fill(255, 100, 0);
  square(100, 100, 100);
  pop();

  push();
  translate(800, 400);
  rotate(frameCount * 1.5);
  scale(1.0);
  fill(0, 25, 255);
  circle(0, 0, 100);
  pop();

  push();
  translate(1000, 1000);
  rotate(frameCount * 0.5);
  scale(1.0);
  fill(0, 150, 0);
  rect(50, 50, 150, 150);
  pop();
  
  push();
  translate(500, 600);
  rotate(frameCount * 1.0);
  scale(1.0);
  fill(0, 225, 255);
  triangle(50, 50, 200, 50, 150, 200);
  pop();

  push();
  translate(800, 500);
  rotate(frameCount * 0.5);
  scale(1.0);
  fill(255, 0, 255);
  ellipse(200, 200, 100, 100);
  pop();
  
  push();
  translate(1000, 1000);
  rotate(frameCount * 0.5);
  scale(1.0);
  fill(0, 255, 0);
  quad(50, 50, 150, 50, 200, 150, 100, 150);
  pop();

  push();
  translate(500, 800);
  rotate(frameCount * 0.5);
  scale(1.0);
  stroke(0, 0, 255);
  strokeWeight(8);
  point(200, 200);
  pop();

  push();
  translate(700, 800);
  rotate(frameCount * 1.0);
  scale(1.0);
  fill(255, 255, 0);
  arc(200, 200, 100, 100, 0, 100);
  pop();

  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.5);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(-50, 0, 50, 0);
  pop();
}