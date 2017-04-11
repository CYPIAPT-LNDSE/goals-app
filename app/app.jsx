import React from 'react';
import './scss/style.scss';
import 'normalize.css';
import moment from 'moment';

/* import components */
import MainContainer from './containers/main-container.jsx';
import NavContainer from './containers/nav-container.jsx';

const App = () => {

  return (
    <div className="page">
      <NavContainer />
      <MainContainer />
    </div>
  );
};

export default App;
