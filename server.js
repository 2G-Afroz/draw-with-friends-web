import express from "express"
import { createServer } from "http";
import { Server } from "socket.io"

const app = express();
const server = createServer(app);
const io = new Server(server, {});

app.use(express.static('public'));

server.listen(3000, () => {
	console.log("Conected to server: 3000");
});

const users = {};

// Socket works
io.on("connection", (socket) => {
	console.log("Connected: ", socket.id);

	// Setting and sending random color to the user.
	const userColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	users[socket.id] = userColor;
	socket.emit("userColor", users[socket.id]);

	// Getting user data
	socket.on("mousePosition", (pos) => {
		socket.broadcast.emit("mousePosition", {
			pos,
			color: userColor
		});
	})
})