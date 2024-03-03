import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './assets/css/styles.min.css'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './assets/js/sidebarmenu.js';
// import './assets/js/dashboard.js';
// import './assets/js/app.min';
import './assets/libs/jquery/dist/jquery.min.js';
import './assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/js/sidebarmenu.js';
import './assets/js/app.min.js';
import './assets/libs/apexcharts/dist/apexcharts.min.js';
import './assets/libs/simplebar/dist/simplebar.js';
import './assets/js/dashboard.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
)
