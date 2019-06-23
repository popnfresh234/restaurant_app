import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


class App extends Component {
  constructor( props ) {
    super( props );
    this.handleChange = this.handleChange.bind( this );
    this.goTo = this.goTo.bind( this );
    this.login = this.login.bind( this );
    this.logout = this.logout.bind( this );
    this.state = {
      value: 0,
    };
  }

  componentWillMount() {
    const lookup = {
      '/': () => 0,
      '/home': () => 0,
      '/private': () => 1,
      '/public': () => 2,
      '/login': () => 3,
      '/logout': () => 3,

    };
    this.unlisten = this.props.history.listen( ( location, action ) => {
      const fn = lookup[location.pathname];
      if ( fn ) {
        this.setState( {
          value: fn(),
        } );
      }
    } );
  }

  componentDidMount() {
    const { auth } = this.props;
    if ( localStorage.getItem( 'isLoggedIn' ) === 'true' ) {
      auth.renewSession();
    }
  }

  componentWillUnmount() {
    this.unlisten();
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

  handleChange( event, newValue ) {
    this.setState( {
      value: newValue,
    } );
  }


  render() {
    const { auth } = this.props;
    const { value } = this.state;
    const { goTo, login, logout } = this;
    function LinkTab( props ) {
      return (
        <Tab
          component="a"
          onClick={( event ) => {
            event.preventDefault();

            const lookup = {
              login: () => {
                login();
              },
              logout: () => {
                logout();
              },
            };
            const fn = lookup[props.route];
            if ( fn )fn();
            else {
              goTo( props.route );
            }
          }}
          {...props}
        />
      );
    }


    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <LinkTab label="Home" route="home" />
            <LinkTab label="Private" route="private" />
            <LinkTab label="Public" route="public" />
            {!auth.isAuthenticated()
            && ( <LinkTab label="Log In" route="login" /> )}
            {auth.isAuthenticated()
            && ( <LinkTab label="Log Out" route="logout" /> )}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default App;
