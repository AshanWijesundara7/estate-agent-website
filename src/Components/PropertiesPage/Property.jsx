import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "react-bootstrap/Button";
import data from "./properties.json";
import "./Property.css";

const Property = () => {
  const [property, setProperty] = useState(null);
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const foundProperty = data.properties.find((prop) => prop.id === state.id);
    
    if (foundProperty) {
      const transformedProperty = {
        ...foundProperty,
        pictures: foundProperty.pictures || (foundProperty.picture ? [foundProperty.picture] : [])
      };
      setProperty(transformedProperty);
    }
  }, [state.id]);

  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
      &#9654;
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
      &#9664;
    </div>
  );

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  if (!property) {
    return (
      <div className="property-loading-container">
        <div>Loading property details...</div>
      </div>
    );
  }

  return (
    <div className="property-page">
      {/* Hero Section with Title */}
      <div className="property-hero">
        <div className="property-hero-content">
          <h1 className="property-main-title">{property.location}</h1>
          <div className="property-quick-info">
            <span className="info-highlight">${property.price.toLocaleString()}</span>
            <span className="info-divider">•</span>
            <span>{property.bedrooms} Bedrooms</span>
            <span className="info-divider">•</span>
            <span>{property.type}</span>
            <span className="info-divider">•</span>
            <span>{property.tenure}</span>
          </div>
        </div>
      </div>

      {/* Image Slider */}
      {property.pictures && property.pictures.length > 0 && (
        <div className="property-slider-wrapper">
          <Slider {...slickSettings} className="slick-slider-custom">
            {property.pictures.map((pic, index) => (
              <div key={index}>
                <img
                  className="property-slider-image"
                  src={pic}
                  alt={`Property view ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Main Content */}
      <div className="property-main-content">
        <Tabs defaultActiveKey="desc" transition={false} className="property-tabs">
          {/* Description Tab */}
          <Tab eventKey="desc" title="Overview">
            <div className="tab-content-wrapper">
              <h3 className="section-title">Property Details</h3>
              
              <div className="property-details-grid">
                <div className="detail-card">
                  <div className="detail-label">Property Type</div>
                  <div className="detail-value">{property.type}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Bedrooms</div>
                  <div className="detail-value">{property.bedrooms}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Tenure</div>
                  <div className="detail-value">{property.tenure}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Price</div>
                  <div className="detail-value">${property.price.toLocaleString()}</div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Date Added</div>
                  <div className="detail-value">
                    {property.added ? `${property.added.month} ${property.added.day}, ${property.added.year}` : "N/A"}
                  </div>
                </div>
                <div className="detail-card">
                  <div className="detail-label">Postal Code</div>
                  <div className="detail-value">{property.postalCode || "N/A"}</div>
                </div>
              </div>

              <h3 className="section-title section-title-spacing">About This Property</h3>
              <p className="property-description">{property.description}</p>
              
              <Link to="/contactus">
                <Button variant="primary" className="contact-button">
                  Contact Us About This Property
                </Button>
              </Link>
            </div>
          </Tab>

          {/* Floor Plan Tab */}
          <Tab eventKey="fp" title="Floor Plan">
            <div className="tab-content-wrapper">
              <h3 className="section-title">Floor Plan</h3>
              <div className="floor-plan-container">
                <img
                  src="/images/floor_plan.png" 
                  alt="Floor Plan"
                  className="floor-plan-image"
                />
              </div>
            </div>
          </Tab>

          {/* Map Tab */}
          <Tab eventKey="map" title="Location">
            <div className="tab-content-wrapper">
              <h3 className="section-title">Location</h3>
              <div className="map-container">
                <iframe
                  src={property.map || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531683!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1587093533894!5m2!1sen!2sau"}
                  title="Property Map"
                  className="map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Property;