export function filterTodosByTitle(todos, searchQuery) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return todos;
  }

  return todos.filter((todo) =>
    todo.title?.toLowerCase().includes(normalizedQuery),
  );
}

export function sortTodosByCreatedDate(todos, sortOrder) {
  return [...todos].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });
}

export function paginateTodos(todos, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;

  return {
    startIndex,
    totalPages: Math.max(1, Math.ceil(todos.length / itemsPerPage)),
    displayedTodos: todos.slice(startIndex, startIndex + itemsPerPage),
  };
}

export function getTodoStatistics(todos) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.status === true).length;
  const pendingTodos = totalTodos - completedTodos;
  const today = new Date().toISOString().split("T")[0];
  const todayTodos = todos.filter((todo) => todo.targetDate === today).length;

  return {
    totalTodos,
    completedTodos,
    pendingTodos,
    todayTodos,
  };
}
