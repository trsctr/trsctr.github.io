import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import ModalProvider from './components/modal/ModalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
    <App />
    </ModalProvider>
  </StrictMode>,
)
