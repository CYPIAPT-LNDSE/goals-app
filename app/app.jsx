import React from 'react';
import { connect } from 'react-redux'
import './scss/style.scss';
import 'normalize.css';

/* import components */
import Main from './containers/main.jsx';
import Nav from './components/nav.jsx';

let App = () => {

  return (
    <div className="page">
      <Nav />
      <Main />
    </div>
  );
};

App = connect()(App)

export default App;
