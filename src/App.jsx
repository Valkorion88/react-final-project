import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import MovieCard from "./components/MovieCard"
import MovieDetails from "./pages/MovieDetails"
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <Home />
    </>
  )
}

export default App
