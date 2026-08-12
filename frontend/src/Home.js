import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Plus,
  CalendarDays,
  CheckCircle2,
  BarChart3,
  Settings,
  Search,
  Bell,
  Moon,
  Filter,
  RotateCcw,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  Sun,
} from "lucide-react";

import "./Home.css";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodoOne,
} from "./services/APICalls";
import ApiDialog from "./components/ApiDialog";

function Home() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    targetDate: "",
  });
  const [creatingTodo, setCreatingTodo] = useState(false);
  const [apiDialog, setApiDialog] = useState({
    isOpen: false,
    type: "error",
    title: "",
    message: "",
  });
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [editingTodo, setEditingTodo] = useState({
    todoId: null,
    description: "",
    targetDate: "",
    status: false,
  });
  const [updatingTodo, setUpdatingTodo] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    todoId: null,
  });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("todo-theme") === "dark";
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.status === true).length;
  const pendingTodos = totalTodos - completedTodos;
  const today = new Date().toISOString().split("T")[0];
  const todayTodos = todos.filter((todo) => todo.targetDate === today).length;

  const searchedTodos = todos.filter((todo) =>
    todo.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const sortedTodos = [...searchedTodos].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === "newest") {
      return dateB - dateA;
    }

    return dateA - dateB;
  });
  const totalPages = Math.max(1, Math.ceil(sortedTodos.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTodos = sortedTodos.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const fetchData = async (filters = {}) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchTodos(filters);
      console.log("Fetched todos:", data, data.status);
      setTodos(data.To_Do || []);
    } catch (error) {
      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Unable to Fetch Todos",
        message:
          error.response?.data?.message ||
          "Something went wrong while fetching your Todos.",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filters = {};

    if (search.trim() !== "") {
      filters.title = search.trim();
    }

    if (status !== "all") {
      filters.status = status === "completed";
    }

    if (startDate) {
      filters.startDate = startDate;
    }

    if (endDate) {
      filters.endDate = endDate;
    }

    console.log("Applying filters:", filters);

    setCurrentPage(1);
    fetchData(filters);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);

    fetchData();
  };

  const handleBrandClick = async () => {
    // Already on Dashboard

    try {
      await fetchData();
    } finally {
      setLoading(false);
    }

    // Coming from another screen
    navigate("/home");
  };

  const handleCreateTodo = async (event) => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      return;
    }

    try {
      setCreatingTodo(true);
      setError("");
      let Data = await createTodo({
        title: newTodo.title.trim(),
        description: newTodo.description.trim(),
        targetDate: newTodo.targetDate,
      });

      setNewTodo({
        title: "",
        description: "",
        targetDate: "",
      });

      setShowAddTodo(false);
      await fetchData();
      setApiDialog({
        isOpen: true,
        type: "success",
        title: "Todo Created",
        message: `${Data.message} with To Do ID: ${Data.Response_To_Do.todoId}.`,
      });
    } catch (error) {
      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Unable to Create Todo",
        message:
          error.response?.data?.message ||
          "Something went wrong while creating the Todo.",
      });
    } finally {
      setCreatingTodo(false);
    }
  };

  const handleEditTodo = (todo) => {
    if (todo.status === true) {
      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Todo Cannot Be Modified",
        message: "Completed Tasks cannot be modified.",
      });

      return;
    }

    setEditingTodo({
      todoId: todo.todoId,
      description: todo.description || "",
      targetDate: todo.targetDate || "",
      status: todo.status,
    });

    setShowEditTodo(true);
  };

  const handleUpdateTodo = async (event) => {
    event.preventDefault();

    try {
      setUpdatingTodo(true);
      setError("");

      const updateData = {
        description: editingTodo.description,
        targetDate: editingTodo.targetDate,
        status: editingTodo.status,
      };

      const response = await updateTodo(editingTodo.todoId, updateData);

      setShowEditTodo(false);

      setEditingTodo({
        todoId: null,
        description: "",
        targetDate: "",
        status: false,
      });

      await fetchData();

      setApiDialog({
        isOpen: true,
        type: "success",
        title: "Todo Updated",
        message: response.message || "Your Todo was updated successfully.",
      });
    } catch (error) {
      console.error("UPDATE TODO ERROR:", error);

      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Unable to Update Todo",
        message:
          error.response?.data?.message ||
          "Something went wrong while updating the Todo.",
      });
    } finally {
      setUpdatingTodo(false);
    }
  };

  const handleDeleteTodo = (todo) => {
    setDeleteDialog({
      isOpen: true,
      todo,
    });
  };

  const confirmDeleteTodo = async () => {
    const todo = deleteDialog.todo;

    if (!todo) {
      return;
    }

    setDeleteDialog({
      isOpen: false,
      todo: null,
    });

    try {
      setError("");

      const response = await deleteTodoOne(todo.todoId);

      await fetchData();

      setApiDialog({
        isOpen: true,
        type: "success",
        title: "Todo Deleted",
        message: response.message || "Your Todo was deleted successfully.",
      });
    } catch (error) {
      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Unable to Delete Todo",
        message:
          error.response?.data?.message ||
          "Something went wrong while deleting the Todo.",
      });
    }
  };

  const toggleTodo = async (todo) => {
    // Completed Todo cannot be modified
    if (todo.status === true) {
      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Todo Cannot Be Modified",
        message: "Completed Tasks cannot be modified.",
      });

      return;
    }

    try {
      setError("");

      const response = await updateTodo(todo.todoId, {
        description: todo.description,
        targetDate: todo.targetDate,
        status: true,
      });

      await fetchData();

      setApiDialog({
        isOpen: true,
        type: "success",
        title: "Todo Completed",
        message: response.message || "Todo status updated successfully.",
      });
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);

      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Unable to Update Status",
        message:
          error.response?.data?.message ||
          "Something went wrong while updating the Todo status.",
      });
    }
  };

  const deleteTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.todoId !== id),
    );
  };

  const getDateLabel = (date) => {
    if (date === today) {
      return "Today";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDateStatus = (todo) => {
    if (todo.status) {
      return "Completed";
    }

    if (todo.targetDate === today) {
      return "Today";
    }

    const current = new Date();
    const target = new Date(todo.targetDate);

    const difference = Math.ceil((target - current) / (1000 * 60 * 60 * 24));

    if (difference > 0) {
      return `${difference} days left`;
    }

    return "Overdue";
  };

  return (
    <>
      <ApiDialog
        isOpen={apiDialog.isOpen}
        type={apiDialog.type}
        title={apiDialog.title}
        message={apiDialog.message}
        onClose={() =>
          setApiDialog({
            isOpen: false,
            type: "error",
            title: "",
            message: "",
          })
        }
      />
      <ApiDialog
        isOpen={deleteDialog.isOpen}
        type="confirm"
        title="Delete Todo?"
        message={`Are you sure you want to delete "${deleteDialog.todo?.title}"?`}
        onClose={() =>
          setDeleteDialog({
            isOpen: false,
            todo: null,
          })
        }
        onConfirm={confirmDeleteTodo}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <div className={`home-page ${darkMode ? "dark-mode" : ""}`}>
        {/* ======================================
          SIDEBAR
      ====================================== */}

        <aside className="sidebar">
          {/* LOGO + TITLE */}

          <button
            type="button"
            className="brand"
            onClick={handleBrandClick}
            aria-label="Go to Dashboard"
          >
            <div className="brand-logo">
              <img src="/Logo.png" alt="To Do App Logo" />
            </div>

            <span className="brand-title">
              To Do <span>App</span>
            </span>
          </button>

          {/* NAVIGATION */}

          <nav className="sidebar-navigation">
            <button className="navigation-item active">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>

            <button className="navigation-item">
              <CheckSquare size={20} />
              <span>My Todos</span>
            </button>

            <button className="navigation-item">
              <Plus size={21} />
              <span>Add Todo</span>
            </button>

            <button className="navigation-item">
              <CalendarDays size={20} />
              <span>Calendar</span>
            </button>

            <button className="navigation-item">
              <CheckCircle2 size={20} />
              <span>Completed</span>
            </button>

            <button className="navigation-item">
              <BarChart3 size={20} />
              <span>Statistics</span>
            </button>

            <button className="navigation-item">
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>
        </aside>

        {/* ======================================
          MAIN CONTENT
      ====================================== */}

        <main className="main-content">
          {/* HEADER */}

          <header className="home-header">
            <div className="welcome-section">
              <h1>
                Welcome back! <span>👋</span>
              </h1>

              <p>Stay organized and get things done.</p>
            </div>

            <div className="header-actions">
              <div className="header-search">
                <Search size={19} />

                <input
                  type="text"
                  placeholder="Search todos..."
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <button className="header-icon-button">
                <Bell size={21} />
              </button>

              <button
                className="theme-button"
                onClick={() => setDarkMode((previous) => !previous)}
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          {/* ======================================
            STATISTICS
        ====================================== */}

          <section className="statistics-grid">
            {/* TOTAL */}

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

            {/* COMPLETED */}

            <div className="stat-card">
              <div className="stat-icon completed-icon">
                <CheckCircle2 size={27} />
              </div>

              <div className="stat-content">
                <span>Completed</span>

                <strong>{completedTodos}</strong>

                <small>
                  {totalTodos
                    ? ((completedTodos / totalTodos) * 100).toFixed(1)
                    : 0}
                  % completed
                </small>
              </div>
            </div>

            {/* PENDING */}

            <div className="stat-card">
              <div className="stat-icon pending-icon">
                <Clock3 size={27} />
              </div>

              <div className="stat-content">
                <span>Pending</span>

                <strong>{pendingTodos}</strong>

                <small>
                  {totalTodos
                    ? ((pendingTodos / totalTodos) * 100).toFixed(1)
                    : 0}
                  % pending
                </small>
              </div>
            </div>

            {/* TODAY */}

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

          {/* ======================================
            FILTER BAR
        ====================================== */}

          <section className="filter-panel">
            {/* SEARCH */}

            <div className="filter-field search-field">
              <label>Search by title...</label>

              <div className="filter-input-wrapper">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search by title..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* STATUS */}

            <div className="filter-field">
              <label>Status</label>

              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* START DATE */}

            <div className="filter-field">
              <label>Start Date</label>

              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* END DATE */}

            <div className="filter-field">
              <label>End Date</label>

              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => {
                    setEndDate(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* FILTER */}

            <button className="filter-button" onClick={applyFilters}>
              <Filter size={18} />
              Filter
            </button>

            {/* RESET */}

            <button className="reset-button" onClick={resetFilters}>
              <RotateCcw size={17} />
              Reset
            </button>

            {/* ADD TODO */}

            <button
              className="add-todo-button"
              onClick={() => setShowAddTodo(true)}
            >
              <Plus size={20} />
              Add Todo
            </button>
          </section>

          {/* ======================================
            TODO LIST
        ====================================== */}

          <section className="todo-panel">
            {/* PANEL HEADER */}

            <div className="todo-panel-header">
              <h2>Your Todos</h2>

              <div className="sort-section">
                <span>Sort by:</span>

                <select
                  value={sortOrder}
                  onChange={(event) => {
                    console.log("SORT DROPDOWN CHANGED");
                    console.log("Selected value:", event.target.value);

                    setSortOrder(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* TODO ITEMS */}

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
                displayedTodos.map((todo) => (
                  <div
                    className={`todo-row ${todo.status ? "todo-completed" : ""}`}
                    key={todo.todoId}
                  >
                    {/* CHECKBOX */}

                    <button
                      className={`todo-checkbox ${todo.status ? "checked" : ""}`}
                      onClick={() => toggleTodo(todo)}
                    >
                      {todo.status && <CheckCircle2 size={18} />}
                    </button>

                    {/* TODO INFO */}

                    <div className="todo-information">
                      <h3>{todo.title}</h3>

                      <p>{todo.description}</p>
                    </div>

                    {/* DATE */}

                    <div className="todo-date">
                      <div className="date-main">
                        <CalendarDays size={17} />

                        <span>{getDateLabel(todo.targetDate)}</span>
                      </div>

                      <small
                        className={
                          todo.status
                            ? "date-completed"
                            : getDateStatus(todo) === "Today"
                              ? "date-today"
                              : ""
                        }
                      >
                        {getDateStatus(todo)}
                      </small>
                    </div>

                    {/* STATUS */}

                    <div>
                      <span
                        className={`status-badge ${
                          todo.status ? "status-completed" : "status-pending"
                        }`}
                      >
                        {todo.status ? "Completed" : "Pending"}
                      </span>
                    </div>

                    {/* ACTIONS */}

                    <div className="todo-actions">
                      <button
                        className="edit-button"
                        title="Edit Todo"
                        onClick={() => handleEditTodo(todo)}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="delete-button"
                        title="Delete Todo"
                        onClick={() => handleDeleteTodo(todo)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ======================================
              PAGINATION
          ====================================== */}

            <div className="pagination">
              <span className="pagination-info">
                Showing {sortedTodos.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, sortedTodos.length)} out of{" "}
                {sortedTodos.length} todos
              </span>

              <div className="pagination-controls">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active-page" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="items-per-page">
                <span>Items per page:</span>

                <select
                  value={itemsPerPage}
                  onChange={(event) => {
                    setItemsPerPage(Number(event.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                </select>
              </div>
            </div>
          </section>

          {showAddTodo && (
            <div className="modal-overlay">
              <div className="add-todo-modal">
                <div className="modal-header">
                  <h2>Add Todo</h2>

                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={() => setShowAddTodo(false)}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleCreateTodo}>
                  <div className="modal-field">
                    <label>Title</label>

                    <input
                      type="text"
                      placeholder="Enter todo title"
                      value={newTodo.title}
                      onChange={(event) =>
                        setNewTodo({
                          ...newTodo,
                          title: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="modal-field">
                    <label>Description</label>

                    <textarea
                      placeholder="Enter todo description"
                      value={newTodo.description}
                      onChange={(event) =>
                        setNewTodo({
                          ...newTodo,
                          description: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="modal-field">
                    <label>Target Date</label>

                    <input
                      type="date"
                      value={newTodo.targetDate}
                      onChange={(event) =>
                        setNewTodo({
                          ...newTodo,
                          targetDate: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowAddTodo(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="save-button"
                      disabled={creatingTodo}
                    >
                      {creatingTodo ? "Creating..." : "Create Todo"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {showEditTodo && (
            <div className="modal-overlay">
              <div className="add-todo-modal">
                <div className="modal-header">
                  <h2>Edit Todo</h2>

                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={() => setShowEditTodo(false)}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleUpdateTodo}>
                  <div className="modal-field">
                    <label>Description</label>

                    <textarea
                      value={editingTodo.description}
                      onChange={(event) =>
                        setEditingTodo({
                          ...editingTodo,
                          description: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="modal-field">
                    <label>Target Date</label>

                    <input
                      type="date"
                      value={editingTodo.targetDate}
                      onChange={(event) =>
                        setEditingTodo({
                          ...editingTodo,
                          targetDate: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="modal-field">
                    <label>Status</label>

                    <select
                      value={editingTodo.status}
                      onChange={(event) =>
                        setEditingTodo({
                          ...editingTodo,
                          status: event.target.value === "true",
                        })
                      }
                    >
                      <option value="false">Pending</option>
                      <option value="true">Completed</option>
                    </select>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowEditTodo(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="save-button"
                      disabled={updatingTodo}
                    >
                      {updatingTodo ? "Updating..." : "Update Todo"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;
