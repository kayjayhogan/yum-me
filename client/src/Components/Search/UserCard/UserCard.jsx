import React from 'react';
import axios from 'axios';
import './UserCard.css';
import { MdLocationOn } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  componentDidMount() {
    console.log("user nacrd");
  }

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        <p>{user.username}</p>
        <p>{user.firstname}</p>
        <p>{user.lastname}</p>
      </div>
    );
  }
} 

export default UserCard;