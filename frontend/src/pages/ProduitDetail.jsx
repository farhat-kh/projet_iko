import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";


const ProduitDetail = () => {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(1);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/produit/${id}`);
        setProduit(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du produit", error);
      }
    };

    fetchProduit();
  }, [id]);

  const handleQuantiteChange = (val) => {
    setQuantite((prev) => {
      const next = prev + val;
      return next < 1 ? 1 : next;
    });
  };

  if (!produit) return <div>Chargement...</div>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <img
            src={produit.imageUrl}
            alt={produit.nom}
            className="img-fluid rounded shadow w-100"
          />
        </Col>
        <Col md={6}>
          <h2>{produit.nom}</h2>
          <h4 className="text-muted">{produit.prix} €</h4>

          <div className="my-3 d-flex align-items-center">
            <Button variant="outline-secondary" onClick={() => handleQuantiteChange(-1)}>-</Button>
            <span className="mx-3">{quantite}</span>
            <Button variant="outline-secondary" onClick={() => handleQuantiteChange(1)}>+</Button>
          </div>

          <Button variant="dark" className="mb-4">
            Ajouter au panier
          </Button>

          <h5>Description</h5>
          <p>{produit.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProduitDetail;
