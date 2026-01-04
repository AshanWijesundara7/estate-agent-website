// Properties.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavouritesContext } from '../../context/FavouritesContext';
import propertiesData from '../../data/properties.json';
import './Properties.css';

const Properties = () => {
  const navigate = useNavigate();
  const { addFavourite, favourites } = useContext(FavouritesContext);

  // Filter state
  const [filters, setFilters] = useState({
    searchText: '',
    minPrice: '',
    maxPrice: '',
    dateAfter: '',
    postcode: ''
  });

  // Filtered properties state
  const [displayedProperties, setDisplayedProperties] = useState([]);

  // Initialize with all properties
  useEffect(() => {
    setDisplayedProperties(propertiesData.properties);
  }, []);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...propertiesData.properties];

    // Search text filter (name/description)
    if (filters.searchText.trim()) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(property => 
        property.description.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower)
      );
    }

    // Min price filter
    if (filters.minPrice) {
      filtered = filtered.filter(property => 
        property.price >= parseInt(filters.minPrice)
      );
    }

    // Max price filter
    if (filters.maxPrice) {
      filtered = filtered.filter(property => 
        property.price <= parseInt(filters.maxPrice)
      );
    }

    // Date filter (after selected date)
    if (filters.dateAfter) {
      const filterDate = new Date(filters.dateAfter);
      filtered = filtered.filter(property => {
        const propertyDate = new Date(
          property.added.year,
          getMonthNumber(property.added.month),
          property.added.day
        );
        return propertyDate > filterDate;
      });
    }

    // Postcode area filter (first part only)
    if (filters.postcode.trim()) {
      const postcodeUpper = filters.postcode.toUpperCase().trim();
      filtered = filtered.filter(property => {
        const locationParts = property.location.split(' ');
        const propertyPostcode = locationParts[locationParts.length - 1];
        return propertyPostcode.startsWith(postcodeUpper);
      });
    }

    setDisplayedProperties(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      searchText: '',
      minPrice: '',
      maxPrice: '',
      dateAfter: '',
      postcode: ''
    });
    setDisplayedProperties(propertiesData.properties);
  };

  // Helper function to convert month name to number
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName] || 0;
  };

  // Check if property is favourited
  const isFavourited = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };

  // Handle add to favourites
  const handleAddToFavourites = (property) => {
    if (!isFavourited(property.id)) {
      addFavourite(property);
    }
  };

  // Navigate to property details
  const viewPropertyDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // Format price
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  // Truncate description
  const truncateDescription = (description, maxLength = 150) => {
    const cleanText = description.replace(/<br\s*\/?>/gi, ' ').trim();
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };

  return (
    <div className="properties-page">
      <header className="properties-header">
        <h1>Property Search</h1>
        <p>Find your perfect property</p>
      </header>

      <div className="properties-container">
        {/* Filter Section */}
        <aside className="filter-section">
          <h2>Search & Filter</h2>
          
          <div className="filter-form">
            {/* Search text */}
            <div className="filter-group">
              <label htmlFor="searchText">Search</label>
              <input
                type="text"
                id="searchText"
                name="searchText"
                placeholder="Property name or description"
                value={filters.searchText}
                onChange={handleFilterChange}
              />
            </div>

            {/* Min price */}
            <div className="filter-group">
              <label htmlFor="minPrice">Min Price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="£"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </div>

            {/* Max price */}
            <div className="filter-group">
              <label htmlFor="maxPrice">Max Price</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="£"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>

            {/* Date after */}
            <div className="filter-group">
              <label htmlFor="dateAfter">Added After</label>
              <input
                type="date"
                id="dateAfter"
                name="dateAfter"
                value={filters.dateAfter}
                onChange={handleFilterChange}
              />
            </div>

            {/* Postcode area */}
            <div className="filter-group">
              <label htmlFor="postcode">Postcode Area</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                placeholder="e.g. BR5"
                value={filters.postcode}
                onChange={handleFilterChange}
              />
            </div>

            {/* Filter buttons */}
            <div className="filter-actions">
              <button className="btn-apply" onClick={applyFilters}>
                Apply Filters
              </button>
              <button className="btn-reset" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Properties Grid */}
        <main className="properties-main">
          <div className="properties-count">
            <p>{displayedProperties.length} {displayedProperties.length === 1 ? 'property' : 'properties'} found</p>
          </div>

          {displayedProperties.length === 0 ? (
            <div className="no-results">
              <p>No properties match your search criteria.</p>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="properties-grid">
              {displayedProperties.map(property => (
                <article key={property.id} className="property-card">
                  {/* Property image */}
                  <div className="property-image">
                    <img 
                      src={property.picture} 
                      alt={`${property.type} in ${property.location}`}
                    />
                    <span className="property-type">{property.type}</span>
                  </div>

                  {/* Property details */}
                  <div className="property-details">
                    <h3 className="property-price">{formatPrice(property.price)}</h3>
                    
                    <div className="property-info">
                      <p className="property-bedrooms">
                        {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                      </p>
                      <p className="property-location">{property.location}</p>
                    </div>

                    <p className="property-description">
                      {truncateDescription(property.description)}
                    </p>

                    {/* View Details Button */}
                    <button 
                      className="btn-view-full-details"
                      onClick={() => viewPropertyDetails(property.id)}
                    >
                      View Full Details
                    </button>

                    {/* Action buttons */}
                    <div className="property-actions">
                      <button 
                        className={`btn-favourite ${isFavourited(property.id) ? 'favourited' : ''}`}
                        onClick={() => handleAddToFavourites(property)}
                        disabled={isFavourited(property.id)}
                      >
                        {isFavourited(property.id) ? '❤️ Favourited' : '🤍 Add to Favourites'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Properties;