import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ListProducts from "./pages/ListProducts";
import ListBrands from "./pages/ListBrands";
import ListProductProvider from "./pages/ListProductProvider";
import ListProductCategory from "./pages/ListProductCategory";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import SiginPage from "./pages/SiginPage";

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ListProducts />} />
        <Route path="/brands" element={<ListBrands />} />
        <Route path="/brand/:slug" element={<ListProductProvider />} />
        <Route path="/category/:slug" element={<ListProductCategory />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sign-in" element={<SiginPage />} />
      </Routes>
    </>
  );
}

export default App;
