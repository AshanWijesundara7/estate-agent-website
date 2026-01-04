import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Properties from "./Components/PropertiesPage/Properties";
import Property from "./Components/PropertiesPage/Property";
import Favorites from "./Components/PropertiesPage/Favorites"; 
import { FavoriteProvider } from "./Components/PropertiesPage/FavoriteContext";
import Footer from "./Components/Navbar/Footer";
import Home from "./Components/home/HomePage"; 


function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PropertiesPage" element={<Properties />} />
          <Route path="/properties/:id" element={<Property />} />
          <Route path="/favorites" element={<Favorites />} /> 
        </Routes>
        <Footer />
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
