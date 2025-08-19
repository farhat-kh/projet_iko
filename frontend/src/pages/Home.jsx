import React, { useEffect,useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import caroussel1 from "../assets/caroussel1.jpg";
import caroussel2 from "../assets/caroussel2.jpg";
import recVertical from "../assets/Rectangle_vertical.png";
import recpayasage from "../assets/Rec_paysage1.png";
import rectangle12 from "../assets/Rectangle-12.png";
import rectangle13 from "../assets/Rectangle-13.png";
import "../styles/global.css";
import "../styles/home.css";
import api from "../utils/services/AxiosInstance";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [inspiredProducts, setInspiredProducts] = React.useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // appel api pour recuperer les categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categorie");
        setCategories(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des catégories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchInspiration = async () => {
      try {
        const response = await api.get("/produit");
        // Vérification de sécurité pour s'assurer que response.data est un tableau
        if (Array.isArray(response.data)) {
          const filteredInspiration = response.data.filter(
            (item) => item.categorie && item.categorie.name && item.categorie.name.toLowerCase() === "tables"
          );
          setInspiredProducts(filteredInspiration.slice(0, 2));
        } else {
          console.warn("L'API n'a pas retourné un tableau:", response.data);
          setInspiredProducts([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'inspiration :", error);
        setInspiredProducts([]);
      }
    };

    fetchInspiration();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  


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


    
      <Container className="text-center my-5">
        <h1>CATÉGORIES</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Row className="g-5 mt-3">
            {categories.map((item, index) => (
              <Col key={index} md={4} sm={6}>
                <Card className="h-100 ">
                  <Card.Img variant="top" src={item.imageUrl} />
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
        )}
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
  <Row className="align-items-center g-4">
    {inspiredProducts.map((prod) => (
      <Col
        key={prod._id}
        md={6}
        className="d-flex flex-column justify-content-center rounded p-4 h-100"
      >
        <img
          src={prod.imageUrl}
          className="inspiration img-fluid rounded shadow w-100"
          alt={prod.nom}
        />
        <div className="p-4 text-center h-100">
          <h3 className="fw-bold">{prod.nom}</h3>
          <p className="text-muted">{prod.description}</p>
          <Button
            as={Link}
            to={`/produit/${prod._id}`}
            variant="outline-dark btn-custom"
          >
            Découvrir
          </Button>
        </div>
      </Col>
    ))}
  </Row>
</Container>

     
    </>
  );
};

export default Home;
