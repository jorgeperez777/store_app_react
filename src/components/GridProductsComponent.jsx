import React from "react";
import { Link } from "react-router-dom";
import "./GridProductsComponent.css";
import StarRatingComponent from "./StarRatingComponent";

function GridProductsComponent({ listProducts = [] }) {
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  return (
    <div className="grid">
      {listProducts.map((product, index) => (
        <Link to={`/product/${product.slug}`} key={product.id}>
          <div className="grid-item">
            <img
              className="grid-img"
              src={product.url_image}
              alt={product.name}
            />
            <p className="grid-provider">{product.provider.name}</p>
            <span className="grid-title">{product.name}</span>
            <div className="grid-rating">
              <StarRatingComponent rating={index + 1} />
            </div>
            <div className="grid-price">
              <p>{formatPrice(`${product.price}`)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GridProductsComponent;
