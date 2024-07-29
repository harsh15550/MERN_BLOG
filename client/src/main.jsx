import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextdata from './Context/contextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
    <StoreContextdata>
        <App />
    </StoreContextdata>
  </BrowserRouter>
)
