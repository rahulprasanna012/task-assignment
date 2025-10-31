const { getDb } = require('../config/database');
const Task = require('../models/Task');
const { calculateInsights } = require('../insights/insightCalculator');

const taskController = {
  // Get all tasks with filtering and sorting
  getAllTasks: (req, res) => {
    const db = getDb();
    const { status, priority, sortBy = 'due_date', sortOrder = 'asc' } = req.query;
    
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    if (priority) {
      query += ' AND priority = ?';
      params.push(priority);
    }
    
    // Add sorting
    const validSortColumns = ['due_date', 'priority', 'created_at', 'title'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'due_date';
    const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortColumn} ${order}`;
    
    db.all(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      
      const tasks = rows.map(row => Task.fromDb(row));
      res.json(tasks);
    });
  },

  // Create a new task
  createTask: (req, res) => {
    const { title, description, priority, due_date, status } = req.body;
    
    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const validPriorities = ['low', 'medium', 'high'];
    const validStatuses = ['pending', 'in-progress', 'completed'];
    
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const db = getDb();
    const query = `
      INSERT INTO tasks (title, description, priority, due_date, status) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const params = [
      title.trim(),
      description?.trim() || '',
      priority || 'medium',
      due_date || null,
      status || 'pending'
    ];
    
    db.run(query, params, function(err) {
      if (err) {
        console.error('Error creating task:', err);
        return res.status(500).json({ error: 'Failed to create task' });
      }
      
      // Return the created task
      db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          console.error('Error fetching created task:', err);
          return res.status(500).json({ error: 'Failed to fetch created task' });
        }
        
        res.status(201).json(Task.fromDb(row));
      });
    });
  },

  // Update a task
  updateTask: (req, res) => {
    const { id } = req.params;
    const { title, description, priority, due_date, status } = req.body;
    
    const validPriorities = ['low', 'medium', 'high'];
    const validStatuses = ['pending', 'in-progress', 'completed'];
    
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const db = getDb();
    
    // Build dynamic update query
    const updates = [];
    const params = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      params.push(title.trim());
    }
    
    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description?.trim() || '');
    }
    
    if (priority !== undefined) {
      updates.push('priority = ?');
      params.push(priority);
    }
    
    if (due_date !== undefined) {
      updates.push('due_date = ?');
      params.push(due_date);
    }
    
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    params.push(id);
    
    const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    
    db.run(query, params, function(err) {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ error: 'Failed to update task' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      // Return the updated task
      db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
          console.error('Error fetching updated task:', err);
          return res.status(500).json({ error: 'Failed to fetch updated task' });
        }
        
        res.json(Task.fromDb(row));
      });
    });
  },

  // Get insights
  getInsights: (req, res) => {
    const db = getDb();
    
    db.all('SELECT * FROM tasks', [], (err, rows) => {
      if (err) {
        console.error('Error fetching tasks for insights:', err);
        return res.status(500).json({ error: 'Failed to generate insights' });
      }
      
      const tasks = rows.map(row => Task.fromDb(row));
      const insights = calculateInsights(tasks);
      res.json(insights);
    });
  }
};

module.exports = taskController;