require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const connectDB = require('./config/db'); 
const { chats } = require('./data/data'); 
const colors = require('colors');
const userRouter = require('./routes/userRouter');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path') 


connectDB();  
const app = express();

app.use(express.json()); // to accept json data



app.use('/api/user', userRouter);
app.use('/api/chat',chatRoutes);
app.use('/api/message', messageRoutes);


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get(/^\/(?!api).*/, (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  ); 
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}  

//--------------------------deployment------------------------------


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(5000, console.log(`Server is running on port ${PORT}`.yellow.bold));

const io = require('socket.io')(server,{
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:5000", "http://localhost:5173"]
  }
})

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

});