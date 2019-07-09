import React from 'react';
import Modal from './Modal.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import { MdClose } from 'react-icons/md';
import './Auth.css';

class AuthModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'login'
    };
    this.changeAuthView = this.changeAuthView.bind(this);
  }
 
  renderAuthView() {
    const { view } = this.state;
    if (view === 'login') {
      return <Login changeView={(view) => this.changeAuthView('signup')} handleHide={this.props.handleHide}/>
    } else if(view === 'signup') {
      return <Signup changeView={(view) => this.changeAuthView('login')} handleHide={this.props.handleHide}/>
    } 
  }

  changeAuthView(option) {
    this.setState({
      view: option
    });
  }

  render() {
    return(
    <Modal>
      <div className="sign-in-modal-container">
        {this.renderAuthView()}
      </div>
    </Modal>);
  }
  
}

export default AuthModal;