import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RouteController from './RouteController';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>

      <div className="App">

        <div className="App-header">
          <div><img src={logo} className="App-logo" alt="logo" /></div>

          <ul className="navbar">
            <li className="nav-item"><Link to="/">Topics</Link></li>
            <li className="nav-item"><Link to="/login">Login</Link></li>
          </ul>
        </div>
            {this.props.children}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
