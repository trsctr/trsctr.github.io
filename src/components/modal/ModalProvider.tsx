import React, { useState, ReactNode } from 'react';
import ModalContext from './ModalContext';

interface ModalProviderProps {
    children: ReactNode; // To wrap entire app and provide modal state to all components
}

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