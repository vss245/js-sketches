//particle system from https://www.openprocessing.org/sketch/526939
var t = 0.01;
var slider;
var size;
var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];
var r;
var g;
var b;
var npart;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    t = 0;
    // colslider = createSlider(0, 0.1, 0.01, 0.001);
    // colslider.position(20, 30);
    // colslider.style('width', '80px');
    // vslider = createSlider(0.003, 0.05, 0.02, 0.001);
    // vslider.position(20, 50);
    // vslider.style('width', '80px');
    // accslider = createSlider(0, 500, 250, 1);
    // accslider.position(20, 70);
    // accslider.style('width', '80px');

}
function draw() {
  fill(255)
  noStroke();
  text('press 1, 2 or 3, click and drag', 20,25);
  // text('speed of color change', colslider.x * 2 + colslider.width,45);
  // text('range of particle mass', vslider.x * 2 + vslider.width,65);
  // //text('acceleration scaling', vslider.x * 2 + vslider.width,85);
  text('press SPACE to clear', 20,45);
  r = 255 * noise(t+10);
  g = 255 * noise(t+15);
  b = 255 * noise(t+20);
  var x = width * noise(t);
  var y = height * noise(t+5);
  if (mouseIsPressed) {
    addNewParticle();
  }
  keyPressed();
}
function setupParticle() {
  for (var particleA = 0; particleA < mass.length; particleA++) {
    var accelerationX = 0, accelerationY = 0;
    for (var particleB = 0; particleB < mass.length; particleB++) {
      if (particleA != particleB) {
        var distanceX = positionX[particleB] - positionX[particleA];
        var distanceY = positionY[particleB] - positionY[particleA];
        var distance = sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < 1) distance = 1;
        var relativeVelocityX = velocityX[particleB] - velocityX[particleA];
        var relativeVelocityY = velocityY[particleB] - velocityY[particleA];
        var relativeVelocity = sqrt(relativeVelocityX * relativeVelocityX + relativeVelocityY * relativeVelocityY);
      if (relativeVelocity < 1) relativeVelocity = 1;
      var force = cos(distance * 0.01) * mass[particleB] / relativeVelocity;
      accelerationX += force * relativeVelocityX;
      accelerationY += force * relativeVelocityY;
  }
}
  velocityX[particleA] = velocityX[particleA] * 0.9 + accelerationX * mass[particleA]*256;
  velocityY[particleA] = velocityY[particleA] * 0.9 + accelerationY * mass[particleA]*256;
}
}
function mode_one() {
  background(0,5)
  fill(r,g,b);
  size = random(20,100);
  ellipse(mouseX,mouseY,size,size)
  t += 0.01;
  noStroke();
  for (var particle = 0; particle < mass.length; particle++) {
    positionX[particle] += velocityX[particle]*0.1;
    positionY[particle] += velocityY[particle]*0.1;
    ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
  }
  if (mouseIsPressed) {
  setupParticle();
  }
}
function mode_two() {
  background(0,10)
  noFill();
  stroke(r,g,b,70);
  size = random(30,40);
  rect(mouseX,mouseY,size,size)
  t += 0.01;
  for (var particle = 0; particle < mass.length; particle++) {
    positionX[particle] += velocityX[particle];
    positionY[particle] += velocityY[particle];
    rect(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
  }
  if (mouseIsPressed) {
  setupParticle();
  }
}

function mode_three() {
  background(0,10)
  size = random(1,10);
  noStroke();
  fill(0);
  ellipse(mouseX, mouseY, size,size);
  t += 0.01;
  for (var particle = 0; particle < mass.length; particle++) {
    positionX[particle] += velocityX[particle]*noise(t);
    positionY[particle] += velocityY[particle]*noise(t);
    stroke(255);
    strokeWeight(1);
    ellipse(positionX[particle]+noise(t)*100, positionY[particle]+noise(t)*100, mass[particle]*10000*noise(t), mass[particle]*10000*noise(t));
  }
}

function keyPressed() {
  if (keyCode === 49) {
    mode_one();
  } else if (keyCode === 50) {
    mode_two();
  } else if (keyCode === 51) {
    mode_three();
  } else if (keyCode === 32) {
    reset();
  }
}

function reset() {
  if (mouseX > pmouseX || pmouseX > mouseX) {
    addNewParticle();
  }
  keyPressed();
}

function addNewParticle() {
	mass.push(random(0.003,0.03));
	positionX.push(mouseX);
	positionY.push(mouseY);
	velocityX.push(randomGaussian());
	velocityY.push(randomGaussian());
}
