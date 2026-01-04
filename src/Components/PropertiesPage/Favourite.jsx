// Favourite.jsx (Favourites Page)
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavouritesContext } from '../../context/FavouritesContext';
import './Favourite.css';

const Favourites = () => {
  const navigate = useNavigate();
  const { favourites, removeFavourite } = useContext(FavouritesContext);
  
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDraggingOut, setIsDraggingOut] = useState(false);
  
  // Clear all favourites with confirmation
  const clearAllFavourites = () => {
    if (window.confirm('Are you sure you want to remove all favourites?')) {
      favourites.forEach(fav => removeFavourite(fav.id));
    }
  };
  
  // Navigate to property detail page
  const viewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  
  // Format price with £ symbol
  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };
  
  // Drag and Drop Event Handlers
  const handleDragStart = (e, property) => {
    setDraggedItem(property);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
    
    setTimeout(() => {
      e.target.classList.add('dragging');
    }, 0);
  };
  
  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedItem(null);
    setIsDraggingOut(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    if (draggedItem) {
      setIsDraggingOut(true);
    }
  };
  
  const handleDragLeave = (e) => {
    if (e.target.classList.contains('drop-zone')) {
      setIsDraggingOut(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem) {
      removeFavourite(draggedItem.id);
      setIsDraggingOut(false);
      setDraggedItem(null);
    }
  };
  
  return (
    <div className="favourites-container">
      {/* Header Section */}
      <header className="favourites-header">
        <div className="header-content">
          <h1>My Favourites</h1>
          <p>Properties you've saved for later</p>
        </div>
        {favourites.length > 0 && (
          <div className="header-actions">
            <button onClick={clearAllFavourites} className="btn-clear-all">
              Clear All Favourites
            </button>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <div className="favourites-content">
        {/* Empty State */}
        {favourites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">♡</div>
            <h2>No Favourites Yet</h2>
            <p>Properties you mark as favourites will appear here.</p>
            <p className="empty-state-hint">
              Browse our properties and click "Add to Favourites" to save them.
            </p>
            <button 
              onClick={() => navigate('/properties_page')} 
              className="btn-browse"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <>
            {/* Instructions Panel */}
            <div className="instructions-panel">
              <div className="instruction-item">
                <span className="instruction-icon">👆</span>
                <p>Click "Remove" to delete a favourite</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">🖱️</span>
                <p>Drag properties to the drop zone below to remove them</p>
              </div>
              <div className="instruction-count">
                <strong>{favourites.length}</strong> {favourites.length === 1 ? 'property' : 'properties'} saved
              </div>
            </div>
            
            {/* Favourites Grid */}
            <div className="favourites-grid">
              {favourites.map(property => (
                <article 
                  key={property.id} 
                  className="favourite-card"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, property)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="favourite-image">
                    <img 
                      src={property.picture} 
                      alt={`${property.type} in ${property.location}`}
                      draggable="false"
                    />
                    <span className="property-type-badge">{property.type}</span>
                    <div className="drag-handle" title="Drag to remove">
                      <span>⋮⋮</span>
                    </div>
                  </div>
                  
                  <div className="favourite-content">
                    <div className="favourite-header">
                      <h3 className="favourite-price">{formatPrice(property.price)}</h3>
                      <p className="favourite-tenure">{property.tenure}</p>
                    </div>
                    
                    <div className="favourite-details">
                      <p className="favourite-bedrooms">
                        <span className="icon">🛏️</span>
                        {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                      </p>
                      <p className="favourite-location">
                        <span className="icon">📍</span>
                        {property.location}
                      </p>
                    </div>
                    
                    <div className="favourite-date">
                      <small>
                        Added: {property.added.month} {property.added.day}, {property.added.year}
                      </small>
                    </div>
                    
                    <div className="favourite-actions">
                      <button
                        onClick={() => viewProperty(property.id)}
                        className="btn-view"
                      >
                        View Property
                      </button>
                      <button
                        onClick={() => removeFavourite(property.id)}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Drop Zone for Drag and Drop */}
            <div 
              className={`drop-zone ${isDraggingOut ? 'active' : ''}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="drop-zone-content">
                <span className="drop-zone-icon">🗑️</span>
                <p className="drop-zone-text">
                  {isDraggingOut 
                    ? 'Drop here to remove from favourites' 
                    : 'Drag properties here to remove'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;