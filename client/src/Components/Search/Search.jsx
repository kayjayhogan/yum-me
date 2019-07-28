import React from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.jsx';
import PostCard from '../Browse/PostCard/PostCard.jsx';
import UserCard from './UserCard/UserCard.jsx';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.term,
      postsTitleMatch: [],
      postsRestaurantMatch: [],
      usersMatch: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch() {
    const { term } = this.state;
    axios.get('/search', { 
      params: { term }
    })
    .then(({ data }) => {
      this.setState({
        postsTitleMatch: data.postMatches,
        postsRestaurantMatch: data.restaurantMatches,
        usersMatch: data.userMatches
      });
    })
    .catch(err => console.log('Could not complete search: ', err)); 
  }

  render() {
    // showing user matches
    let userList = this.state.usersMatch.length ? 
    this.state.usersMatch.map((user, i) => {
      return <div className="grid-item-five hvr-grow" key={i} onClick={() => this.props.renderUserPage(user)}><UserCard user={user} /></div>               
    }) : 
    <p className="result-p">No users found</p>;
    // showing posts with title match
    let postTitleList = this.state.postsTitleMatch.length ? 
      this.state.postsTitleMatch.map((post, i) => {
        return <div className="grid-item-four hvr-grow" key={i} onClick={() => this.props.renderPost(post)}><PostCard post={post} /></div>               
      }) : 
      <p className="result-p">No posts found</p>;
    // showing posts with restaurant match
    let postRestaurantList = this.state.postsRestaurantMatch.length ? 
      this.state.postsRestaurantMatch.map((result, i) => {
        return <div className="grid-item-four hvr-grow" key={i} onClick={() => this.props.renderPost(result["to_json"])}><PostCard post={result["to_json"]} /></div>               
      }) : 
      <p className="result-p">No posts found</p>;

    let users = this.state.usersMatch.length === 1 ? "user" : "users";
    let postsT = this.state.postsTitleMatch.length === 1 ? "post" : "posts";
    let postsR = this.state.postsRestaurantMatch.length === 1 ? "restaurant" : "restaurants";
    return(
      <div>
        <Navbar username={this.props.user.username} avatar={this.props.user.avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)} handleSearchTerm={(term) => this.props.handleSearchTerm(term)}/>
        <div className="search">
          <h1>Search Results for "{this.state.term}"</h1>
          <div className="search-user-container">
          {/* USERS */}
          <div className="browse-wrap">
            <h2><strong>{this.state.usersMatch.length}</strong> {users}</h2>
              <div className="col-grid">
                {userList}
              </div>
            </div>
          </div>
          <div>
            {/* POSTS */}
            <div className="browse-wrap">
              <h2><strong>{this.state.postsTitleMatch.length}</strong> {postsT}</h2>
              <div className="col-grid">
                {postTitleList}
              </div>
            </div>
          </div>
          <div>
            {/* RESTAURANTS */}
            <div className="browse-wrap">
              <h2><strong>{this.state.postsRestaurantMatch.length}</strong> {postsR}</h2>
              <div className="col-grid">
                {postRestaurantList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;