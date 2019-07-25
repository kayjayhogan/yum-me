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
      currentUser: this.props.user
    };
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
  }

  componentDidMount() {
    this.fetchUserPosts();
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

  render() {
    const { posts, author, currentUser } = this.state;
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
    // let followBtn;
    // if(currentUser.username.length) {
    //   followBtn = followStatus ? 
    //   <button onClick={this.handleUnfollowUser}>unfollow</button> : 
    //   <button onClick={this.handleFollowUser}>follow</button>
    // } else {
    //   followBtn = null;
    // }

    return( 
      <div>
        <Navbar username={currentUser.username} avatar={currentUser.avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)}/>
        <div className="user-user-info-container">
          <img className="user-avatar-photo" src={author.avatar} />
          <div className="user-user-info">
            <div className="user-user-name">
              <h1>{author.firstname} {author.lastname}</h1>
              {/* {followBtn} */}
            </div>
            <h2>@{author.username}</h2>
            <div>
              <p className="user-user-location"><span><MdLocationOn /></span>{author.loc}</p>
            </div>
            <div className="user-user-info-details">
              <p><span>{posts.length}</span> posts</p>
              {/* <p><span>{followers}</span> followers</p>
              <p><span>{followingNum}</span> following</p> */}
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