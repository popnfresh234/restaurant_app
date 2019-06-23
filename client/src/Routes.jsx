
import React, { Component } from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import App from './App.jsx';
import Home from './Home/Home.jsx';
import Callback from './Callback/Callback.jsx';
import Auth from './Auth/Auth.jsx';
import Private from './Private/Private.jsx';
import Public from './Public/Public.jsx';
import history from './history';

class Routes extends Component {
  constructor( props ) {
    super( props );
    this.auth = new Auth();
    this.handleAuthentication = this.handleAuthentication.bind( this );
  }


  handleAuthentication = ( nextState, replace ) => {
    if ( /access_token|id_token|error/.test( nextState.location.hash ) ) {
      this.auth.handleAuthentication();
    }
  };


  render() {
    return (
      <Router history={history}>
        <div>
          <Route
            path="/"
            render={props => <App auth={this.auth} {...props} />}
          />
          <Route
            path="/home"
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/private"
            render={props => (

              <Private auth={this.auth} {...props} />

            )}
          />
          <Route path="/public" render={props => <Public auth={this.auth} {...props} />} />

          <Route
            path="/callback"
            render={( props ) => {
              this.handleAuthentication( props );
              return <Callback {...props} />;
            }}
          />
        </div>
      </Router>
    );
  }
}


export default Routes;
