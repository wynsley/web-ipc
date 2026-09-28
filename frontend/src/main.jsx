import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PdfViewerProvider } from './context/pdfViewer/pdfViewerProvide.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PdfViewerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PdfViewerProvider>
  </StrictMode>,
)
