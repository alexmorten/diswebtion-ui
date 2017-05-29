import React from 'react';
import TopicListItem from './TopicListItem';
import './css/TopicList.css';
import AuthComponent from './helperComponents/AuthComponent';
import BasicAddDialogButton from './helperComponents/BasicAddDialogButton';

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
  deleteTopic = (topic)=>{
    this.delete("topics/"+topic.id,()=>{
      this.getTopics();
    });
  }
  componentDidMount(){
    this.getTopics();
  }

  handleAdd = (newTopic)=>{

    this.post("topics",newTopic,(answer)=>{
      console.log(answer);
      this.getTopics();
    });

  }

  render(){

    var topics=this.state.topics;
    var topicItems=topics.map((topic,indx)=>{
      return (
        <TopicListItem delete={this.deleteTopic} key={topic.id} topic={topic}/>
    );
  });

    return (
      <div className="topic-list-container">
        <BasicAddDialogButton title="Add Topic" add={this.handleAdd}/>
        <div className="topic-list">
          {topicItems}
        </div>
      </div>);

  }

}
export default TopicList;
