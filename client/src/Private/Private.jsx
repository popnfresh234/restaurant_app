import React, { Component } from 'react';
import axios from 'axios';


class Private extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      profile: 'Private Route',
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

    if ( !userProfile ) {
      getProfile( ( err, profile ) => {
        handleProfile( auth, this, profile );
      } );
    } else {
      handleProfile( auth, this, userProfile );
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <div>
        <img src={profile.picture} />
        <h4>{profile.name}</h4>
      </div>
    );
  }
}

export default Private;
