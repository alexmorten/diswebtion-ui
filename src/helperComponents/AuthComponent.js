import {Component} from 'react';
import Store from '../services/Store';
class AuthComponent extends Component{
  transitionToLogin(){

    this.props.history.push("/login");
    this.props.history.goForward();
  }
  find(url,cb){

    if(Store.receive(url,cb)==="login"){
      this.transitionToLogin();
    }
  }
  post(url,obj,cb){
    if(Store.send(url,obj,cb)==="login"){
      this.transitionToLogin();
    }
  }
  delete(url,cb){
    if(Store.destroy(url,cb)==="login"){
      this.transitionToLogin();
    }
  }
}
export default AuthComponent;
