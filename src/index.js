import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';

import { BrowserRouter } from 'react-router-dom';
import ModalContextProvider from './contexts/modal-context';
import AuthContextProvider from './contexts/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </Provider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
