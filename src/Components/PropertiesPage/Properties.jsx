import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "./FavouriteContext";
import data from "./properties.json";
import "./Properties.css";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minRooms, setMinRooms] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchDate, setSearchDate] = useState("");
  const [searchPostalCode, setSearchPostalCode] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const { dispatch, state } = useFavorite();
  const navigate = useNavigate();

  useEffect(() => {
    // Transform properties to ensure they have pictures array
    const transformedProperties = data.properties.map(prop => ({
      ...prop,
      pictures: prop.pictures || (prop.picture ? [prop.picture] : [])
    }));
    setProperties(transformedProperties);
  }, []);

  const filteredProperties = (showFavorites ? state.favorites : properties).filter(
    (property) => {
      const matchesSearchTerm = property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPropertyType = !propertyType || property.type.toLowerCase() === propertyType.toLowerCase();
      const matchesMinRooms = !minRooms || property.bedrooms >= parseInt(minRooms);
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesPostalCode = searchPostalCode ? property.postalCode && property.postalCode.toLowerCase().includes(searchPostalCode.toLowerCase()) : true;

      return matchesSearchTerm && matchesPropertyType && matchesMinRooms && matchesPrice && matchesPostalCode;
    }
  );

  const handleFavorites = (item) => {
    const isItemInFavorites = state.favorites.some((i) => i.id === item.id);
    if (!isItemInFavorites) {
      dispatch({ type: "ADD_TO_FAVORITES", payload: item });
    } else {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
    }
  };

  const clearFavorites = () => {
    dispatch({ type: "CLEAR_FAVORITES" });
    setShowFavorites(false);
  };

  const showAll = () => {
    setSearchTerm("");
    setPropertyType("");
    setMinRooms("");
    setPriceRange([0, 1000000]);
    setSearchDate("");
    setSearchPostalCode("");
    setShowFavorites(false);
  };

  const handleMoreClick = (propertyId) => {
    navigate(`/properties/${propertyId}`, { state: { id: propertyId } });
  };

  return (
    <div style={{ fontFamily: "'Raleway', sans-serif", backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <style>{`
        .hero-section {
          background-color: white;
          padding: 80px 20px;
          text-align: center;
        }
        
        .hero-title {
          font-size: 3.5em;
          color: #2c3e50;
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        .hero-underline {
          width: 400px;
          height: 4px;
          background-color: #3498db;
          margin: 20px auto;
        }
        
        .filters-container {
          background-color: #e8eef3;
          padding: 60px 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .filter-title {
          color: #1e3a5f;
          font-size: 2.5em;
          font-weight: bold;
          margin-bottom: 40px;
          text-align: left;
        }
        
        .filter-row {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          gap: 20px;
        }
        
        .filter-label {
          min-width: 120px;
          font-weight: 600;
          color: #333;
          text-align: right;
          font-size: 1em;
        }
        
        .filter-input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          background-color: white;
        }
        
        .filter-input:focus {
          outline: none;
          border-color: #0066cc;
        }
        
        .filter-select {
          flex: 1;
          padding: 12px 35px 12px 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          background-color: white;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }
        
        .price-range-container {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .price-slider {
          flex: 1;
          height: 6px;
          background: linear-gradient(to right, #4da6ff 0%, #4da6ff 100%);
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
        }
        
        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: white;
          border: 3px solid #4da6ff;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .price-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: white;
          border: 3px solid #4da6ff;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .price-display {
          min-width: 180px;
          font-weight: 600;
          color: #333;
          text-align: right;
        }
        
        .button-group {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 35px;
        }
        
        .btn-show-favorites {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .btn-show-favorites:hover {
          background-color: #0056b3;
        }
        
        .btn-clear-favorites {
          background-color: #ffc107;
          color: #000;
          border: none;
          padding: 12px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .btn-clear-favorites:hover {
          background-color: #e0a800;
        }
        
        .btn-reset {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .btn-reset:hover {
          background-color: #218838;
        }
        
        .card {
          transition: transform 0.3s;
          font-family: 'Raleway', sans-serif;
          border-radius: 8px;
          background-color: white;
          width: 300px;
          margin: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        
        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .btn-danger {
          background-color: #004671b9 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .btn-danger:hover {
          background-color: #408db1ce !important;
        }
        
        .favorites-btn {
          background-color: #ff1100 !important;
          color: white !important;
          border: none !important;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .favorites-btn.active {
          background-color: #ef7171ca !important;
        }
        
        .favorites-btn:hover {
          background-color: #ee413edc !important;
        }

        @media (max-width: 768px) {
          .filter-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-label {
            text-align: left;
            min-width: auto;
          }
          
          .filters-container {
            padding: 40px 20px;
          }
          
          .hero-title {
            font-size: 2.5em;
          }
          
          .hero-underline {
            width: 250px;
          }
        }
      `}</style>

      {/* Hero Section with Background */}
      <div className="hero-section">
        <h1 className="hero-title">Vivere Luxe</h1>
        <div className="hero-underline"></div>
      </div>

      {/* Filters Section */}
      <div className="filters-container">
        <h1 className="filter-title">Find property for sale</h1>
        
        {/* Search by Location */}
        <div className="filter-row">
          <input
            className="filter-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location"
            style={{ width: '100%' }}
          />
        </div>

        {/* Property Type */}
        <div className="filter-row">
          <label className="filter-label">Property Type</label>
          <select 
            value={propertyType} 
            onChange={(e) => setPropertyType(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Property Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Apartment">Apartment</option>
            <option value="Maisonette">Maisonette</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="filter-row">
          <label className="filter-label">Price Range</label>
          <div className="price-range-container">
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="price-slider"
            />
            <span className="price-display">
              ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>

        {/* Min Rooms */}
        <div className="filter-row">
          <label className="filter-label">Min Rooms</label>
          <select 
            value={minRooms} 
            onChange={(e) => setMinRooms(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Min Rooms</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Search by Date */}
        <div className="filter-row">
          <label className="filter-label">Search by Date</label>
          <input
            type="date"
            className="filter-input"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        {/* Postal Code */}
        <div className="filter-row">
          <label className="filter-label">Postal Code</label>
          <input
            type="text"
            className="filter-input"
            value={searchPostalCode}
            onChange={(e) => setSearchPostalCode(e.target.value)}
            placeholder="Search by postal code"
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button onClick={() => setShowFavorites(true)} className="btn-show-favorites">
            Show Favorites
          </button>
          <button onClick={clearFavorites} className="btn-clear-favorites">
            Clear All Favorites
          </button>
          <button onClick={showAll} className="btn-reset">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div style={{ padding: '40px 20px', backgroundColor: '#f8f9fa' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredProperties.map((property) => (
            <div key={property.id} className="card">
              <img
                src={property.pictures && property.pictures[0] ? property.pictures[0] : property.picture || '/images/placeholder.jpg'}
                alt={property.location}
                style={{ height: '300px', width: '100%', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '1.2em', margin: '10px 0', color: '#000' }}>
                  {property.location}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0' }}>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>Type: {property.type}</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>Bedrooms: {property.bedrooms}</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>Tenure: {property.tenure}</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>Price: ${property.price.toLocaleString()}</li>
                  <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    Date Added: {property.added.month} {property.added.day}, {property.added.year}
                  </li>
                  <li style={{ padding: '8px 0' }}>Postal Code: {property.postalCode || 'N/A'}</li>
                </ul>
                <p style={{ fontSize: '0.9em', color: '#555', margin: '15px 0', lineHeight: '1.5' }}>
                  {property.description.substring(0, 200)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
                  <button onClick={() => handleMoreClick(property.id)} className="btn-danger">More</button>
                  <button
                    onClick={() => handleFavorites(property)}
                    className={`favorites-btn ${state.favorites.some((i) => i.id === property.id) ? 'active' : ''}`}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em', color: '#666' }}>
            No properties found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;