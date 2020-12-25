import React,{useState,useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatShell from './containers/shell/ChatShell';
import LoginPage from '../src/pages/login.page'
import SignUp from '../src/pages/signup.page'
import { auth } from './firebase';
import {store} from "./Store copy";
import {Provider} from 'react-redux'
import { ToastProvider } from 'react-toast-notifications'
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(false);
      }
    });
  }, []);
  if (user === null) { return null }
  return (
    <div className="App">
      <ToastProvider>
        <Provider store={store}>
          <Router>          <Switch>
            {user ? <Route path="/" component={ChatShell} /> :
              <>
                <Route path="/" exact component={LoginPage} />
                <Route path="/sign-up" component={SignUp} />
              </>
            }
          </Switch>
          </Router>
        </Provider>
      </ToastProvider>
    </div>
  );
}
export default App;
