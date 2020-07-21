let sound,mic;
var amplitude;
var t;
// function preload(){
//   sound = loadSound('ambient.mp3');
// }
function setup() {
  var canvas = createCanvas(2000,1000);
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  mic.start();
  fft.setInput(mic);
  background(0);
  amplitude = new p5.Amplitude();
  angleMode(DEGREES);
}
function draw() {
  background(0,30);
  var level = amplitude.getLevel();
  var amp = map(level, 0, 1, 0, 100);
  //background(color,0,0);
  var spectrum = fft.analyze();
  var bass    = fft.getEnergy( "bass" );
  var treble  = fft.getEnergy( "treble" );
  var mid     = fft.getEnergy( "mid" );
  var waveform = fft.waveform();
  // var mapBass     = map( bass, 0, 255, -100, 100 );
  // var mapMid      = map( mid, 0, 255, -150, 150 );
  // var mapTreble   = map( treble, 0, 255, -200, 200 );
  var bassbg  = map(bass, 0, 255, 100, 255 );
  var midbg      = map(mid, 0, 255, 100, 255 );
  var trebg   = map(treble, 0, 255, 100, 255 );
  //background(bassbg,midbg,trebg);
  beginShape();
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+15);
  var b = 255 * noise(t+20);
  stroke(bassbg,midbg,trebg);
  //stroke(r,g,b);
  strokeWeight(3);
  for (var i = 0; i< spectrum.length; i++){
    // var x = map(i, 0, waveform.length, 0, width);
    // var y = map( waveform[i], -1, 1, 0, height);
    var amp = spectrum[i];
    //var r = map(i, 0,amp.length, 0, width);
    w = width/256;
    var y = map(amp, 0,255,height,0);
    line(i*w,height,i*w,y)
    //vertex(x,y);
    //t+=0.01;
  }
  translate(width/2,height/2);
  endShape();

}
// function togglePlay() {
//   if (sound.isPlaying()) {
//     sound.pause();
//   } else {
//     sound.loop();
//   }
// }
