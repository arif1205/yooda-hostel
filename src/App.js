import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Distribute from "./pages/Distribute";
import Food from "./pages/Food";
import Home from "./pages/Home";
import Students from "./pages/Students";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<Food />} />
        <Route path="/students" element={<Students />} />
        <Route path="/distribute" element={<Distribute />} />
      </Routes>
    </Router>
  );
}

export default App;
