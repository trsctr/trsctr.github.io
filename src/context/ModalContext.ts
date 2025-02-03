import  { createContext } from 'react';

/**
 * ModalContextType
 * 
 * Interface for the ModalContext
 * 
 * isOpen: boolean;            // state tracking if modal is open
 * toggleModal: () => void;    // function to toggle modal state
 */
interface ModalContextType {
    isOpen: boolean;            // state tracking if modal is open
    toggleModal: () => void;    // function to toggle modal state
}

/**
 * ModalContext
 * 
 * Context for managing the modal stateS
 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default ModalContext;

