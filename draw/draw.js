//particle system from https://www.openprocessing.org/sketch/526939
var t;
var size;
var mass = [];
var positionX = [];
var positionY = [];
var velocityX = [];
var velocityY = [];
function setup() {
    createCanvas(2000, 1000);
    background(0);
    t = 0;
}
function draw() {
  background(0,5)
  var x = width * noise(t);
  var y = height * noise(t+5);
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+15);
  var b = 255 * noise(t+20);
  noStroke();
  fill(r, g, b);
  size = random(20,100);
  ellipse(mouseX,mouseY,size,size)
  t += 0.01;
  fill(r,g,b);
  addNewParticle();
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

  velocityX[particleA] = velocityX[particleA] * 0.9 + accelerationX * mass[particleA] * 256;
  velocityY[particleA] = velocityY[particleA] * 0.9 + accelerationY * mass[particleA] * 256;
}

for (var particle = 0; particle < mass.length; particle++) {
  positionX[particle] += velocityX[particle];
  positionY[particle] += velocityY[particle];

  positionX[particle] = constrain(positionX[particle], 0, width);
  positionY[particle] = constrain(positionY[particle], 0, height);

  ellipse(positionX[particle], positionY[particle], mass[particle] * 1000, mass[particle] * 1000);
}
}
function keyPressed() {
    background(0);
}
function addNewParticle() {
	mass.push(random(0.003, 0.03));
	positionX.push(mouseX);
	positionY.push(mouseY);
	velocityX.push(randomGaussian());
	velocityY.push(randomGaussian());
}
