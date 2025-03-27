
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as React from 'react';

// This ensures we properly capture errors in the app
const handleError = (error: Error) => {
  console.error('Application error:', error);
};

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Process unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error('Root element not found');

  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  handleError(error as Error);
}
