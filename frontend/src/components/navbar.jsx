import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <Navbar.Brand>
            <FontAwesomeIcon icon="fa-light fa-books" /> Books
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
