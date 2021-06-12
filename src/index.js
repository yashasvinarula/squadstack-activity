import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css';

import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux';
import storeConfig from './store';
const { store, persistor } = storeConfig();

ReactDOM.render(
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
