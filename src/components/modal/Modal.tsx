import React, { ReactNode } from 'react';
import useModal from './useModal';
import Header from '../Header';
import { CloseButton } from './ModalButtons'

interface ModalProps {
  title: string; // Title of the modal
  children: ReactNode; // To allow passing custom content inside the modal
  footer: ReactNode; // To allow passing custom footer content
}

const Modal: React.FC<ModalProps> = ({ title, children, footer }) => {
  const { isOpen, toggleModal } = useModal(); // Get the modal state and toggler from context

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div
      aria-hidden={!isOpen}
      className="overflow-y-auto backdrop-blur-lg fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    >
      <div
        className="relative p-0 w-full max-w-2xl max-h-full rounded-lg shadow bg-background"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 md:p-3">
          <Header text={title} textSize="text-2xl" hasGradient />
          <CloseButton onClick={toggleModal} />
        </div>

        {/* Modal Content */}
        <div className="p-3 md:p-3 space-y-4 text-text">{children}</div>

        {/* Modal Footer */}
        {footer && <div className="p-3 md:p-3">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
