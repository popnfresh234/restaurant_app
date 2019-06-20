const express = require( 'express' );

const router = express.Router();
const jwt = require( 'express-jwt' );
const jwks = require( 'jwks-rsa' );

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

router.get( '/private', jwtCheck, ( req, res ) => {
  res.status( 200 ).send( 'Auth successful, this is a private route' );
} );

module.exports = router;

