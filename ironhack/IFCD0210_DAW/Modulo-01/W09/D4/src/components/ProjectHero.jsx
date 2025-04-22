import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import demoResponse from "../hooks/demoResponse.json";
import projectImage from "/assets/projects-section/1.jpg";
import "@/styles/projectHero.css";

const ProjectHero = () => {
  // Get the project with uuid === "1"
  const project = demoResponse.find(item => item.uuid === "1");

  return (
    <Container className="project-hero-section">
      <Row className="mb-4">
        <Col>
          <h1 className="project-title">{project.name}</h1>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <p className="project-description">{project.description}</p>
        </Col>
        <Col md={6} className="text-md-end">
          <p className="project-date">
            Completed on {project.completed_on}
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <div className="project-image-container">
            <img 
              src={projectImage} 
              alt={project.name}
              className="project-image w-100"
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="project-content" 
            dangerouslySetInnerHTML={{ __html: project.content }}>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectHero;