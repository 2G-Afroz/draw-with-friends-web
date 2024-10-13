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

// Socket works
io.on("connection", (socket) => {
	console.log("Connected: ", socket.id);

	// Getting user data
	socket.on("mousePosition", (data) => {
		socket.broadcast.emit("mousePosition", data);
	})
})