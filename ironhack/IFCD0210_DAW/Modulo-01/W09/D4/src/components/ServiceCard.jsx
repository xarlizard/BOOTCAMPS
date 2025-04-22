import React from "react";
import { Card } from "react-bootstrap";
import "../styles/serviceCard.css";
import ButtonLearnMore from "./ButtonLearnMore";
import { Icon1, Icon2, Icon3 } from "./ServiceIcons";

const ServiceCard = ({ index, title, description }) => {
  // Array of icon components
  const IconComponents = [Icon1, Icon2, Icon3];

  // Get the correct icon component based on the passed index
  const IconComponent = IconComponents[index];

  return (
    <Card className="service-card">
      <Card.Body>
        <div className="icon-container mb-4">
          <IconComponent />
        </div>
        <Card.Title className="mb-3">{title}</Card.Title>
        <Card.Text className="mb-3">{description}</Card.Text>
        <div className="text-start">
          <ButtonLearnMore />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
