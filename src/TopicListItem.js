import React ,{ Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import './css/TopicListItem.css';
import {Link} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import BasicDeleteDialogButton from './helperComponents/BasicDeleteDialogButton';

class TopicListItem extends Component {

  handleDelete = ()=>{
    this.props.delete(this.props.topic);
  }

  render(){
    return (
        <Card className="topic-card">
          <CardTitle title={this.props.topic.title} subtitle={this.props.topic.user.fullname}/>
          <CardText>{this.props.topic.description}</CardText>
            <Link to={"topics/"+this.props.topic.id} className="topic-card-link">
              <FontIcon className="material-icons" >arrow_forward</FontIcon>
            </Link>
          <BasicDeleteDialogButton iconClass="topic-delete-icon" title="Delete Topic" delete={this.handleDelete} itemTitle={this.props.topic.title}/>
        </Card>
      )
  }
}

export default TopicListItem;
