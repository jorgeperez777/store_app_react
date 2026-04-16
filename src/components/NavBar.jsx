import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {
  HiOutlineCollection,
  HiChevronDown,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiShoppingCart,
} from "react-icons/hi";
import { RiMenu3Line } from "react-icons/ri";
import "./NavBar.css";
import { getCategories } from "../services/CategoriesApi";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../app/features/loginSlice";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // <- separado
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  // Simula si hay sesión iniciada — reemplaza con tu lógica real (context, redux, etc.)
  const user = { name: "Jorge Perez", email: "jorge@email.com" };
  const isLogin = useSelector((state) => state.loginSlice.isLogin);
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

  // Cuando se cierra el menú móvil, también cierra el dropdown móvil
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setMobileDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    setUserMenuOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", search);
    // Aquí tu lógica de búsqueda
  };
  // Iniciales del usuario para el avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <>
      <div className="position-nav-bar">
        <nav className="navbar">
          <NavLink to={"/"} className={"nav-logo"}>
            StoreAPP
          </NavLink>
          <div className="nav-links">
            {/* Dropdown */}
            {/* <div className="dropdown" ref={dropdownRef}>
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
          </div> */}
          </div>
          {/* Search bar */}
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch />
            </button>
          </form>

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
            <button className="cart-btn">
              <HiShoppingCart />
            </button>
          </div>
        </nav>
        <div className="bottom-options">
          <div className="search-bottom-mobile">
            <form
              className="search-bar"
              onSubmit={handleSearch}
              style={{ position: "sticky" }}
            >
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <AiOutlineSearch />
              </button>
            </form>
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

export default NavBar;
