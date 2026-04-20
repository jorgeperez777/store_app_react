import React from "react";
import "./CommentsComponent.css";
import StarRatingComponent from "./StarRatingComponent";

const CommentsComponent = ({ listComments = [] }) => {
  return (
    <div>
      {listComments.map((comment, index) => (
        <div className="comment-item" key={index}>
          <div className="comment-rating-date">
            <StarRatingComponent rating={comment.rating} />
            <p className="comment-date">{comment.date}</p>
          </div>
          <div className="comment-text">
            <p>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsComponent;
