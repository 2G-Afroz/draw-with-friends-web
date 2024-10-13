var socket;
var userColor;
var room = null;

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
		pos: {
			x: mouseX,
			y: mouseY,
			pX: pmouseX,
			pY: pmouseY
		},
		room
	}
	line(data.pos.x, data.pos.y, data.pos.pX, data.pos.pY);
	socket.emit("mousePosition", data);
}

function joinRoom() {
	let roomName = document.getElementById("room-name").value;
	if(roomName.trim() !== "") {
		room = roomName.trim();
		socket.emit("joinRoom", room);
	}
}