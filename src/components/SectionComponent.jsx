import React from "react";
import { Link } from "react-router-dom";
import "./SectionComponent.css";

const SectionComponent = ({ navigateTo = "", title = "" }) => {
  return (
    <div className="product-section">
      <span className="title-section">{title}</span>

      <Link to={navigateTo} className="btn-section-product">
        Ver todos
      </Link>
    </div>
  );
};

export default SectionComponent;
