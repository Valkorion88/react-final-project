import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="*"
            element={
              <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you requested does not exist.</p>
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
