import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import logo from "../../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-light py-4 border-top">
      <Container>
        <Row className="text-center text-md-start">
          {/* Logo et Réseaux Sociaux */}
          <Col md={3} className="mb-3">
            <Link to="/">
               <img src={logo} alt="logo IkoMeubles" className="mb-3" style={{ width: "120px", cursor: "pointer" }} />
            </Link>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="https://facebook.com/ikomeubles" target="_blank" className="text-dark fs-4"><FaFacebook /></a>
              <a href="https://instagram.com/ikomeubles" target="_blank" className="text-dark fs-4"><FaInstagram /></a>
              <a href="https://twitter.com/ikomeubles" target="_blank" className="text-dark fs-4"><FaTwitter /></a>
            </div>
          </Col>

          {/* Liens Boutique et Catégorie */}
          <Col md={3} className="mb-3">
            <h5 className="fw-bold">La Boutique</h5>
            <ul className="list-unstyled">
            <li><Link to="/a-propos" className="text-dark text-decoration-none">À propos</Link></li>
            <li><Link to="/Contact" className="text-dark text-decoration-none">Contact</Link></li>
            <li><Link to="/Terms" className="text-dark text-decoration-none">Conditions Générales</Link></li>
            <li><Link to="/Privacy" className="text-dark text-decoration-none">Politique de Confidentialité</Link></li>
            </ul>
          </Col>

          <Col md={3} className="mb-3">
            <h5 className="fw-bold">Catégories</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Tables</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Assises</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Lits</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Rangements</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Canapés</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Buffets</a></li>
            </ul>
          </Col>
          {/* Infos Contact */}
          <Col md={3}>
            <h5 className="fw-bold">Contact</h5>
            <p><FaMapMarkerAlt className="me-2" /> 10 Boulevard Magenta, 75010 Paris</p>
            <p><FaPhone className="me-2" /> 01 28 17 76 99</p>
            <p><FaEnvelope className="me-2" /> contact@ikomeubles.fr</p>
            <p><FaClock className="me-2" /> Dimanche - Samedi 9:30 - 20:00</p>
          </Col>
        </Row>

        

        {/* Copyright */}
        <Row className="mt-4">
          <Col className="text-center">
            <p className="m-0">© 2025 - IkoMeubles. - Tous droits réservés</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
