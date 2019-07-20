import React from 'react';
import './CreatePostForm.css';
import Navbar from '../Navbar/Navbar.jsx'
import axios from 'axios';

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      title: "",
      restaurant: "",
      text: "",
      author: "",
      location: "",
      image: null,
      file: null,
      recommended: true, 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleYelp = this.handleYelp.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleYelp(e) {
    const { location } = this.state;
    this.setState({
      restaurant: e.target.value
    }, () => {
      axios.get('/yelp', { 
        params: { 
          term: this.state.restaurant, 
          location: location
        } 
      })
      .then(({ data }) => {
        var result = [];
        data.forEach(obj => {
          result.push(obj);
        });
        this.setState({
          restaurants: result
        });
      })
      .catch(err => console.log('Error accessing Yelp API: ', err))
    })
  }

  handlePickRestaurant(option) {
    this.setState({
      restaurant: option,
      restaurants: []
    });
    console.log(option);
  }

  render() {

    const dropdown = this.state.restaurants.length ? 
      <div className="create-post-dropdown">
        <h5>Search Results</h5>
        {this.state.restaurants.map((restaurant, i) => 
          <p className="dropdown-restaurant" key={i} onClick={() => this.handlePickRestaurant(restaurant)}>{restaurant.name}</p> 
        )}
      </div> : null;

    return(
      <div>
        <Navbar username={this.props.user.username} avatar={this.props.user.avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)}/>
        <div className="create-post">          
          <div className="create-post-container">
            <h1>Create New Post</h1>
            <form id="create-post-form">
              <input className="create-post-input" type="text" name="title" placeholder="Title" onChange={this.handleChange} required/>
              <input className="create-post-input" type="text" name="location" placeholder="Location" onChange={this.handleChange} required/>
              <div className="create-post-search">
                <input className="create-post-input" type="text" placeholder="Restaurant" value={this.state.restaurant.name} onChange={this.handleYelp} required/>
                {dropdown}
              </div>
              {/* <input style={result} type="file" onChange={this.handleUploadImage} required/>
              <textarea className="createTextArea" rows="100" cols="100" name="text" placeholder="What is your story..." onChange={this.handleChange} required></textarea> */}
              {/* <div className="createRecommend">
                <p>Recommend?</p>
                <div className="recommendContainer">
                  <input id="recommendYes" type="radio" name="recommend" value="recommendYes" checked={this.state.recommended} onChange={this.handleRecommend}></input>
                  <label htmlFor="recommendYes">
                    <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/happy_dbmo3c.png"></img>
                  </label>
                </div>
                <div className="recommendContainer">
                  <input id="recommendNo" type="radio" name="recommend" value="recommendNo" checked={!this.state.recommended} onChange={this.handleRecommend}></input>
                  <label htmlFor="recommendNo">
                    <img src="https://res.cloudinary.com/kjhogan/image/upload/v1536097829/sad_fcfqhu.png"></img>
                  </label>
                </div>
              </div> */}
              <button className="create-post-submit" type="submit">submit</button> 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePostForm;