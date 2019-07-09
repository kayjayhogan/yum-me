import React from 'react';
import AuthModal from '../AuthModal/AuthModal.jsx';
import './Landing.css';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    }
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
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

  render() {
    const modal = this.state.showModal ? 
    (<AuthModal handleHide={this.handleHideModal}></AuthModal>) : null;

    return(
      <div className="landing-body">
      {modal}
        <div className="landing-container">
          <div className="landing-container-flex">
            <div>
                <h2 className="landing-h2">welcome to</h2>
              <h1 className="landing-h1">yum.me</h1>
            </div>
            <div>
              <img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/front_yumme_zb17ua.png"></img>  
            </div>
          </div>
          <div className="landing-button-container">
            <a href="#">
              <button className="button-main">see what's new</button>
            </a>
            <a href="#" onClick={this.handleShowModal}>
                <button className="button-foil">log in</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;