import React from 'react';
import './Footer.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    const year = new date().getFullYear(); // get the current year 

    return(
        <footer className="footer py-3 bg-light text-center">
            <div className='Footer-container'>
                <div className="footer-section">
                    <h3 className="footer-title"> Vivere Luxe</h3>
                    <p>Your trusted partner</p>
                </div>

                <div className="footer-section">
                    <h4 className='footer-hedding'>Quick Links</h4>
                    <button onClick={() => OnNavigate("home")} className='footer-link'>Home</button>
                    <button onClick={() => OnNavigate("properties")} className='footer-link'>Properties</button>
                    <button onClick={() => OnNavigate("about")} className='footer-link'>About us</button>
                </div>

                <div className='footer-section'>
                    <h4 className='footer-hedding'>Contact</h4>
                    <p className='footer-text'>Emaol: vivereluxe@gmail.com</p>
                    <p className='footer-text'>Phone: 055 222 6958</p>
                </div>

                <div className='footer-section'>
                    <h4 className='footer-hedding'>Address</h4>
                    <p className='footer-text'> 123, Bambalapitiya</p>
                    <p className='footer-text'>Colombo</p>
                </div>

                <div className='footer-bottom'>
                    <p>&copy;{year} Vivere Luxe. All rights Reserved.</p>
                </div>
            </div>

        </footer>
    )
}