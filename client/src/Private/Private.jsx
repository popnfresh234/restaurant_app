import React, { Component } from 'react';
import axios from 'axios';


class Private extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      result: 'Private Route',
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };
    axios.get( 'http://localhost:8081/api/private', { headers } )
      .then( ( result ) => {
        console.log( result );
        this.setState( {
          result: result.data,
        } );
      } ).catch( ( err ) => {
        console.log( err.message );
        this.setState( {
          result: err.message,
        } );
      } );
  }

  render() {
    return (
      <div>
        <h4>{this.state.result}</h4>
      </div>
    );
  }
}

export default Private;
