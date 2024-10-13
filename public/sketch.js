var socket;

function setup() {
	createCanvas(windowWidth, windowHeight);

	// Variables
	socket = io();

	background(0);
}

function mouseDragged() {
	stroke(255);
	line(mouseX, mouseY, pmouseX, pmouseY);
}