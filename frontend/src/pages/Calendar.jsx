import React, { useMemo, useState } from "react";

import { useCalendarTodos } from "../hooks/useCalenderTodos";
import TodoDetailsDialog from "../components/todos/TodoDetailsDialog";
import {
  formatCalendarMonth,
  getCalendarDateKey,
  getCalendarMonthDays,
} from "../utils/dateUtils";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "../contexts/ThemeContext";

import "../styles/calender.css";
function Calendar() {
  const { darkMode, toggleTheme } = useTheme();
  const { todosByDate, loading, error, refreshCalendar } = useCalendarTodos();
  const today = new Date().toISOString().split("T")[0];
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = useMemo(() => getCalendarMonthDays(year, month), [year, month]);
  const monthLabel = formatCalendarMonth(year, month);
  const selectedTodos = todosByDate[selectedDate] || [];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const todayDate = new Date();

    setCurrentDate(todayDate);
    setSelectedDate(today);
  };

  if (loading) {
    return (
      <div className="calendar-page">
        <div className="calendar-loading">Loading Calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="calendar-page">
        <div className="calendar-error">
          <h2>Unable to Load Calendar</h2>

          <p>{error}</p>

          <button type="button" onClick={refreshCalendar}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`calendar-page ${darkMode ? "dark-mode" : ""}`}>
      {/* HEADER */}
      <TodoDetailsDialog
        todo={selectedTodo}
        onClose={() => setSelectedTodo(null)}
      />

      <div className="calendar-header">
        <div className="calendar-heading">
          <h1>Calendar</h1>

          <p>View your Todos by their target date.</p>
        </div>

        <div className="calendar-header-actions">
          <div className="calendar-actions">
            <button type="button" onClick={goToPreviousMonth}>
              Previous
            </button>

            <button type="button" onClick={goToToday}>
              Today
            </button>

            <button type="button" onClick={goToNextMonth}>
              Next
            </button>
          </div>

          <button
            type="button"
            className="calendar-theme-button"
            onClick={toggleTheme}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* CALENDAR */}

      <section className="calendar-card">
        <div className="calendar-month-header">
          <h2>{monthLabel}</h2>
        </div>

        {/* WEEK DAYS */}

        <div className="calendar-weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* DAYS */}

        <div className="calendar-grid">
          {days.map((day, index) => {
            /*
             * Empty cells before the first
             * day of the month.
             */
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="calendar-day calendar-day-empty"
                />
              );
            }

            const dateKey = getCalendarDateKey(year, month, day);

            const dayTodos = todosByDate[dateKey] || [];

            const isToday = dateKey === today;

            const isSelected = dateKey === selectedDate;

            return (
              <button
                key={dateKey}
                type="button"
                className={[
                  "calendar-day",
                  isToday ? "calendar-day-today" : "",
                  isSelected ? "calendar-day-selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelectedDate(dateKey)}
              >
                <span className="calendar-day-number">{day}</span>

                {dayTodos.slice(0, 3).map((todo) => (
                  <button
                    key={todo.todoId}
                    type="button"
                    className={`calendar-day-todo ${
                      todo.status ? "calendar-day-todo-completed" : ""
                    }`}
                    title={`View "${todo.title}"`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedTodo(todo);
                    }}
                  >
                    {todo.title}
                  </button>
                ))}
              </button>
            );
          })}
        </div>
      </section>

      {/* SELECTED DATE TODOS */}

      <section className="calendar-selected-todos">
        <div className="calendar-selected-header">
          <h2>
            Todos for{" "}
            {new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </h2>

          <span>
            {selectedTodos.length}{" "}
            {selectedTodos.length === 1 ? "Todo" : "Todos"}
          </span>
        </div>

        {selectedTodos.length === 0 ? (
          <div className="calendar-empty-state">
            <h3>No Todos for this date</h3>

            <p>There are no Todos scheduled for this date.</p>
          </div>
        ) : (
          <div className="calendar-todo-list">
            {selectedTodos.map((todo) => (
              <button
                key={todo.todoId}
                type="button"
                className={[
                  "calendar-todo-item",
                  todo.status ? "calendar-todo-completed" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelectedTodo(todo)}
              >
                <div className="calendar-todo-details">
                  <h3>{todo.title}</h3>

                  {todo.description && <p>{todo.description}</p>}
                </div>

                <span className="calendar-todo-status">
                  {todo.status ? "Completed" : "Pending"}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Calendar;
