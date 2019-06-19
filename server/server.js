const express = require( 'express' );
const morgan = require( 'morgan' );
const dotenv = require( 'dotenv' );
const indexRouter = require( './routes/index' );

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use( morgan( 'common' ) );

app.use( ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
  next();
} );

app.use( '/api', indexRouter );

app.listen( PORT, () => {
  console.log( `Listening on ${PORT}` );
} );
