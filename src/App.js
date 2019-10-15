import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Content from './components/Content';

function App() {
  return (
    <Router>
      <div className='app'>
        <NavBar />
        <Switch>
          <Route path='/md/:id' component={Content} />
          <Route exact path='/' component={Content} />
          <Route render={() => <h1>404 Page</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
