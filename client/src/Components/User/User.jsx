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
      user: this.props.userPage,
      posts: []
    };
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
  }

  componentDidMount() {
    this.fetchUserPosts();
  }

  fetchUserPosts() {
    const { id } = this.state.user;
    axios.get(`/users/${id}/posts`)
    .then(({ data }) => {
      this.setState({
        posts: data
      })
    })
    .catch(err => console.log("Error fetching user's posts: ", err));
  }

  render() {
    const { posts } = this.state;
    const userPostSection = this.state.posts.length ? 
      <div className="two-col-grid">
        {posts.map((post, i) => <div key={i} className="grid-item hvr-grow"><UserPost post={post} /></div>)}
      </div> : 
      <div className="user-no-posts">
        <h3>It looks like this user hasn't posted anything yet.</h3>
        <div>
          <p>Bummer!</p>
          <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/terrible_ufki2y.png"></img>
        </div>
      </div>

    return(<div>{userPostSection}</div>);
  }
}

export default User;