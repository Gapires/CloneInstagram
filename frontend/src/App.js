import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
