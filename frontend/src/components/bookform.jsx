// Packages
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Form
import Container from "react-bootstrap/Container";
import axios from "axios";

const BookForm = (props) => {
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

    await axios({
      method: "post",
      url: "http://localhost:8000/api/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate("/");
    });
  };

  const EditBook = async (id) => {
    let formField = new FormData();
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
      console.log(e);
    }
  };

  const DeleteBook = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/${id}/`);
  };

  // const ClearFields = () => {
  //   setName("Enter title");
  //   setAuthor("Enter author");
  //   setDescription("Enter description");
  // };

  return (
    <Container>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control form-control-lg"
          aria-label="Author"
          placeholder={bookIdProp ? bookData.name : "Title"}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder={bookIdProp ? bookData.author : "Author"}
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          type="text"
          className="form-control form-control-lg"
          placeholder={bookIdProp ? bookData.description : "Description"}
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      <button className="btn btn-success" onClick={AddBook}>
        Add New Book
      </button>
      <button
        className="btn btn-primary"
        onClick={() => EditBook(props.value)}
        disabled={!bookIdProp}
      >
        Edit Book Info
      </button>
      <button
        className="btn btn-danger"
        onClick={() => DeleteBook(props.value)}
      >
        Delete Book
      </button>
      {/* <button className="btn btn-warning" onClick={ClearFields}>
        Clear Fields
      </button> */}
    </Container>
  );
};

export default BookForm;
