import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Properties from "./components/properties_page/Properties";
import Property from "./components/properties_page/Property";
import Favorites from "./components/properties_page/Favorites"; 
import { FavoriteProvider } from "./components/properties_page/FavoriteContext";
import Footer from "./components/Navbar/Footer";
import Home from "./components/HomePage"; 
import AboutUs from "./components/aboutus_page/Aboutus"; 
import Contact from "./components/ContactUs/Contact"; 

function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties_page" element={<Properties />} />
          <Route path="/properties/:id" element={<Property />} />
          <Route path="/favorites" element={<Favorites />} /> 
          <Route path="/aboutus_page" element={<AboutUs />} /> 
          <Route path="/contactus" element={<Contact />} /> 
        </Routes>
        <Footer />
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;