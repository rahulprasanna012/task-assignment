
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFilterChange({ priority: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  const handleSortOrderChange = (e) => {
    onFilterChange({ sortOrder: e.target.value });
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h3>My Tasks ({tasks.length})</h3>
        
        <div className="filters">
          <select value={filters.status} onChange={handleStatusChange}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select value={filters.priority} onChange={handlePriorityChange}>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select value={filters.sortBy} onChange={handleSortChange}>
            <option value="due_date">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="created_at">Sort by Created</option>
            <option value="title">Sort by Title</option>
          </select>

          <select value={filters.sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="task-list-content">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <h4>No tasks found</h4>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;