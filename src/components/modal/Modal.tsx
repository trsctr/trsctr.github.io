import React, { ReactNode } from 'react';
import useModal from './useModal';
import Header from '../Header';
import { CloseButton } from './ModalButtons'

interface ModalProps {
  title: string; // Title of the modal
  hasCloseButton?: boolean; // To show or hide the close button
  headerColors?: string; // To allow passing custom colors to the header
  children: ReactNode; // To allow passing custom content inside the modal
}

// Modal component
// Renders a modal with a title, content, and footer
const Modal: React.FC<ModalProps> = ({ title, children, headerColors, hasCloseButton = false }) => {
  const { isOpen, toggleModal } = useModal(); // Get the modal state and toggler from context

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div
      aria-hidden={!isOpen}
      className="overflow-y-auto backdrop-blur-sm fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full bg-black bg-opacity-50"
    > 
      <div
        className="relative px-2 w-5/6 md:w-1/2 lg:w-1/3 max-w-lg sm:max-w-full max-h-full rounded-lg shadow bg-background"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pt-3 md:p-3">
          <Header text={title} textSize="text-2xl" hasGradient gradientColors={headerColors}/>
          {hasCloseButton ? (<CloseButton onClick={toggleModal}/>) : (<></>)}
        </div>

        {/* Modal Content */}
        <div className="px-3 md:px-3 pb-3 md:pb-3 space-y-4 text-text">{children}</div>


      </div>
    </div>
  );
};

export default Modal;
