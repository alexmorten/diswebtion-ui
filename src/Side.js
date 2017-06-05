import React  from 'react';
import {Card,CardHeader, CardText} from 'material-ui/Card';
import './css/Side.css';
import ArgumentList from './ArgumentList';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import AuthComponent from './helperComponents/AuthComponent';
import BasicDeleteDialogButton from './helperComponents/BasicDeleteDialogButton';
import ShowRating from './helperComponents/ShowRating';

class Side extends AuthComponent{
  state={
    loaded:false,
    side:{},
  }
  getSide = ()=>{
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

  addArgument = (argument)=>{
    argument.side_id = this.state.side.id;
    this.post("arguments",argument,(successAnswer)=>{
      this.getSide();
    },(failAnswer)=>{
      this.getSide();
    });
  }

  handleDelete=()=>{
    this.delete("sides/"+this.state.side.id,(successAnswer)=>{
      this.props.refresh();
    },(failAnswer)=>{
      this.props.refresh();
    });
  }
render(){
    if(this.state.loaded){
      return(
        <Card className="side-card" key={this.props.side.id}>
          <CardHeader title={this.state.side.title} subtitle={this.state.side.user.fullname} actAsExpander={true} showExpandableButton={true}/>
          <ShowRating rating={this.state.side.rating} containerClass="side-rating" />
          <CardText expandable={true}>{this.state.side.description}</CardText>
          <CardText style={{padding:"8px"}} expandable={true}>
            <ArgumentList add={this.addArgument} side={this.state.side} topic={this.props.topic} refresh={this.getSide}/>
          </CardText>
          <BasicDeleteDialogButton itemTitle={this.state.side.title} delete={this.handleDelete} iconClass="side-delete-button"/>
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
