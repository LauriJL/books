import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

// Assets
import BookList from "./booklist";
import BookForm from "./bookform";
import "../style.css";

const Home = () => {
  const [id, setId] = useState();
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
      {!books[0] && (
        <div>
          <h4>You have no books.</h4>
          <Link className="btn btn-success m-2" to="/form">
            Add a Book
          </Link>
        </div>
      )}
      <div className="rowC">
        <BookList
          key={books.id}
          id={id}
          books={books}
          onChange={setId}
          fetchBooks={fetchBooks}
        />
        {id && <BookForm value={id} books={books} fetchBooks={fetchBooks} />}
      </div>
    </Container>
  );
};

export default Home;
