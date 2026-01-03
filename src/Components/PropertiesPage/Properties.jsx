import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Properties.css';

// Import local JSON data
import propertiesData from '../../data/properties.json';


const Properties = () => {
  const navigate = useNavigate();
  
  // Search criteria state
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'Any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });
  
  // Results and favourites state
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [dateFilterType, setDateFilterType] = useState('after'); // 'after' or 'between'
  
  // Load favourites from localStorage on mount
  useEffect(() => {
    const storedFavourites = localStorage.getItem('propertyFavourites');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
    // Initial display of all properties
    setFilteredProperties(propertiesData.properties);
  }, []);
  
  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
  }, [favourites]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Extract postcode area from location string (e.g., "BR5" from "...BR5")
  const extractPostcodeArea = (location) => {
    const match = location.match(/([A-Z]{1,2}\d{1,2}[A-Z]?)$/);
    return match ? match[1] : '';
  };
  
  // Convert date object to comparable format
  const dateToComparable = (dateObj) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(dateObj.year, months[dateObj.month], dateObj.day);
  };
  
  // Filter properties based on search criteria
  const handleSearch = (e) => {
    e.preventDefault();
    
    let results = propertiesData.properties.filter(property => {
      // Property type filter
      if (searchCriteria.type !== 'Any' && property.type !== searchCriteria.type) {
        return false;
      }
      
      // Price filters
      if (searchCriteria.minPrice && property.price < parseInt(searchCriteria.minPrice)) {
        return false;
      }
      if (searchCriteria.maxPrice && property.price > parseInt(searchCriteria.maxPrice)) {
        return false;
      }
      
      // Bedroom filters
      if (searchCriteria.minBedrooms && property.bedrooms < parseInt(searchCriteria.minBedrooms)) {
        return false;
      }
      if (searchCriteria.maxBedrooms && property.bedrooms > parseInt(searchCriteria.maxBedrooms)) {
        return false;
      }
      
      // Date filters
      const propertyDate = dateToComparable(property.added);
      
      if (dateFilterType === 'after' && searchCriteria.dateAfter) {
        const afterDate = new Date(searchCriteria.dateAfter);
        if (propertyDate <= afterDate) {
          return false;
        }
      }
      
      if (dateFilterType === 'between' && searchCriteria.dateFrom && searchCriteria.dateTo) {
        const fromDate = new Date(searchCriteria.dateFrom);
        const toDate = new Date(searchCriteria.dateTo);
        if (propertyDate < fromDate || propertyDate > toDate) {
          return false;
        }
      }
      
      // Postcode filter
      if (searchCriteria.postcode) {
        const propertyPostcode = extractPostcodeArea(property.location);
        if (!propertyPostcode.toLowerCase().includes(searchCriteria.postcode.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
    
    setFilteredProperties(results);
  };
  
  // Reset search form and show all properties
  const handleReset = () => {
    setSearchCriteria({
      type: 'Any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAfter: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
    setDateFilterType('after');
    setFilteredProperties(propertiesData.properties);
  };
  
  // Add property to favourites (prevent duplicates)
  const addToFavourites = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites(prev => [...prev, property]);
    }
  };
  
  // Remove property from favourites
  const removeFromFavourites = (propertyId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
  };
  
  // Check if property is in favourites
  const isFavourite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };
  
  // Navigate to property detail page
  const viewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  
  // Format price with commas and £ symbol
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };
  
  // Truncate description safely (no dangerouslySetInnerHTML)
  const truncateDescription = (description, maxLength = 100) => {
    // Remove <br> tags and trim whitespace
    const cleanText = description.replace(/<br\s*\/?>/gi, ' ').trim();
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>Property Search</h1>
        <p>Find your dream property</p>
      </header>
      
      <div className="properties-content">
        {/* Search Form Section */}
        <aside className="search-sidebar">
          <div className="search-form-container">
            <h2>Search Criteria</h2>
            <form onSubmit={handleSearch} className="search-form">
              {/* Property Type */}
              <div className="form-group">
                <label htmlFor="type">Property Type</label>
                <select
                  id="type"
                  name="type"
                  value={searchCriteria.type}
                  onChange={handleInputChange}
                >
                  <option value="Any">Any</option>
                  <option value="House">House</option>
                  <option value="Flat">Flat</option>
                </select>
              </div>
              
              {/* Price Range */}
              <div className="form-group">
                <label>Price Range</label>
                <div className="input-row">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min £"
                    value={searchCriteria.minPrice}
                    onChange={handleInputChange}
                  />
                  <span className="separator">to</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max £"
                    value={searchCriteria.maxPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {/* Bedrooms Range */}
              <div className="form-group">
                <label>Bedrooms</label>
                <div className="input-row">
                  <input
                    type="number"
                    name="minBedrooms"
                    placeholder="Min"
                    min="0"
                    value={searchCriteria.minBedrooms}
                    onChange={handleInputChange}
                  />
                  <span className="separator">to</span>
                  <input
                    type="number"
                    name="maxBedrooms"
                    placeholder="Max"
                    min="0"
                    value={searchCriteria.maxBedrooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {/* Date Filter Type Toggle */}
              <div className="form-group">
                <label>Date Added</label>
                <div className="date-filter-toggle">
                  <button
                    type="button"
                    className={dateFilterType === 'after' ? 'active' : ''}
                    onClick={() => setDateFilterType('after')}
                  >
                    After Date
                  </button>
                  <button
                    type="button"
                    className={dateFilterType === 'between' ? 'active' : ''}
                    onClick={() => setDateFilterType('between')}
                  >
                    Between Dates
                  </button>
                </div>
              </div>
              
              {/* Date Inputs - Conditional based on filter type */}
              {dateFilterType === 'after' && (
                <div className="form-group">
                  <label htmlFor="dateAfter">After</label>
                  <input
                    type="date"
                    id="dateAfter"
                    name="dateAfter"
                    value={searchCriteria.dateAfter}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              {dateFilterType === 'between' && (
                <>
                  <div className="form-group">
                    <label htmlFor="dateFrom">From</label>
                    <input
                      type="date"
                      id="dateFrom"
                      name="dateFrom"
                      value={searchCriteria.dateFrom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateTo">To</label>
                    <input
                      type="date"
                      id="dateTo"
                      name="dateTo"
                      value={searchCriteria.dateTo}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              
              {/* Postcode Area */}
              <div className="form-group">
                <label htmlFor="postcode">Postcode Area</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  placeholder="e.g. BR5, BR6"
                  value={searchCriteria.postcode}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Form Buttons */}
              <div className="form-actions">
                <button type="submit" className="btn-primary">Search</button>
                <button type="button" onClick={handleReset} className="btn-secondary">
                  Reset
                </button>
              </div>
            </form>
          </div>
          
          {/* Favourites Preview */}
          <div className="favourites-preview">
            <h3>Favourites ({favourites.length})</h3>
            {favourites.length === 0 ? (
              <p className="no-favourites">No favourites yet</p>
            ) : (
              <div className="favourites-list">
                {favourites.map(fav => (
                  <div key={fav.id} className="favourite-item">
                    <div className="favourite-info">
                      <p className="favourite-price">{formatPrice(fav.price)}</p>
                      <p className="favourite-location">{fav.location}</p>
                    </div>
                    <button
                      onClick={() => removeFromFavourites(fav.id)}
                      className="btn-remove"
                      aria-label="Remove from favourites"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
        
        {/* Results Section */}
        <main className="results-section">
          <div className="results-header">
            <h2>Properties Available</h2>
            <p className="results-count">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <p>No properties match your search criteria.</p>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map(property => (
                <article key={property.id} className="property-card">
                  <div className="property-image">
                    <img 
                      src={property.picture} 
                      alt={`${property.type} in ${property.location}`}
                    />
                    <span className="property-type-badge">{property.type}</span>
                  </div>
                  
                  <div className="property-content">
                    <div className="property-header">
                      <h3 className="property-price">{formatPrice(property.price)}</h3>
                      <p className="property-tenure">{property.tenure}</p>
                    </div>
                    
                    <div className="property-details">
                      <p className="property-bedrooms">
                        {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                      </p>
                      <p className="property-location">{property.location}</p>
                    </div>
                    
                    <p className="property-description">
                      {truncateDescription(property.description)}
                    </p>
                    
                    <div className="property-date">
                      <small>
                        Added: {property.added.month} {property.added.day}, {property.added.year}
                      </small>
                    </div>
                    
                    <div className="property-actions">
                      <button
                        onClick={() => viewProperty(property.id)}
                        className="btn-view"
                      >
                        View Property
                      </button>
                      <button
                        onClick={() => addToFavourites(property)}
                        className={`btn-favourite ${isFavourite(property.id) ? 'is-favourite' : ''}`}
                        disabled={isFavourite(property.id)}
                      >
                        {isFavourite(property.id) ? '★ Favourited' : '☆ Add to Favourites'}
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