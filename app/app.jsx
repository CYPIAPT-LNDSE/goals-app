import React from 'react';
import './scss/style.scss';
import 'normalize.css';

/* import components */
import Menu from './components/menu.jsx';
import MainContainer from './containers/main-container.jsx';
import NavContainer from './containers/nav-container.jsx';

const App = () => {

  return (
    <div className="page">
      <Menu />
      <NavContainer />
      <MainContainer />
    </div>
  );
};

export default App;
