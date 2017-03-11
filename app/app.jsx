import React from 'react';
import { connect } from 'react-redux'
import './scss/style.scss';
import 'normalize.css';

/* import components */
import MainContainer from './containers/main-container.jsx';
import Nav from './components/nav.jsx';

const App = () => {

  return (
    <div className="page">
      <Nav />
      <MainContainer/>
    </div>
  );
};

export default App;
