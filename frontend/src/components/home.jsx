import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

// Assets
import BookList from "./booklist";
import BookForm from "./bookform";
import "../style.css";

const Home = () => {
  const [id, setId] = useState();
  const [books, SetBooks] = useState([]);
  const [count, SetCount] = useState(0);
  const [next, SetNext] = useState("");
  const [prev, SetPrev] = useState("");
  const baseURL = "http://127.0.0.1:8000/api";
  const linkBooks = `${baseURL}`;
  const fetchBooks = async () => {
    let response = await (await fetch(linkBooks)).json();
    SetBooks(response.results);
    SetCount(response.count);
    SetNext(response.next);
    SetPrev(response.previous);
    console.log("home: ", response);
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="rowC">
        <BookList
          key={books.id}
          books={books}
          pagecount={count}
          nextpage={next}
          prevpage={prev}
          onChange={setId}
        />
        <BookForm value={id} books={books} fetchBooks={fetchBooks} />
      </div>
    </Container>
  );
};

export default Home;
