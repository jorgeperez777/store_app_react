import React from "react";
import { getProducts } from "../services/ProductsApi";
import CarouselComponent from "../components/CarouselComponent";
import GridProductsComponent from "../components/GridProductsComponent";
import { Link } from "react-router-dom";
import "./HomePage.css";
import SectionComponent from "../components/SectionComponent";
import { getProviders } from "../services/ProvidersApi";
import GridProvidersComponent from "../components/GridProvidersComponent";
import GridInfoComponent from "../components/GridInfoComponent";

function HomePage() {
  const [listProducts, setListProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [listProviders, setLisProviders] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    getProducts({ size_items: 5, page: 1 })
      .then((response) => setListProducts(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    getProviders({ size_items: 5 })
      .then((response) => setLisProviders(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, []);
  const carouselItems = [
    {
      name: "",
      url_image:
        "https://res.cloudinary.com/djx6viedj/image/upload/t_desktop_banner/giocslm02k59k3xiam0w0x03wnow?_a=BACCd2Ev",
    },
    {
      name: "",
      url_image:
        "https://res.cloudinary.com/djx6viedj/image/upload/t_desktop_banner/967g30q4r8iobxnvmq9ppigj6rm3?_a=BACCd2Ev",
    },
    {
      name: "",
      url_image:
        "https://res.cloudinary.com/djx6viedj/image/upload/t_desktop_banner/isqc4sj9dss4wsg6g020lx8vxt0f?_a=BACCd2Ev",
    },
  ];

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <CarouselComponent listItems={carouselItems} />

      <div style={{marginTop: 50}}>
        <SectionComponent navigateTo="/products" title="Productos destacados" />
        <GridProductsComponent listProducts={listProducts} />
      </div>
      <div style={{marginTop: 50}}>
        <SectionComponent navigateTo="/brands" title="Las mejores marcas" />
        <GridProvidersComponent listProviders={listProviders} />
      </div>
      <div>
        <GridInfoComponent />
      </div>
    </div>
  );
}

export default HomePage;
