function preload() {
  backgroundImage = loadImage('midexamcomputergraphics.jpg');
}

function setup() {
  createCanvas(1590, 899);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  image(backgroundImage, 0, 0, 1590, 899);

  for(let i = 0; 1 < shapes.length; i++){
    let s = shapes[i];

    push();

    translate(s.x, s.y);
    rotate(s.rotation);
    scale(s.scale);
    fill(s.fill);
  }
}
