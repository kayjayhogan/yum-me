import React from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import './Auth.css';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password:'',
      password2: '',
      file: '',
      location: ''
    };
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUploadImage(e){
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    });
  }

  async handleSubmit(e){
    e.preventDefault();
    const { file } = this.state;  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.PASSWORD}`);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NAME}/image/upload`,
      formData
    );
    const { username, firstName, lastName, email, password, password2, location } = this.state;
    let avatar = response.data.url;
    axios.post('/register', { username, firstName, lastName, email, password, password2, avatar, location })
      .then(async ({ data }) => {
        await this.props.changeUser(data);
        this.props.changeView('feed');
      })
      .then(this.form.reset())
      .catch(err => console.log("Could not register user: ", err));
  }

  render() {
    return(
      <div className="account-modal">
        <span className="signin-modal-close" onClick={this.props.handleHide}><MdClose /></span>
        <div className="account-modal-header">
          <img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452172/yumme_signup_kuh9ij.png"></img>
          <h2>Sign Up</h2>
        </div>
        <form onSubmit = {this.handleSubmit} ref={form => this.form = form}>
          <div className="account-form-name">
            <input type="text" name="firstName" style={{marginRight: "2px"}} placeholder="First name" onChange={this.handleChange} required></input>
            <input type="text" name="lastName" style={{marginLeft: "2px"}} placeholder="Last name" onChange={this.handleChange} required></input>
          </div>
          <input type="text" name="username" className="account-form-input" placeholder="Username" onChange={this.handleChange} required></input>          
          <input type="email" name="email" className="account-form-input" placeholder="Email" onChange={this.handleChange} required></input>          
          <div style={{position: "relative"}}>
            <input type={this.state.showPassword ? "text" : "password"} name="password" className="account-form-input" minLength="6" placeholder="Password (6 character minimum)" onChange={this.handleChange} required></input>
            <span className="account-show-password" onClick={this.handleShowPassword}>Show</span>
          </div>
          <input type="password" name="password2" className="account-form-input" placeholder="Confirm Password" onChange={this.handleChange} required></input>         
          <input type="text" name="location" className="account-form-input" placeholder="Location (City, State)" onChange={this.handleChange} required></input>         
          <div>
            <label>
              Avatar:
              <input type="file" onChange={this.handleUploadImage} />
            </label>
          </div>
          <button className="nav-modal-signin-btn" type="submit">
            submit
          </button>
        </form>
        <p className="account-modal-signin-label">Have an account?</p>
        <p className="account-modal-signin" onClick={() => this.props.changeAuthView("login")}>Sign in</p>
      </div>
    );
  }
}

export default Signup;