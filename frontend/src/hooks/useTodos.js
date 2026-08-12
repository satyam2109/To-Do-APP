import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createTodo,
  deleteTodoOne,
  fetchTodos,
  updateTodo,
} from "../services/todoApi";
import {
  filterTodosByTitle,
  getTodoStatistics,
  paginateTodos,
  sortTodosByCreatedDate,
} from "../utils/todoUtils";

const EMPTY_NEW_TODO = {
  title: "",
  description: "",
  targetDate: "",
};

const EMPTY_EDIT_TODO = {
  todoId: null,
  description: "",
  targetDate: "",
  status: false,
};

export function useTodos({ refreshKey } = {}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState(EMPTY_NEW_TODO);
  const [creatingTodo, setCreatingTodo] = useState(false);

  const [showEditTodo, setShowEditTodo] = useState(false);
  const [editingTodo, setEditingTodo] = useState(EMPTY_EDIT_TODO);
  const [updatingTodo, setUpdatingTodo] = useState(false);

  const [apiDialog, setApiDialog] = useState({
    isOpen: false,
    type: "error",
    title: "",
    message: "",
  });

  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    todo: null,
  });

  const fetchData = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchTodos(filters);
      setTodos(data.To_Do || []);
    } catch (errorResponse) {
      const message =
        errorResponse.response?.data?.message ||
        "Something went wrong while fetching your Todos.";

      setError(message);
      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Unable to Fetch Todos",
        message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshKey]);

  const searchedTodos = useMemo(
    () => filterTodosByTitle(todos, searchQuery),
    [todos, searchQuery],
  );

  const sortedTodos = useMemo(
    () => sortTodosByCreatedDate(searchedTodos, sortOrder),
    [searchedTodos, sortOrder],
  );

  const pagination = useMemo(
    () => paginateTodos(sortedTodos, currentPage, itemsPerPage),
    [sortedTodos, currentPage, itemsPerPage],
  );

  const statistics = useMemo(() => getTodoStatistics(todos), [todos]);

  const setAndResetPage = useCallback((setter, value) => {
    setter(value);
    setCurrentPage(1);
  }, []);

  const applyFilters = useCallback(() => {
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

    setCurrentPage(1);
    fetchData(filters);
  }, [endDate, fetchData, search, startDate, status]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setStatus("all");
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
    setCurrentPage(1);
    fetchData();
  }, [fetchData]);

  const handleCreateTodo = useCallback(
    async (event) => {
      event.preventDefault();

      if (!newTodo.title.trim()) {
        return;
      }

      try {
        setCreatingTodo(true);
        setError("");

        const response = await createTodo({
          title: newTodo.title.trim(),
          description: newTodo.description.trim(),
          targetDate: newTodo.targetDate,
        });

        setNewTodo(EMPTY_NEW_TODO);
        setShowAddTodo(false);
        await fetchData();

        setApiDialog({
          isOpen: true,
          type: "success",
          title: "Todo Created",
          message:
            response.message ||
            `Todo created successfully with To Do ID: ${response.Response_To_Do?.todoId || ""}.`,
        });
      } catch (errorResponse) {
        setApiDialog({
          isOpen: true,
          type: "error",
          title: "Unable to Create Todo",
          message:
            errorResponse.response?.data?.message ||
            "Something went wrong while creating the Todo.",
        });
      } finally {
        setCreatingTodo(false);
      }
    },
    [fetchData, newTodo],
  );

  const handleEditTodo = useCallback((todo) => {
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
  }, []);

  const handleUpdateTodo = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setUpdatingTodo(true);
        setError("");

        const response = await updateTodo(editingTodo.todoId, {
          description: editingTodo.description,
          targetDate: editingTodo.targetDate,
          status: editingTodo.status,
        });

        setShowEditTodo(false);
        setEditingTodo(EMPTY_EDIT_TODO);
        await fetchData();

        setApiDialog({
          isOpen: true,
          type: "success",
          title: "Todo Updated",
          message:
            response.message || "Your Todo was updated successfully.",
        });
      } catch (errorResponse) {
        setApiDialog({
          isOpen: true,
          type: "error",
          title: "Unable to Update Todo",
          message:
            errorResponse.response?.data?.message ||
            "Something went wrong while updating the Todo.",
        });
      } finally {
        setUpdatingTodo(false);
      }
    },
    [editingTodo, fetchData],
  );

  const handleDeleteTodo = useCallback((todo) => {
    setDeleteDialog({ isOpen: true, todo });
  }, []);

  const confirmDeleteTodo = useCallback(async () => {
    const todo = deleteDialog.todo;

    if (!todo) {
      return;
    }

    setDeleteDialog({ isOpen: false, todo: null });

    try {
      setError("");
      const response = await deleteTodoOne(todo.todoId);
      await fetchData();

      setApiDialog({
        isOpen: true,
        type: "success",
        title: "Todo Deleted",
        message:
          response.message || "Your Todo was deleted successfully.",
      });
    } catch (errorResponse) {
      setApiDialog({
        isOpen: true,
        type: "error",
        title: "Unable to Delete Todo",
        message:
          errorResponse.response?.data?.message ||
          "Something went wrong while deleting the Todo.",
      });
    }
  }, [deleteDialog.todo, fetchData]);

  const toggleTodo = useCallback(
    async (todo) => {
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
          message:
            response.message || "Todo status updated successfully.",
        });
      } catch (errorResponse) {
        setApiDialog({
          isOpen: true,
          type: "error",
          title: "Unable to Update Status",
          message:
            errorResponse.response?.data?.message ||
            "Something went wrong while updating the Todo status.",
        });
      }
    },
    [fetchData],
  );

  const closeApiDialog = useCallback(() => {
    setApiDialog({
      isOpen: false,
      type: "error",
      title: "",
      message: "",
    });
  }, []);

  return {
    todos,
    loading,
    error,
    search,
    searchQuery,
    status,
    startDate,
    endDate,
    sortOrder,
    itemsPerPage,
    currentPage,
    searchedTodos,
    sortedTodos,
    displayedTodos: pagination.displayedTodos,
    totalPages: pagination.totalPages,
    startIndex: pagination.startIndex,
    statistics,
    showAddTodo,
    newTodo,
    creatingTodo,
    showEditTodo,
    editingTodo,
    updatingTodo,
    apiDialog,
    deleteDialog,
    fetchData,
    applyFilters,
    resetFilters,
    setSearch: (value) => setAndResetPage(setSearch, value),
    setSearchQuery: (value) => setAndResetPage(setSearchQuery, value),
    setStatus: (value) => setAndResetPage(setStatus, value),
    setStartDate: (value) => setAndResetPage(setStartDate, value),
    setEndDate: (value) => setAndResetPage(setEndDate, value),
    setSortOrder: (value) => setAndResetPage(setSortOrder, value),
    setItemsPerPage: (value) => {
      setItemsPerPage(Number(value));
      setCurrentPage(1);
    },
    setCurrentPage,
    setShowAddTodo,
    setNewTodo,
    setShowEditTodo,
    setEditingTodo,
    setApiDialog,
    setDeleteDialog,
    handleCreateTodo,
    handleEditTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    confirmDeleteTodo,
    toggleTodo,
    closeApiDialog,
  };
}
