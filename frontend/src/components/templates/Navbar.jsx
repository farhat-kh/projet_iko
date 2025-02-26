import { useState } from "react";
import { Link } from "react-router";
import { Navbar, Nav, Container, Offcanvas, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/logo.png";





function NavbarComponent() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar expand="lg" bg="light" variant="light" className="shadow-sm p-1">
        <Container>
          <Navbar.Brand as={Link} to="/" ><img src={logo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle onClick={() => setShow(true)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">ACCUEIL</Nav.Link>
              <Nav.Link as={Link} to="/categories">CATEGORIES</Nav.Link>
              <Nav.Link as={Link} to="/a-propos">À PROPOS</Nav.Link>
              <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
              <Nav.Link as={Link} to="/compte">👤</Nav.Link>
              <Nav.Link as={Link} to="/panier">🛒</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
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
            <Nav.Link as={Link} to="/compte" onClick={() => setShow(false)}>👤 COMPTE</Nav.Link>
            <Nav.Link as={Link} to="/panier" onClick={() => setShow(false)}>🛒 PANIER</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarComponent;

