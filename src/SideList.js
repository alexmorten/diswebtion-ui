import React  from 'react';
import {Card,CardHeader,CardTitle, CardText} from 'material-ui/Card';
import './SideList.css';
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
//  this.getSides();
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
    return(
      <Card className="sides-card">
        <CardTitle title="Sides"/>
        <CardText style={{padding:"8px"}}>{sides}</CardText>

      </Card>
    );

}
}
export default SideList
