class Task {
  constructor({ id, title, description, priority, due_date, status, created_at, updated_at }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.due_date = due_date;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromDb(row) {
    return new Task({
      id: row.id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      due_date: row.due_date,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
  }
}

module.exports = Task;