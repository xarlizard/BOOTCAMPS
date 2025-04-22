import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import airbnbLogo from "/assets/logos/airbnb-logo.svg";
import googleLogo from "/assets/logos/google-logo.svg";
import microsoftLogo from "/assets/logos/microsoft-logo.svg";
import fedexLogo from "/assets/logos/fedex-logo.svg";
import "@/styles/logosSection.css";

const LogosSection = () => {
  return (
    <Container className="logos-section">
      <Row className="justify-content-center align-items-center">
        <Col xs={6} md={3} className="text-center mb-3 mb-md-0">
          <img src={airbnbLogo} alt="Airbnb" className="logo-image" />
        </Col>
        <Col xs={6} md={3} className="text-center mb-3 mb-md-0">
          <img src={googleLogo} alt="Google" className="logo-image" />
        </Col>
        <Col xs={6} md={3} className="text-center mb-3 mb-md-0">
          <img src={microsoftLogo} alt="Microsoft" className="logo-image" />
        </Col>
        <Col xs={6} md={3} className="text-center">
          <img src={fedexLogo} alt="FedEx" className="logo-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default LogosSection;
