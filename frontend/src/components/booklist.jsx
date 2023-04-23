// Packages
import React from "react";
import Container from "react-bootstrap/Container";

// Assets

const BookList = (props) => {
  const handleClick = (id) => {
    props.onChange(id);
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
                  </tr>
                </thead>
                <tbody>
                  {props.books.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>
                          <button onClick={() => handleClick(item.id)}>
                            Button
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
