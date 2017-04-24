import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, } from 'react-redux';

/* components */
import App from './app.jsx';

/* redux */
import Store from './reducers/index.js';
import { createStore, } from 'redux';

const store = createStore(Store, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
