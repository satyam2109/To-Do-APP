import React from "react";
import { Filter, Plus, RotateCcw, Search } from "lucide-react";

function TodoFilters({ todoState }) {
  const {
    search,
    status,
    startDate,
    endDate,
    setSearch,
    setStatus,
    setStartDate,
    setEndDate,
    applyFilters,
    resetFilters,
    setShowAddTodo,
  } = todoState;

  return (
    <section className="filter-panel">
      <div className="filter-field search-field">
        <label>Search by title...</label>
        <div className="filter-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="filter-field">
        <label>Status</label>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-field">
        <label>Start Date</label>
        <div className="date-input-wrapper">
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
      </div>

      <div className="filter-field">
        <label>End Date</label>
        <div className="date-input-wrapper">
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
      </div>

      <button className="filter-button" onClick={applyFilters}>
        <Filter size={18} />
        Filter
      </button>

      <button className="reset-button" onClick={resetFilters}>
        <RotateCcw size={17} />
        Reset
      </button>

      <button className="add-todo-button" onClick={() => setShowAddTodo(true)}>
        <Plus size={20} />
        Add Todo
      </button>
    </section>
  );
}

export default TodoFilters;
