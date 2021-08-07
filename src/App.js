import React from 'react';
import AdminUpdateNew from './AdminUpdateNew';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';

import './App.css';
import FirstUserState from './FirstUserState';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/admin" component={AdminUpdateNew}/>
        <Route path="/user" component={FirstUserState}/>
          
        
      </Switch>
    </Router>

  );
}

export default App;
