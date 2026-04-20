import React from "react";
import { getProducts } from "../services/ProductsApi";
import GridProductsComponent from "../components/GridProductsComponent";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [listProducts, setListProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("q");

  React.useEffect(() => {
    setIsLoading(true);
    getProducts({ size_items: 10, page: 1, name: name })
      .then((response) => setListProducts(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, [name]);

  return (
    <div className="search-layout">
      <aside className="search-filters">
        <h3>Filtros</h3>
      </aside>
      <main className="search-list">
        <GridProductsComponent listProducts={listProducts} />
      </main>
    </div>
  );
};

export default SearchPage;
