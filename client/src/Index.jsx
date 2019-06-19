import ReactDOM from 'react-dom';
import makeMainRoutes from './Routes.jsx';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById( 'react-root' ),
);
