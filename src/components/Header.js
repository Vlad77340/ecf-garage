import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const auth = useAuth();
  console.log(auth);

  console.log(isLoggedIn);

  return (
    <nav className="header">
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </div>
      <ul className={isOpen ? "nav-list open" : "nav-list"}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/services" onClick={() => setIsOpen(false)}>
            Nos Services
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src="logo.png" alt="logo" />
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Nous Contacter
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Déconnexion
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Se Connecter</button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
