import "whatwg-fetch";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GreetingLoader } from "./greeting-loader";

interface Body {
  subject: string;
}

const server = setupServer(
  rest.post<Body>("/greeting", (req, res, ctx) => {
    return res(ctx.json({ data: { greeting: `Hello ${req.body.subject}` } }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("loads greeting on click", async () => {
  render(<GreetingLoader />);
  const nameInput = screen.getByLabelText(/name/i);
  const loadButton = screen.getByText(/load/i);
  userEvent.type(nameInput, "Nick");
  userEvent.click(loadButton);
  await waitFor(() =>
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent("Hello Nick")
  );
});
