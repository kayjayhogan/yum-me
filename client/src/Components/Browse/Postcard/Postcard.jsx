import React from 'react';
import axios from 'axios';
import './PostCard.css';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      likes: 0,
      comments: 0,
      restaurant: ''
    };
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.fetchLikes = this.fetchLikes.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.fetchRestaurant = this.fetchRestaurant.bind(this);
  }

  componentDidMount() {
    const user_id = this.props.post['author_id'];
    const post_id = this.props.post.id;
    const rest_id = this.props.post['restaurant_id'];
    this.fetchUserInfo(user_id);
    this.fetchLikes(post_id);
    this.fetchComments(post_id);
    this.fetchRestaurant(rest_id);
  }

  fetchUserInfo(user_id) {
    axios.get(`/users/${user_id}/info`)
    .then(({ data }) => {
      this.setState({
        user: data
      });
    })
    .catch((err) => {
      console.log('Could not fetch user for Postcard: ', err);
    })
  }

  fetchLikes(post_id) {
    axios.get(`/posts/${post_id}/likes`)
    .then(({ data }) => {
      this.setState({
        likes: data.length
      })
    })
    .catch((err) => {
      console.log('Could not fetch likes for Postcard: ', err);
    })
  }

  fetchComments(post_id) {
    axios.get(`/posts/${post_id}/comments`)
    .then(({ data }) => {
      this.setState({
        comments: data.length
      })
    })
    .catch((err) => {
      console.log('Could not fetch comments for Postcard: ', err);
    })
  }

  fetchRestaurant(rest_id) {
    axios.get(`/restaurants/${rest_id}`)
    .then(({ data }) => {
      this.setState({
        restaurant: data['rest_name']
      });
    })
    .catch(err => console.log('Could not fetch restaurant info: ', err));
  }

  render() {
    const post = this.props.post;
    const { username, avatar } = this.state.user;
    const { comments, likes, restaurant } = this.state;

    // handling date display
    let todaysDate = new Date();
    let reviewDate = new Date(post["created_at"]);
    let daysBetween = (todaysDate.getTime() - reviewDate.getTime())/(1000*60*60*24.0);
    let dateDisplay;
    //display date differently if within past 7 days
    if (daysBetween <= 7) {
      dateDisplay = moment(post["created_at"]).fromNow();
    } else {
      dateDisplay = moment(post["created_at"]).format("MMM Do, YYYY");
    }
    
    return(
      <div className="post-card">
        <div className="post-card-user">
          <img className="post-card-avatar" src={avatar}></img>
          <a>{username}</a>
        </div>
        <img className="post-card-img" src={post["img_url"]}></img>
        <div className="post-card-description">
          <h5>{post.title}</h5>
          <p>{post.descript.slice(0,100)}...</p>
        </div>
        <div className="post-card-details">
          <p><strong>Restaurant:</strong> {restaurant}</p>
          <div>
            <div className="post-card-details-split">
              <span><FaThumbsUp /> {likes}</span>
              <span><FaCommentAlt className="post-card-comment-icon"/> {comments}</span>
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