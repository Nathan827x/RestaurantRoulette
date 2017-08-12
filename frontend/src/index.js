import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import routes from './routes'

const app = document.getElementById('root');
ReactDOM.render(
  routes, app );
registerServiceWorker();
