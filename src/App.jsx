import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Properties from "./Components/propertiesPage/Properties";
// import Property from "./components/properties_page/Property";
// import Favorites from "./components/properties_page/Favorites"; 
//import { FavoriteProvider } from "./Components/propertiesPage/FavoriteContext";
import Footer from "./Components/Navbar/Footer";
import Home from "./Components/home/HomePage"; 


function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties_page" element={<Properties />} />
          
          
          \
        </Routes>
        <Footer />
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
