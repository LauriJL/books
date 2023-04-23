import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

// Assets
import BookList from "./booklist";
import BookForm from "./bookform";
import "../style.css";

const Home = () => {
  const [id, setId] = useState();
  console.log("home: ", id);
  const [books, SetBooks] = useState([]);
  const baseURL = "http://127.0.0.1:8000/api";
  const linkBooks = `${baseURL}`;
  const fetchBooks = async () => {
    let response = await (await fetch(linkBooks)).json();
    SetBooks(response);
  };
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="rowC">
        <BookList key={books.id} books={books} onChange={setId} />
        <BookForm value={id} books={books} onChange={fetchBooks} />
      </div>
    </Container>
  );
};

export default Home;
