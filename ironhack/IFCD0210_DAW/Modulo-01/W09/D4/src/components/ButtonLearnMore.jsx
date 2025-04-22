import React from "react";
import { Button } from "react-bootstrap";

const ButtonLearnMore = () => {
  return (
    <Button
      variant="link"
      className="p-0"
      style={{
        color: "var(--color-boton)",
        textDecoration: "none",
      }}
    >
      Learn More
    </Button>
  );
};

export default ButtonLearnMore;
