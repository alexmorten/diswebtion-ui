import React , {Component} from 'react';
import Store from './Store';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './Login.css';


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
  render(){
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
      {loadingIndicator}
    </form>);
  }
}
export default Login;
