import React , {Component} from 'react';
import {Card,CardHeader, CardText} from 'material-ui/Card';
import './ArgumentList.css';

class ArgumentList extends Component{

render(){
  var argumentsItems = [];

    argumentsItems = this.props.side.arguments.map((argument)=>{
      return(
        <Card className="argument-card">
          <CardHeader title={argument.title}/>
          <CardText>{argument.description}</CardText>
        </Card>
      );
    });

  return(
    <Card className="arguments-card"  >
      <CardHeader title="Arguments" actAsExpander={true} showExpandableButton={true} />
      <div expandable={true}> {argumentsItems}</div>
    </Card>
  );
}
}
export default ArgumentList;
