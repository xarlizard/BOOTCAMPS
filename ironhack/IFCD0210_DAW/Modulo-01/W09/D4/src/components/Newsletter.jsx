import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import mailIcon from "/assets/newsletter/icon/mail.svg";
import "@/styles/newsletter.css";

const Newsletter = () => {
  return (
    <Container fluid className="newsletter-section">
      <Container className="py-10">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="newsletter-title mb-4">
              Do you have any questions?
            </h1>
            <h4 className="newsletter-subtitle mb-5">Let us help you!</h4>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="d-flex newsletter-form-container">
              <div className="newsletter-input-wrapper position-relative">
                <img
                  src={mailIcon}
                  alt="Email icon"
                  className="newsletter-icon"
                />
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input ps-5"
                />
              </div>
              <Button className="newsletter-submit-btn">Submit</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Newsletter;
