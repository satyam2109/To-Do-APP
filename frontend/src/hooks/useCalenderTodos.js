import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchTodos } from "../services/todoApi";

export function useCalendarTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchTodos();

      setTodos(response.To_Do || []);
    } catch (apiError) {
      setError(
        apiError.response?.data?.message ||
          "Unable to load calendar Todos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const todosByDate = useMemo(() => {
    const grouped = {};

    todos.forEach((todo) => {
      if (!todo.targetDate) {
        return;
      }

      const dateKey = String(todo.targetDate).split("T")[0];

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(todo);
    });

    return grouped;
  }, [todos]);

  return {
    todos,
    todosByDate,
    loading,
    error,
    refreshCalendar: loadTodos,
  };
}