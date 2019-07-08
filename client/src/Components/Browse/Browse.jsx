import React from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.jsx';
import PostCard from './PostCard/PostCard.jsx';
import './Browse.css';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    axios.get('/browse')
      .then(({ data }) => this.setState({
        posts: data
      }))
      .catch(err => console.log('Could not fetch posts: ', err));
  }

  render() {
    return(
      <div>
        <Navbar />
        <h1 className="browse-h1">Recent Posts</h1>
        <div className="browse-wrap">
          <div className="four-col-grid">
            {this.state.posts.map((post, i) => {
              return <div className="grid-item hvr-grow" key={i}><PostCard post={post} /></div>               
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Browse;