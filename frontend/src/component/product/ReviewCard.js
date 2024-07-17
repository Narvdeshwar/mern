import ReactStars from 'react-rating-stars-component';
import React from "react";
import { FaRegUserCircle} from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: 5,
        isHalf: true
      }

  return (
    <div className="reviewCard">
      <img src={<FaRegUserCircle/>} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;