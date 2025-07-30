import React from "react";
import { ModalProps } from "../types";

const Modal: React.FC<ModalProps> = ({
  isVisible,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  children,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center transform transition-all scale-100 opacity-100 relative">
        {/* Close button (X) at top right */}
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="ปิด"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-lg font-semibold text-gray-800 mb-6 pr-8">{message}</p>
        {children ? (
          children
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-md"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
