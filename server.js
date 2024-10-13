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
const defaultRoom = "hKakd894@siu#@(*dsf";

// Socket works
io.on("connection", (socket) => {
	console.log("Connected: ", socket.id);
	socket.join(defaultRoom);

	// Setting and sending random color to the user.
	const userColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	users[socket.id] = userColor;
	socket.emit("userColor", users[socket.id]);

	// Join to room
	socket.on("joinRoom", (room) => {
		// leave all previous rooms
		socket.rooms.forEach((r) => {
			if(r !== socket.id) {
				socket.leave(r);
			}
		});

		socket.join(room);
		console.log(`${socket.id} joined the room: ${room}`);
	})

	// Getting user data and sending
	socket.on("mousePosition", (data) => {
		console.log(socket.rooms);
		if(data.room) {
			socket.to(data.room).emit("mousePosition", {
				pos: data.pos,
				color: userColor
			})
		}
		else {
			socket.to(defaultRoom).emit("mousePosition", {
				pos: data.pos,
				color: userColor
			});
		}
	});

	// on user disconnect
	socket.on("disconnect", () => {
		console.log("Disconnected: ", socket.id);
		delete users[socket.id];
	});
});