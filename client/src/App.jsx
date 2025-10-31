import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightsPanel from './components/InsightsPanel';
import { taskService } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'due_date',
    sortOrder: 'asc'
  });

  useEffect(() => {
    fetchTasks();
    fetchInsights();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);
      queryParams.append('sortBy', filters.sortBy);
      queryParams.append('sortOrder', filters.sortOrder);

      const data = await taskService.getAllTasks(queryParams.toString());
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    try {
      const data = await taskService.getInsights();
      setInsights(data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      await fetchTasks();
      await fetchInsights();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await taskService.updateTask(taskId, updates);
      await fetchTasks();
      await fetchInsights();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Tracker</h1>
        <p>Stay organized with smart insights</p>
      </header>

      <div className="app-content">
        <div className="left-panel">
          <TaskForm onSubmit={handleCreateTask} />
          {insights && <InsightsPanel insights={insights} />}
        </div>

        <div className="right-panel">
          <TaskList
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;