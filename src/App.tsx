import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/Home";
import AddMedication from "../src/AddMedication";
import MedicationList from "../src/MedicationList";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMedication />} />
        <Route path="/list" element={<MedicationList />} />
      </Routes>
    </Router>
  );
};

export default App;
