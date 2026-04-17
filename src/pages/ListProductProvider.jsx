import React from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/ProductsApi";
import GridProductsComponent from "../components/GridProductsComponent";
import "./ListProductProvider.css";

const ListProductProvider = () => {
  const { slug } = useParams();
  const [listProducts, setListProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    getProducts({ size_items: 10, page: 1, provider_slug: slug })
      .then((response) => setListProducts(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, [slug]);

  return (
    <div  className="provider-layout">
      <aside className="provider-filters">
        <h3>Filtros</h3>
      </aside>
      <main className="provider-list">
        <GridProductsComponent listProducts={listProducts} />
      </main>
    </div>
  );
};

export default ListProductProvider;
