import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import App from './App';
import RouteController from './RouteController';
  ReactDOM.render(<RouteController/>,
     document.getElementById('root'));

 injectTapEventPlugin();

 registerServiceWorker();
