import React, { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";
import api from "../utils/services/AxiosInstance";



function Categories() {
  const [categories, setCategories] = useState([]);
  

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
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta
          name="description"
          content="Decourvez notre large choix de tables, canapés, lits, rangements, assises et buffets."
        />
      </Helmet>
      
      {/* Catégories */}
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
      
    </>
  )
}
export default Categories