import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

// Components
import Header from "./components/Header";
import Homeguest from "./components/Homeguest";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";
import ExampleContext from "./ExampleContext";

function Main() {
  const inittialState = {
    loggedIn: Boolean(localStorage.getItem("reactAppToken")),
    flashMessages: []
  };
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages };
      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages };
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) };
    }
  }
  const [state, dispatch] = useReducer(ourReducer, inittialState);

  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("reactAppToken")));
  const [flashMessages, setFlashMessages] = useState([]);

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg));
  }

  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Homeguest />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<ViewSinglePost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
