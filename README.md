# 🌟 Smart Task Manager

A full-stack Smart Task Manager web application built with React, Node.js, Express, and MySQL, featuring user authentication, task management, due dates, completion tracking, and an AI-inspired task assistant.

This project was built to simulate a real-world product workflow: secure login, persistent storage, dynamic UI, and thoughtful UX.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- Password hashing with bcrypt
- JWT-based secure sessions

### 🗂️ Task Management
- Add, edit, delete tasks
- Mark tasks as complete / undo
- Due date support
- Persistent MySQL storage

### 🎨 User Experience
- Personalized greeting on each login
- Animated welcome screen
- Modern styled UI with gradients and cards
- Completed task scratch styling

### 🤖 AI Assistant (Rule-Based NLP)
- Automatically suggests task priority
- Displays helpful assistant messages
- Keyword-based task classification

---

## 🛠️ Tech Stack

Frontend:
- React
- Axios
- CSS3

Backend:
- Node.js
- Express.js
- JWT Authentication
- Bcrypt

Database:
- MySQL

---

## 📂 Project Structure

smart-task-manager
├── smart-task-manager-backend
│ ├── server.js
│ └── package.json
└── smart-task-manager-frontend
  ├── src
  └── package.json

---

## ⚙️ Setup Instructions

### 1 Clone the repository

git clone https://github.com/Eshwari-M/smart-task-manager.git  
cd smart-task-manager

### 2 Backend Setup

cd smart-task-manager-backend  
npm install  
node server.js

Backend runs on:  
http://localhost:5000

### 3 Frontend Setup

Open a new terminal:

cd smart-task-manager-frontend  
npm install  
npm start

Frontend runs on:  
http://localhost:3000

---

## 🗄️ Database Setup

Open MySQL and run:

CREATE DATABASE smart_task_manager;

USE smart_task_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  text VARCHAR(255),
  priority VARCHAR(20),
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

---

## 💡 Future Enhancements

- Real AI integration
- Inline task editing UI
- Task sorting by due date
- Overdue task highlighting
- Cloud deployment

---

## 👩‍💻 Author

Built by Savitha ✨

---

## 📜 License

Free to use for learning and portfolio purposes.
