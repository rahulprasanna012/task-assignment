import React from 'react';

const InsightsPanel = ({ insights }) => {
  if (!insights) return null;

  const { summary, priorityDistribution, statusDistribution, insightMessage } = insights;

  return (
    <div className="insights-panel">
      <h3>📊 Smart Insights</h3>
      
      <div className="insight-message">
        {insightMessage}
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{summary.totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{summary.completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{summary.pendingTasks}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{summary.tasksDueThisWeek}</span>
          <span className="stat-label">Due This Week</span>
        </div>
      </div>

      <div className="distribution">
        <h4>Priority Distribution</h4>
        {Object.entries(priorityDistribution).map(([priority, count]) => (
          <div key={priority} className="distribution-item">
            <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
            <span>{count} tasks</span>
          </div>
        ))}
      </div>

      <div className="distribution">
        <h4>Status Distribution</h4>
        {Object.entries(statusDistribution).map(([status, count]) => (
          <div key={status} className="distribution-item">
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            <span>{count} tasks</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;