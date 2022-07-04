import React from "react";
import ReactDOM from "react-dom/client";

// Components
import Header from "./components/Header";
import Homeguest from "./components/Homeguest";
import Footer from "./components/Footer";

function Main() {
  return (
    <>
      <Header />
      <Homeguest />
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
