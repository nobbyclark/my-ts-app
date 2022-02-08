import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GreetingLoader } from "./greeting-loader";
import { loadGreeting as mockLoadGreeting } from "../api/api";

jest.mock("../api/api");

test("loads greeting on click", async () => {
  (mockLoadGreeting as jest.Mock).mockResolvedValueOnce({
    data: { greeting: "TEST_GREETING" },
  });
  render(<GreetingLoader />);
  const nameInput = screen.getByLabelText(/name/i);
  const loadButton = screen.getByText(/load/i);
  userEvent.type(nameInput, "Nick");
  userEvent.click(loadButton);
  expect(mockLoadGreeting).toHaveBeenCalledWith("Nick");
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(
      "TEST_GREETING"
    )
  );
});
