import React  from 'react';
import {Card,CardTitle, CardText} from 'material-ui/Card';
import './css/SideList.css';
import Side from './Side';
import AuthComponent from './helperComponents/AuthComponent';
import BasicAddDialogButton from './helperComponents/BasicAddDialogButton';

class SideList extends AuthComponent{
handleAdd = (newSide)=>{
  newSide.topic_id = this.props.topic.id;
  this.post("sides",newSide,(answer)=>{
    this.props.refresh();
  });
}

render(){
  var sides = [];

   sides = this.props.topic.sides.map((side)=>{
     return (<Side key={side.id} side={side} topic={this.props.topic} refresh={this.props.refresh}/>);
   });

    return(
      <Card className="sides-card">
        <CardTitle title="Sides"/>
        <BasicAddDialogButton title="Add a new Side" add={this.handleAdd} mini={true}/>
        <CardText style={{padding:"8px"}}>{sides}</CardText>

      </Card>
    );

}
}
export default SideList
