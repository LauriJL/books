// Packages
import React from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

// Assets

const BookList = (props) => {
  const handleClick = (id) => {
    props.onChange(id);
  };
  const deleteBook = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/${id}/`);
    props.fetchBooks();
  };
  return (
    <Container className="col-md-6 col-2 text-start">
      <div className="row">
        <div>
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.books.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleClick(item.id)}
                          >
                            Info
                          </button>
                        </td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteBook(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookList;
