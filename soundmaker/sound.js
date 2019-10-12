let osc, fft;
let x = 1;

function setup() {
  createCanvas(500, 500);
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);
  fft = new p5.FFT();
}

function draw() {
  background(255);
  ellipse(255,255,255);
  while (mouseIsPressed) {
    ellipse(255,255,x);
    x+=1;
  }
}
