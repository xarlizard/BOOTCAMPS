import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServiceCard from "./ServiceCard";
import "@/styles/servicesRow.css";

const ServicesRow = () => {
  // Sample service data
  const services = [
    {
      title: "User Interface Design",
      description: "Circle provides you with a stunning user interface design that is accessible to everyone."
    },
    {
      title: "User Experience Design",
      description: "Circle helps you enhance user satisfaction by improving the usability and accessibility of your digital products."
    },
    {
      title: "Application Development",
      description: "We develop high-quality mobile and web applications using the latest technology stack."
    }
  ];

  return (
    <Container className="services-section my-5 py-4">
      <Row className="mb-5">
        <Col className="text-start">
          <h2>Our Services</h2>
        </Col>
      </Row>
      <Row className="g-4">
        {services.map((service, index) => (
          <Col key={index} md={4}>
            <ServiceCard 
              index={index} 
              title={service.title}
              description={service.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServicesRow; 