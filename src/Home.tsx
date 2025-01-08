import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 py-10 px-4">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-8 tracking-tight text-center">
        MedTrack
      </h1>
      <div className="text-lg text-gray-800 font-medium flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
        <Link
          to="/add"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Medication
        </Link>
        <span className="text-gray-500">|</span>
        <Link
          to="/list"
          className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          View Medications
        </Link>
      </div>
    </div>
  );
};

export default Home;
