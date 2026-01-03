import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Properties from "./Components/PropertiesPage/Properties";
import Favorite from "./Components/PropertiesPage/Favorite";
import NavBar from "./Components/Navbar/Navbar";
import Footer from "./Components/Navbar/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavBar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties_page" element={<Properties />} />
          <Route path="/favourites" element={<Favorite />} />
          {/* Add property detail route when you create that component */}
          {/* <Route path="/property/:id" element={<PropertyDetail />} /> */}
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;