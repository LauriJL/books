import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [books, SetBooks] = useState([]);
  const baseURL = "http://127.0.0.1:8000/api";
  const linkBooks = `${baseURL}`;
  const fetchBooks = async () => {
    let response = await (await fetch(linkBooks)).json();
    SetBooks(response);
    console.log(response);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container>
      <h4>Home page.</h4>
    </Container>
  );
};

export default Home;
