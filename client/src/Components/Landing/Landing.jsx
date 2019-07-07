import React from 'react';
import './Landing.css';

const Landing = () => {
  return(
    <div className="landing-body">
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
          <a href="#">
              <button className="button-foil">log in</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;