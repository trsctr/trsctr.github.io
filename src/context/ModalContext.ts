import  { createContext } from 'react';

interface ModalContextType {
    isOpen: boolean;            // state tracking if modal is open
    toggleModal: () => void;    // function to toggle modal state
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export default ModalContext;

