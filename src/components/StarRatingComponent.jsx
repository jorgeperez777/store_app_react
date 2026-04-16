import React from "react";
import { HiStar } from "react-icons/hi";
import './StarRatingComponent.css'

const StarRatingComponent = ({
  rating = 0,
  maxStars = 5,
  interactive = false,
  onChange = () => {},
}) => {
  const [hovered, setHovered] = React.useState(null);

  const getValue = (index) => {
    if (interactive && hovered !== null) return index <= hovered;

    return index <= rating;
  };

  return (
    <div className="star-rating">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
        <span
          key={star}
          className={`star ${getValue(star) ? "filled" : "empty"}`}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(null)}
          onClick={() => interactive && onChange?.(star)}
        >
          <HiStar className="star-size"/>
        </span>
      ))}
    </div>
  );
};

export default StarRatingComponent;
