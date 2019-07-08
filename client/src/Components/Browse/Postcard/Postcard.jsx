import React from 'react';
import './PostCard.css';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const post = this.props.post;
    const { username, avatar } = this.props;
    // handling date display
    let todaysDate = new Date();
    let reviewDate = new Date(post.createdAt);
    let daysBetween = (todaysDate.getTime() - reviewDate.getTime())/(1000*60*60*24.0);
    let dateDisplay;
    //display date differently if within past 7 days
    if (daysBetween <= 7) {
      dateDisplay = moment(post.createdAt).fromNow();
    } else {
      dateDisplay = moment(post.createdAt).format("MMM Do, YYYY");
    }
    return(
      <div className="post-card">
        <div className="post-card-user">
          <img className="post-card-avatar" src={post.author.avatar}></img>
          {/* INSERT USER PROFILE LINK BELOW */}
          <a href="#">{post.author.username}</a>
        </div>
        <img className="post-card-img" src={post.image}></img>
        <div className="post-card-description">
          <h5>{post.title}</h5>
          <p>{post.text.slice(0,100)}...</p>
        </div>
        <div className="post-card-details">
          <p><strong>Restaurant:</strong> {post.restaurant}</p>
          <div>
            <div className="post-card-details-split">
              <span><FaThumbsUp /> {post.likes}</span>
              <span><FaCommentAlt className="post-card-comment-icon"/> {post.comments.length}</span>
            </div>
            <div className="post-card-details-split">
              <p className="post-card-date">{dateDisplay}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;