import React , {Component} from 'react';
import Store from './Store';
import {Card,CardHeader, CardTitle, CardText} from 'material-ui/Card';
import SideList from './SideList';
import './Topic.css';
class Topic extends Component{
  state={
    loaded:false
  }

  getData(){
    Store.receive("topics/"+this.props.match.params.topic_id,(topic)=>{
      this.setState({
        topic:topic,
        loaded:true
      });
    });
  }
  componentDidMount(){
    this.getData();
  }
  render(){
    if(this.state.loaded)
      return(
        <div className="topic-body">
          <Card className="single-topic-card">
            <CardHeader title={this.state.topic.user.fullname}/>
            <CardTitle title={this.state.topic.title} />
            <CardText>{this.state.topic.description}</CardText>

          </Card>
          <SideList topic={this.state.topic}/>
        </div>
      );

    return (
      <div>Loading....</div>
    );
  }
}
export default Topic;
