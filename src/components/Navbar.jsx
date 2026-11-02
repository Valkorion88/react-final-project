import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import fesLogo from '../assets/fes-logo.png'
import SearchBar from './SearchBar';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img src={fesLogo} alt="" />
          <span>Simplified Flix</span>
        </Link>
        <SearchBar
          initialQuery={searchParams.get('search') || ''}
          onSearch={(query) => navigate(`/?search=${encodeURIComponent(query)}`)}
        />
      </div>
    </nav>
  );
}