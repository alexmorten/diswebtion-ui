import React , {Component} from 'react';
import {Card,CardHeader, CardText} from 'material-ui/Card';
import './Side.css';
import ArgumentList from './ArgumentList';
class Side extends Component{
render(){
  return(
    <Card className="side-card" key={this.props.side.id}>
      <CardHeader title={this.props.side.title} subtitle={this.props.side.user.fullname} actAsExpander={true} showExpandableButton={true}/>
      <CardText expandable={true}>{this.props.side.description}</CardText>
      <CardText style={{padding:"8px"}} expandable={true}><ArgumentList  side={this.props.side}/></CardText>
    </Card>
  );
}
}
export default Side;
