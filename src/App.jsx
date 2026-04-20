import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ListProducts from "./pages/ListProducts";
import ListBrands from "./pages/ListBrands";
import ListProductProvider from "./pages/ListProductProvider";
import ListProductCategory from "./pages/ListProductCategory";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ListProducts />} />
      <Route path="/brands" element={<ListBrands />} />
      <Route path="/brand/:slug" element={<ListProductProvider />} />
      <Route path="/category/:slug" element={<ListProductCategory />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
