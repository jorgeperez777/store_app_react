import React from "react";
import { Link } from "react-router-dom";
import './CardProduct.css'

function CardProduct({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="card">
      <img src={product.url_image} alt={product.name} />
      <p>{product.name}</p>
    </Link>
  );
}

export default CardProduct;
