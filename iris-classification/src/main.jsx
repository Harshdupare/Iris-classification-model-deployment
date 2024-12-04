// main.jsx or App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Or from 'react-dom' if you're using an older version
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
