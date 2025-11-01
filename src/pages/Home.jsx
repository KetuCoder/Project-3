import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyRecruiter } from "../Api/api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await verifyRecruiter({ email, password });
      if (res?.message === "Login successful") {
        localStorage.setItem("recruiterEmail", email);
        navigate("/upload");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* floating color blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* login card */}
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/30 text-white z-10">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
          Recruiter Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="text-sm font-semibold tracking-wide">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-300 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold py-2 rounded-lg shadow-lg transition-transform duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:shadow-xl"
            }`}
          >
            {loading ? "⏳ Signing In..." : "🚀 Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}