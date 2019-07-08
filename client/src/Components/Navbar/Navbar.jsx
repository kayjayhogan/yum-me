import React from 'react';
import './Navbar.css';
import { FaBars, FaUser, FaSearch } from 'react-icons/fa';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      username: this.props.username,
      avatar: this.props.avatar,
      term: '',
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMenu() {
    let mainNav = document.getElementById("js-menu");
    mainNav.classList.toggle('active');
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      redirect: true
    });
  }

  render() {
   
    return(
      <div>
        <nav className="navbar">
          <span className="navbar-toggle" onClick={this.handleMenu}>
            <FaBars />
          </span>
          <div>
            {yummeLink}
          </div>
          <div className="nav-search-input-container">
            <div className="nav-search-flex">
              <form onSubmit={this.handleSubmit}>
                <span className="nav-search-icon"><FaSearch /></span>          
                <input id="nav-search-input" onChange={this.handleChange} placeholder="search" ></input>                
              </form>
            </div>
          </div>
          <ul className="main-nav" id="js-menu">
            <div>
              <li>
                <a href="#" className="nav-links">browse</a>
              </li>     
            </div>
            <div>
              <li>
                <a href="#" className="nav-links">create post</a>
              </li>     
            </div>
            <div>
              <li>
                <a href="#" className="nav-links">log in</a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;