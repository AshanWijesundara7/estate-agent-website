import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Properties from "./Components/PropertiesPage/Properties";
import Property from "./Components/PropertiesPage/Property";
import Favorites from "./Components/PropertiesPage/Favourite"; 
import { FavoriteProvider } from "./Components/PropertiesPage/FavouriteContext";
import Footer from "./Components/Navbar/Footer";
import Home from "./Components/Home/HomePage"; 


function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<Property />} />
          <Route path="/favorites" element={<Favorites />} /> 
        </Routes>
        <Footer />
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;