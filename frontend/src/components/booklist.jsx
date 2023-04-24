// Packages
import React from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

// Assets

const BookList = (props) => {
  const handleClick = (id) => {
    props.onChange(id);
  };
  console.log(props);
  const id = props.id;

  const tableSize = id
    ? "col-md-8 col-2 text-start"
    : "col-md-12 col-2 text-start";
  return (
    <Container className={tableSize}>
      <div className="row">
        <div>
          <br />
          <div className="row">
            <br />{" "}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                  </tr>
                </thead>
                <tbody>
                  {props.books.map((item) => {
                    return (
                      <tr key={item.id} onClick={() => handleClick(item.id)}>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
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
