import React from 'react';
import Modal from './Modal.jsx';
import { MdClose } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import './AuthModal.css';

class AuthModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      showPassword: false
    };
    this.handleAccount = this.handleAccount.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
  }

  handleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  handleAccount() {
    this.setState({
      createAccount: !this.state.createAccount,
      forgotPassword: false
    });
  }

  render() {
    let modal;
    if (this.state.createAccount) {
      modal = (
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
        <p className="account-modal-signin" onClick={this.handleAccount}>Sign in</p>
      </div>)
    } else {
      modal = (     
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
            <p className="create-acct" onClick={this.handleAccount}>Create one!</p>
          </div>
        </div>)
    }
    return(<Modal><div className="sign-in-modal-container">{modal}</div></Modal>);
  }
  
}

export default AuthModal;