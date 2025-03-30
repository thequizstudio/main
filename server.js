// Import necessary packages
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Create the Express app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files (your chat room)

// Event listener for new WebSocket connections (Socket.io)
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

// Set up the server to listen on the correct port (use Render's PORT environment variable)
const port = process.env.PORT || 10000; // Use environment variable on cloud platforms or fallback to 3000 locally
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
