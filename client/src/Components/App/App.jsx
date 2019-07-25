import React from 'react';
import Landing from '../Landing/Landing.jsx';
import Browse from '../Browse/Browse.jsx';
import Feed from '../Feed/Feed.jsx';
import Post from '../Post/Post.jsx';
import User from '../User/User.jsx';
import CreatePostForm from '../CreatePostForm/CreatePostForm.jsx';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'landing',
      currentPost: {},
      userPage: {},
      user: {}
    }
    this.changeView = this.changeView.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.renderUserPage = this.renderUserPage.bind(this);
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
    }, this.changeView('post'));
  }

  renderUserPage(user) {
    this.setState({
      userPage: user
    }, this.changeView('user'));
  }

  renderView() {
    const { view } = this.state;

    if (view === 'landing') {
      return <Landing changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} />
    } else if (view === 'browse') {
      return <Browse user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} renderPost={(post) => this.renderPost(post)} /> 
    } else if (view === 'create') {
      return <CreatePostForm user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} />
    } else if (view === 'user') {
      return <User user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} renderPost={(post) => this.renderPost(post)} userPage={this.state.userPage}/> 
    } else if (view === 'feed') {
      return <Feed user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} renderPost={(post) => this.renderPost(post)}/>
    } else if (view === 'post') {
      return <Post post={this.state.currentPost} user={this.state.user} changeView={(option) => this.changeView(option)} changeUser={(user) => this.changeUser(user)} renderUserPage={(user) => this.renderUserPage(user)}/> 
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