import ReactDOM from 'react-dom';
import makeMainRoutes from './Routes.jsx';


const routes = makeMainRoutes();
console.log( process.env );
ReactDOM.render(
  routes,
  document.getElementById( 'react-root' ),
);
