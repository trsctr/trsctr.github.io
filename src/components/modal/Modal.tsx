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
			{ /*
			Modal Overlay/backdrop 
			Only render if isOpen is true
			Animates opacity for fade in/out effect of the blurred modal backdrop 
			*/}
			{isOpen &&
			<motion.div
			aria-hidden={!isOpen}
			className="overflow-auto backdrop-blur-sm fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full bg-black bg-opacity-50"
			initial={{ opacity: 0 }}  // Initial state (hidden)
			animate={{ opacity: 1 }}  // Final state (fully visible)
			exit={{ opacity: 0 }}     // Exit state (hidden)
			transition={{ duration: .4  }}  // Duration for the transition
		>
			{ /*
			Modal Container
			Animations for scaling and opacity when modal opens/closes
			*/ }
			<motion.div
			ref={modalRef}
			className="relative flex flex-col px-2 w-5/6 md:w-1/2 lg:w-1/3 max-w-lg sm:max-w-full max-h-full overflow-auto rounded-lg shadow bg-background"
			initial={{ opacity: 0, scale: .1}}  // Initial state (scaled down and hidden)
			animate={{ opacity: 1, scale: 1}}    // Final state (normal size and fully visible)
			exit={{ opacity: 0.2, scale: .5 }}     // Exit state (scaled down and hidden)
			transition={{ duration: .2 }}        // Duration for the transition
			>
				{/* 
				Modal Header
				subtle fadein animation for the modal header
				*/}
				<motion.div
					initial={{ opacity: 0, y: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: .4 }}
					className="md:flex text-center md:text-left items-center justify-between pt-3 md:p-3">
					<Header text={title} textSize="text-2xl" hasGradient gradientColors={headerColors}/>
					{/* Close button */}
					{hasCloseButton ? (<CloseModalButton onClick={toggleModal}/>) : (<></>)}
				</motion.div>
				{/*
				Modal Content + animation 
				subtle fade in animation for the modal content
				*/}
				<motion.div
					initial={{ opacity: 0, y: 0 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className='flex-grow px-3 pt-3 md:pt-0 pb-3 space-y-4 text-text'>
					{children}
				</motion.div>
			</motion.div>
		</motion.div>}
		</AnimatePresence>
	);
};

export default Modal;
