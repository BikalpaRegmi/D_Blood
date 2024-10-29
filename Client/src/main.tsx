import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { EthererumContextProvider } from './context/contractContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { PostContextProvider } from './context/PostContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
    <EthererumContextProvider>
      <PostContextProvider>
    <App />
      </PostContextProvider>
    </EthererumContextProvider>
      </BrowserRouter>
  </StrictMode>,
)
