import React from 'react';
import Landing from '../Landing/Landing.jsx';
import Browse from '../Browse/Browse.jsx';
import Feed from '../Feed/Feed.jsx';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'browse',
      currentPost: '',
      posts: [],
      user: {}
    }
    this.changeView = this.changeView.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  changeUser(user) {
    this.setState({
      user: user
    });
  }

  renderView() {
    const { view } = this.state;

    if (view === 'landing') {
      return <Landing />
    } else if (view === 'browse') {
      return <Browse user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)}/> 
    } else if (view === 'createPost') {
      // post component
    } else if (view === 'user') {
      // user component
    } else if (view === 'feed') {
      return <Feed user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)}/>
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