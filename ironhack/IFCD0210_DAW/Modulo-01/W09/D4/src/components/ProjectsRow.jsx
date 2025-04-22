import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "@/components/ProjectCard";
import demoResponse from "@/hooks/demoResponse.json";

const ProjectsRow = ({variant = true}) => {
  const rowCards =  [0, 1, 2]; // Array to map through for 3 cards

  return (
    <Container className="projects-section my-5 py-4">
      <Row className="mb-5">
        <Col className="text-start">
          <h2>{variant ? "Recent Projects" : "Other Projects"}</h2>
        </Col>
      </Row>
      <Row className="g-4">
        {rowCards.map((index) => (
          <Col key={index} md={4}>
            <ProjectCard
              index={index}
              variant={variant}
              projectData={demoResponse.find(
                (item) => item.uuid === (index + 1).toString()
              )}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsRow;
