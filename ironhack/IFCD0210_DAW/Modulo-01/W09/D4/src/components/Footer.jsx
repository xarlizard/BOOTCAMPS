import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import circleLogo from "/assets/logos/circle.svg";
import "@/styles/footer.css";

const Footer = () => {
  const footerLinks = [
    "Team",
    "Services",
    "About Us",
    "Press",
    "Projects",
    "Privacy Policy",
  ];

  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-start">
          <Col md={6} className="footer-left">
            <img
              src={circleLogo}
              alt="Circle Logo"
              height="30"
              className="footer-logo mb-3"
            />
            <p className="footer-address">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </p>
          </Col>
          <Col md={6}>
            <Row className="footer-links">
              {footerLinks.map((link, index) => (
                <Col key={index} xs={6} md={4} className="mb-3">
                  <a href="#" className="footer-link">
                    {link}
                  </a>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;