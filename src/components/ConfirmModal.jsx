function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <div className="confirm-modal-header">
          <h2>{title}</h2>
        </div>

        <div className="confirm-modal-body">
          <p>{message}</p>
        </div>

        <div className="confirm-modal-actions">
          <button
            className="modal-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="modal-delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;