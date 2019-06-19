import React, { Component } from 'react';
import axios from 'axios';


class Private extends Component {
  componentDidMount() {
    axios.get( 'http://localhost:8081/api/private' )
      .then( ( result ) => {
        console.log( result );
      } );
  }

  render() {
    return (
      <div>
        <h4>Test</h4>
      </div>
    );
  }
}

export default Private;
