import React,{Component} from 'react';
import Store from './Store';
import TopicListItem from './TopicListItem';
import './TopicList.css';
class TopicList extends Component {
  state = {
    topics:[]
  }
  getTopics(){
    Store.receive("topics",(response)=>{
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
