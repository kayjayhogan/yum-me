import React from 'react';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import AuthModal from '../AuthModal/AuthModal';
import Comment from './Comment/Comment.jsx'
import Stars from './Stars.jsx'
import './Post.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp, FaTelegramPlane, FaYelp } from 'react-icons/fa';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: this.props.post,
      author: {},
      comments: [], 
      newComment: '', 
      likes: [],
      restaurant: {},
      showModal: false
    }
    this.fetchComments = this.fetchComments.bind(this);
    this.fetchAuthor = this.fetchAuthor.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUpdatedPost = this.getUpdatedPost.bind(this);
    this.handleLikePost = this.handleLikePost.bind(this);
    this.fetchLikes = this.fetchLikes.bind(this);
    this.fetchRestaurantInfo = this.fetchRestaurantInfo.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
    this.fetchLikes();
    this.fetchAuthor();
    this.fetchRestaurantInfo();
  }

  fetchComments() {
    const { id } = this.state.post;
    axios.get(`/posts/${id}/comments`)
    .then(({ data }) => {
      return data.sort((a, b) => {
        return new Date(a['created_at']) - new Date(b['created_at']);
      });
    })
    .then((result) => {
      this.setState({
        comments: result
      });
    })
    .catch(err => console.error('Error finding post comments: ', err));
  }

  fetchAuthor() {
    const id = this.state.post['author_id'];
    axios.get(`/users/${id}/info`)
    .then(({ data }) => {
      this.setState({
        author: data
      });
    })
    .catch(err => console.log('Error finding post author details: ', err));
  }

  fetchLikes() {
    const { id } = this.state.post;
    axios.get(`/posts/${id}/likes`)
    .then(({ data }) => {
      this.setState({
        likes: data
      });
    })
  }

  handleShowModal() {
    this.setState({
      showModal: true
    });
  }

  handleHideModal() {
    this.setState({
      showModal: false
    });
  }

  handleChange(e) {
    this.setState({
      newComment: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const content = this.state.newComment;
    const post_id = this.state.post.id;
    const author_id = this.props.user.id;
    document.getElementById("comment-form").reset();
    axios.post('/comments', { author_id, post_id, content })
    .then(() => this.getUpdatedPost())
    .catch(err => console.log('Error posting comment: ', err));    
  }

  getUpdatedPost() {
    const { id } = this.state.post;
    axios.get(`/posts/${id}`)
    .then(({ data }) => {
      this.setState({
        post: data[0]
      }, (() => {
        this.fetchComments();
        this.fetchLikes();
      })());
    })
    .catch(err => console.log('Error updating post: ', err));
  }
  
  handleLikePost () {
    const { id } = this.props.user;
    let currentlyLikesPost = this.state.likes.some(obj => {
      return obj["user_id"] === id;
    });
    if(!currentlyLikesPost) {
      axios.post('/posts/like', {
        post_id: this.state.post.id,
        user_id: id
      })
      .then(() => this.getUpdatedPost())
      .catch(() => console.error('Error with liking post'));
    } else {
      axios.post('/posts/unlike', {
        post_id: this.state.post.id,
        user_id: id
      })
      .then(() => this.getUpdatedPost())
      .catch(() => console.error('Error with unliking post'));
    }
  }

  fetchRestaurantInfo() {
    const id = this.state.post['restaurant_id'];
    axios.get(`/restaurants/${id}`)
    .then(({ data }) => {
      this.setState({
        restaurant: data
      });
    })
  }

  render () {
    const modal = this.state.showModal ? 
      (<AuthModal handleHide={this.handleHideModal} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)}></AuthModal>) : null;
    // variables to use below
    const { username, avatar, id } = this.props.user;
    const { created_at, img_url, recommended, descript, title } = this.state.post;
    const { comments, author, likes, restaurant } = this.state;
    const { rest_name, address_city, address_state, address_country, price, rating, rest_url } = restaurant;
    let displayCountry = address_state ? address_state + ", " : "";
    const postAuthor = author ? author.username : null;
    // show comments if there are any, otherwise display a message
    const commentSection = comments.length > 0 ? 
    <div className="show-post-comments">
        {comments.map((comment, i) => <Comment comment={comment} key={i} renderUserPage={(user) => this.props.renderUserPage(user)}/>)}
      </div> : 
      <div className="show-post-comments-none">
        <p >No comments posted yet.</p>
      </div>
    // determines whether to use happy dumpling or sad dumpling
    const recommendImage = recommended ? 
    <img className="post-recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_4_ukpyej.png"></img> :
    <img className="post-recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452170/yumme_2_wphphq.png"></img>
    // determines whether to indicate post has been liked by current user
    let currentlyLikesPost = this.state.likes.some(obj => {
      return obj["user_id"] === id;
    });
    const likeIcon = currentlyLikesPost ? <FaThumbsUp className="post-like-icon-activated" /> : <FaThumbsUp className="post-like-icon" />;
    // show comment box only if user is logged in
    const commentBox = username ? 
      <form onSubmit={this.handleSubmit} id="comment-form" >
        <textarea className="comment-input" name="newComment" placeholder="Write a comment..." onChange={this.handleChange}/>
        <button type="submit" ><FaTelegramPlane /></button>
      </form> :
      <div className="cannot-comment">
        <p><em>Please </em> 
          <span onClick={this.handleShowModal} className="cannot-comment-login">log in</span>
        <em> to comment.</em></p>
      </div>
    return (
      <div> 
        {modal}
        <NavBar username={username} avatar={avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)}/>
        <div className="show-post-container">
          <div className="show-post-main">
            <div className="show-post-post-container">
              <img className="show-post-image" src={img_url} />
              <div className="show-post-content">
                <div className="show-post-title">
                  <h1>{title}</h1>
                  <div>{recommendImage}</div>                 
                </div>
                <div className="show-post-user">
                  <img className="show-post-avatar" src={author ? author.avatar : ''} />
                  <div>
                    <h3 onClick={() => this.props.renderUserPage(author)}>{postAuthor}</h3>
                    <p>{moment(created_at).fromNow()}</p>
                  </div>
                </div>
                <p className="show-post-text">{descript}</p>  
              </div>
            </div>
            <div className="show-post-comments-container">
              <div className="show-post-comments-info">
                <p className="show-post-restaurant"><strong><span>Restaurant:</span></strong> {rest_name}</p>
                <p className="show-post-details">{address_city}, {displayCountry}{address_country}</p>
                <div>
                  <Stars rating={rating}/>
                  <p className="show-post-details inline-block dolla-dolla-billz">{price}</p>
                  <a className="show-post-yelp-url" href={rest_url}><FaYelp /></a>
                </div>
                <p className="show-post-details"></p>
                <div className="post-comments-likes">
                  <p><span><FaCommentAlt className="post-comment-icon"/></span> {comments ? comments.length : ''}</p>
                  <p><span onClick={this.handleLikePost}>{likeIcon}</span> {likes.length}</p>
                </div>
                {commentBox}
              </div>
              {commentSection}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;