import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

/**
 * useModal
 * 
 * Custom hook to access the modal context.
 * 
 * Used to access the modal state and toggle function from any component.
 * Returns the modal context.
 */
const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

export default useModal;