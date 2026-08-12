import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Pencil,
  Trash2,
} from "lucide-react";

import { formatTodoDate, getTodoDateStatus } from "../../utils/dateUtils";

function TodoList({ todoState }) {
  const {
    loading,
    error,
    displayedTodos,
    handleEditTodo,
    handleDeleteTodo,
    toggleTodo,
  } = todoState;

  return (
    <div className="todo-list">
      {loading ? (
        <div className="empty-state">
          <ClipboardList size={45} />
          <h3>Loading Todos...</h3>
          <p>Fetching your todos from the server.</p>
        </div>
      ) : error ? (
        <div className="empty-state">
          <ClipboardList size={45} />
          <h3>Unable to Fetch Todos</h3>
          <p>{error}</p>
        </div>
      ) : displayedTodos.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={45} />
          <h3>No todos found</h3>
          <p>Try changing your filters or create a new todo.</p>
        </div>
      ) : (
        displayedTodos.map((todo) => {
          const dateStatus = getTodoDateStatus(todo);

          return (
            <div
              className={`todo-row ${todo.status ? "todo-completed" : ""}`}
              key={todo.todoId}
            >
              <button
                className={`todo-checkbox ${todo.status ? "checked" : ""}`}
                onClick={() => toggleTodo(todo)}
                type="button"
                aria-label={todo.status ? "Completed Todo" : "Mark Todo completed"}
              >
                {todo.status && <CheckCircle2 size={18} />}
              </button>

              <div className="todo-information">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>

              <div className="todo-date">
                <div className="date-main">
                  <CalendarDays size={17} />
                  <span>{formatTodoDate(todo.targetDate)}</span>
                </div>
                <small
                  className={
                    todo.status
                      ? "date-completed"
                      : dateStatus === "Today"
                        ? "date-today"
                        : ""
                  }
                >
                  {dateStatus}
                </small>
              </div>

              <div>
                <span
                  className={`status-badge ${
                    todo.status ? "status-completed" : "status-pending"
                  }`}
                >
                  {todo.status ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="todo-actions">
                <button
                  className="edit-button"
                  title="Edit Todo"
                  onClick={() => handleEditTodo(todo)}
                  type="button"
                >
                  <Pencil size={18} />
                </button>

                <button
                  className="delete-button"
                  title="Delete Todo"
                  onClick={() => handleDeleteTodo(todo)}
                  type="button"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TodoList;
