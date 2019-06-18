const express = require( 'express' );

const router = express.Router();

router.get( '/public', ( req, res ) => {
  res.status( 200 ).send( 'This is a public route' );
} );

router.get( '/private', ( req, res ) => {
  res.status( 200 ).send( 'This is a private route' );
} );

module.exports = router;

