import React from "react";
import { getProducts } from "../services/ProductsApi";
import GridProductsComponent from "../components/GridProductsComponent";
import "./ListProducts.css";

const ListProducts = () => {
  const [listProducts, setListProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    getProducts({ size_items: 10, page: 1 })
      .then((response) => setListProducts(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="product-layout">
      <aside className="product-filters">
        <h3>Filtros</h3>
      </aside>
      <main className="product-list">
        <GridProductsComponent listProducts={listProducts} />
      </main>
    </div>
  );
};

export default ListProducts;
