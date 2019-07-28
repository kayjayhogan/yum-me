import React from 'react';
import axios from 'axios';
import './UserCard.css';
import { MdLocationOn } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      posts: 0,
      followers: 0
    };
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchFollowers = this.fetchFollowers.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
    this.fetchFollowers();
  }

  fetchPosts() {
    const { id } = this.state.user;
    axios.get(`/users/${id}/posts`)
    .then(({ data }) => {
      this.setState({
        posts: data.length
      });
    })
  }

  fetchFollowers() {
    const { id } = this.state.user;
    axios.get(`/users/${id}/followers`)
    .then(({ data }) => {
      this.setState({
        followers: data.length
      });
    })
  }

  render() {
    const { user } = this.state;
    return (
      <div className="user-card">
       <div className="user-card-user">
          <img src={user.avatar}></img>
          <h3>{user.username}</h3>
          <p>{user.firstname} {user.lastname}</p>
        </div>
        <div className="user-card-details">
          <div className="user-details-grid">
            <div className="grid-item-user">
              <span><MdLocationOn /></span>
              {user.loc}
            </div>
            <div className="grid-item-user">
              <span><img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_logo_black_cfnbxq.png"></img></span>
              {this.state.posts} posts
            </div>
            <div className="grid-item-user">
              <span><FaUsers /></span>
              {this.state.followers} followers
            </div>

          </div>
        </div>
      </div>
    );
  }
} 

export default UserCard;