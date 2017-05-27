import React ,{ Component} from 'react';
import {Card,CardHeader, CardTitle, CardText} from 'material-ui/Card';
import './TopicListItem.css';
import {Link} from 'react-router-dom';
class TopicListItem extends Component {
  render(){
    return (
      <Link to={"topics/"+this.props.topic.id} className="topic-card-link">
        <Card className="topic-card">
          <CardHeader title={this.props.topic.user.firstname + " " +this.props.topic.user.lastname }/>
          <CardTitle title={this.props.topic.title} />
          <CardText>{this.props.topic.description}</CardText>
        </Card>
      </Link>
    )
  }
}
export default TopicListItem;
