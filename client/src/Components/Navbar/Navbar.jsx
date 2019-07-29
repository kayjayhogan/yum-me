import React from 'react';
import AuthModal from '../AuthModal/AuthModal.jsx';
import './Navbar.css';
import { FaBars, FaUser, FaSearch } from 'react-icons/fa';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      term: '',
      showModal: false,
      currentUser: this.props.currentUser
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleShowModal() {
    this.setState({
      showModal: true
    });
  }

  handleHideModal() {
    this.setState({
      showModal: false
    });
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
    this.props.handleSearchTerm(this.state.term);
  }

  handleLogout() {
    this.props.changeUser({});
    this.props.changeView('browse');
  }

  render() {
    const { currentUser } = this.state;
    const modal = this.state.showModal ? 
    (<AuthModal handleHide={this.handleHideModal} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)}></AuthModal>) : null;
   
    const clickLogoView = currentUser.username ? 'feed' : 'landing';

    // rightmost part of navbar, depending on whether logged in
    const mainNav = currentUser.username ? 
      <ul className="main-nav" id="js-menu">
        <div>
          <li>
            <a onClick={() => this.props.changeView('browse')} className="nav-links">browse</a>
          </li>     
        </div>
        <div>
          <li>
            <a onClick={() => this.props.changeView('create')} className="nav-links">create post</a>
          </li>     
        </div>
        <div>
          <li>
            <a onClick={this.handleLogout} className="nav-links">log out</a>
          </li>
        </div>
        <div>
          <li>
            <a onClick={() => this.props.renderUserPage(currentUser)} className="nav-links"><FaUser /> {currentUser.username}</a>
          </li>
        </div>
      </ul> :
      <ul className="main-nav" id="js-menu">
        <div>
          <li>
            <a onClick={() => this.props.changeView('browse')} className="nav-links">browse</a>
          </li>     
        </div>
        <div>
          <li>
            <a href="#" className="nav-links">create post</a>
          </li>     
        </div>
        <div>
          <li>
            <a className="nav-links" onClick={this.handleShowModal}>log in</a>
          </li>
        </div>
      </ul>

    return(
      <div>
        {modal}
        <nav className="navbar">
          <span className="navbar-toggle" onClick={this.handleMenu}>
            <FaBars />
          </span>
          <div className="nav-logo-container" onClick={() => this.props.changeView(clickLogoView)}>
            <a className="nav-logo">
              <img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_logo_white_plvcb7.png"></img>        
            </a>
            <a className="nav-logo">
              yum.me      
            </a>
          </div>
          <div className="nav-search-input-container">
            <div className="nav-search-flex">
              <form onSubmit={this.handleSubmit}>
                <span className="nav-search-icon"><FaSearch /></span>          
                <input id="nav-search-input" onChange={this.handleChange} placeholder="search" ></input>                
              </form>
            </div>
          </div>
          {mainNav}
        </nav>
      </div>
    );
  }
}

export default Navbar;