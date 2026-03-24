import React from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { slug } = useParams();
  return (
    <div>
      ProductDetailPage
      <h1>Producto: {slug}</h1>
    </div>
  );
}

export default ProductDetailPage;
