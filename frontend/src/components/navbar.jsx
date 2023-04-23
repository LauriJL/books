import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

const NavBar = () => {
  return (
    <>
      <style type="text/css">
        {`
          .navbar-color {
            background-color: #80489C;
            nav-link: white !important;
          }
          
          .navbar-brand {
            color: white !important;
          }

          .nav-link {
            color: white !important;
          }import NavBar from './navbar';

        `}
      </style>
      <Navbar variant="color">
        <Container>
          <Navbar.Brand>Books</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
