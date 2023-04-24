// Packages
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Form
import Container from "react-bootstrap/Container";
import axios from "axios";

const BookForm = (props) => {
  const flag = true;
  console.log("form props", props);
  const [disableEdit, setDisableEdit] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let bookIdProp = false;
  let bookData = [];
  if (props.value) {
    bookIdProp = true;
    const bookId = props.value;
    // console.log("bookId: ", bookId);
    const bookList = props.books;
    // console.log(bookList);
    bookData = bookList.find((obj) => obj.id === bookId);
    console.log("bookdata", bookData.length);
  }

  const navigate = useNavigate();

  // Input
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const AddBook = async () => {
    let formField = new FormData();
    formField.append("name", name);
    formField.append("author", author);
    formField.append("description", description);
    console.log("formField", formField);

    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/",
        data: formField,
      }).then((response) => {
        console.log(response.data);
      });
    } catch (e) {
      console.log("error: ", e);
      setErrorMessage(e);
    }
    setDisableEdit(true);
    window.location.reload();
  };
  const AddBook2 = async () => {
    let formField = new FormData();
    formField.append("name", name);
    formField.append("author", author);
    formField.append("description", description);
    console.log("formField", formField);

    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/",
        data: formField,
      }).then((response) => {
        console.log(response.data);
      });
    } catch (e) {
      console.log("error: ", e);
      setErrorMessage(e);
    }
    setDisableEdit(true);
    navigate(-1);
  };

  const EditBook = async (id) => {
    let formField = new FormData();
    formField.append("id", null);
    formField.append("name", name);
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
    } catch (e) {
      console.log("error: ", e);
      setErrorMessage(e);
    }
    setDisableAdd(true);
    window.location.reload();
  };

  const deleteBook = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/${id}/`)
      .then((res) => {
        console.log("deleted", res);
      })
      .catch((error) => console.log(error));
    window.location.reload();
  };

  const Close = () => {
    window.location.reload();
  };

  const Close2 = () => {
    navigate(-1);
  };

  return (
    <Container className="col-md-4 col-2 text-start">
      <div className="form-group form">
        <label className="label">Title</label>
        <input
          id="name"
          type="text"
          className="form-control form-control-lg"
          aria-label="Author"
          placeholder={bookIdProp ? bookData.name : "Enter title"}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="label">Author</label>
        <input
          id="author"
          type="text"
          className="form-control form-control-lg"
          placeholder={bookIdProp ? bookData.author : "Enter author"}
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="label">Description</label>
        <textarea
          id="description"
          type="text"
          className="form-control form-control-lg"
          placeholder={bookIdProp ? bookData.description : "Enter description"}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {errorMessage && <h4>{errorMessage}!</h4>}
      <br />
      {props.value && (
        <button
          className="btn btn-success m-2"
          onClick={AddBook}
          disabled={disableAdd}
        >
          Add New
        </button>
      )}

      {props.value && (
        <button
          className="btn btn-primary m-2"
          onClick={() => EditBook(props.value)}
          disabled={disableEdit}
        >
          Edit
        </button>
      )}

      {props.value && (
        <button
          className="btn btn-danger m-2"
          onClick={() => deleteBook(props.value)}
          disabled={disableEdit}
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
        <button
          className="btn btn-success m-2"
          onClick={AddBook2}
          disabled={disableEdit}
        >
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
