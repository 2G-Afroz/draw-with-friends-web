var socket;

function setup() {
	createCanvas(windowWidth, windowHeight);

	// Variables
	socket = io();

	// Listening for data from server
	socket.on("mousePosition", drawData);
	background(0);
}

function drawData(data) {
	stroke(255);
	line(data.x, data.y, data.pX, data.pY);
}

function mouseDragged() {
	stroke(255);
	let data = {
		x: mouseX,
		y: mouseY,
		pX: pmouseX,
		pY: pmouseY
	}
	line(data.x, data.y, data.pX, data.pY);
	socket.emit("mousePosition", data);
}