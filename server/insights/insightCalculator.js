function calculateInsights(tasks) {
  const now = new Date();
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  // Basic counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status !== 'completed').length;
  
  // Priority distribution
  const priorityCounts = { high: 0, medium: 0, low: 0 };
  tasks.forEach(task => {
    if (priorityCounts.hasOwnProperty(task.priority)) {
      priorityCounts[task.priority]++;
    }
  });
  
  // Due date analysis
  const tasksDueThisWeek = tasks.filter(task => {
    if (!task.due_date) return false;
    const dueDate = new Date(task.due_date);
    return dueDate <= oneWeekFromNow && dueDate >= now && task.status !== 'completed';
  }).length;
  
  const overdueTasks = tasks.filter(task => {
    if (!task.due_date || task.status === 'completed') return false;
    const dueDate = new Date(task.due_date);
    return dueDate < now;
  }).length;
  
  // Find dominant priority
  const dominantPriority = Object.entries(priorityCounts)
    .reduce((max, [priority, count]) => count > max.count ? { priority, count } : max, { priority: 'none', count: 0 });
  
  // Status distribution
  const statusCounts = { pending: 0, 'in-progress': 0, completed: 0 };
  tasks.forEach(task => {
    if (statusCounts.hasOwnProperty(task.status)) {
      statusCounts[task.status]++;
    }
  });
  
  // Generate insight message
  let insightMessage = '';
  
  if (totalTasks === 0) {
    insightMessage = "You're all caught up! No tasks to track.";
  } else {
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    if (overdueTasks > 0) {
      insightMessage = `⚠️ You have ${overdueTasks} overdue task${overdueTasks > 1 ? 's' : ''}. `;
    }
    
    if (pendingTasks > 0) {
      insightMessage += `You have ${pendingTasks} open task${pendingTasks > 1 ? 's' : ''} `;
      
      if (dominantPriority.count > 0 && dominantPriority.priority !== 'none') {
        insightMessage += `— most are ${dominantPriority.priority} priority `;
      }
      
      if (tasksDueThisWeek > 0) {
        insightMessage += `with ${tasksDueThisWeek} due this week.`;
      } else {
        insightMessage += `with no urgent deadlines.`;
      }
      
      if (completionRate > 0) {
        insightMessage += ` You've completed ${completionRate}% of your tasks.`;
      }
    } else {
      insightMessage = `🎉 All tasks completed! Great job!`;
    }
  }
  
  return {
    summary: {
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      tasksDueThisWeek,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    },
    priorityDistribution: priorityCounts,
    statusDistribution: statusCounts,
    insightMessage,
    dominantPriority: dominantPriority.priority !== 'none' ? dominantPriority.priority : null
  };
}

module.exports = { calculateInsights };