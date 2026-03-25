import React from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductsApi";
import CardProduct from "../components/CardProduct";

function HomePage() {
  const [listProducts, setListProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    getProducts({ size_items: 10, page: 1 })
      .then((response) => setListProducts(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      HomePage
      <ul>
        {listProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
