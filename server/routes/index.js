const express = require( 'express' );

const router = express.Router();
const jwt = require( 'express-jwt' );
const jwks = require( 'jwks-rsa' );
require( 'dotenv' ).config();

const ENV = process.env.ENV || 'development';
const knexConfig = require( '../db/knexfile' );
const knex = require( 'knex' )( knexConfig[ENV] );


const jwtCheck = jwt( {
  secret: jwks.expressJwtSecret( {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-cw44eng7.auth0.com/.well-known/jwks.json',
  } ),
  audience: 'https://testapi/api',
  issuer: 'https://dev-cw44eng7.auth0.com/',
  algorithms: ['RS256'],
} );

router.get( '/public', ( req, res ) => {
  res.status( 200 ).send( 'This is a public route' );
} );

router.post( '/private', jwtCheck, ( req, res ) => {
  knex.select()
    .from( 'users' )
    .where( 'sub', req.body.sub )
    .then( ( result ) => {
      if ( result.length === 0 ) {
        return knex( 'users' )
          .insert( req.body );
      }
      return result;
    } )
    .then( ( result ) => {
      res.status( 200 ).send( JSON.stringify( result[0] ) );
    } )
    .catch( ( err ) => {
      console.log( err );
    } );
} );

module.exports = router;

