import React from 'react';
import TopicListItem from './TopicListItem';
import './TopicList.css';
import AuthComponent from './AuthComponent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class TopicList extends AuthComponent {
  state = {
    topics:[],
    dialogOpen:false,
    title:"",
    description:""

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
  handleDialogOpen = ()=>{
    this.setState({dialogOpen:true})
  }
  handleDialogClose = ()=>{
    this.setState({dialogOpen:false});
  }
  handleDialogSubmit = ()=>{
    var newTopic={
      title:this.state.title,
      description:this.state.description
    };
    this.post("topics",newTopic,(answer)=>{
      console.log(answer);
      this.getTopics();
    });
    this.setState({dialogOpen:false});
  }
  handleTitleChange = (e)=>{
    //e.preventDefault();
    this.setState({title:e.target.value});
  }
  handleDescriptionChange = (e)=>{
  //  e.preventDefault();
    this.setState({description:e.target.value});
  }
  submitButtonDisabled = ()=>{
    return !(this.state.title.length>0 && this.state.description.length>0) ;
  }
  render(){

    var topics=this.state.topics;
    var topicItems=topics.map((topic,indx)=>{
      return (
        <TopicListItem key={topic.id} topic={topic}/>
    );
  });
  var actions=[
    <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogSubmit}
        disabled={this.submitButtonDisabled()}
      />,
  ];
    return (
      <div className="topic-list-container">
        <Dialog
          title="Add Topic"
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}>
          <TextField floatingLabelText="title"
             type="text" fullWidth={true}
             value={this.state.title}
             onChange={this.handleTitleChange}/>
          <br/>
          <TextField
            floatingLabelText="description"
            type="text"
            multiLine={true}
            fullWidth={true}
            value={this.state.description}
            onChange={this.handleDescriptionChange}/>
        </Dialog>
        <FloatingActionButton onClick={this.handleDialogOpen}><ContentAdd/></FloatingActionButton>
        <div className="topic-list">
          {topicItems}
        </div>
      </div>);

  }

}
export default TopicList;
