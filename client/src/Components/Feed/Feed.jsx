import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import FeedPost from './FeedPost/FeedPost.jsx';
import './Feed.css';
import axios from 'axios';

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      feed: [],
      posts: 0
    }
    this.fetchUserFeed = this.fetchUserFeed.bind(this);
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
  }

  componentDidMount () {
    this.fetchUserFeed();
    this.fetchUserPosts();
  }

  fetchUserFeed () {
    const { id } = this.state.user;
    axios.get(`/users/${id}/feed`)
    .then(({ data }) => this.setState({
      feed: data
    }))
    .catch(err => console.error('Error fetching user\'s feed: ', err));
  }

  fetchUserPosts () {
    const { id } = this.state.user;
    axios.get(`/users/${id}/posts`)
    .then(({ data }) => this.setState({
      posts: data.length
    }))
    .catch(err => console.error('Error getting user\'s posts: ', err));
  }

  render () {
    const { firstName, lastName, username, avatar } = this.state.user;
    const { feed } = this.state;
    const followingNum = following ? following.length : null;
    const feedSection = this.state.feed.length > 0 ? 
      <div className="feed-post-main">
        {feed.map((item, index) => <FeedPost item={item} key={index} currentUser={this.props.location.state.username} currentAvatar={this.props.location.state.avatar}/>)}
      </div> : 
      <div className="feed-post-main">
        <div className="feed-no-feed">
          <h3>It looks like you're not following anyone yet!</h3>
          <div className="feed-no-feed-browse">
            <p> 
              <span>Browse </span>
              some posts to find people to follow.
            </p>
          </div>
        </div>
      </div>
    return (
      <div>
        <Navbar username={this.state.user.username} avatar={this.state.user.avatar}/>
        <div className="feed-main">
          <div className="user-info">
            <div className="user-info-inner">
              <div className="feed-stripe"></div>
              <img className="avatar-photo" src={avatar} />
              <div className="feed-name">
                <h4>{firstName} {lastName}</h4>
                <p>@{username}</p>
              </div>
              <div className="feed-user-info-details">
                <p><span>{this.state.posts}</span> posts</p>
                <p><span>{followers}</span> followers</p>
                <p><span>{followingNum}</span> following</p>
              </div>
            </div>
          </div>
          {feedSection}
        </div>
      </div>
    )
  }
}

export default Feed;