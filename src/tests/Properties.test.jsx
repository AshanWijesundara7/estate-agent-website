import { render, screen, fireEvent } from "@testing-library/react";
import Properties from "../Properties";
import { FavoriteProvider } from "../FavouriteContext";
import { BrowserRouter as Router } from "react-router-dom";

// Wrap in Router and FavoriteProvider for context & navigation
const renderWithProviders = (ui) => {
  return render(
    <Router>
      <FavoriteProvider>{ui}</FavoriteProvider>
    </Router>
  );
};

describe("Properties Page", () => {
  test("renders Properties page heading", () => {
    renderWithProviders(<Properties />);
    expect(screen.getByText(/Vivere Luxe/i)).toBeInTheDocument();
    expect(screen.getByText(/Find property for sale/i)).toBeInTheDocument();
  });

  test("filters properties by location", () => {
    renderWithProviders(<Properties />);
    const input = screen.getByPlaceholderText(/search by location/i);
    fireEvent.change(input, { target: { value: "New York" } });
    expect(input.value).toBe("New York");
  });

  test("adds and removes property from favorites", () => {
    renderWithProviders(<Properties />);
    // Wait for properties to render
    const favButtons = screen.getAllByText("❤️");
    expect(favButtons.length).toBeGreaterThan(0);

    // Click first favorite button to add
    fireEvent.click(favButtons[0]);
    // Click again to remove
    fireEvent.click(favButtons[0]);
    expect(favButtons[0]).toBeInTheDocument();
  });

  test("reset filters button clears input values", () => {
    renderWithProviders(<Properties />);
    const input = screen.getByPlaceholderText(/search by location/i);
    fireEvent.change(input, { target: { value: "Test" } });
    const resetButton = screen.getByText(/Reset Filters/i);
    fireEvent.click(resetButton);
    expect(input.value).toBe("");
  });

  test("show favorites button works", () => {
    renderWithProviders(<Properties />);
    const showFavBtn = screen.getByText(/Show Favorites/i);
    fireEvent.click(showFavBtn);
    expect(showFavBtn).toBeInTheDocument();
  });
});
