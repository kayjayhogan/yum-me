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
      followers: 0,
      following: 0,
      posts: 0
    }
    this.fetchUserFeed = this.fetchUserFeed.bind(this);
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
    this.fetchFollowers = this.fetchFollowers.bind(this);
    this.fetchFollowing = this.fetchFollowing.bind(this);
  }

  componentDidMount () {
    this.fetchUserFeed();
    this.fetchUserPosts();
    this.fetchFollowers();
    this.fetchFollowing();
  }

  fetchUserFeed() {
    const { id } = this.state.user;
    axios.get(`/users/${id}/feed`)
    .then(({ data }) => this.setState({
      feed: data
    }))
    .catch(err => console.error('Error fetching user\'s feed: ', err));
  }

  fetchUserPosts() {
    const { id } = this.state.user;
    axios.get(`/users/${id}/posts`)
    .then(({ data }) => this.setState({
      posts: data.length
    }))
    .catch(err => console.error('Error getting user\'s posts: ', err));
  }

  fetchFollowers() {
    const { id } = this.state.user;
    axios.get(`/users/${id}/followers`)
    .then(({ data }) => this.setState({
      followers: data.length
    }))
    .catch(err => console.error('Error getting user\'s followers: ', err));
  }

  fetchFollowing() {
    const { id } = this.state.user;
    axios.get(`/users/${id}/following`)
    .then(({ data }) => this.setState({
      following: data.length
    }))
    .catch(err => console.error('Error getting user\'s following: ', err));
  }

  render () {
    const { firstname, lastname, username, avatar } = this.state.user;
    const { feed, following, followers } = this.state;
    const feedSection = this.state.feed.length > 0 ? 
      <div className="feed-post-main">
        {feed.map((post, i) => <FeedPost post={post} key={i} currentUser={username} currentAvatar={avatar} renderPost={(post) => this.props.renderPost(post)} renderUserPage={(user) => this.props.renderUserPage(user)}/>)}
      </div> : 
      <div className="feed-post-main">
        <div className="feed-no-feed">
          <h3>It looks like you're not following anyone yet!</h3>
          <div className="feed-no-feed-browse">
            <p> 
              <span onClick={() => this.props.changeView('browse')}>Browse </span>
              some posts to find people to follow.
            </p>
          </div>
        </div>
      </div>
    return (
      <div>
        <Navbar currentUser={this.state.user} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)} renderUserPage={(user) => this.props.renderUserPage(user)} handleSearchTerm={(term) => this.props.handleSearchTerm(term)}/>
        <div className="feed-main">
          <div className="user-info">
            <div className="user-info-inner">
              <div className="feed-stripe"></div>
              <img className="avatar-photo" src={avatar} />
              <div className="feed-name">
                <h4>{firstname} {lastname}</h4>
                <p>@{username}</p>
              </div>
              <div className="feed-user-info-details">
                <p><span>{this.state.posts}</span> posts</p>
                <p><span>{followers}</span> followers</p>
                <p><span>{following}</span> following</p>
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