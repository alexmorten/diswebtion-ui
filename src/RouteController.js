import React,{Component} from 'react';
import {
    BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Topic from './Topic';
import TopicList from './TopicList';
import Login from './Login';
import App from './App';

class RouteController extends Component{
render(){
  return(
    <Router >
      <Route path="/" >
        <App>
        <Switch>
          <Route path="/topics/:topic_id" component={Topic}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={TopicList}></Route>
        </Switch>
        </App>
      </Route>
    </Router>
  );
}
}
export default RouteController;
