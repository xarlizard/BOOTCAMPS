import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import heroImage from "/assets/hero-section/hero-image.png";
import card1 from "/assets/hero-section/card-1.png";
import card2 from "/assets/hero-section/card-2.png";
import "@/styles/heroSection.css";

const HeroSection = () => {
  return (
    <Container className="hero-section">
      <Row className="align-items-center">
        {/* Text Column */}
        <Col md={6}>
          <Row className="mb-4">
            <h1>Empower Your Business With Stunning Design!</h1>
          </Row>
          <Row className="mb-4">
            <p className="intro-text">
              Circle is a digital design and development studio. We design and
              develop astonishing websites and mobile apps.
            </p>
          </Row>
          <Row>
            <div className="d-flex gap-3">
              <Button
                variant="primary"
                style={{
                  backgroundColor: "var(--color-boton)",
                  border: "none",
                  borderRadius: "0",
                  padding: "8px 20px",
                }}
              >
                Get in touch
              </Button>
              <Button
                variant="outline-primary"
                style={{
                  color: "var(--color-boton)",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "0",
                  padding: "8px 20px",
                }}
              >
                See our work
              </Button>
            </div>
          </Row>
        </Col>

        {/* Image Column */}
        <Col md={6}>
          <div className="hero-image-container position-relative">
            <img src={heroImage} alt="Hero" className="img-fluid main-image" />
            <img
              src={card1}
              alt="Card 1"
              className="position-absolute card-1"
            />
            <img
              src={card2}
              alt="Card 2"
              className="position-absolute card-2"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
