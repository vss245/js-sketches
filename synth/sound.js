let synth;
let mappingY;
let mappingX;
var notes = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0,5);
	var now = Tone.now();
	notes_c = ["C5", "C4", "C3", "C2"];
	notes_d = ["D5", "D4", "D3", "D2"];
	notes_e = ["E5", "E4", "E3", "E2"];
	notes_f = ["F5", "F4", "F3", "F2"];
	notes.push(notes_c,notes_d,notes_e,notes_f)
	synth = new Tone.Synth({
	"oscillator" : {
		"type" : "sine",
		"modulationFrequency" : 0.3
	},
	"envelope" : {
		"attack" : 0.02,
		"decay" : 1,
		"sustain" : 0.2,
		"release" : 0.9,
	}
}).toMaster();
	synth.connect(Tone.Master);
	Tone.Master.Volume = -30;
	//wf = Tone.waveform;
	//history.push(wf);
}

function mousePressed() {
	fill(mc1,mc2,mc3);
	//ellipse(mouseX,mouseY,30,30);
	//background(5)
	strokeWeight(10)
	if (mouseIsPressed) {
		synth.triggerAttackRelease(notes[mappingX][mappingY]);
		//waveform()
	} else {
		synth.triggerRelease();
	}
}

function mouseDragged() {
	line(pmouseX,pmouseY,mouseX,mouseY)
	stroke(mc1,mc2,mc3);
	synth.setNote(notes[mappingX][mappingY]);
}

function draw() {
	background(0,20);
	mc1 = round(map(mouseY,0,windowHeight,0,255))
	mc2 = round(map(mouseX,0,windowWidth,0,255))
	mc3 = round(map(mouseY,0,sqrt(windowWidth^2+windowHeight^2),0,255))
	mappingY = round(map(mouseY,0,windowHeight,0,3));
	mappingX = round(map(mouseX,0,windowHeight,0,3));
}
