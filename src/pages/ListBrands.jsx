import React from "react";
import GridProvidersComponent from "../components/GridProvidersComponent";
import { getProviders } from "../services/ProvidersApi";

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
      <GridProvidersComponent listProviders={listProviders} />
    </div>
  );
};

export default ListBrands;
