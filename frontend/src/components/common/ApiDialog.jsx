import React from "react";
import "../../styles/api-dialog.css";

function ApiDialog({
  isOpen,
  type = "error",
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  if (!isOpen) {
    return null;
  }

  const isConfirm = type === "confirm";

  return (
    <div className="api-dialog-overlay">
      <div className={`api-dialog api-dialog-${type}`}>
        <div className="api-dialog-icon">
          {type === "success" ? <span>✓</span> : <span>!</span>}
        </div>

        <div className="api-dialog-content">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>

        {isConfirm ? (
          <div className="api-dialog-actions">
            <button
              type="button"
              className="api-dialog-cancel-button"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="api-dialog-confirm-button"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="api-dialog-button"
            onClick={onClose}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}

export default ApiDialog;
