import React from 'react'
import fesLogo from '../assets/fes-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="logo">
        <img className="logo__img" src={fesLogo} alt="FES" />
      
        <p className="logo__title">
          <span>Simplified</span> Flix
        </p>
      </div>
      <form>
        <div className="search-form__group">
          <label htmlFor="searchInput"></label>
          <input className="search-form__input" id="searchInput" placeholder="Search movies..." required type="text" name="searchInput" />
          <button className="search-form__button" type='submit' aria-label='Search'>
            <FontAwesomeIcon className="search-form__icon" icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </nav>
  )
}

export default Navbar
