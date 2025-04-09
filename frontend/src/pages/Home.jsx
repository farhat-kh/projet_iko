import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Navbar from "../components/templates/Navbar";
import { Link } from "react-router";
import Footer from "../components/templates/Footer";
import Carousel from "react-bootstrap/Carousel";
import caroussel1 from "../assets/caroussel1.jpg";
import caroussel2 from "../assets/caroussel2.jpg";
import tables from "../assets/tables.png";
import Assises from "../assets/Assises.png";
import lits from "../assets/lits.png";
import Rangements from "../assets/Rangements.png";
import Canapes from "../assets/Canapés.png";
import Buffets from "../assets/Buffets.png";
import tableBasse from "../assets/table_basse.png";
import recVertical from "../assets/Rectangle_vertical.png";
import recpayasage from "../assets/Rec_paysage1.png";
import rectangle12 from "../assets/Rectangle-12.png";
import rectangle13 from "../assets/Rectangle-13.png";
import inspiration from "../assets/inspi_table.png";
import "../styles/global.css";
import "../styles/home.css";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bienvenue sur iKomeubles - Accueil</title>
        <meta
          name="description"
          content="Bienvenue sur iKomeubles, le site de vente de meubles en ligne. Trouvez des tables, des canapés, des lits, des rangements, des assises et des buffets."
        />
      </Helmet>
      {/* Carousel */}
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={caroussel1} alt="table" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={caroussel2} alt="étagere" />
        </Carousel.Item>
      </Carousel>

      {/* Catégories */}
      <Container className="text-center my-5">
        <h1>CATÉGORIES</h1>
        <Row className="g-4 mt-3">
          {[
            { name: "Tables", img: tables },
            { name: "Assises", img: Assises },
            { name: "Lits", img: lits },
            { name: "Rangements", img: Rangements },
            { name: "Canapés", img: Canapes },
            { name: "Buffets", img: Buffets },
          ].map((item, index) => (
            <Col key={index} md={4} sm={6}>
              <Card>
                <Card.Img variant="top" src={item.img} />
                <Card.Body>
                  <Button
                    as={Link}
                    to={`/categorie/${item.name}`}
                    variant="outline-dark btn-custom"
                  >
                    {item.name}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Galerie */}
      <Container className="my-5">
        <Row>
          {/* Image principale à gauche */}
          <Col md={6}>
            <img
              src={recVertical}
              alt="Salon"
              className="img-fluid rounded shadow w-100"
            />
          </Col>

          {/* Groupe d'images à droite */}
          <Col md={6} className="d-flex flex-column justify-content-between  ">
            <Row className="w-100">
              <Col xs={12}>
                <img
                  src={recpayasage}
                  alt="Salle à manger"
                  className="img-fluid rounded shadow border  w-100"
                />
              </Col>
            </Row>

            <Row className="mt-3  w-100">
              <Col xs={6}>
                <img
                  src={rectangle12}
                  alt="Chambre"
                  className="img-fluid rounded shadow w-100"
                />
              </Col>
              <Col xs={6}>
                <img
                  src={rectangle13}
                  alt="Bureau"
                  className="img-fluid rounded shadow w-100"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">INSPIRATION</h2>
        <Row className="align-items-center g-4  ">
          <Col
            md={6}
            className="d-flex flex-column justify-content-center  rounded p-4 h-100 "
          >
            <img
              src={inspiration}
              className="inspiration img-fluid rounded shadow w-100"
              alt="Table en bois"
            />
            <div className="p-4 text-center h-100">
              <h3 className="fw-bold">Table en bois</h3>
              <p className="text-muted">
                Apportez une touche d'élégance naturelle à votre intérieur avec
                une sélection de tables en bois design.
              </p>
              <Button as={Link} to="/product" variant="outline-dark btn-custom">
                Découvrir
              </Button>
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column justify-content-center  rounded p-4 h-100 "
          >
            <img
              src={tableBasse}
              className="inspiration img-fluid rounded shadow w-100"
              alt="Table basse"
            />
            <div className="p-4 text-center h-100">
              <h3 className="fw-bold">Table basse</h3>
              <p className="text-muted">
                Apportez une touche d'élégance naturelle à votre intérieur avec
                une sélection de tables en bois design.
              </p>
              <Button as={Link} to="/product" variant="outline-dark btn-custom">
                Découvrir
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
     
    </>
  );
};

export default Home;
