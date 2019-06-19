import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

import './App.css';

const styles = {
  app: {
    paddingTop: 40,
    textAlign: 'center',
  },
};

class App extends Component {
  componentDidMount() {
    const { auth } = this.props;
    if ( localStorage.getItem( 'isLoggedIn' ) === 'true' ) {
      console.log( 'renew' );
      auth.renewSession();
    }
  }

  goTo( route ) {
    const { history } = this.props;
    history.replace( `/${route}` );
  }

  login() {
    const { auth } = this.props;
    auth.login();
  }

  logout() {
    const { auth } = this.props;
    auth.logout();
  }


  render() {
    const { auth } = this.props;
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind( this, 'home' )}
            >
              Home
            </Button>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind( this, 'private' )}
            >
              Private
            </Button>
            {
              !auth.isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind( this )}
              >
                    Log In
              </Button>
              )
            }
            {
              auth.isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.logout.bind( this )}
              >
                    Log Out
              </Button>
              )
            }

          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
