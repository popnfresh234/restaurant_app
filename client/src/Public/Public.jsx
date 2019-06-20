import React, { Component } from 'react';
import axios from 'axios';


class Public extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      result: 'Public Route',
    };
  }

  componentDidMount() {
    axios.get( 'http://localhost:8081/api/public' )
      .then( ( result ) => {
        this.setState( {
          result: result.data,
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

export default Public;
