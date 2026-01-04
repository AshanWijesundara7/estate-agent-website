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

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      {state.favorites.length > 0 ? (
        <div className="row justify-content-center">
          {state.favorites.map((property) => (
            <Card
              key={property.id}
              className="card col-md-3 col-sm-10 m-3 p-0"
              style={{ minWidth: "250px" }}
            >
              <Card.Img
                variant="top"
                src={property.pictures[0]}
                alt="Property"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Title className="text-black p-2">{property.location}</Card.Title>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Type: {property.type}</li>
                <li className="list-group-item">Bedrooms: {property.bedrooms}</li>
                <li className="list-group-item">Price: ${property.price}</li>
                <li className="list-group-item">
                  Date Added: {property.added.month} {property.added.day}, {property.added.year}
                </li>
                <li className="list-group-item">Postal Code: {property.postalCode}</li>
              </ul>
              <Card.Text className="p-2">
                {property.description.substring(0, 200) + "..."}
              </Card.Text>
              <div className="d-flex justify-content-center align-items-center p-2">
                <Button
                  onClick={() => handleClick(property.id)}
                  className="btn btn-danger me-1"
                >
                  More
                </Button>
                <Button
                  onClick={() => handleUnfavorite(property)}
                  className="btn btn-danger"
                >
                  <FaHeart style={{ fontSize: "20px", color: "red" }} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Placeholder content for when there are no favorites
        <div className="placeholder-container text-center mt-5">
          <img
            src="/images/favous.jpg" 
            alt="No favorites"
            className="img-fluid mb-3"
          />
          <p>Start exploring properties and add your favorites here!</p>
          <Button
            onClick={() => navigate("/properties")}
            className="btn btn-primary"
          >
            Browse Properties
          </Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;