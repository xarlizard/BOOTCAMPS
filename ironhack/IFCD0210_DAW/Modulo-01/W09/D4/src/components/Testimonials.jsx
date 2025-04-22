import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "@/styles/testimonials.css";
import orbitBg from "/assets/testimonial-section/orbit.png";
import memoji1 from "/assets/testimonial-section/memoji-1.png";
import memoji2 from "/assets/testimonial-section/memoji-2.png";
import memoji3 from "/assets/testimonial-section/memoji-3.png";
import memoji4 from "/assets/testimonial-section/memoji-4.png";
import profileImg from "/assets/testimonial-section/profile.png";

const Testimonials = () => {
  return (
    <Container fluid className="testimonials-section my-5 py-5">
      <Container>
        <div className="testimonial-content position-relative">
          {/* Background Orbit */}
          <div className="orbit-background">
            <img src={orbitBg} alt="Orbit Background" />
          </div>

          {/* Corner Memojis */}
          <div className="memoji memoji-1">
            <img src={memoji1} alt="Memoji 1" />
          </div>
          <div className="memoji memoji-2">
            <img src={memoji2} alt="Memoji 2" />
          </div>
          <div className="memoji memoji-3">
            <img src={memoji3} alt="Memoji 3" />
          </div>
          <div className="memoji memoji-4">
            <img src={memoji4} alt="Memoji 4" />
          </div>

          {/* Testimonial Text */}
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="text-white mb-4">
                Hear What Our Clients Have to Say
              </h1>
              <p className="intro-text-medium testimonial-quote mb-5">
                "Circle helped us through every stage of our startup. We really
                enjoyed working with you."
              </p>

              {/* Profile Section */}
              <div className="d-flex align-items-center justify-content-center">
                <div className="profile-image me-3">
                  <img src={profileImg} alt="Kristin Watson" />
                </div>
                <div className="profile-info text-start">
                  <p className="profile-name mb-0">Kristin Watson</p>
                  <p className="profile-company mb-0">Booking.com</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default Testimonials;
