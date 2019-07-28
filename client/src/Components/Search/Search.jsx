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
      posts: [],
      users: []
    };
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        {this.state.term}
      </div>
    );
  }
}

export default Search;