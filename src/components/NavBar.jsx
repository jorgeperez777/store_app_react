import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {
  HiOutlineCollection,
  HiChevronDown,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiShoppingCart,
  HiX,
} from "react-icons/hi";
import { RiMenu3Line } from "react-icons/ri";
import "./NavBar.css";
import { getCategories } from "../services/CategoriesApi";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../app/features/loginSlice";
import { getProducts } from "../services/ProductsApi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const user = { name: "Jorge Perez", email: "jorge@email.com" };
  const isLogin = useSelector((state) => state.loginSlice.isLogin);
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.log(error, "error"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = Object.values(cartItems).length;

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    setUserMenuOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    setSearchOpen(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim().length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    getProducts({ size_items: 5, page: 1, name: value })
      .then((res) => {
        setSearchResults(res.data.data);
        setSearchOpen(true);
      })
      .catch(console.error);
  };

  const searchBarIsFocused = () => {
    if (setSearchResults.length > 0) {
      setSearchOpen(true);
    }
  };

  const onCleanSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearch("");
    setSearchResults([]);
    setSearchOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const onNavigateSearch = () => {
    navigate(`/search?q=${search}`);
  };
  const onNavigateCart = () => {
    navigate(`/cart`);
  };
  return (
    <>
      <div className="position-nav-bar">
        <nav className="navbar">
          <NavLink to={"/"} className={"nav-logo"}>
            StoreAPP
          </NavLink>
          <div className="nav-links"></div>
          {/* Search bar */}
          <SearchBar
            handleSearch={handleSearch}
            searchRef={searchRef}
            search={search}
            handleSearchChange={handleSearchChange}
            searchOpen={searchOpen}
            searchResults={searchResults}
            onFocus={searchBarIsFocused}
            onCleanSearch={onCleanSearch}
            setSearchOpen={setSearchOpen}
            onNavigateSearch={onNavigateSearch}
          />
          {/* CartButton */}
          <div className="cart-option">
            {/* Sesión — escritorio */}
            {isLogin ? (
              <div className="user-menu" ref={userMenuRef}>
                <button
                  className="user-avatar"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {getInitials(user.name)}
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    <div className="user-dropdown-divider" />
                    <div className="user-options">
                      <NavLink
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <HiOutlineUser /> Mi Perfil
                      </NavLink>
                      <NavLink
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <HiOutlineCog /> Configuración
                      </NavLink>
                    </div>
                    <div className="user-dropdown-divider" />
                    <button className="logout-btn" onClick={handleLogout}>
                      <HiOutlineLogout /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className="nav-btn-ghost"
                  onClick={() => dispatch(setIsLogin(true))}
                >
                  Sign in
                </button>
                {isLogin && (
                  <NavLink to="/register" className="nav-btn">
                    Sign in
                  </NavLink>
                )}
              </div>
            )}
            <button className="cart-btn" onMouseDown={onNavigateCart}>
              <HiShoppingCart />
              {cartCount > 0 && ( // 👈 Solo muestra si hay items
                <span className="cart-badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
        <div className="bottom-options">
          <div className="search-bottom-mobile">
            <SearchBar
              handleSearch={handleSearch}
              searchRef={searchRef}
              search={search}
              handleSearchChange={handleSearchChange}
              searchOpen={searchOpen}
              searchResults={searchResults}
              onFocus={searchBarIsFocused}
              onCleanSearch={onCleanSearch}
              setSearchOpen={setSearchOpen}
              onNavigateSearch={onNavigateSearch}
            />
          </div>
          {/* Dropdown */}
          <div className="bottom-btns">
            <div className="dropdown" ref={dropdownRef}>
              <button
                className="dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <HiOutlineCollection /> Categorias{" "}
                <HiChevronDown
                  className={`chevron ${dropdownOpen ? "rotated" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {categories.map((category) => (
                    <NavLink
                      key={category.id}
                      to={`/category/${category.slug}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchBar = ({
  handleSearch = () => {},
  searchRef = null,
  search = "",
  handleSearchChange = () => {},
  searchOpen = false,
  searchResults = [],
  onFocus = () => {},
  onCleanSearch = () => {},
  setSearchOpen = () => {},
  onNavigateSearch = () => {},
}) => {
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  return (
    <form className="search-bar" onSubmit={handleSearch} ref={searchRef}>
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleSearchChange}
        onFocus={onFocus}
        autoComplete="off"
      />
      {search != "" ? (
        <button type="button" onMouseDown={onCleanSearch}>
          <HiX />
        </button>
      ) : (
        <button type="button" onMouseDown={onNavigateSearch}>
          <AiOutlineSearch />
        </button>
      )}
      {/* Dropdown de resultados */}
      {searchOpen && searchResults.length > 0 && (
        <div className="search-dropdown">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="search-result-item"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setSearchOpen(false)}
            >
              <img src={product.url_image} alt={product.name} />
              <div className="search-result-info">
                <span className="search-result-name">{product.name}</span>
                <span className="search-result-price">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
          ))}

          {/*  Botón ver todos */}
          <Link
            to={`/search?q=${search}`}
            className="search-result-all"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setSearchOpen(false)}
          >
            Ver todos los resultados para "{search}"
          </Link>
        </div>
      )}
    </form>
  );
};

export default NavBar;
