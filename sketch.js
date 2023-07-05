let n = 256; // Número de puntos en la forma
let minRad = 50; // Radio mínimo de los puntos
let maxRad = 600; // Radio máximo de los puntos
let nfAng = 0.01; // Factor de ruido angular
let nfTime = 0.005; // Factor de ruido temporal

function setup() {
  createCanvas(1000, 1000); // Crear lienzo de dibujo
  background(0); // Establecer color de fondo
  noFill(); // No rellenar la forma
  stroke(255, 15); // Establecer color de trazo

  // Agregar interactividad al cambiar los parámetros
  let minRadSlider = createSlider(0, 200, minRad); // Crear control deslizante para el radio mínimo
  minRadSlider.position(10, height + 10); // Posicionar el control deslizante en el lienzo

  let maxRadSlider = createSlider(200, 800, maxRad); // Crear control deslizante para el radio máximo
  maxRadSlider.position(10, height + 30); // Posicionar el control deslizante en el lienzo

  // Actualizar los valores de los parámetros al mover los controles deslizantes
  minRadSlider.input(() => {
    minRad = minRadSlider.value();
    redraw(); // Volver a dibujar la forma con los nuevos parámetros
  });

  maxRadSlider.input(() => {
    maxRad = maxRadSlider.value();
    redraw(); // Volver a dibujar la forma con los nuevos parámetros
  });
}

function draw() {
  translate(width / 2, height / 2); // Trasladar el origen al centro del lienzo
  background(0 , 0.1); // Limpiar el lienzo en cada cuadro
  beginShape(); // Iniciar la forma

  for (let i = 0; i < n; i++) {
    let ang = map(i, 0, n, 0, TWO_PI); // Mapear el índice a un ángulo entre 0 y 2PI
    let rad = map(noise(i * nfAng, frameCount * nfTime), 0, 1, minRad, maxRad); // Generar un valor de ruido y mapearlo al rango de los radios

    let x = rad * cos(ang); // Calcular la coordenada x del punto
    let y = rad * sin(ang); // Calcular la coordenada y del punto

    curveVertex(x, y); // Agregar el punto a la forma
  }

  endShape(CLOSE); // Finalizar la forma cerrada
}

