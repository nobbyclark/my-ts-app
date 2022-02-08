import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HiddenMessage } from "./hidden-message";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props: CSSTransitionProps) =>
      props.in ? props.children : null,
  };
});

test("show hidden message when toggle is clicked", () => {
  const message = "Hello World!";

  const { getByText, queryByText } = render(
    <HiddenMessage>{message}</HiddenMessage>
  );
  const toggleButton = getByText(/toggle/i);
  expect(queryByText(message)).not.toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(getByText(message)).toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(queryByText(message)).not.toBeInTheDocument();
});
