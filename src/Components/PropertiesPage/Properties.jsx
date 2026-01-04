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
    <div className="properties-page">
      {/* Hero Section */}
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
            className="filter-input filter-input-full"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location"
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
      <div className="properties-grid-section">
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <img
                src={property.pictures && property.pictures[0] ? property.pictures[0] : property.picture || '/images/placeholder.jpg'}
                alt={property.location}
                className="property-card-image"
              />
              <div className="property-card-content">
                <h3 className="property-card-title">{property.location}</h3>
                <ul className="property-card-list">
                  <li className="property-card-list-item">Type: {property.type}</li>
                  <li className="property-card-list-item">Bedrooms: {property.bedrooms}</li>
                  <li className="property-card-list-item">Tenure: {property.tenure}</li>
                  <li className="property-card-list-item">Price: ${property.price.toLocaleString()}</li>
                  <li className="property-card-list-item">
                    Date Added: {property.added.month} {property.added.day}, {property.added.year}
                  </li>
                  <li className="property-card-list-item property-card-list-item-last">
                    Postal Code: {property.postalCode || 'N/A'}
                  </li>
                </ul>
                <p className="property-card-description">
                  {property.description.substring(0, 200)}...
                </p>
                <div className="property-card-actions">
                  <button onClick={() => handleMoreClick(property.id)} className="btn-more">
                    More
                  </button>
                  <button
                    onClick={() => handleFavorites(property)}
                    className={`btn-favorite ${state.favorites.some((i) => i.id === property.id) ? 'active' : ''}`}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="no-properties">
            No properties found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;