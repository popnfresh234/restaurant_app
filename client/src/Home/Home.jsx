import React, { Component } from 'react';

class Home extends Component {
  login() {
    const { auth } = this.props;
    auth.login();
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="container">
        {
            auth.isAuthenticated() && (
            <h4>
                You are logged in!
            </h4>
            )
        }
        {
            !auth.isAuthenticated() && (
            <h4>
                    You are not logged in! Please
              {' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind( this )}
              >
                    Log In
              </a>
              {' '}
                    to continue.
            </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
