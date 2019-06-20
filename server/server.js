const express = require( 'express' );
const morgan = require( 'morgan' );
const dotenv = require( 'dotenv' );
const cors = require( 'cors' );


const indexRouter = require( './routes/index' );

dotenv.config();
const app = express();
app.use( cors() );
app.use( morgan( 'common' ) );

const PORT = process.env.SERVER_PORT || 3000;


app.use( '/api', indexRouter );

// Error handling
app.use( ( err, req, res, next ) => {
  console.log( err.status );
  console.error( err.message ); // Log error message in our server's console
  res.send( `${err.status} Error: ${err.message}` );
} );

app.listen( PORT, () => {
  console.log( `Listening on ${PORT}` );
} );
