function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
}

function mouseDragged() {
	stroke(255);
	line(mouseX, mouseY, pmouseX, pmouseY);
}