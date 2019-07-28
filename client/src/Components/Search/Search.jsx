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
    let userList = this.state.usersMatch.length ? 
    this.state.usersMatch.map((user, i) => {
      return <div className="grid-item-five hvr-grow" key={i}><UserCard user={user} /></div>               
    }) : 
    <p className="result-p">No users found</p>;

    return(
      <div>
        <Navbar username={this.props.user.username} avatar={this.props.user.avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)} handleSearchTerm={(term) => this.props.handleSearchTerm(term)}/>
        {userList}
      </div>
    );
  }
}

export default Search;