let fft
let waveform
let osc
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	osc = new p5.Oscillator('sine');
	delay = new p5.Delay();
	fill(255)
	rect(10,700,windowWidth,1)
	rect(20,0,1,windowHeight)
	delay.process(osc, 0.12, 0.7, 2300);
	addBeat();
	fft = new p5.FFT();
}

function draw() {
	background(0);
	freq = map(mouseX, 0, windowWidth, 250, 1000);
	amp = constrain(map(mouseY, windowHeight, 0, 0, 1), 0, 1);
	osc.freq(freq,0.1);
	osc.amp(amp,0.1);
	fill(255)
	text('freq: ' + freq, 40, 40);
  text('amp: ' + amp, 40, 60);
	waveform = fft.waveform();
	drawWaveform();
}

function drawWaveform() {
	stroke(mouseX, mouseY, 177,200);
  strokeWeight(1);
	noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, -height / 2, height / 2);
    vertex(x, y + height / 2);
  }
  endShape();
}


function addBeat() {
	n1 = new p5.Oscillator('white');
	n1.amp(0);
	n1.freq(60);
	lfo = new p5.Oscillator('square');
	lfo.disconnect();
	lfo.freq(5);
	lfo.amp(0.5);
	lfo.start();
	n1.start();
	n1.amp(lfo.scale(-1, 1, 1, -1));
}

function mousePressed() {
	osc.start()
}

function mouseReleased() {
  osc.stop();
}
