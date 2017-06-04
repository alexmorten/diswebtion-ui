import React, {Component} from 'react';
import Store from './services/Store';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './css/Registrate.css';

class Registrate extends Component{
  state={
    loading:false,
    sent:false,
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    password_confirmation:"",
  }
  registrate = ()=>{
    this.setState({loading:true});
    var details = {
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email,
      password:this.state.password,
      password_confirmation:this.state.password_confirmation
    };
    Store.registrate(details,(successBody)=>{
      this.setState({loading:false,sent:true});

    },(failResponse)=>{
      this.setState({loading:false});
      console.log(failResponse);
    });
  }
  handleChange = (e)=>{
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render(){
    if(this.state.sent){
      return(
        <h3>Check your emails for the confirmation!</h3>
      );
    }
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

    return(
      <form className="register-form" style={style.container} >
        <h4>Create an account</h4>
        <TextField  floatingLabelText="firstname" name="firstname" type="firstname" value={this.state.firstname} onChange={this.handleChange} />
        <br/>
        <TextField  floatingLabelText="lastname" name="lastname" type="lastname" onChange={this.handleChange}/>
        <br/>
        <TextField  floatingLabelText="email" name="email" type="email" onChange={this.handleChange}/>
        <br/>
        <TextField  floatingLabelText="password" name="password" type="password" onChange={this.handleChange}/>
        <br/>
        <TextField  floatingLabelText="password confirm" name="password_confirmation" type="password" onChange={this.handleChange}/>
        <br/>
        <FlatButton onClick={this.registrate} >Create</FlatButton>
        {loadingIndicator}
      </form>
    );
  }
}
export default Registrate;
