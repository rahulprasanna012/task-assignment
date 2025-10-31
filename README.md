README.md
markdown
# Task Tracker with Smart Insights

A full-stack web application for tracking tasks with AI-style insights about your workload.

## Features

- ✅ Create, update, and manage tasks
- 📊 Filter and sort tasks by status, priority, and due date
- 🧠 Smart insights with workload analysis
- 📱 Responsive design
- 💾 SQLite database for data persistence

## Tech Stack

### Backend
- Node.js with Express
- SQLite database
- RESTful API design

### Frontend
- React 18
- Modern CSS with Grid and Flexbox
- Responsive design

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-tracker
Setup Backend

bash
cd backend
npm install
npm start
Backend will run on http://localhost:5000

Setup Frontend (in a new terminal)

bash
cd frontend
npm install
npm start
Frontend will run on http://localhost:3000

API Endpoints
GET /api/tasks - Get all tasks (with optional filtering)

POST /api/tasks - Create a new task

PATCH /api/tasks/:id - Update a task

GET /api/tasks/insights/summary - Get smart insights

Database Schema
The application uses SQLite with the following schema:

sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  due_date TEXT,
  status TEXT CHECK(status IN ('pending', 'in-progress', 'completed')) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
Project Structure
text
task-tracker/
├── backend/          # Node.js API server
├── frontend/         # React application
├── README.md         # This file
├── DECLARATION.md    # No-AI declaration
└── notes.md          # Design decisions
Development
Backend runs on port 5000

Frontend runs on port 3000

CORS is enabled for development

Database file is created automatically at backend/tasks.db

