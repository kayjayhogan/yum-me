import React from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import './Auth.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post('/login', { email, password })
      .then(async ({ data }) => {
        if(typeof data === 'object') {
          await this.props.changeUser(data);
          this.props.changeView('feed');
        } else {
          alert("Sorry, that password is not correct.")
        }
      })
      .catch(err => {
        alert("Could not login. Please double-check your login credentials.");
        console.log("Could not login user: ", err)
      });
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
          <form onSubmit={this.handleSubmit}>
            <input name="email" className="signin-form-input" type="text" placeholder="Email" onChange={this.handleChange}></input>
            <input name="password" className="signin-form-input" type="password" placeholder="Password" onChange={this.handleChange}></input>
            <button type="submit" className="nav-modal-signin-btn">
              submit
            </button>                  
          </form>
          <p className="create-acct-label">Don't have an account yet?</p>      
          <p className="create-acct" onClick={() => this.props.changeAuthView("signup")}>Create one!</p>
        </div>
      </div>
    );
  }
}

export default Login;