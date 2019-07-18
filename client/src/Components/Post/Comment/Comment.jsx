import React from 'react';
import axios from 'axios';
import './Comment.css';
import moment from 'moment';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {}
    }
    this.fetchAuthor = this.fetchAuthor.bind(this);
  }

  componentDidMount() {
    this.fetchAuthor();
  }

  fetchAuthor() {
    const id = this.props.comment['author_id'];
    axios.get(`/users/${id}/info`)
    .then(({ data }) => {
      this.setState({
        author: data
      });
    })
    .catch(err => console.log('Error finding comment author details: ', err));
  }

  render() {
    const { created_at, content } = this.props.comment;
    const { username, avatar } = this.state.author;
    return (
      <div className="single-comment">
        <div className="comment-details">
          <img src={avatar}></img>
          <div>
            <p className="comment-text"><span>{username}</span>{content.toString()}</p>
            <p className="comment-date">{moment(created_at).fromNow()}</p>    
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;