// Packages
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Form
import Container from "react-bootstrap/Container";
import axios from "axios";

const BookForm = (props) => {
  const [disableEdit, setDisableEdit] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let bookIdProp = false;
  let bookData = [];
  if (props.value) {
    bookIdProp = true;
    const bookId = props.value;
    console.log("bookId: ", bookId);
    const bookList = props.books;
    console.log(bookList);
    bookData = bookList.find((obj) => obj.id === bookId);
    console.log(bookData);
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
        window.location.reload();
      });
    } catch (e) {
      console.log("error: ", e);
      setErrorMessage(e);
      window.location.reload();
    }
    props.fetchBooks();
    setDisableEdit(true);
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
    props.fetchBooks();
    setDisableAdd(true);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/${id}/`);
    window.location.reload();
  };

  const Close = () => {
    window.location.reload();
    props.setToggleRefresh((prev) => !prev);
    document.getElementById("name").placeholder = "";
    document.getElementById("author").placeholder = "";
    document.getElementById("description").placeholder = "";
    props.fetchBooks();
  };

  return (
    <Container className="col-md-4 col-2 text-start">
      <div className="form-group form" validate>
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

      <button
        className="btn btn-success m-2"
        onClick={AddBook}
        disabled={disableAdd}
      >
        Add New
      </button>

      <button
        className="btn btn-primary m-2"
        onClick={() => EditBook(props.value)}
        disabled={disableEdit}
      >
        Edit
      </button>
      <button
        className="btn btn-danger m-2"
        onClick={() => deleteBook(props.value)}
        disabled={disableEdit}
      >
        Delete
      </button>
      <button className="btn btn-warning m-2" onClick={Close}>
        Close
      </button>
    </Container>
  );
};

export default BookForm;
