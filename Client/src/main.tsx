import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { EthererumContextProvider } from './context/contractContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EthererumContextProvider>
      <BrowserRouter>
    <App />
      </BrowserRouter>
    </EthererumContextProvider>
  </StrictMode>,
)
