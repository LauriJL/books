//import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import BookForm from "./components/bookform";

function App() {
  return (
    <Router>
      <div className="App" id="outer-container">
        <div id="page-wrap">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<BookForm />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
