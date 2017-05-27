import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import AuthStore from './AuthStore';
  ReactDOM.render(<App/>,
     document.getElementById('root'));

 injectTapEventPlugin();

 registerServiceWorker();
