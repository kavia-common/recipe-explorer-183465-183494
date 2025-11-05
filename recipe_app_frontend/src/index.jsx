import React from 'react';
import ReactDOM from 'react-dom/client';
import './figma-theme.css';
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="app-root">
      <App />
    </div>
  </React.StrictMode>
);
