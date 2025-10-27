import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/** Step - 1: This is the first file Vite boots when app is opened in the browser, renders APP component into the DOM element with id root
              index.html(root) - vite serves, main.jsx is the js file */
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />  
//   </StrictMode>,
// )
createRoot(document.getElementById('root')).render(
  <App />
);