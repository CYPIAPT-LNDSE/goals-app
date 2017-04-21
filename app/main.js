import React from 'react';
import ReactDOM from 'react-dom';

/* redux */
import { Provider, } from 'react-redux';
import { createStore, applyMiddleware, } from 'redux';
import reducer from './reducers/index.js';

/* components */
import App from './app.jsx';

/* sockets */
import socketStarter, { socketsMiddleware, } from './sockets.js';

const createStoreWithMiddleware = applyMiddleware(socketsMiddleware)(createStore);

const store = createStoreWithMiddleware(
  reducer, window.devToolsExtension && window.devToolsExtension()
);

socketStarter(store);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
