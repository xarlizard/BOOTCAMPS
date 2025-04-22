import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";
import "@/styles/header.css";
import circleLogo from "/assets/logos/circle.svg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if a path is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img
            src={circleLogo}
            alt="Circle Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link 
              onClick={() => navigate("/")}
              style={{ 
                color: isActive('/') ? 'var(--color-boton) !important' : undefined 
              }}
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              onClick={() => navigate("/project")}
              style={{ 
                color: isActive('/project') ? 'var(--color-boton) !important' : undefined 
              }}
              className={isActive('/project') ? 'active' : ''}
            >
              Projects
            </Nav.Link>
          </Nav>
          <Nav>
            <Button 
              variant="primary" 
              onClick={() => navigate("/contact")}
              style={{ 
                backgroundColor: 'var(--color-boton)',
                border: 'none',
                borderRadius: '0',
                padding: '8px 20px'
              }}
            >
              Contact
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
