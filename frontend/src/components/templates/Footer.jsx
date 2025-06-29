import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer-custom">
      <div className="footer-container">
        <div className="footer-col">
          <Link to="/">
            <img src={logo} alt="logo IkoMeubles" className="footer-logo" />
          </Link>
          <div className="footer-social-icons">
            <a href="https://facebook.com/ikomeubles" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com/ikomeubles" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com/ikomeubles" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-col">
          <h5>La Boutique</h5>
          <ul>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/terms">Conditions Générales</Link></li>
            <li><Link to="/privacy">Politique de Confidentialité</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Catégories</h5>
          <ul>
            <li><Link to="/categorie/tables">Tables</Link></li>
            <li><Link to="/categorie/assises">Assises</Link></li>
            <li><Link to="/categorie/lits">Lits</Link></li>
            <li><Link to="/categorie/rangements">Rangements</Link></li>
            <li><Link to="/categorie/canapes">Canapés</Link></li>
            <li><Link to="/categorie/buffets">Buffets</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <p><FaMapMarkerAlt /> 10 Boulevard Magenta, 75010 Paris</p>
          <p><FaPhone /> 01 28 17 76 99</p>
          <p><FaEnvelope /> contact@ikomeubles.fr</p>
          <p><FaClock /> Dimanche - Samedi 9:30 - 20:00</p>
        </div>
      </div>

      <div className="footer-bottom">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Haut de page ↑
        </button>
        <p>© 2025 - IkoMeubles. - Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default Footer;
