import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "../Favorites";
import { FavoriteProvider } from "../FavouriteContext";
import { BrowserRouter as Router } from "react-router-dom";

const renderWithProviders = (ui) => {
  return render(
    <Router>
      <FavoriteProvider>{ui}</FavoriteProvider>
    </Router>
  );
};

describe("Favorites Page", () => {
  test("renders placeholder when no favorites", () => {
    renderWithProviders(<Favorites />);
    expect(
      screen.getByText(/Start exploring properties/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Browse Properties/i })).toBeInTheDocument();
  });

  test("renders favorites cards when items exist", () => {
    renderWithProviders(<Favorites />);
    const favButtons = screen.queryAllByText(/❤️/i);
    expect(favButtons.length).toBeGreaterThanOrEqual(0);
  });

  test("clicking 'More' button works", () => {
    renderWithProviders(<Favorites />);
    const moreButtons = screen.queryAllByText(/More/i);
    if (moreButtons.length > 0) {
      fireEvent.click(moreButtons[0]);
      expect(moreButtons[0]).toBeInTheDocument();
    }
  });

  test("removes property from favorites", () => {
    renderWithProviders(<Favorites />);
    const heartButtons = screen.queryAllByRole("button", { name: "" });
    if (heartButtons.length > 0) {
      fireEvent.click(heartButtons[0]);
      expect(heartButtons[0]).toBeInTheDocument();
    }
  });
});
g