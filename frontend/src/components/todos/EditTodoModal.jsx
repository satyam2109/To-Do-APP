import React from "react";

function EditTodoModal({ todoState }) {
  const {
    showEditTodo,
    setShowEditTodo,
    editingTodo,
    setEditingTodo,
    handleUpdateTodo,
    updatingTodo,
  } = todoState;

  if (!showEditTodo) {
    return null;
  }

  return (
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
            <button type="submit" className="save-button" disabled={updatingTodo}>
              {updatingTodo ? "Updating..." : "Update Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;
