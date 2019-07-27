import React from 'react';
import './CreatePostForm.css';
import Navbar from '../Navbar/Navbar.jsx'
import axios from 'axios';
import { FaQuestionCircle, FaInfo } from 'react-icons/fa'; 

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      title: "",
      restaurant: {},
      descript: "",
      author: this.props.user,
      location: "",
      image: "",
      file: null,
      recommended: true, 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleYelp = this.handleYelp.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleRecommend = this.handleRecommend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  handleImageUpload(e) {
    e.preventDefault();
    this.setState({
      file: e.target.files[0]
    });
  }

  handleRecommend(e) {
    if(e.target.value === 'recommendYes') {
      this.setState({
        recommended: true
      });
    } else if(e.target.value === 'recommendNo') {
      this.setState({
        recommended: false
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('create-post-form').reset();
    // first handle posting restaurant
    const { restaurant } = this.state;
    let options = {
      rest_name: restaurant.name,
      address_city: restaurant.location.city,
      address_state: restaurant.location.state,
      address_country: restaurant.location.country,
      rest_url: restaurant.url,
      price: restaurant.price,
      rating: restaurant.rating
    }
    axios.post('/restaurants', options)
    // then handle posting post
    .then(async ({ data }) => {
      const { file } = this.state;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', `${process.env.PASSWORD}`);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NAME}/image/upload`,
        formData
      );
      let postOptions = { 
        title: this.state.title, 
        author_id: this.state.author.id,
        restaurant_id: data.id,
        descript: this.state.descript,
        recommended: this.state.recommended, 
        img_url: response.data.url
      };
      return axios.post('/posts', postOptions)
    })
    .then(() => {
      this.setState({
        restaurants: [],
        title: "",
        restaurant: {},
        descript: "",
        location: "",
        image: "",
        file: null,
        recommended: true, 
      }, console.log("Successfully posted restaurant."))
    })
    .catch(err => console.log("Error posting restaurant: ", err));
  }

  render() {
    const dropdown = this.state.restaurants.length ? 
      <div className="create-post-dropdown">
        <h3>Search Results</h3>
        {this.state.restaurants.map((restaurant, i) => 
          <p className="dropdown-restaurant" key={i} onClick={() => this.handlePickRestaurant(restaurant)}>{restaurant.name}</p> 
        )}
      </div> : null;

    return(
      <div>
        <Navbar username={this.props.user.username} avatar={this.props.user.avatar} changeView={(option) => this.props.changeView(option)} changeUser={(user) => this.props.changeUser(user)} handleSearchTerm={(term) => this.props.handleSearchTerm(term)}/>
        <div className="create-post">          
          <div className="create-post-container">
            <h1>Create New Post</h1>
            <form id="create-post-form" onSubmit={this.handleSubmit}>
              <label className="create-post-label">
                Choose a title for your post:
                <input className="create-post-input" type="text" name="title" placeholder="Title" onChange={this.handleChange} required/>
              </label>
              <label className="create-post-label">
                <div className="tooltip">
                  Restaurant location:
                  <span className="question-icon"><FaQuestionCircle /></span>
                  <span className="tooltip-text">
                    <span className="info-icon"><FaInfo /></span>
                    Search for any restaurant available on Yelp! Enter the location
                    of the restaurant (e.g., Los Angeles, CA), begin typing in the restaurant name, and Yelp will
                    find all results that match. Pick the restaurant you want to write about!
                  </span>
                </div>
                <input className="create-post-input" type="text" name="location" placeholder="Location" onChange={this.handleChange} required/>
              </label>
              <label className="create-post-label">
                Restaurant name:
                <div className="create-post-search">
                  <input className="create-post-input" type="text" placeholder="Restaurant" value={this.state.restaurant.name} onChange={this.handleYelp} required/>
                  {dropdown}
                </div>
              </label>
              <label className="create-post-label">
                Upload a picture of your experience:
                <input className="create-post-image-input" type="file" onChange={this.handleImageUpload} required/>
              </label>
              <label className="create-post-textarea-container">
                Post content:
                <textarea className="create-post-textarea" rows="100" cols="100" name="descript" placeholder="Tell us all about it!" onChange={this.handleChange} required></textarea>
              </label>
              <div className="create-post-recommend">
                <p>Recommend?</p>
                <div className="create-recommend-container">
                  <input id="recommendYes" type="radio" name="recommend" value="recommendYes" checked={this.state.recommended} onChange={this.handleRecommend}></input>
                  <label htmlFor="recommendYes">
                    <img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452169/yumme_4_ukpyej.png"></img>
                  </label>
                </div>
                <div className="create-recommend-container">
                  <input id="recommendNo" type="radio" name="recommend" value="recommendNo" checked={!this.state.recommended} onChange={this.handleRecommend}></input>
                  <label htmlFor="recommendNo">
                    <img src="https://res.cloudinary.com/kjhogan/image/upload/v1562452170/yumme_2_wphphq.png"></img>
                  </label>
                </div>
              </div>
              <button className="create-post-submit" type="submit">submit</button> 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePostForm;