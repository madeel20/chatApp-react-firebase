import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ChatShell from './containers/shell/ChatShell';
import LoginPage from '../src/pages/login.page'
import SignUp from '../src/pages/signup.page'


const App = () => {
  return (  
   <Router>
     <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route path="/sign-in" component={LoginPage} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/chat-room" component={ChatShell} />
          </Switch>
    {/* <ChatShell /> */}
 </Router>
    // <LoginPage/>
  );
}

export default App;
