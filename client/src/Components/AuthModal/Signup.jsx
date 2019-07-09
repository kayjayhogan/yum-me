import React from 'react';
import { MdClose } from 'react-icons/md';
import './Auth.css';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
    this.handleShowPassword = this.handleShowPassword.bind(this);
  }

  handleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  render() {
    return(
      <div className="account-modal">
        <span className="signin-modal-close" onClick={this.props.handleHide}><MdClose /></span>
        <div className="account-modal-header">
          <img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452172/yumme_signup_kuh9ij.png"></img>
          <h2>Sign Up</h2>
        </div>
        <form>
          <input type="text" className="account-form-name" style={{marginRight: "1%"}} placeholder="First name"></input>
          <input type="text" className="account-form-name" style={{marginLeft: "1%"}} placeholder="Last name"></input>
          <input type="email" className="account-form-input" placeholder="Email"></input>
          <div style={{position: "relative"}}>
            <input type={this.state.showPassword ? "text" : "password"} className="account-form-input" placeholder="Password (8 character minimum)"></input>
            <span className="account-show-password" onClick={this.handleShowPassword}>Show</span>
          </div>
          <button className="nav-modal-signin-btn">
            submit
          </button>
        </form>
        <p className="account-modal-signin-label">Have an account?</p>
        <p className="account-modal-signin" onClick={() => this.props.changeView("login")}>Sign in</p>
      </div>
    );
  }
}

export default Signup;