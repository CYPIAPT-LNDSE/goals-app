import React from 'react';
import './scss/style.scss';

/* import components */
import Main from './containers/main.jsx';
import Nav from './containers/nav.jsx';

class App extends React.Component {

   render() {

     const store = this.props.store;

      return (
         <div className="page">
           <Nav
             store={ store.getState() }
           />
           <Main
             store={ store.getState() }
           />
         </div>
      );
   }
};

export default App;
