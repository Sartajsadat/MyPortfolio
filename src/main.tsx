import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applySeo } from './utils/seo';
import './styles/globals.css';

applySeo();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
