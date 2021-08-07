import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AdminUpdateNew from './AdminUpdateNew';
import FirstUserState from './FirstUserState';
function Home() {
    return (
        
           
  <div className="container">
       <Link to="/admin"><button className="btn-simple">ADMIN</button></Link>
      <Link to="/user"><button className="btn-simple">USER</button></Link>
      </div>
      
      
        
    );
}

export default Home
