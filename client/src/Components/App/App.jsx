import React from 'react';
import Landing from '../Landing/Landing.jsx';
import Browse from '../Browse/Browse.jsx';
import Feed from '../Feed/Feed.jsx';
import Post from '../Post/Post.jsx';
import CreatePostForm from '../CreatePostForm/CreatePostForm.jsx';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'create',
      currentPost: {},
      user: {}
    }
    this.changeView = this.changeView.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.renderPost = this.renderPost.bind(this);
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

  renderPost(post) {
    this.setState({
      currentPost: post
    }, this.changeView('post'))
  }

  renderView() {
    const { view } = this.state;

    if (view === 'landing') {
      return <Landing changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} />
    } else if (view === 'browse') {
      return <Browse user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} renderPost={(post) => this.renderPost(post)}/> 
    } else if (view === 'create') {
      return <CreatePostForm user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} />
    } else if (view === 'user') {
      // user component
    } else if (view === 'feed') {
      return <Feed user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} renderPost={(post) => this.renderPost(post)}/>
    } else if (view === 'post') {
      return <Post post={this.state.currentPost} user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)}/>
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