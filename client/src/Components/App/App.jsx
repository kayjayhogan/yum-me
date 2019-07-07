import React from 'react';
import Landing from '../Landing/Landing.jsx';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'landing',
      currentPost: '',
      posts: []
    }
  }

  renderView() {
    const { view } = this.state;

    if (view === 'landing') {
      return <Landing />
    } else if (view === 'browse') {
      // browse component
    } else if (view ==='login') {
      // login component (modal instead?)
    } else if (view ==='signup') {
      // signup component (modal instead?)
    } else if (view === 'createPost') {
      // post component
    } else if (view === 'user') {
      // user component
    } else if (view === 'feed') {
      // feed component
    } 
  }

  render() {
    return(
      <div>
        {this.renderView()}
      </div>
    );
  }
}

export default App;