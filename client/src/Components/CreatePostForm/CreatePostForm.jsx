import React from 'react';
import './CreatePostForm.css';
import Navbar from '../Navbar/Navbar.jsx'
import axios from 'axios';

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <Navbar username={this.props.user.username} avatar={this.props.user.avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)}/>
        <div className="create-post">          
          <div className="create-post-container">
            <h1>Create New Post</h1>
            <form id="create-post-form">
              <input className="create-post-input" type="text" name="title" placeholder="Title" onChange={this.handleChange} required/>
              <input className="create-post-input" type="text" name="location" placeholder="Location" onChange={this.handleChange} required/>
            
              <button className="create-post-submit" type="submit">submit</button> 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePostForm;