require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const connectDB = require('./config/db'); 
const { chats } = require('./data/data'); 
const colors = require('colors');
const userRouter = require('./routes/userRouter');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path'); 

const cors = require('cors');

// Connect to the database
connectDB();  

const app = express();

// Middleware to parse JSON
app.use(express.json()); 

// Use routes for different API endpoints
app.use('/api/user', userRouter);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

// Enable CORS for the frontend (running on port 3000)
app.use(cors({
  origin: "http://localhost:3000",  // Adjust this if your frontend is running on a different port
  methods: ["GET", "POST"],
  credentials: true,
}));

// -------------------------- Deployment Logic ------------------------------

// Resolve directory path for static files
const __dirname1 = path.resolve();

// Production environment logic
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend's dist folder
  app.use(express.static(path.join(__dirname1, "frontend", "dist")));

  // Catch-all route to serve the React index.html file for non-API requests
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  // If not in production, just show a message
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// -------------------------- Error Handlers ------------------------------
app.use(notFound);
app.use(errorHandler);

// Define the port for the server
const PORT = process.env.PORT || 5000;

// Start the backend server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});

// -------------------------- Socket.IO Setup ------------------------------
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000"  // Ensure this matches your frontend URL
  }
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // Setup the user when they connect
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // When a user joins a chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // Emit typing event to the room
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handle new messages
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  // Handle user disconnection
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
