import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext"
import "./index.css"   // ✅ Required for CSS / Tailwind

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)

