import React,{Component} from 'react';
import {
    BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Topic from './Topic';
import TopicList from './TopicList';
class RouteController extends Component{
render(){
  return(
    <Router >

      <Switch>
        <Route path="/topics/:topic_id" component={Topic}></Route>
        <Route path="/" component={TopicList}></Route>

      </Switch>

    </Router>
  );
}
}
export default RouteController;
