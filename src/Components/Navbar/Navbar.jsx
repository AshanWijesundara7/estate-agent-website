import React, {useState, useEffect} from 'react';
import {link} from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll',handleScroll);
    };
  }, []);


  return (
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo">
          <span>Vivere Luxe</span>
        </div>
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/properties_page" className="nav-link">Properties</Link></li>
        <li><Link to="/favorites" className="nav-link">Favorites</Link></li>
        <li><Link to="/aboutus_page" className="nav-link">About Us</Link></li>
        
          
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;