const img = new Image();

img.onload(){

}

function setup() {
  createCanvas(1600, 800);
  noStroke();
  angleMode(DEGREES);
  loadImageSource();
}

class shapes (){
    circle;
    ellipse;
    arc;
    square;
    rect;
    quad;
    triangle;
    line;
    point;
}

function draw() {
  image(0, 0, 1590, 899);

  for(let i = 0; 1 < shapes.length; i++){
    let s = shapes[i];

    push();

    translate(s.x, s.y);
    rotate(s.rotation);
    scale(s.scale);
    fill(s.fill);

    if(s.type === 'circle'){
        circle(s.translate, s.rotate, s.scale, s.fill);
    }
    else if(s.type === 'ellipse'){
        ellipse(s.translate, s.rotate, s.scale, s.fill);
    }
    else if(s.type === 'arc'){
        ellipse(s.translate, s.rotate, s.scale, s.fill);
    }
    else if(s.type === 'square'){
        square(-s.size/2, -s.size/2, s.size, s.size);
    }
    else if(s.type === 'rect'){
        rect(s.translate, s.rotate, s.scale, s.fill);
    }
    else if(s.type === 'quad'){
        ellipse(s.translate, s.rotate, s.scale, s.fill);
    }
    else if(s.type === 'triangle'){
        triangle(s.translate, s.rotate, s.scale, s.fill);
    }
    else if(s.type === 'line'){
        triangle(s.translate, s.rotate, s.scale, s.fill);
    }
    else if(s.type === 'point'){
        triangle(s.translate, s.rotate, s.scale, s.fill);
    }

    pop();
  }
}

function mousePressed() {
  if (key === 'r' || key === 'R') {
    currentColor = color(255, 0, 0);
    print("Warna diubah ke Merah");
  } else if (key === 'g' || key === 'G') {
    currentColor = color(0, 255, 0);
    print("Warna diubah ke Hijau");
  } else if (key === 'b' || key === 'B') {
    currentColor = color(0, 0, 255);
    print("Warna diubah ke Biru");
  } else if (key === 'y' || key === 'Y') {
    currentColor = color(255, 255, 0);
    print("Warna diubah ke Kuning");
    if (shapes.length > 0) {
      shapes[shapes.length - 1].type = 'circle';
      print("Bentuk terakhir diubah ke Arc");
    }
  } else if (key === 'q' || key === 'Q') {
    if (shapes.length > 0) {
      shapes[shapes.length - 1].type = 'square';
      print("Bentuk terakhir diubah ke Persegi Panjang");
    }
  } else if (key === 'a' || key === 'A') {
    if (shapes.length > 0) {
      shapes[shapes.length - 1].type = 'rect';
      print("Bentuk terakhir diubah ke Kotak");
    }
  } else if (key === 'z' || key === 'Z') {
    if (shapes.length > 0) {
        shapes[shapes.length - 1].type = 'ellipse';
        print("Bentuk terakhir diubah menjadi Lingkaran");
    }
  } else if (key === 't' || key === 'T') {
    if (shapes.length > 0) {
        shapes[shapes.length - 1].type = 'arc';
        print("Bentuk terakhir diubah ke Ellipse");
    }
  }

  pop();
}

function keyPressed(){
    
}

function loadImagesSource(){
    
}

function updateShapes(obj){
    obj.shapes = "Circle";
    obj = null;
    console.log(shapes, circle);
}
