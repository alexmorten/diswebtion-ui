import React,{Component} from 'react';
import '../css/ShowRating.css';

class ShowRating extends Component{
  render(){
    var ratingValueClass="";
    if(this.props.rating>0){
      ratingValueClass = "pos";
    }else if (this.props.rating===0) {
      ratingValueClass = "zero";
    }else {
      ratingValueClass = "neg";
    }
    return(
      <span className={"show-rating-container "+this.props.containerClass ? this.props.containerClass : ""}>
        Rating: <span className={"show-rating-value "+ratingValueClass}>{this.props.rating}</span>
      </span>
    )
  }
}
export default ShowRating;
