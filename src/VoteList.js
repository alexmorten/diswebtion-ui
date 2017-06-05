import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import ShowRating from './helperComponents/ShowRating';
import Divider from 'material-ui/Divider';
import './css/Vote.css';

class VoteList extends AuthComponent{
  state={
    loaded:false
  }
  getVotes = ()=>{
    this.query("votes",{argument_id:this.props.argument.id},(votes)=>{
      console.log(votes);
      this.setState({votes:votes,loaded:true});
    },(failAnswer)=>{
      console.log(failAnswer);
    });
  }
  componentDidMount(){
    this.getVotes();
  }
  componentWillReceiveProps(){
    this.getVotes();
  }
  render(){
    if(this.state.loaded){
      var votesItems = this.state.votes.map((vote)=>{
        return (
          <div className="vote">
            <Divider />
            <h2 className="name">{vote.user.fullname}</h2>
            <h3 className="title">{vote.title}</h3>
            <p className="description">{vote.description} <ShowRating rating={vote.value}/> </p>

          </div>
        );
      });
      return(
        <div>
          {votesItems}
        </div>
      );
    }
    return (
      <div className="refresh-container">
        <RefreshIndicator
          size={40}
          left={0}
          top={0}
          status="loading"
          className="refresh-indicator"/>
      </div>
    )
  }
}
export default VoteList;
