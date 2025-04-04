import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../components/templates/Navbar';
import Footer from '../components/templates/Footer';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function CategorieDetail() {
  const { nom } = useParams(); // Récupération du paramètre dans l'URL
  const [produits, setProduits] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Charger les produits de la catégorie depuis le backend
    axios.get(`http://localhost:5000/api/produits?categorie=${nom}`)
      .then(response => setProduits(response.data))
      .catch(error => console.log(error));
  }, [nom]);

  // Gestion de l'upload d'image
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Veuillez sélectionner une image.");

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post(`http://localhost:5000/api/upload`, formData);
      alert('Image uploadée avec succès !');
    } catch (error) {
      console.log(error);
      
      alert("Erreur lors de l'upload.");
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h2 className="text-center">{nom.toUpperCase()}</h2>
        <Row className="mt-4">
          {produits.length > 0 ? produits.map((produit, index) => (
            <Col key={index} md={4} sm={6}>
              <Card className="mb-3">
                <Card.Img variant="top" src={`http://localhost:8000/uploads/${produit.image}`} alt={produit.nom} />
                <Card.Body>
                  <Card.Title>{produit.nom}</Card.Title>
                  <Card.Text>{produit.description}</Card.Text>
                  <Card.Text><strong>Prix:</strong> {produit.prix} €</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )) : <p className="text-center">Aucun produit trouvé.</p>}
        </Row>

        {/* Upload d'image */}
        <Form className="mt-4 text-center">
          <Form.Group controlId="formFile">
            <Form.Label>Uploader une image pour cette catégorie</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button className="mt-2" onClick={handleUpload} variant="success">Uploader</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default CategorieDetail;
