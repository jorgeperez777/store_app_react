import React from "react";
import "./GridProvidersComponent.css";
import { Link } from "react-router-dom";

const GridProvidersComponent = ({ listProviders = [],  numColumns = 5}) => {
  return (
    <div className="grid-provider" style={{"--columns": numColumns}}>
      {listProviders.map((provider) => (
        <Link to={`/brand/${provider.slug}`} key={provider.id}>
          <div className="grid-item-provider">
            <img className="grid-img-provider" src={provider.url_image} alt={provider.name} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GridProvidersComponent;
