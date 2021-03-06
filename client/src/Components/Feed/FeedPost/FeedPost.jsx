import React from 'react';
import axios from 'axios';
import './FeedPost.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';

class FeedPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {},
      likes: 0,
      comments: 0,
      restaurant: ''
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.fetchLikes = this.fetchLikes.bind(this);
    this.fetchRestaurant = this.fetchRestaurant.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchComments();
    this.fetchLikes();
    this.fetchRestaurant();
  }

  fetchUser() {
    axios.get(`/users/${this.props.post["author_id"]}/info`)
    .then(({ data }) => {
      this.setState({
        author: data
      });
    })
    .catch(err => console.log("Error fetching user: ", err));
  }

  fetchComments() {
    axios.get(`/posts/${this.props.post.id}/comments`)
    .then(({ data }) => {
      this.setState({
        comments: data.length
      });
    })
    .catch(err => console.log("Error fetching comments: ", err));
  }

  fetchLikes() {
    axios.get(`/posts/${this.props.post.id}/likes`)
    .then(({ data }) => {
      this.setState({
        likes: data.length
      });
    })
    .catch(err => console.log("Error fetching likes: ", err));
  }

  fetchRestaurant() {
    const id = this.props.post['restaurant_id'];
    axios.get(`/restaurants/${id}`)
    .then(({ data }) => {
      this.setState({
        restaurant: data['rest_name']
      });
    })
  }

  render() {
    const { title, img_url, descript, recommended, created_at } = this.props.post;
    const { restaurant, author } = this.state;
    const recommendImage = recommended ? 
      <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_4_ukpyej.png"></img> :
      <img className="recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452170/yumme_2_wphphq.png"></img>
      
    return (
      <div>
        <div className="feed-post">
          <div className="feed-post-user-stripe">
            <img className="post-avatar" src={author.avatar}></img>
            <div>
              <a onClick={() => this.props.renderUserPage(author)}>{author.username}</a>                
              <p><strong>Restaurant: </strong>{restaurant}</p>
            </div>
            <div className="recommend-img-container">{recommendImage}</div>          
          </div>
          <img onClick={() => this.props.renderPost(this.props.post)} className="post-image" src={img_url} />
          <div className="post-well">
            <h3 onClick={() => this.props.renderPost(this.props.post)}>{title}</h3>
            <p>{descript.slice(0,200)}...</p>
            <div className="post-detail">
              <div><span><FaThumbsUp /></span> {this.state.likes} </div>
              <div><span><FaCommentAlt className="post-card-comment-icon" /></span> {this.state.comments}</div>
              <p>{moment(created_at).fromNow()}</p>
            </div>
          </div>
  
        </div>
      </div>
    )
  }
}

export default FeedPost;