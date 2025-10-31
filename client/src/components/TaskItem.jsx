import React from 'react';

const TaskItem = ({ task, onUpdateTask }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  const handleStatusUpdate = (newStatus) => {
    onUpdateTask(task.id, { status: newStatus });
  };

  const isOverdue = () => {
    if (!task.due_date || task.status === 'completed') return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <div className="task-item">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-actions">
          {task.status !== 'completed' && (
            <button
              className="btn-sm btn-success"
              onClick={() => handleStatusUpdate('completed')}
            >
              Complete
            </button>
          )}
          {task.status === 'pending' && (
            <button
              className="btn-sm btn-warning"
              onClick={() => handleStatusUpdate('in-progress')}
            >
              Start
            </button>
          )}
          {task.status === 'in-progress' && (
            <button
              className="btn-sm btn-secondary"
              onClick={() => handleStatusUpdate('pending')}
            >
              Pause
            </button>
          )}
        </div>
      </div>

      <div className="task-meta">
        <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className={`status-badge ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <span className="task-due-date" style={{ 
          color: isOverdue() ? '#dc2626' : '#666',
          fontWeight: isOverdue() ? 'bold' : 'normal'
        }}>
          {isOverdue() ? '⚠️ ' : ''}{formatDate(task.due_date)}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
    </div>
  );
};

export default TaskItem;