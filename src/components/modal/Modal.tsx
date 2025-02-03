import React, { ReactNode } from 'react';
import useModal from '../../hooks/useModal';
import Header from '../common/Header';
import CloseModalButton from './CloseModalButton'

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
 * - `hasCloseButton` (boolean): Whether to show a close button (default: true).
 * - `headerColors` (string): The gradient colors for the header (optional).
 * - `children` (ReactNode): The content to display inside the modal.
 * 
 * Notes:
 * - Make sure you provide another way to close the modal if you disable the close button!
 */
const Modal: React.FC<ModalProps> = ({
    title,
    hasCloseButton = true,
    headerColors,
    children,
}) =>{
	const { isOpen, toggleModal } = useModal();
	const modalRef = React.createRef<HTMLDivElement>(); // Create a ref for the modal

	if (!isOpen) return null; // Do not render the modal if it's not open

	return (
		<div
			aria-hidden={!isOpen}
			className="overflow-auto backdrop-blur-sm fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full bg-black bg-opacity-50"
		>
			{/* Add animation:
				Overlay fade-in/fade-out or blur transition
			*/}

			<div
			ref={modalRef}
			className="relative flex flex-col px-2 w-5/6 md:w-1/2 lg:w-1/3 max-w-lg sm:max-w-full max-h-full overflow-auto rounded-lg shadow bg-background"
			>
				{/* Add animation:
					Modal box entrance (e.g., slide-in, scale-up, fade-in)
				*/}

				{/* Modal Header */}
				<div className="md:flex text-center md:text-left items-center justify-between pt-3 md:p-3">
					<Header text={title} textSize="text-2xl" hasGradient gradientColors={headerColors}/>
					{/* Close button */}
					{hasCloseButton ? (<CloseModalButton onClick={toggleModal}/>) : (<></>)}
					{/* Add animation:
						Some kind of hover effect on the close button.
						Modify CloseModalButton component to do this.
						Suggestions: Scale up on hover?
					*/}
				</div>
				{/* Modal Content */}
				<div className='flex-grow px-3 pt-3 md:pt-0 pb-3 space-y-4 text-text'>
					{/* Add animation:
						Modal content entrance and exit (e.g., fade-in)
						Optional, do you need animation for the content if the box is animated?
					*/
					}
					{children}
				</div>
				{/* Add animation:
					Modal box exit (e.g., slide-out, scale-down, fade-out)
				*/}	

			</div>
		</div>
	);
};

export default Modal;
