const merge = require( 'webpack-merge' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );


const common = require( './webpack.common.js' );


module.exports = merge( common, {
  entry: [
    './src/Index.jsx',
  ],
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(), // Clean out the ./dist folder on every build
  ],
} );
