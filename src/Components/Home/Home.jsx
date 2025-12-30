import React from "react";
import {userNavigate} from "react-router-dom";
import "./Home.css";

const home = () => {
    const navigate = userNavigate();

    return (
        <>
            <section className="hero-section">
                <div className="hero-content">
                    <h1>FINF YOUR DREAM HERE!</h1>
                    <p> Discover properties that match your lifestyle and needs.</p>
                    <button onClick={() =>navigate("/properties_page</div>")}>Buy</button>
                </div>
            </section>
            <div className="selection-title">
                <h2>Horizon Estates</h2>
                <p>Discover limitless opportunities with Horizon Estates, your trusted partner in land and property sales. Whether you are looking for residential land, modern homes, or high-value investment opportunities, we offer a carefully selected portfolio designed to match your goals and lifestyle.

                Backed by industry experience and a commitment to excellence, our team provides reliable guidance throughout every stage of your property journey. From discovering the right location to making confident decisions, Horizon Estates is dedicated to delivering clarity, quality, and long-term value — helping you secure not just property, but your future.</p>
            </div>
            <div className="image-container">
                <img src="/images/Home/home.jpeg" alt="home-img" />
            </div>

            <div className="container">
                <div className="card">
                    <img src="" alt="" />

                    <h3>Contact Us</h3>
                    <p>Need Support? Get in touch with us.</p>

                    <button onClick={() => navigate("/ContactUs")}>Contact Us</button>
                </div>

                <div className="card">
                    <img src="" alt="" />

                    <h3>About Us</h3>
                    <p>We are helping you find a the perfect home with expert guidnace and trusted service. </p>

                    <button onClick={() => navigate ("/aboutus_page")}>About Us</button>
                </div>
            </div>

        </>
    );
};

export default home;
