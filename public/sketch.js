var socket;
var userColor;

function setup() {
	createCanvas(windowWidth, windowHeight);

	// Variables
	socket = io();

	// Listening for data from server
	socket.on("mousePosition", drawData);
	socket.on("userColor", (color) => {
		userColor = color;
	})
	background(0);
}

function drawData(data) {
	stroke(data.color);
	line(data.pos.x, data.pos.y, data.pos.pX, data.pos.pY);
}

function mouseDragged() {
	stroke(userColor);
	let data = {
		x: mouseX,
		y: mouseY,
		pX: pmouseX,
		pY: pmouseY
	}
	line(data.x, data.y, data.pX, data.pY);
	socket.emit("mousePosition", data);
}