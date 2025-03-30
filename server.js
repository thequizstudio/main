const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files (our chat room)

// Event listener for new connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for messages from clients
    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        // Emit the message to all connected clients
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
