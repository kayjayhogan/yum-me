import React from 'react';
import './Comment.css';
import moment from 'moment';

const Comment = props => {
  const { author, createdAt, text, _id} = props.item
  const { currentUser, currentAvatar } = props;
  return (
    <div className="single-comment">
      <div className="comment-details">
        <img src={author.avatar}></img>
        <div>
          <p className="comment-text"><span>{author.username}</span>{text}</p>
          <p className="comment-date">{moment(createdAt).fromNow()}</p>    
        </div>
      </div>
    </div>
  )
}

export default Comment;