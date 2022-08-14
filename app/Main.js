import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

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
import Profile from "./components/Profile";
import EditPost from "./components/EditPost";
import NotFound from "./components/NotFound";
import Search from "./components/Search";

function Main() {
  const inittialState = {
    loggedIn: Boolean(localStorage.getItem("reactAppToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("reactAppToken"),
      username: localStorage.getItem("reactAppUsername"),
      avatar: localStorage.getItem("reactAppAvatar")
    },
    iseSearchOpen: false
  };
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
      case "openSearch":
        draft.isSearchOpen = true;
        return;
      case "closeSearch":
        draft.isSearchOpen = false;
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, inittialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("reactAppToken", state.user.token);
      localStorage.setItem("reactAppUsername", state.user.username);
      localStorage.setItem("reactAppAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("reactAppToken");
      localStorage.removeItem("reactAppUsername");
      localStorage.removeItem("reactAppAvatar");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/" element={state.loggedIn ? <Home /> : <Homeguest />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/post/:id/edit" element={<EditPost />} />
            <Route path="/profile/:username/*" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {state.isSearchOpen ? <Search /> : ""}
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
