import React ,{ Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import './TopicListItem.css';
import {Link} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';


class TopicListItem extends Component {
  render(){
    return (

        <Card className="topic-card">
          <CardTitle title={this.props.topic.title} subtitle={this.props.topic.user.fullname}/>
          <CardText>{this.props.topic.description}</CardText>
            <Link to={"topics/"+this.props.topic.id} className="topic-card-link">
              <FontIcon className="material-icons" >arrow_forward</FontIcon>
            </Link>
        </Card>

    )
  }
}
export default TopicListItem;
