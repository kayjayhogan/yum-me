import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import UserPost from './UserPost/UserPost.jsx';
import './User.css';
import axios from 'axios';
import { MdLocationOn } from 'react-icons/md';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.userPage,
      posts: [],
      currentUser: this.props.user,
      followers: 0,
      following: 0,
      followStatus: false
    };
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
    this.fetchFollowers = this.fetchFollowers.bind(this);
    this.fetchFollowing = this.fetchFollowing.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentDidMount() {
    this.fetchUserPosts();
    this.fetchFollowers();
    this.fetchFollowing();
  }

  fetchUserPosts() {
    const { id } = this.state.author;
    axios.get(`/users/${id}/posts`)
    .then(({ data }) => {
      this.setState({
        posts: data
      })
    })
    .catch(err => console.log("Error fetching user's posts: ", err));
  }

  fetchFollowers() {
    const { id } = this.state.author;
    axios.get(`/users/${id}/followers`)
    .then(({ data }) => {
      for(let obj of data) {
        if(obj["user_id"] === this.state.currentUser.id) {
          this.setState({
            followStatus: true,
            followers: data.length
          })
        } else {
          this.setState({
            followers: data.length
          })
        }
      }      
    })
    .catch(err => console.log("Error fetching user's followers: ", err));
  }

  fetchFollowing() {
    const { id } = this.state.author;
    axios.get(`/users/${id}/following`)
    .then(({ data }) => {
      this.setState({
        following: data.length
      })
    })
    .catch(err => console.log("Error fetching user's posts: ", err));
  }

  handleFollow() {
    const followed_id = this.state.author.id;
    const user_id = this.state.currentUser.id;
    axios.post("/users/follow", { followed_id, user_id })
    .then(() => this.setState({
      followStatus: true
    }, this.fetchFollowers()))
    .catch(err => console.log("Error following user: ", err));
  }

  handleUnfollow() {
    const followed_id = this.state.author.id;
    const user_id = this.state.currentUser.id;
    axios.post("/users/unfollow", { followed_id, user_id })
    .then(() => this.setState({
      followStatus: false
    }, this.fetchFollowers()))
    .catch(err => console.log("Error unfollowing user: ", err));
  }

  render() {
    const { posts, author, currentUser, followStatus, followers, following } = this.state;
    const userPostSection = this.state.posts.length ? 
      <div className="two-col-grid">
        {posts.map((post, i) => <div key={i} className="grid-item hvr-grow"><UserPost post={post} author={author}/></div>)}
      </div> : 
      <div className="user-no-posts">
        <h3>It looks like this user hasn't posted anything yet.</h3>
        <div>
          <p>Bummer!</p>
          <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/terrible_ufki2y.png"></img>
        </div>
      </div>
    let followBtn;
    if(currentUser.username) {
      followBtn = followStatus ? 
      <button onClick={this.handleUnfollow}>unfollow</button> : 
      <button onClick={this.handleFollow}>follow</button>
    } else {
      followBtn = null;
    }

    return( 
      <div>
        <Navbar username={currentUser.username} avatar={currentUser.avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)} handleSearchTerm={(term) => this.handleSearchTerm(term)}/>
        <div className="user-user-info-container">
          <img className="user-avatar-photo" src={author.avatar} />
          <div className="user-user-info">
            <div className="user-user-name">
              <h1>{author.firstname} {author.lastname}</h1>
              {followBtn}
            </div>
            <h2>@{author.username}</h2>
            <div>
              <p className="user-user-location"><span><MdLocationOn /></span>{author.loc}</p>
            </div>
            <div className="user-user-info-details">
              <p><span>{posts.length}</span> posts</p>
              <p><span>{followers}</span> followers</p>
              <p><span>{following}</span> following</p>
            </div>
          </div>
        </div>
        <div className="user-user-posts-container">
          {userPostSection}
        </div>
      </div>
    );
  }
}

export default User;