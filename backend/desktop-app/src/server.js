const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectMongo = require("./config/mongo");
const getDb = require("./config/sqlite");

const participantRoutes = require("./routes/participantRoutes");
const chatRoutes = require("./routes/chatRoutes");
const remarkRoutes = require("./routes/remarkRoutes");
<<<<<<< HEAD

const socketHandler = require("./sockets/socketHandler");

=======
const authRoutes = require("./routes/authRoutes");
const sessionFeedbackRoutes = require("./routes/sessionFeedbackRoutes");
const { syncAuthData } = require("./services/syncService");

const socketHandler = require("./sockets/socketHandler");

/**
 * DESKTOP APP BACKEND SERVER
 * Port: 3001
 * 
 * This server handles real-time interview operations, local data 
 * synchronization with the main dashboard, and WebRTC signaling.
 */
>>>>>>> upstream/main
const app = express();
const PORT = 3001;

// Middlewares
app.use(express.json());
app.use(cors());
<<<<<<< HEAD
=======

// Global Request Logger: Tracks incoming desktop client requests.
>>>>>>> upstream/main
app.use((req, res, next) => {
    console.log(`[Desktop App Backend] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

<<<<<<< HEAD
// Database Init
connectMongo();
getDb(); // Initializes SQLite
=======
/**
 * DUAL-DATABASE ARCHITECTURE:
 * 1. MongoDB: Used to sync with the main dashboard (Users, Company data).
 * 2. SQLite: Used for persistent local storage of chats and interview history 
 *    even when offline or during the meeting session.
 */
connectMongo().then(() => {
    // Background Service: Synchronizes credentials from the Dashboard DB to this instance.
    syncAuthData();
});
getDb(); // SQLite Initialization

>>>>>>> upstream/main

// Routes
app.use("/api/participants", participantRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/remarks", remarkRoutes);
<<<<<<< HEAD

// Server & Socket.IO
=======
app.use("/api/auth", authRoutes);
app.use("/api/session-feedback", sessionFeedbackRoutes);


/**
 * REAL-TIME COMMUNICATION:
 * Orchestrates Socket.IO for signaling and live interactions (Chat, Whiteboard).
 */
>>>>>>> upstream/main
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
});

<<<<<<< HEAD
=======
// Attach the socket event handler logic
>>>>>>> upstream/main
socketHandler(io, getDb);

// Start
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Desktop App Backend running on http://0.0.0.0:${PORT}`);
});
