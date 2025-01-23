import React, { ReactNode } from 'react';
import useModal from './useModal';
import Header from '../Header';
import { CloseButton } from './ModalButtons'

/**
 * ModalProps
 * 
 * Interface for the props of the Modal component.
 * See Modal component for more details.
 */

interface ModalProps {
  title: string;
  hasCloseButton?: boolean;
  headerColors?: string;
  children: ReactNode;
}

/**
 * Modal Component
 * 
 * A modal component that displays content in a centered overlay.
 * 
 * Features:
 * - Customizable title and content.
 * - Optional close button for user interaction.
 * - Uses the useModal hook to manage the modal state.
 * 
 * Props:
 * - `title` (string): The title of the modal.
 * - `hasCloseButton` (boolean): Whether to show a close button (default: false).
 * - `headerColors` (string): The gradient colors for the header (optional).
 * - `children` (ReactNode): The content to display inside the modal.
 * 
 */
const Modal: React.FC<ModalProps> = ({
    title,
    hasCloseButton = false,
    headerColors,
    children,
    }) =>{
      const { isOpen, toggleModal } = useModal();
      const modalRef = React.createRef<HTMLDivElement>(); // Create a ref for the modal

      if (!isOpen) return null; // Do not render the modal if it's not open

    return (
    <div
      aria-hidden={!isOpen}
      className="overflow-y-auto backdrop-blur-sm fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full bg-black bg-opacity-50"
    > 
      <div
        ref={modalRef}
        className="relative flex flex-col px-2 w-5/6 md:w-1/2 lg:w-1/3 max-w-lg sm:max-w-full max-h-full overflow-y-scroll rounded-lg shadow bg-background"
      >
        {/* Modal Header */}
        <div className="md:flex text-center md:text-left items-center justify-between pt-3 md:p-3">
          <Header text={title} textSize="text-2xl" hasGradient gradientColors={headerColors}/>
          {hasCloseButton ? (<CloseButton onClick={toggleModal}/>) : (<></>)}
        </div>

        {/* Modal Content */}
        <div className='flex-grow px-3 pt-3 md:pt-0 pb-3 space-y-4 text-text'>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
