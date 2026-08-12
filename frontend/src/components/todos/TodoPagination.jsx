import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function TodoPagination({ todoState }) {
  const {
    sortedTodos,
    startIndex,
    itemsPerPage,
    currentPage,
    totalPages,
    setCurrentPage,
    setItemsPerPage,
  } = todoState;

  return (
    <div className="pagination">
      <span className="pagination-info">
        Showing {sortedTodos.length === 0 ? 0 : startIndex + 1} to {" "}
        {Math.min(startIndex + itemsPerPage, sortedTodos.length)} out of {" "}
        {sortedTodos.length} todos
      </span>

      <div className="pagination-controls">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            type="button"
            key={page}
            className={currentPage === page ? "active-page" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
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
          onChange={(event) => setItemsPerPage(event.target.value)}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
}

export default TodoPagination;
