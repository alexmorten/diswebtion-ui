import React  from 'react';
import {Card,CardHeader, CardTitle, CardText} from 'material-ui/Card';
import SideList from './SideList';
import './css/Topic.css';
import AuthComponent from './helperComponents/AuthComponent';
class Topic extends AuthComponent{
  state={
    loaded:false
  }

  getData(){
    this.find("topics/"+this.props.match.params.topic_id,(topic)=>{
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
