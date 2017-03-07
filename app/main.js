import React from 'react';
import ReactDOM from 'react-dom';

/* components */
import App from './App.jsx';

/* redux */
import Store from './reducers/index.js';
import { createStore } from 'redux';
const store = createStore(Store);

ReactDOM.render(<App store={store} />, document.getElementById('app'));

store.subscribe(render);
