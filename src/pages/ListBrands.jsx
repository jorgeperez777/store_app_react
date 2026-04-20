import React from "react";
import GridProvidersComponent from "../components/GridProvidersComponent";
import { getProviders } from "../services/ProvidersApi";
import './ListBrands.css'

const ListBrands = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [listProviders, setLisProviders] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    getProviders({})
      .then((response) => setLisProviders(response.data.data))
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div className="title-section-brands">
        <span>Nuestras marcas</span>
      </div>
      <GridProvidersComponent listProviders={listProviders} numColumns={4}/>
    </div>
  );
};

export default ListBrands;
