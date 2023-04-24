import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";

// Assets
import BookList from "./booklist";
import BookForm from "./bookform";
import "../style.css";

const Home = () => {
  const baseURL = "http://127.0.0.1:8000/api";
  const [id, setId] = useState();
  const [nextlink, setNextLink] = useState(`${baseURL}`);
  const [prevlink, setPrevLink] = useState(`${baseURL}`);
  const [link, setLink] = useState(`${baseURL}`);

  const [books, SetBooks] = useState([]);
  // const [count, SetCount] = useState(0);
  const [next, SetNext] = useState("");
  const [prev, SetPrev] = useState("");
  console.log("new next link: ", nextlink);
  console.log("new prev link: ", prevlink);
  // let linkBooks = `${baseURL}`;
  const fetchBooks = async (link) => {
    // let response = await (await fetch(`${baseURL}`)).json();
    let response = await (await fetch(link)).json();
    SetBooks(response.results);
    // SetCount(response.count);
    SetNext(response.next);
    SetPrev(response.previous);
    // SetNextLink();
    // SetPrevLink();
    setNextLink(response.next);
  };
  let nextlinkflag = false;
  function SetNextLink() {
    nextlinkflag = true;
    setNextLink(next);
    fetchBooks(nextlink);
    // console.log("new link: ", link);
  }
  let prevlinkflag = false;
  function SetPrevLink() {
    prevlinkflag = true;
    setPrevLink(prev);
    fetchBooks(prevlink);
    // console.log("new link: ", link);
  }
  useEffect(() => {
    fetchBooks(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="rowC">
        <BookList key={books.id} books={books} onChange={setId} />
        <BookForm value={id} books={books} fetchBooks={fetchBooks} />
      </div>
      <button className="page-link" onClick={() => SetPrevLink(prev)}>
        Previous <i className="fa-solid fa-angles-right"></i>
      </button>
      <button className="page-link" onClick={() => SetNextLink(next)}>
        Next <i className="fa-solid fa-angles-right"></i>
      </button>
    </Container>
  );
};

export default Home;
