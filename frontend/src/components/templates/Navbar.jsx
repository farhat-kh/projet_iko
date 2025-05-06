import React,{ useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { HEADER_LINKS } from "../../utils/configs/HeaderLinks";
import { AuthContext } from "../../utils/context/AuthContext";
import "./navbar.css";






function NavbarComponent() {

const [menuOpen, setMenuOpen] = useState(false);
const {auth, logout} = useContext(AuthContext)

const toggleMenu = () => {
  setMenuOpen(!menuOpen);
}


return (
  <header className="navbar">
  <div className="navbar-container">
  
    <div className="navbar-logo">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>

    <div className="navbar-right">
      <nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        {HEADER_LINKS.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className="navbar-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}

        
        {auth ? (
              <div className="navbar-user">
                <NavLink 
                  to="/compte"
                  className="navbar-link"
                  onClick={() => {
                  setMenuOpen(false); }}
                >
                  👤 {auth.user?.prenom}
                </NavLink>
                <button onClick={logout} className="logout-button">
                  Se déconnecter
                </button>
              </div>
            ) : (
              <NavLink
                to="/compte"
                className="navbar-link"
                onClick={() => {
                  localStorage.setItem("redirectAfterLogin", "/compte");
                  setMenuOpen(false);
                }}
              >
                👤 MON COMPTE
              </NavLink>
            )}
          </nav>
      
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </div>
  </div>
</header>
);
}

export default NavbarComponent;

