import React , {Component} from 'react';
import Store from './Store';
class AuthComponent extends Component{
  transitionToLogin(){
    console.log(this.props.router);
    console.log(this.props.history);
    this.props.history.push("login");
    this.props.history.goForward();
  }
  find(url,cb){

    if(Store.receive(url,cb)){
      this.transitionToLogin();
    }
  }
  post(url,obj,cb){
    if(Store.send(url,obj,cb)){
      this.transitionToLogin();
    }
  }
  delete(url,cb){
    if(Store.destroy(url,cb)){
      this.transitionToLogin();
    }
  }
}
export default AuthComponent;
