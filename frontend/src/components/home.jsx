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
  const linkBooks = "http://127.0.0.1:8000/api";
  //Pagination
  const [totalPages, setTotalPages] = useState(0);
  const [nextURL, setNextURL] = useState();
  const [prevURL, setPrevURL] = useState();
  const fetchBooks = async () => {
    let response = await (await fetch(linkBooks)).json();
    SetBooks(response.results);
    console.log(response);
    // Page count
    setTotalPages(Math.ceil(response.count / 7));
    // URL for next page
    if (response.next) {
      setNextURL(response.next);
    } else {
      setNextURL(null);
    }
    // URL for previous page
    if (response.previous) {
      setPrevURL(response.previous);
    } else {
      setPrevURL(null);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginationHandler = async (url) => {
    let response = await (await fetch(url)).json();
    setNextURL(response.next);
    setPrevURL(response.previous);
    SetBooks(response.results);
  };
  return (
    <Container>
      {!books[0] && (
        <div>
          <h4>You have no books!</h4>
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
      {/* Pagination start */}
      {!id && (
        <nav>
          <ul className="pagination justify-content-center">
            {!prevURL && (
              <li className="page-item">
                <button className="page-link disabled">Previous</button>
              </li>
            )}
            {prevURL && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginationHandler(prevURL)}
                >
                  Previous
                </button>
              </li>
            )}
            {!nextURL && (
              <li className="page-item">
                <button className="page-link disabled">Next</button>
              </li>
            )}
            {nextURL && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginationHandler(nextURL)}
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Pagination end */}
    </Container>
  );
};

export default Home;
