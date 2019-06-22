
import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './App.jsx';
import Home from './Home/Home.jsx';
import Callback from './Callback/Callback.jsx';
import Auth from './Auth/Auth.jsx';
import Private from './Private/Private.jsx';
import Public from './Public/Public.jsx';
import history from './history';

const auth = new Auth();

const handleAuthentication = ( nextState, replace ) => {
  if ( /access_token|id_token|error/.test( nextState.location.hash ) ) {
    auth.handleAuthentication();
  }
};


const makeMainRoutes = () => (
  <Router history={history}>
    <div>
      <Route path="/" render={props => <App auth={auth} {...props} />} />
      <Route path="/home" render={props => <Home auth={auth} {...props} />} />
      <Route
        path="/private"
        render={props => (
          !auth.isAuthenticated() ? (
            <Redirect to="/home" />
          ) : (
            <Private auth={auth} {...props} />
          )
        )}
      />
      <Route path="/public" render={props => <Public auth={auth} {...props} />} />

      <Route
        path="/callback"
        render={( props ) => {
          handleAuthentication( props );
          return <Callback {...props} />;
        }}
      />
    </div>
  </Router>
);

export default makeMainRoutes;
