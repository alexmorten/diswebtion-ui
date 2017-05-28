import React , {Component} from 'react';
import {Card,CardHeader,CardTitle, CardText} from 'material-ui/Card';
import './SideList.css';
import Store from './Store';
import Side from './Side';
import AuthComponent from './AuthComponent';
class SideList extends AuthComponent{

state={
  loaded:false
}
getSides(){
  this.find("sides",(sides)=>{
    this.setState({
      sides:sides,
      loaded:true
    });
  });
}
componentDidMount(){
  this.getSides();
}
render(){
  var sides = [];
  if(this.state.loaded){
   sides = this.state.sides.map((side)=>{
     return (<Side key={side.id} side={side}/>);
   });
  }else{
   sides = this.props.topic.sides.map((side)=>{
      return(
        <Card className="side-card" key={side.id}>
          <CardHeader title={side.title} actAsExpander={true} showExpandableButton={true}/>
          <CardText expandable={true}>{side.description}</CardText>
        </Card>
      );
    });
    }
    console.log(sides);
    return(
      <Card className="sides-card">
        <CardTitle title="Sides"/>
        {sides}
      </Card>
    );

}
}
export default SideList
