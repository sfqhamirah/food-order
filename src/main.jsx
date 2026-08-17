import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CartProvider from "./component/store/CartProvider.jsx";
import ItemsProvider from "./component/store/ItemsProvider.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItemsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ItemsProvider>
  </StrictMode>,
)
