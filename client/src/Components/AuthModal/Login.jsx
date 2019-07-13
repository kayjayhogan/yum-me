import React from 'react';
import { MdClose } from 'react-icons/md';
import './Auth.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="sign-in-modal">
        <span className="signin-modal-close" onClick={this.props.handleHide}><MdClose /></span>
        <div className="sign-in-modal-header">
          <img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452170/yumme_id_zihe1r.png"></img>
          <h3>Log In</h3>
        </div>
        <div className="signin-form">
          <input className="signin-form-input" type="text" placeholder="Email"></input>
          <input className="signin-form-input" type="password" placeholder="Password"></input>
          <button className="nav-modal-signin-btn">
            submit
          </button>      
          <p className="create-acct-label">Don't have an account yet?</p>      
          <p className="create-acct" onClick={() => this.props.changeAuthView("signup")}>Create one!</p>
        </div>
      </div>
    );
  }
}

export default Login;