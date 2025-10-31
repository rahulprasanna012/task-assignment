const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /api/tasks - Get all tasks with optional filtering and sorting
router.get('/', taskController.getAllTasks);

// POST /api/tasks - Create a new task
router.post('/', taskController.createTask);

// PATCH /api/tasks/:id - Update a task
router.patch('/:id', taskController.updateTask);

// GET /api/tasks/insights - Get insights
router.get('/insights/summary', taskController.getInsights);

module.exports = router;