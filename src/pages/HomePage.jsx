import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      HomePage
      <div>
        <Link to="/product/123">Ver producto</Link>
      </div>
    </div>
  );
}

export default HomePage;
