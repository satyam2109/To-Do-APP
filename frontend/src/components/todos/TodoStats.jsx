import React from "react";
import { CalendarDays, CheckCircle2, ClipboardList, Clock3 } from "lucide-react";

function TodoStats({ statistics }) {
  const { totalTodos, completedTodos, pendingTodos, todayTodos } = statistics;

  return (
    <section className="statistics-grid">
      <div className="stat-card">
        <div className="stat-icon total-icon">
          <ClipboardList size={27} />
        </div>
        <div className="stat-content">
          <span>Total Todos</span>
          <strong>{totalTodos}</strong>
          <small>All your tasks</small>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon completed-icon">
          <CheckCircle2 size={27} />
        </div>
        <div className="stat-content">
          <span>Completed</span>
          <strong>{completedTodos}</strong>
          <small>
            {totalTodos ? ((completedTodos / totalTodos) * 100).toFixed(1) : 0}% completed
          </small>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon pending-icon">
          <Clock3 size={27} />
        </div>
        <div className="stat-content">
          <span>Pending</span>
          <strong>{pendingTodos}</strong>
          <small>
            {totalTodos ? ((pendingTodos / totalTodos) * 100).toFixed(1) : 0}% pending
          </small>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon today-icon">
          <CalendarDays size={27} />
        </div>
        <div className="stat-content">
          <span>Due Today</span>
          <strong>{todayTodos}</strong>
          <small>Due today</small>
        </div>
      </div>
    </section>
  );
}

export default TodoStats;
