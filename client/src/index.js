import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/User';
import { Bounce, ToastContainer } from "react-toastify"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          theme="colored"
          transition={Bounce}
        />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);


