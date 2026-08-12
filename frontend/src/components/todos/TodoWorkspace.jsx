import React from "react";
import { Bell, Moon, Search, Sun } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";
import { useTodos } from "../../hooks/useTodos";
import ApiDialog from "../common/ApiDialog";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";
import TodoPagination from "./TodoPagination";
import TodoStats from "./TodoStats";
import AddTodoModal from "./AddTodoModal";
import EditTodoModal from "./EditTodoModal";

function TodoWorkspace({
  title,
  description,
  showStats = false,
  refreshKey,
}) {
  const { darkMode, toggleTheme } = useTheme();
  const todoState = useTodos({ refreshKey });

  return (
    <>
      <ApiDialog
        isOpen={todoState.apiDialog.isOpen}
        type={todoState.apiDialog.type}
        title={todoState.apiDialog.title}
        message={todoState.apiDialog.message}
        onClose={todoState.closeApiDialog}
      />

      <ApiDialog
        isOpen={todoState.deleteDialog.isOpen}
        type="confirm"
        title="Delete Todo?"
        message={`Are you sure you want to delete "${todoState.deleteDialog.todo?.title}"?`}
        onClose={() => todoState.setDeleteDialog({ isOpen: false, todo: null })}
        onConfirm={todoState.confirmDeleteTodo}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <header className="home-header">
        <div className="page-heading">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className="header-actions">
          <div className="header-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search todos..."
              value={todoState.searchQuery}
              onChange={(event) => todoState.setSearchQuery(event.target.value)}
            />
          </div>

          <button className="header-icon-button" type="button" aria-label="Notifications">
            <Bell size={21} />
          </button>

          <button
            className="theme-button"
            type="button"
            onClick={toggleTheme}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {showStats && <TodoStats statistics={todoState.statistics} />}

      <TodoFilters todoState={todoState} />

      <section className="todo-panel">
        <div className="todo-panel-header">
          <h2>Your Todos</h2>

          <div className="sort-section">
            <span>Sort by:</span>
            <select
              value={todoState.sortOrder}
              onChange={(event) => todoState.setSortOrder(event.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <TodoList todoState={todoState} />
        <TodoPagination todoState={todoState} />
      </section>

      <AddTodoModal todoState={todoState} />
      <EditTodoModal todoState={todoState} />
    </>
  );
}

export default TodoWorkspace;
