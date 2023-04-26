// Packages
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";

// Assets

import "../style.css";

const BookForm = (props) => {
  let bookData = [];
  if (props.value) {
    const bookId = props.value;
    const bookList = props.books;
    bookData = bookList.find((obj) => obj.id === bookId);
  }

  const navigate = useNavigate();

  // Input
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const AddBook = async () => {
    let formField = new FormData();
    formField.append("title", title);
    formField.append("author", author);
    formField.append("description", description);

    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/",
        data: formField,
      }).then((response) => {});
    } catch (error) {
      setError(true);
      console.log(error.response);
      return error.response;
    }
    window.location.reload();
  };
  const AddBook2 = async () => {
    let formField = new FormData();
    formField.append("title", title);
    formField.append("author", author);
    formField.append("description", description);

    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/",
        data: formField,
      }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      setError(true);
      console.log(error.response);
      return error.response;
    }
    navigate(-1);
  };

  const EditBook = async (id) => {
    let formField = new FormData();
    formField.append("id", null);
    formField.append("title", title);
    formField.append("author", author);
    formField.append("description", description);
    const url = `http://localhost:8000/api/${id}/`;
    const data = formField;
    try {
      await axios
        .put(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate("/");
        });
    } catch (error) {
      setError(true);
      console.log(error.response);
      return error.response;
    }
    window.location.reload();
  };

  const deleteBook = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/${id}/`)
      .then((res) => {
        console.log("deleted", res);
      })
      .catch((error) => console.log(error.response));
    window.location.reload();
  };

  const Close = () => {
    window.location.reload();
  };

  const Close2 = () => {
    navigate(-1);
  };

  return (
    <Container className="col-md-5 col-2 text-start">
      <div className="form-group form">
        {error && (
          <Alert variant="danger" onClose={() => setError(false)} dismissible>
            <Alert.Heading>Oops!</Alert.Heading>
            <p>
              Check your fields. Make sure you have entered Title and Author.
            </p>
          </Alert>
        )}
        <label className="label">Title</label>
        <input
          required
          id="name"
          type="text"
          className="form-control form-control-lg"
          aria-label="Author"
          defaultValue={bookData.title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Author</label>
        <input
          required
          id="author"
          type="text"
          className="form-control form-control-lg"
          defaultValue={bookData.author}
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Description</label>
        <textarea
          id="description"
          type="text"
          className="form-control form-control-lg"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      {props.value && (
        <button className="btn btn-success m-2" onClick={AddBook}>
          Add New
        </button>
      )}

      {props.value && (
        <button
          className="btn btn-primary m-2"
          onClick={() => EditBook(props.value)}
        >
          Edit
        </button>
      )}

      {props.value && (
        <button
          className="btn btn-danger m-2"
          onClick={() => deleteBook(props.value)}
        >
          Delete
        </button>
      )}
      {props.value && (
        <button className="btn btn-warning m-2" onClick={Close}>
          Close
        </button>
      )}

      {!props.value && (
        <button className="btn btn-success m-2" onClick={AddBook2}>
          Add Book
        </button>
      )}
      {!props.value && (
        <button className="btn btn-warning m-2" onClick={Close2}>
          Close
        </button>
      )}
    </Container>
  );
};

export default BookForm;
