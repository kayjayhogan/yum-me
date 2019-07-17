import React from 'react';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Comment from './Comment/Comment.jsx'
import './Post.css';
import moment from 'moment';
import { FaCommentAlt, FaThumbsUp, FaTelegramPlane } from 'react-icons/fa';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: {},
      comments: [], 
      text: '', 
      like: false
    }
    this.fetchComments = this.fetchComments.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleLikePost = this.handleLikePost.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    // const { id } = this.props.post;
    const id = 4;
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
    // const id = this.props.post['author_id'];
    const id = 1;
    axios.get(`/users/${id}/info`)
    .then(({ data }) => {
      this.setState({
        author: data
      });
    })
    .catch(err => console.log('Error finding post author details: ', err));
  }

  // handleChange (e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // handleSubmit (e) {
  //   e.preventDefault()
  //   const { text } = this.state;
  //   const { id } = this.props.location;
  //   const { username, avatar } = this.props.location;
  //   axios.post('/comment', {text}, {params: {_id: id, username: username, avatar: avatar}})
  //   .then(() => this.fetchOnePost())
  //   .catch(() => console.error('Error with adding comment'))    
  // }
  
  // handleLikePost () {
  //   const { id, username } = this.props.location;
  //   if(username.length > 0) {
  //     this.setState({like: !this.state.like}, () => {
  //       if(this.state.like) {
  //         axios.post('/post/like', {_id: id})
  //         .then(() => this.fetchOnePost())
  //         .catch(() => console.error('Error with liking post'));
  //       } else {
  //         axios.post('/post/unlike', {_id: id})
  //         .then(() => this.fetchOnePost())
  //         .catch(() => console.error('Error with unliking post'));
  //       }
  //     })
  //   }
  // }

  render () {
    // const { username, avatar } = this.props.user;
    const username = 'love_my_cats';
    const avatar = 'https://res.cloudinary.com/kjhogan/image/upload/v1563005842/cxnlqccy23gnktlzacth.jpg';
    let testpost = {
      "id": 4,
      "title": "You Honestly Need to Try These Wraps",
      "author_id": 1,
      "restaurant": "Mahogany",
      "descript": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id leo in vitae turpis massa sed elementum tempus egestas. Pharetra sit amet aliquam id diam maecenas ultricies mi.",
      "recommended": true,
      "created_at": "2019-07-10T02:49:36.964Z",
      "img_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
    let testauthor = {
      username: "kjhogan",
      avatar: "https://avatars2.githubusercontent.com/u/25232945?s=460&v=4"
    }
    const { created_at, img_url, recommended, restaurant, descript, title } = testpost;
    // const { comments, author } = this.state;
    const { comments } = this.state;
    const author = testauthor;
    const commentSection = comments.length > 0 ? 
      <div className="show-post-comments">
        {/* {comments.map((comment, index) => <PostComment comment={comment} key={index} currentUser={username} currentAvatar={avatar}/>)} */}
      </div> : 
      <div className="show-post-comments-none">
        <p >No comments posted yet.</p>
      </div>
    const postAuthor = author ? author.username : null;
    const recommendImage = recommended ? 
      <img className="post-recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_4_ukpyej.png"></img> :
      <img className="post-recommend-img" src="https://res.cloudinary.com/kjhogan/image/upload/v1562452170/yumme_2_wphphq.png"></img>
    const likeIcon = this.state.like ? <FaThumbsUp className="post-like-icon-activated" /> : <FaThumbsUp className="post-like-icon" />;
    const commentBox = username.length > 0 ? 
      <form>
        {/* <textarea className="comment-input" id="comment-input" name="text" placeholder="Write a comment..." onChange={this.handleChange}/> */}
        {/* <button type="submit" onClick={this.handleSubmit}><FaTelegramPlane /></button> */}
      </form> :
      <div className="cannot-comment">
        <p><em>Please </em> 
          <span className="cannot-comment-login">log in</span>
        <em> to comment.</em></p>
      </div>
    return (
      <div> 
        <NavBar username={username} avatar={avatar}/>
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
                    <h3>{postAuthor}</h3>
                    <p>{moment(created_at).fromNow()}</p>
                  </div>
                </div>
                <p className="show-post-text">{descript}</p>  
              </div>
            </div>
            <div className="show-post-comments-container">
              <div className="show-post-comments-info">
                <p className="show-post-restaurant"><strong><span>Restaurant:</span></strong> {restaurant}</p>
                {/* <p>(Address here?)</p> */}
                <div className="post-comments-likes">
                  <p><span><FaCommentAlt className="post-comment-icon"/></span> {comments ? comments.length : ''}</p>
                  {/* <p><span onClick={this.handleLikePost}>{likeIcon}</span> {likes}</p> */}
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