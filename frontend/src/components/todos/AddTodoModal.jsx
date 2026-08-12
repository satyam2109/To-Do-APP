import React from "react";

function AddTodoModal({ todoState }) {
  const {
    showAddTodo,
    setShowAddTodo,
    newTodo,
    setNewTodo,
    handleCreateTodo,
    creatingTodo,
  } = todoState;

  if (!showAddTodo) {
    return null;
  }

  return (
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
                setNewTodo({ ...newTodo, title: event.target.value })
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
                setNewTodo({ ...newTodo, description: event.target.value })
              }
            />
          </div>

          <div className="modal-field">
            <label>Target Date</label>
            <input
              type="date"
              value={newTodo.targetDate}
              onChange={(event) =>
                setNewTodo({ ...newTodo, targetDate: event.target.value })
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

            <button type="submit" className="save-button" disabled={creatingTodo}>
              {creatingTodo ? "Creating..." : "Create Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodoModal;
