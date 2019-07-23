import React from 'react';
import './Post.css';
import { IoMdStar, IoMdStarHalf } from 'react-icons/io';

const Stars = (props) => {
  const { rating } = props;
  let starDisplay;
  if(rating === "1") starDisplay = <span><IoMdStar /></span>;
  else if(rating === "1.5") starDisplay = <span><IoMdStar /><IoMdStarHalf /></span>;
  else if(rating === "2") starDisplay = <span><IoMdStar /><IoMdStar /></span>;
  else if(rating === "2.5") starDisplay = <span><IoMdStar /><IoMdStar /><IoMdStarHalf /></span>;
  else if(rating === "3") starDisplay = <span><IoMdStar /><IoMdStar /><IoMdStar /></span>;
  else if(rating === "3.5") starDisplay = <span><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStarHalf /></span>;
  else if(rating === "4") starDisplay = <span><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /></span>;
  else if(rating === "4.5") starDisplay = <span><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStarHalf /></span>;
  else if(rating === "5") starDisplay = <span><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /></span>;
  return(<p className="show-post-details">
    {starDisplay}
  </p>);
}

export default Stars;