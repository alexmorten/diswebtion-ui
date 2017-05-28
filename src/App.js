import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RouteController from './RouteController';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>

      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </div>
              <RouteController/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
