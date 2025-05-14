import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useCart } from "../utils/context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import Toast from "../components/Toast";


const ProduitDetail = () => {
  const { id } = useParams(); 
  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

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
  const handleAddToCart = () => {
    addToCart(produit, quantite);
    setShowToast(true);
  };

  if (!produit) return <div>Chargement...</div>;

  return (
    <>
     {showToast && (
        <Toast
          message="Produit ajouté au panier"
          onClose={() => setShowToast(false)}
        />
      )}
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

          <Button variant="dark" className="mb-4" onClick={handleAddToCart}>
            Ajouter au panier
          </Button>

          <h5>Description</h5>
          <p>{produit.description}</p>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ProduitDetail;
