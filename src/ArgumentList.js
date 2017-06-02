import React , {Component} from 'react';
import {Card,CardHeader, CardText} from 'material-ui/Card';
import './css/ArgumentList.css';
import Argument from './Argument';
import Divider from 'material-ui/Divider';
import BasicAddDialogButton from './helperComponents/BasicAddDialogButton';

class ArgumentList extends Component{
handleAdd = (argument)=>{
  this.props.add(argument);
}
render(){
  var argumentsItems = [];

    argumentsItems = this.props.side.arguments.map((argument)=>{
      return(
        <div key={argument.id}>
          <Divider/>
          <Argument argument={argument} refresh={this.props.refresh} topic={this.props.topic}/>
        </div>
      );
    });

  return(
    <Card className="arguments-card">
      <CardHeader title="Arguments" actAsExpander={true} showExpandableButton={true} />
      <CardText style={{padding:"8px"}} expandable={true}>
        <BasicAddDialogButton add={this.handleAdd} title="Add Argument" mini={true}/>
        <br/>
        {argumentsItems}
      </CardText>
    </Card>
  );
}
}
export default ArgumentList;
