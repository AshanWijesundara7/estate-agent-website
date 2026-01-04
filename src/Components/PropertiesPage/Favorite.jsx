import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaHeart } from "react-icons/fa";
import { useFavorite } from "./FavouriteContext";
import { useNavigate } from "react-router-dom";
import "./Favourite.css";

const Favorites = () => {
  const { state, dispatch } = useFavorite(); // Access favorites and dispatch
  const navigate = useNavigate(); // For navigation

  // Function to navigate to a property detail page
  const handleClick = (id) => {
    navigate(`/properties/${id}`, { state: { id } });
  };

  // Function to remove a property from favorites
  const handleUnfavorite = (item) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
    console.log("Removed from favorites:", item.id);
  };

  // Function to navigate to properties page
  const handleBrowseProperties = () => {
    navigate("/properties");
  };

  return (
    <div className="container" style={{ paddingTop: "80px", minHeight: "80vh" }}>
      {state.favorites.length > 0 ? (
        <>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2 style={{ color: "#2c3e50", fontWeight: "bold" }}>My Favorites</h2>
            <p style={{ color: "#666" }}>You have {state.favorites.length} {state.favorites.length === 1 ? 'property' : 'properties'} saved</p>
          </div>
          <div className="row justify-content-center">
            {state.favorites.map((property) => (
              <Card
                key={property.id}
                className="card col-md-3 col-sm-10 m-3 p-0"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <Card.Img
                  variant="top"
                  src={property.pictures && property.pictures[0] ? property.pictures[0] : property.picture || '/images/placeholder.jpg'}
                  alt="Property"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Title className="text-black p-2" style={{ fontSize: "1.1em", fontWeight: "600" }}>
                  {property.location}
                </Card.Title>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Type: {property.type}</li>
                  <li className="list-group-item">Bedrooms: {property.bedrooms}</li>
                  <li className="list-group-item">Price: ${property.price.toLocaleString()}</li>
                  <li className="list-group-item">
                    Date Added: {property.added.month} {property.added.day}, {property.added.year}
                  </li>
                  <li className="list-group-item">Postal Code: {property.postalCode || 'N/A'}</li>
                </ul>
                <Card.Text className="p-2" style={{ fontSize: "0.9em", color: "#555" }}>
                  {property.description.substring(0, 200)}...
                </Card.Text>
                <div className="d-flex justify-content-center align-items-center p-2 gap-2">
                  <Button
                    onClick={() => handleClick(property.id)}
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleUnfavorite(property)}
                    className="btn btn-danger"
                    style={{ padding: "8px 12px" }}
                  >
                    <FaHeart style={{ fontSize: "20px", color: "red" }} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        // Placeholder content for when there are no favorites
        <div className="placeholder-container text-center mt-5">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <img
              src="/images/favous.jpg" 
              alt="No favorites"
              className="img-fluid mb-4"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
            <h2 style={{ color: "#2c3e50", fontWeight: "bold", marginBottom: "15px" }}>
              No Favorites Yet
            </h2>
            <p style={{ color: "#666", fontSize: "1.1em", marginBottom: "30px" }}>
              Start exploring properties and add your favorites here!
            </p>
            <Button
              onClick={handleBrowseProperties}
              className="btn btn-primary"
              style={{ 
                padding: "12px 30px", 
                fontSize: "1.1em",
                backgroundColor: "#3498db",
                border: "none"
              }}
            >
              Browse Properties
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;