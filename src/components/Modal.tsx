import React from "react";
import Header from "./Header";

interface ModalProps {
  isOpen: boolean; // Controls whether the modal is visible
  onClose: () => void; // Function to handle closing the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen = true, onClose = console.log("close")}) => {
  if (!isOpen) return null; // If the modal is not open, don't render it

  return (
    <div
      aria-hidden={!isOpen}
      className="overflow-y-auto backdrop-blur-lg fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    >
      <div
        className="relative p-0 w-full max-w-2xl max-h-full rounded-lg shadow bg-background"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 md:p-3 rounded-t dark:border-gray-600">
            <Header text="Get in touch" textSize="text-2xl" hasGradient/>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose} // Close modal on button click
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-3 md:p-3 space-y-4">
            <p className="text-text">Content comes here</p>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center p-3 md:p-3 bg-background">
          <button
            type="button"
            className="text-black bg-secondary border border-accent hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={onClose} // Close modal on button click
          >
            Send message
          </button>
          <button
            type="button"
            className="py-2.5 px-5 ms-3 text-sm border border-gray-600 bg-transparent font-medium text-text focus:outline-non rounded-lg  focus:z-10 focus:ring-4 focus:ring-gray-700 hover:bg-gray-900"
            onClick={onClose} // Close modal on button click
          >
            Never mind
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
