import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'


import './index.css';

import App from './App';

import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  // restoreCSRF();

  // window.csrfFetch = fetch;
  window.store = store;
  // window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

