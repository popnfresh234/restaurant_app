import React, { Component } from 'react';
import axios from 'axios';


class Private extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    function handleProfile( auth, ctx, profile ) {
      const headers = {
        Authorization: `Bearer ${auth.getAccessToken()}`,
      };

      axios.post( 'http://localhost:8081/api/private', profile, { headers } )
        .then( ( response ) => {
          ctx.setState( {
            profile: response.data,
          } );
        } ).catch( ( err ) => {
          console.log( err );
        } );
    }

    const { auth } = this.props;
    const { userProfile, getProfile } = auth;

    if ( auth.isAuthenticated() ) {
      if ( !userProfile ) {
        getProfile( ( err, profile ) => {
          handleProfile( auth, this, profile );
        } );
      } else {
        handleProfile( auth, this, userProfile );
      }
    }
  }

  render() {
    return (
      this.props.auth.isAuthenticated() ? (
        <div>
          <img src={this.state.profile.picture} />
          <h4>{this.state.profile.name}</h4>
        </div>
      ) : (
        <h4>This is a private route</h4>
      )

    );
  }
}

export default Private;
