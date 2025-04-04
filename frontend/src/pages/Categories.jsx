import React, { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import Navbar from '../components/templates/Navbar'
import Footer from '../components/templates/Footer'
import tables from "../assets/tables.png";
import Assises from "../assets/Assises.png";
import lits from "../assets/lits.png";
import Rangements from "../assets/Rangements.png";
import Canapes from "../assets/Canapés.png";
import Buffets from "../assets/Buffets.png";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router";



function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8000/api/categorie/all");
    const data = await response.json();
    setCategories(data);
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
      <Navbar />
      {/* Catégories */}
      <Container className="text-center my-5">
        <h2>CATÉGORIES</h2>
        <Row className="g-4 mt-3">
          {categories.map((item, index) => (
            <Col key={index} md={4} sm={6}>
              <Card>
                <Card.Img variant="top" src={` http://localhost:8000/${item.image}`} />
                <Card.Body>
                  <Button as={Link} to={`/categories/${item.name}`} variant="outline-dark btn-custom">{item.name}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  )
}
export default Categories