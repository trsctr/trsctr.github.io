import React, { useState, ReactNode } from 'react';
import ModalContext from './ModalContext';

/**
 * ModalProviderProps
 * 
 * Interface for the ModalProvider component
 */
interface ModalProviderProps {
    children: ReactNode; // To wrap entire app and provide modal state to all components
}

/**
 * ModalProvider Component
 * 
 * A context provider component for managing the modal state.
 * 
 * Features:
 * - Provides modal state and toggle function to all child components.
 * - Uses React Context API to manage state.
 * 
 * Props:
 * - `children` (ReactNode): The child components to wrap with the modal context.
 */
const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false); // initial state: modal is closed

    // function to toggle modal state
    const toggleModal = () => {
        setIsOpen((prev) => !prev); // toggle state
    };

    return (
        <ModalContext.Provider value={{ isOpen, toggleModal }}>
            {children} {/* render child components which all have access to this context */}
        </ModalContext.Provider>
    );
};

export default ModalProvider;