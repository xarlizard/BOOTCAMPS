import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "@/styles/contact.css";

const ContactForm = () => {
  const [validated, setValidated] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.phone.value && !/^[0-9]{9,}$/.test(form.phone.value)) {
      setPhoneError(true);
      event.stopPropagation();
    } else {
      setPhoneError(false);
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('Form submitted:', form);
    }

    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));

    if (name === 'phone') {
      setPhoneError(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-4">
        <Form.Label className="intro-text">Full name *</Form.Label>
        <Form.Control 
          required
          type="text" 
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="contact-input"
        />
        <Form.Control.Feedback type="invalid">
          Please provide your full name.
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group className="mb-4 mb-md-0">
            <Form.Label className="intro-text">Email *</Form.Label>
            <Form.Control 
              required
              type="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="contact-input"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="intro-text">Phone</Form.Label>
            <Form.Control 
              type="tel" 
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              className={`contact-input ${phoneError ? 'is-invalid' : ''}`}
              pattern="[0-9]{9,}"
            />
            <Form.Control.Feedback type="invalid">
              {phoneError ? "Please provide a valid phone number (minimum 9 digits)" : ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-4">
        <Form.Label className="intro-text">Message *</Form.Label>
        <Form.Control 
          required
          as="textarea" 
          rows={4}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className="contact-input"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a message.
        </Form.Control.Feedback>
      </Form.Group>

      <Button 
        type="submit" 
        className="contact-submit-btn mt-4 w-100"
      >
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;