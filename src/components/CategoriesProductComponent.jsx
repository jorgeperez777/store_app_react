import React from "react";
import "./CategoriesProductComponent.css";
import { Link } from "react-router-dom";

const CategoriesProductComponent = ({ provider = {}, categories = [] }) => {
  return (
    <div className="categories-main">
      <CardCategory name={provider.name} to={`/brand/${provider.slug}`}/>
      {categories.map((category) => (
        <div key={category.id} className="row-btns-categories">
          <CardCategory name={category.name} to={`/category/${category.slug}`} />
        </div>
      ))}
    </div>
  );
};

const CardCategory = ({ name = "", to = "" }) => {
  return (
    <Link to={to} className="categories-btn">
      <p>{name}</p>
    </Link>
  );
};

export default CategoriesProductComponent;
