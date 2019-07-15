import React from 'react';
import './FeedPost.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';

class FeedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // need to fetch author info, likes, comments
  }

  render() {
    const { currentUser, currentAvatar } = this.props;
    const { author_id, title, img_url, restaurant, descript, recommended, created_at } = this.props.post;
    const recommendImage = recommended ? 
      <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_4_ukpyej.png"></img> :
      <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452170/yumme_2_wphphq.png"></img>
      
    return (
      <div>
        <div className="feed-post">
          <div className="feed-post-user-stripe">
            <img className="post-avatar" src={author.avatar}></img>
            <div>
              {/* INSERT USER PROFILE LINK BELOW */}
                {author.username}
              <p><strong>Restaurant: </strong>{restaurant}</p>
            </div>
            <div className="recommend-img-container">{recommendImage}</div>          
          </div>
          <img className="post-image" src={image} />
          <div className="post-well">
            <h3>{title}</h3>
            <p>{text.slice(0,200)}...</p>
            <div className="post-detail">
              <div><span><FaThumbsUp /></span> {likes} </div>
              <div><span><FaCommentAlt className="post-card-comment-icon" /></span> {comments.length}</div>
              <p>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
  
        </div>
      </div>
    )
  }
}

export default FeedPost;