import { Link } from "react-router-dom";
import "./FooterComponent.css";

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Logo y descripción */}
        <div className="footer-brand">
          <h2 className="footer-logo">StoreAPP</h2>
          <p>Tu tienda de confianza con los mejores productos y precios.</p>
        </div>

        {/* Links de navegación */}
        <div className="footer-col">
          <h4>Tienda</h4>
          <ul>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/categories">Categorías</Link></li>
            <li><Link to="/offers">Ofertas</Link></li>
            <li><Link to="/new">Novedades</Link></li>
          </ul>
        </div>

        {/* Información */}
        <div className="footer-col">
          <h4>Información</h4>
          <ul>
            <li><Link to="/about">Sobre nosotros</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/shipping">Envíos</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-col">
          <h4>Síguenos</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} StoreAPP. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default FooterComponent;