import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoriteNumber } from "./favorite-number";

test('renders a number input with a label "Favorite Number"', () => {
  const { rerender } = render(<FavoriteNumber />);
  const inputElement = screen.getByLabelText(/favorite number/i);
  expect(inputElement).toHaveAttribute("type", "number");
  userEvent.type(inputElement, "10");
  expect(screen.getByRole("alert")).toHaveTextContent("The number is invalid");
  rerender(<FavoriteNumber max={10} />);
  expect(screen.queryByRole("alert")).toBeNull();
});
