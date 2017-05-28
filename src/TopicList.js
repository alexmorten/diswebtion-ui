import React from 'react';
import TopicListItem from './TopicListItem';
import './TopicList.css';
import AuthComponent from './AuthComponent';
class TopicList extends AuthComponent {
  state = {
    topics:[]
  }
  getTopics(){
    this.find("topics",(response)=>{
      this.setState({
        topics:response
      });
    });
  }
  componentDidMount(){
    this.getTopics();
  }
  render(){

    var topics=this.state.topics;
    var topicItems=topics.map((topic,indx)=>{
      return (
        <TopicListItem key={topic.id} topic={topic}/>
    );
  });
    return (<div className="topic-list">{topicItems}</div>);

  }

}
export default TopicList;
