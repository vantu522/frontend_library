import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, title, footer, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="modal-content bg-white p-6 rounded-lg relative max-w-lg w-full shadow-lg flex flex-col">
        <button
          className="close-button absolute top-3 right-3 text-2xl text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        {title && <div className="modal-header text-lg font-semibold mb-4">{title}</div>}
        <div className="modal-body flex-1">{children}</div>
        {footer && <div className="modal-footer mt-4 flex justify-end">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
