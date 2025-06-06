# Real-Time Chat Application (Tik-Talk)

A full-stack real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.IO integration.
The app allows users to register, log in, and participate in private and group conversations in real time.

## 🔗 Live Demo

> https://tik-talk-idlt.onrender.com

## 🚀 Features

- 🧑 User Registration and Login
- 🔐 Authentication using JWT
- 👥 Real-time One-to-One and Group Messaging
- 🟢 Online/Offline User Status
- 🧵 Chat Threads with Timestamps
- 🔔 Live Typing Indicators
- ✅ Responsive UI built with React
- 📡 Socket.IO for bi-directional real-time communication

## 🛠️ Tech Stack

| Tech           | Usage                                  |
|----------------|----------------------------------------|
| **Frontend**   | React.js, Axios, Socket.IO Client      |
| **Backend**    | Node.js, Express.js, MongoDB, JWT      |
| **Database**   | MongoDB Atlas (Cloud-hosted NoSQL DB)  |
| **Real-time**  | Socket.IO                              |
| **Auth**       | JWT (JSON Web Token)                   |

## 📁 Project Structure

Chat-App/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
├── server/ # Express backend
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── .env
├── package.json
└── README.md

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/nikhil-dtech/Chat-App.git
cd Chat-App
```
 ### 2. Setup Backend
```bash
cd server
npm install
```
 ### 3. Create a .env file in /server
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
 ### 4. Run the backend
```bash
node server.js
```
 ### 5. Setup Frontend
```bash
cd ../client
npm install
npm start
```

Frontend will start on http://localhost:3000, Backend on http://localhost:5000.



