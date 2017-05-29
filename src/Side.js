import React  from 'react';
import {Card,CardHeader, CardText} from 'material-ui/Card';
import './css/Side.css';
import ArgumentList from './ArgumentList';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import AuthComponent from './helperComponents/AuthComponent';

class Side extends AuthComponent{
  state={
    loaded:false,
    side:{},
  }
  getSide(){
    this.find("sides/"+this.props.side.id,(side)=>{
      this.setState({
        side:side,
        loaded:true
      });
    });
  }
  componentDidMount(){
    this.getSide();
  }
render(){
    if(this.state.loaded){
      return(
        <Card className="side-card" key={this.props.side.id}>
          <CardHeader title={this.state.side.title} subtitle={this.state.side.user.fullname} actAsExpander={true} showExpandableButton={true}/>
          <CardText expandable={true}>{this.state.side.description}</CardText>
          <CardText style={{padding:"8px"}} expandable={true}><ArgumentList  side={this.state.side}/></CardText>
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
export default Side;
