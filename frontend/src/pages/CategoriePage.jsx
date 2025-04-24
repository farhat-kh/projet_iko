import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/categoriePage.css"; 
const CategoriePage = () => {
  const { nom } = useParams(); 
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/produit");
        const filtered = response.data.filter(
          (p) => p.categorie.name.toLowerCase() === nom.toLowerCase()
        );
        setProduits(filtered);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    fetchProduits();
  }, [nom]);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-capitalize">{nom}</h2>
      <Row className="g-4">
        {produits.map((produit) => (
          <Col key={produit._id} md={4}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={produit.imageUrl}
                style={{ height: "300px",
                    width: "100%",
                    objectFit: "cover",
                   objectPosition: "center" }}
              />
              <Card.Body className="text-center d-flex flex-column justify-content-between">
                <Button
                  as={Link}
                  to={`/produit/${produit._id}`}
                  variant="outline-dark"
                  className="mb-3"
                >
                  Détails
                </Button>
                <Card.Title>{produit.nom}</Card.Title>
                <Card.Text className="fw-bold">{produit.prix} €</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriePage;
