import React from 'react';
import axios from 'axios';
import './UserPost.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';

class UserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: '',
      author: this.props.author,
      post: this.props.post,
      comments: 0,
      likes: 0
    }
    this.fetchRestaurant = this.fetchRestaurant.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.fetchLikes = this.fetchLikes.bind(this);
  }

  componentDidMount() {
    this.fetchRestaurant();
    this.fetchComments();
    this.fetchLikes();
  }

  fetchRestaurant() {
    const id = this.state.post['restaurant_id'];
    axios.get(`/restaurants/${id}`)
    .then(({ data }) => {
      this.setState({
        restaurant: data['rest_name']
      });
    })
  }

  fetchComments() {
    const { id } = this.state.post;
    axios.get(`/posts/${id}/comments`)
    .then(({ data }) => {
      this.setState({
        comments: data.length
      });
    })
    .catch(err => console.error('Error finding post comments: ', err));
  }

  fetchLikes() {
    const { id } = this.state.post;
    axios.get(`/posts/${id}/likes`)
    .then(({ data }) => {
      this.setState({
        likes: data.length
      });
    })
  }

  render() {
    const { author, post, restaurant, likes, comments } = this.state;
    const { title, descript, img_url, recommended, created_at } = post;
    const recommendImage = recommended ? 
      <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_4_ukpyej.png"></img> :
      <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452170/yumme_2_wphphq.png"></img>

    return( 
    <div>
      <div className="feed-post">
        <div className="feed-post-user-stripe">
          <img className="post-avatar" src={author.avatar}></img>
          <div>
            <h3>{author.username}</h3>
            <p><strong>Restaurant: </strong>{restaurant}</p>
          </div>
          <div className="recommend-img-container">{recommendImage}</div>          
        </div>
        <img className="post-image" src={img_url} />
        <div className="post-well">
          <h3>{title}</h3>
          <p>{descript.slice(0,200)}...</p>
          <div className="post-detail">
            <div><span><FaThumbsUp /></span> {likes} </div>
            <div><span><FaCommentAlt className="post-card-comment-icon" /></span> {comments}</div>
            <p>{moment(created_at).fromNow()}</p>
          </div>
        </div>
      </div>
    </div>);

  }
}

export default UserPost;