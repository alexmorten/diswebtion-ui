import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import {Card,CardHeader, CardText} from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import BasicDeleteDialogButton from './helperComponents/BasicDeleteDialogButton';
import './css/Argument.css';
class Argument extends AuthComponent{
state={
  loaded:false,
  argument:{}
}
getArgument = ()=>{
  this.find("arguments/"+this.props.argument.id,(successAnswer)=>{
    this.setState({
      loaded:true,
      argument:successAnswer
    });
  });
}
componentDidMount(){
  this.getArgument();
}
handleDelete = ()=>{
  this.delete("arguments/"+this.state.argument.id,(successAnswer)=>{
    this.props.refresh();
  },(failAnswer)=>{
    this.props.refresh();
  })
}
render(){
  if(this.state.loaded){
  return(
    <Card className="argument-card" key={this.state.argument.id}>
      <CardHeader title={this.state.argument.title}/>
      <CardText>{this.state.argument.description}</CardText>
      <BasicDeleteDialogButton delete={this.handleDelete} title="Delete Argument" itemTitle={this.state.argument.title} iconClass="argument-delete-button"/>
    </Card>
  );
  }else{
  return(
    <div className="refresh-container">
      <RefreshIndicator
        size={40}
        left={0}
        top={0}
        status="loading"
        className="refresh-indicator"/>
    </div>
    );
    }
  }
}

export default Argument;
