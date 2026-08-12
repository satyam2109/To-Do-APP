import React from "react";
import { X } from "lucide-react";

function TodoDetailsDialog({ todo, onClose }) {
  if (!todo) {
    return null;
  }

  const formattedDate = todo.targetDate
    ? new Date(`${todo.targetDate}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      )
    : "No target date";

  return (
    <div
      className="todo-details-overlay"
      onClick={onClose}
    >
      <div
        className="todo-details-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="todo-details-header">
          <h2>Todo Details</h2>

          <button
            type="button"
            className="todo-details-close"
            onClick={onClose}
            aria-label="Close Todo details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="todo-details-content">
          <div className="todo-details-field">
            <span>Title</span>
            <strong>{todo.title}</strong>
          </div>

          <div className="todo-details-field">
            <span>Description</span>

            <p>
              {todo.description?.trim()
                ? todo.description
                : "No description provided."}
            </p>
          </div>

          <div className="todo-details-row">
            <div className="todo-details-field">
              <span>Target Date</span>
              <strong>{formattedDate}</strong>
            </div>

            <div className="todo-details-field">
              <span>Status</span>

              <span
                className={`todo-details-status ${
                  todo.status
                    ? "todo-details-status-completed"
                    : "todo-details-status-pending"
                }`}
              >
                {todo.status ? "Completed" : "Pending"}
              </span>
            </div>
          </div>

          <div className="todo-details-field">
            <span>Todo ID</span>
            <strong>{todo.todoId}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailsDialog;