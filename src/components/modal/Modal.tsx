import React, { ReactNode } from 'react';
import useModal from '../../hooks/useModal';
import Header from '../common/Header';
import CloseModalButton from './CloseModalButton'
import { AnimatePresence, motion } from "motion/react"
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


	return (
		<AnimatePresence>
			{isOpen &&
			<motion.div
			aria-hidden={!isOpen}
			className="overflow-auto backdrop-blur-sm fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full bg-black bg-opacity-50"
			initial={{ opacity: 0 }}  // Initial state (hidden)
			animate={{ opacity: 1 }}  // Final state (fully visible)
			exit={{ opacity: 0 }}     // Exit state (hidden)
			transition={{ duration: .4  }}  // Duration for the transition
			//onClick={toggleModal}  // Close the modal when clicking on the overlay
		>
			{/* Add animation:
				Overlay fade-in/fade-out or blur transition
			*/}

			<motion.div
			ref={modalRef}
			className="relative flex flex-col px-2 w-5/6 md:w-1/2 lg:w-1/3 max-w-lg sm:max-w-full max-h-full overflow-auto rounded-lg shadow bg-background"
			initial={{ opacity: 0, scale: 1 }}  // Initial state (scaled down and hidden)
			animate={{ opacity: 1, scale: 1 }}    // Final state (normal size and fully visible)
			exit={{ opacity: 0.2, scale: 1 }}     // Exit state (scaled down and hidden)
			transition={{ duration: .3,
			}}        // Duration for the transition
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

			</motion.div>
		</motion.div>}
		</AnimatePresence>
	);
};

export default Modal;
