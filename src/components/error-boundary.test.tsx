import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { reportError as mockReportError } from "../api/api";
import { ErrorBoundary } from "./error-boundary";

jest.mock("../api/api");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => undefined);
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});

function Bomb({ shouldThrow }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error("💣");
  } else {
    return null;
  }
}

test("calls reportError and renders that there was a problem", () => {
  (mockReportError as jest.Mock).mockResolvedValueOnce({ success: true });
  const { rerender } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>
  );

  const error = expect.any(Error);
  const info = { componentStack: expect.stringContaining("Bomb") };
  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(mockReportError).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledTimes(2);

  expect(screen.getByRole(/alert/i).textContent).toMatchInlineSnapshot(
    `"There was a problem."`
  );

  (console.error as jest.Mock).mockClear();
  (mockReportError as jest.Mock).mockClear();

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );

  userEvent.click(screen.getByText(/try again/i));

  expect(mockReportError).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
});
