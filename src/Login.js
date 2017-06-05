import React , {Component} from 'react';
import Store from './services/Store';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import StorageAdaptor from './services/StorageAdaptor';
import './css/Login.css';

class Login extends Component{
  state={
    loading:false,
    email:"",
    password:""
  }
  onEmailChange = (e)=>{
    e.preventDefault();
    this.setState({
      email:e.target.value
    });
  }
  onPasswordChange = (e)=>{
    e.preventDefault();
    this.setState({
      password:e.target.value
    });
  }
  shouldButtonBeDisabled = ()=>{
    if(this.state.email && this.state.password){
      return false;
    }else{
      return true;
    }
  }
  handleSubmit = (e)=>{
    console.log("submited");
    e.preventDefault();
    if(this.state.email && this.state.password){
      this.setState({loading:true});
      Store.authenticate(this.state.email,this.state.password,(responseBody)=>{
        this.setState({loading:false});
        this.props.history.push("/");
        this.props.history.goForward();
      });
    }
  }
  componentDidMount(){
    var params = queryString.parse(window.location.search)
    console.log(params);
    if (params["token"] && params["uid"] && params["client_id"] && params["expiry"]) {
      console.log(params);
      var auth_details = {};
      auth_details["access-token"]=params["token"];
      auth_details["uid"]=params["uid"];
      auth_details["client"]=params["client_id"];
      auth_details["expiry"]=params["expiry"];
      auth_details["token-type"]="Bearer";
      StorageAdaptor.setObject("auth_details",auth_details);
      StorageAdaptor.setItem("authenticated","true");

      this.props.history.push("/");
      this.props.history.goForward();
    }
  }
  render(){
  //  console.log(this.props);
    const style={
      container: {
      position: 'relative',
      },
    refresh: {
      display: 'inline-block',
      position: 'absolute',
      },
    };
    var loadingIndicator=(<div></div>);
    if(this.state.loading){
      loadingIndicator = (<RefreshIndicator
        size={40}
        top={-10}
        left={250}
        status="loading"
         style={style.refresh}
      />)
    }
    return(<form className="login-form" style={style.container} >
      <TextField  floatingLabelText="email" type="email" value={this.state.email} onChange={this.onEmailChange}/>
      <br/>
      <TextField floatingLabelText="password" type="password" value={this.state.password} onChange={this.onPasswordChange}/>
      <br/>
      <FlatButton label="Login" disabled={this.shouldButtonBeDisabled()} onClick={this.handleSubmit}/>
      <br/>
      <br/>
      <span className="register-message"> <Link to="/register">Don't have an account yet?</Link> </span>
      {loadingIndicator}
    </form>);
  }
}
export default Login;
