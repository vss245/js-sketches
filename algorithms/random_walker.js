function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	x = windowWidth/2; //start from center
	y = windowHeight/2;
}

function draw() {
	walk()
}


function walk() {
	// 4 directions: left, right, up, down
	rvar = floor(random(4))
	strokeWeight(7)
	point(x,y)
	step_size = 20;
	switch (rvar){
		case 0:
			x = x+step_size*random(0,1);
			break
		case 1:
			x = x-step_size*random(0,1);
			break
		case 2:
			y = y+step_size*random(0,1);
			break
		case 3:
			y = y-step_size*random(0,1);
			break
	}
	color1 = color(random(0,255),137,237,random(0,100))
	stroke(color1)
}
