import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      {/* Top Section - Brand Highlight */}
      <div className="footer-top">
        <div className="footer-top-content">
          <h2 className="footer-brand-large">Vivere Luxe</h2>
        </div>
      </div>

      {/* Bottom Section - Company Info */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          {/* Brand & Tagline */}
          <div className="footer-section">
            <h3 className="footer-title">Vivere Luxe</h3>
            <p className="footer-text">Your trusted partner</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <button 
              className="footer-link" 
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button 
              className="footer-link" 
              onClick={() => navigate('/properties_page')}
            >
              Properties
            </button>
            <button 
              className="footer-link" 
              onClick={() => navigate('/favourites')}
            >
              Favorite
            </button>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-text">Emaol: vivereluxe@gmail.com</p>
            <p className="footer-text">Phone: 055 222 6958</p>
          </div>

          {/* Address */}
          <div className="footer-section">
            <h4 className="footer-heading">Address</h4>
            <p className="footer-text">123, Bambalapitiya</p>
            <p className="footer-text">Colombo</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>©2026 Vivere Luxe. All rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;