import { useState, useContext } from "react";
import { NavLink,Link } from "react-router";
import { Navbar, Nav, Container, Offcanvas, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/logo.png";
import { HEADER_LINKS } from "../../utils/configs/HeaderLinks";
import { AuthContext } from "../../utils/context/AuthContext";



function NavbarComponent() {
  
  const [show, setShow] = useState(false);
  const {auth, logout} = useContext(AuthContext)

  return (
    <>
      <Navbar expand="lg" bg="light" variant="light" className="shadow-sm p-1">
        <Container>
          <Navbar.Brand as={Link} to="/" ><img src={logo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle onClick={() => setShow(true)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {HEADER_LINKS.map((link, index) =>(
                <Nav.Link 
                  key={index}
                  as={Link}
                  to={link.path}
                  >
                   {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
        {/* {auth ? <button className="btn btn-danger" onClick={logout}>Déconnexion</button> : <Nav.Link as={Link} to="/login">👤 CONNEXION </Nav.Link>} */}
      </Navbar>



      
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={() => setShow(false)}>ACCUEIL</Nav.Link>
            <Nav.Link as={Link} to="/categories" onClick={() => setShow(false)}>CATEGORIES</Nav.Link>
            <Nav.Link as={Link} to="/a-propos" onClick={() => setShow(false)}>À PROPOS</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setShow(false)}>CONTACT</Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={() => setShow(false)}>👤 CONNEXION</Nav.Link>
            <Nav.Link as={Link} to="/panier" onClick={() => setShow(false)}>🛒 PANIER</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarComponent;

