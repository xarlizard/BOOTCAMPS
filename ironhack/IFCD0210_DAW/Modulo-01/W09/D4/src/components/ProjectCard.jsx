import React from "react";
import { Card } from "react-bootstrap";
import ButtonLearnMore from "./ButtonLearnMore";
import "../styles/projectCard.css";

const ProjectCard = ({ index, variant = true, projectData }) => {
  // Image path to use assets from public folder
  const imageSrc = `/assets/projects-section/${
    variant ? index + 1 : index + 3
  }.jpg`;

  return (
    <Card className="project-card">
      <div className="image-container">
        <Card.Img
          variant="top"
          src={imageSrc}
          alt={projectData.name}
          className="card-image"
        />
      </div>
      <Card.Body>
        <Card.Title className="mb-3">{projectData.name}</Card.Title>
        <Card.Text className="mb-3">{projectData.description}</Card.Text>
        <div className="text-start">
          <ButtonLearnMore />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
