// FavouritesContext.jsx
import { createContext, useState, useEffect } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const storedFavourites = localStorage.getItem('propertyFavourites');
    if (storedFavourites) {
      try {
        setFavourites(JSON.parse(storedFavourites));
      } catch (error) {
        console.error('Error loading favourites:', error);
      }
    }
  }, []);

  // Save to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
  }, [favourites]);

  // Add to favourites (prevent duplicates)
  const addFavourite = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites(prev => [...prev, property]);
    }
  };

  // Remove from favourites
  const removeFavourite = (propertyId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};