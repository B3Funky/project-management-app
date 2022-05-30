import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupStore } from './store';
import { Provider } from 'react-redux';

import App from './App';
import './locales';
import './index.css';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
