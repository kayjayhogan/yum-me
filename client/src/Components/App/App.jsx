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

  render() {
    return(
      <div>
        <Landing />
      </div>
    );
  }
}

export default App;