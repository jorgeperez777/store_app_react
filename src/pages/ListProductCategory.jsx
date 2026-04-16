import React from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/ProductsApi";
import GridProductsComponent from "../components/GridProductsComponent";

const ListProductCategory = () => {
  const { slug } = useParams();
  const [listProducts, setListProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    setIsLoading(true);
    getProducts({ size_items: 10, page: 1, category_slug: slug })
      .then((response) => setListProducts(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, [slug]);

  return (
    <div>
      <GridProductsComponent listProducts={listProducts} />
    </div>
  );
};

export default ListProductCategory;
