import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-md tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        ResumeAI Recruiter
      </h1>

      <div className="flex gap-6 items-center">
        <Link
          to="/upload"
          className="text-white font-semibold hover:text-yellow-300 transition duration-300 transform hover:scale-105"
        >
          Upload Resume
        </Link>
        <Link
          to="/report"
          className="text-white font-semibold hover:text-yellow-300 transition duration-300 transform hover:scale-105"
        >
          Candidate Report
        </Link>
        <button
          onClick={handleLogout}
          className="bg-white text-purple-700 font-semibold px-4 py-1 rounded-lg hover:bg-yellow-200 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
