import React from 'react';
import './App.css';
import LoginButton from './pages/LoginButton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Dashboard from './pages/Dashboard';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          {!isAuthenticated && !isLoading && <LoginButton />}
          {isAuthenticated && <Redirect to="/dashboard" />}
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
