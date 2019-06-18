const express = require( 'express' );
const morgan = require( 'morgan' );
const dotenv = require( 'dotenv' );
const indexRouter = require( './routes/index' );

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use( morgan( 'dev' ) );

app.use( '/api', indexRouter );

app.listen( PORT, () => {
  console.log( `Listening on ${PORT}` );
} );
