import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { HEADER_LINKS } from "../../utils/configs/HeaderLinks";
import { AuthContext } from "../../utils/context/AuthContext";
import "./navbar.css";

function NavbarComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRedirectCompte = () => {
    if (!auth) {
      localStorage.setItem("redirectAfterLogin", "/compte");
      navigate("/login");
    } else {
      navigate("/compte");
    }
  };

  return (
    <header className="Navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" style={{ height: "50px" }} />
      </div>

      <div className={`nav-items ${menuOpen ? "open" : ""}`}>
        {HEADER_LINKS.map((link, index) => (
          <NavLink key={index} to={link.path}>
            {link.label}
          </NavLink>
        ))}
        <span onClick={handleRedirectCompte}>
          👤 {auth ? auth.user?.prenom.toUpperCase() : "MON COMPTE"}
        </span>
        {auth && (
         <button onClick={logout} className="logout-button">
            DECONNEXION
          </button>
         )}

      </div>

      <div className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
  <div className="bar"></div>
  <div className="bar"></div>
  <div className="bar"></div>
</div>

    </header>
  );
}

export default NavbarComponent;
