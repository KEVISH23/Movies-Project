import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
const ResponsiveAppBar = () => {
  return (
    <>
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MovIMDB</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Item>
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/showall">
                    <Nav.Link>Show All</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/addmovies">
                    <Nav.Link>Add Movies</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </>
  );
};

export default ResponsiveAppBar;
