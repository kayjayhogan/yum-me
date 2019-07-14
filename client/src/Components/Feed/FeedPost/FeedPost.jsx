import React from 'react';
import './FeedPost.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';

const FeedPost = props => {
  const { currentUser, currentAvatar } = props;
  const { author, comments, image, likes, recommend, restaurant, text, title, createdAt, _id } = props.item;
  const recommendImage = recommend === "Yes" ? 
    <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/happy_dbmo3c.png"></img> :
    <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/sad_fcfqhu.png"></img>
    
  return (
    <div>
      <div className="feed-post">
        <div className="feed-post-user-stripe">
          <img className="post-avatar" src={author.avatar}></img>
          <div>
            {/* INSERT USER PROFILE LINK BELOW */}
            <Link to={{pathname: `/follow/${author.username}`, currentUser: currentUser, currentAvatar: currentAvatar}} >
              {author.username}
            </Link>
            <p><strong>Restaurant: </strong>{restaurant}</p>
          </div>
          <div className="recommend-img-container">{recommendImage}</div>          
        </div>
        <Link to={{pathname: `/post`, id: _id, username: currentUser, avatar: currentAvatar}}>
        <img className="post-image" src={image} />
        </Link>
        <div className="post-well">
        <Link to={{pathname: `/post`, id: _id, username: currentUser, avatar: currentAvatar}}>
          <h3>{title}</h3>
        </Link>
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

export default FeedPost;