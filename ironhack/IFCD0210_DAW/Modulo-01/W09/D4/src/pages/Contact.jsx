import React from "react";
import { Container } from "react-bootstrap";
import ContactForm from "@/components/ContactForm";
import Newsletter from "@/components/Newsletter";

const Contact = () => {
  return (
    <div>
      <Container className="contact-section">
        <h1 className="mb-5">Contact us</h1>
        <ContactForm />
      </Container>
      <br />
    </div>
  );
};

export default Contact;
