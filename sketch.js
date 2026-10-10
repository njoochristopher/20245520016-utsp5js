const SCENE_WIDTH = 960;
const SCENE_HEIGHT = 540;

let sourceImage = null;
let imageRequestId = 0;
let selectedShapeId = 'square';

const shapes = [
  { id: 'square', type: 'square', baseX: 145, baseY: 145, translateX: 0, translateY: 0, fill: '#f26b38', rotation: 0, scale: 1 },
  { id: 'circle', type: 'circle', baseX: 365, baseY: 135, translateX: 0, translateY: 0, fill: '#2478d4', rotation: 0, scale: 1 },
  { id: 'ellipse', type: 'ellipse', baseX: 600, baseY: 140, translateX: 0, translateY: 0, fill: '#24a36a', rotation: 0, scale: 1 },
  { id: 'rect', type: 'rect', baseX: 820, baseY: 145, translateX: 0, translateY: 0, fill: '#e2ac19', rotation: 0, scale: 1 },
  { id: 'triangle', type: 'triangle', baseX: 145, baseY: 365, translateX: 0, translateY: 0, fill: '#a34bc0', rotation: 0, scale: 1 },
  { id: 'quad', type: 'quad', baseX: 365, baseY: 365, translateX: 0, translateY: 0, fill: '#e64c67', rotation: 0, scale: 1 },
  { id: 'arc', type: 'arc', baseX: 600, baseY: 365, translateX: 0, translateY: 0, fill: '#13a6a6', rotation: 0, scale: 1 },
  { id: 'line', type: 'line', baseX: 790, baseY: 340, translateX: 0, translateY: 0, fill: '#31445b', rotation: 0, scale: 1 },
  { id: 'point', type: 'point', baseX: 850, baseY: 390, translateX: 0, translateY: 0, fill: '#e64c67', rotation: 0, scale: 1 }
];

function setup() {
  const canvas = createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  noStroke();
  connectControls();
  selectShape(selectedShapeId);
}

function draw() {
  background('#f4f1eb');

  push();
  scale(width / SCENE_WIDTH, height / SCENE_HEIGHT);

  if (sourceImage) {
    const imageScale = max(SCENE_WIDTH / sourceImage.width, SCENE_HEIGHT / sourceImage.height);
    const imageWidth = sourceImage.width * imageScale;
    const imageHeight = sourceImage.height * imageScale;
    image(sourceImage, (SCENE_WIDTH - imageWidth) / 2, (SCENE_HEIGHT - imageHeight) / 2, imageWidth, imageHeight);
    noStroke();
    fill(255, 255, 255, 110);
    rect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
  }

  for (const shape of shapes) {
    push();
    translate(shape.baseX + shape.translateX, shape.baseY + shape.translateY);
    rotate(shape.rotation);
    scale(shape.scale);
    fill(shape.fill);
    drawShape(shape.type, shape.fill);
    pop();
  }

  pop();
}

function drawShape(type, shapeFill) {
  if (type === 'square') {
    square(-42, -42, 84);
  } else if (type === 'circle') {
    circle(0, 0, 92);
  } else if (type === 'ellipse') {
    ellipse(0, 0, 118, 76);
  } else if (type === 'rect') {
    rect(-56, -36, 112, 72, 10);
  } else if (type === 'triangle') {
    triangle(-50, 40, 0, -50, 50, 40);
  } else if (type === 'quad') {
    quad(-48, -30, 30, -45, 52, 30, -25, 45);
  } else if (type === 'arc') {
    arc(0, 0, 100, 100, 210, 510, PIE);
  } else if (type === 'line') {
    strokeWeight(8);
    stroke(shapeFill);
    line(-55, -25, 55, 25);
    noStroke();
  } else if (type === 'point') {
    strokeWeight(14);
    stroke(shapeFill);
    point(0, 0);
    noStroke();
  }
}

function connectControls() {
  document.getElementById('shape-select').addEventListener('change', (event) => {
    selectShape(event.target.value);
  });

  for (const control of ['translate-x', 'translate-y', 'rotation', 'scale', 'fill']) {
    document.getElementById(control).addEventListener('input', updateSelectedShape);
  }

  document.getElementById('load-image').addEventListener('click', loadImageFromUrl);
  document.getElementById('image-url').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') loadImageFromUrl();
  });
  document.getElementById('image-file').addEventListener('change', loadImageFromFile);
}

function selectShape(id) {
  selectedShapeId = id;
  const shape = shapes.find((item) => item.id === id);
  if (!shape) return;

  document.getElementById('translate-x').value = 0;
  document.getElementById('translate-y').value = 0;
  document.getElementById('translate-x').value = shape.translateX;
  document.getElementById('translate-y').value = shape.translateY;
  document.getElementById('rotation').value = shape.rotation;
  document.getElementById('scale').value = shape.scale;
  document.getElementById('fill').value = shape.fill;
  updateControlLabels();
}

function updateSelectedShape() {
  const shape = shapes.find((item) => item.id === selectedShapeId);
  if (!shape) return;

  shape.rotation = Number(document.getElementById('rotation').value);
  shape.scale = Number(document.getElementById('scale').value);
  shape.fill = document.getElementById('fill').value;

  shape.translateX = Number(document.getElementById('translate-x').value);
  shape.translateY = Number(document.getElementById('translate-y').value);
  updateControlLabels();
}

function updateControlLabels() {
  document.getElementById('translate-x-value').textContent = document.getElementById('translate-x').value;
  document.getElementById('translate-y-value').textContent = document.getElementById('translate-y').value;
  document.getElementById('rotation-value').textContent = `${document.getElementById('rotation').value}°`;
  document.getElementById('scale-value').textContent = `${Number(document.getElementById('scale').value).toFixed(1)}×`;
}

function loadImageFromUrl() {
  const input = document.getElementById('image-url');
  const value = input.value.trim();
  if (!value) {
    setImageStatus('Masukkan URL atau path gambar terlebih dahulu.', true);
    return;
  }

  let url;
  try {
    url = new URL(value, window.location.href);
  } catch {
    setImageStatus('URL gambar tidak valid.', true);
    return;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    setImageStatus('Gunakan URL HTTP/HTTPS atau path gambar di website ini.', true);
    return;
  }

  loadSourceImage(url.href, 'URL');
}

function loadImageFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    setImageStatus('Pilih berkas gambar yang valid.', true);
    event.target.value = '';
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  loadSourceImage(objectUrl, file.name, objectUrl);
  event.target.value = '';
}

function loadSourceImage(url, label, objectUrl) {
  const requestId = ++imageRequestId;
  setImageStatus(`Memuat gambar: ${label}...`);

  loadImage(
    url,
    (loadedImage) => {
      if (requestId !== imageRequestId) {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        return;
      }
      sourceImage = loadedImage;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setImageStatus(`Gambar berhasil dimuat dari ${label}.`);
    },
    () => {
      if (requestId !== imageRequestId) {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        return;
      }
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setImageStatus('Gambar gagal dimuat. Periksa URL, koneksi, dan izin CORS sumber gambar.', true);
    }
  );
}

function setImageStatus(message, isError = false) {
  const status = document.getElementById('image-status');
  status.textContent = message;
  status.dataset.error = String(isError);
}

function windowResized() {
  const canvasWidth = min(max(windowWidth - 40, 320), 960);
  resizeCanvas(canvasWidth, canvasWidth * SCENE_HEIGHT / SCENE_WIDTH);
}
