import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the Tailwind CSS styles
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/index';
import { ToastContainer } from 'react-toastify';


const rootElement = document.getElementById('root');


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
