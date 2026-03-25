import React from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/ProductsApi";

function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    getProduct({ slug: slug })
      .then((response) => setProduct(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      ProductDetailPage
      <h1>{product.name}</h1>
      <img src={product.url_image} alt={product.name} />
    </div>
  );
}

export default ProductDetailPage;
