import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Redirect } from "react-router";
import { Editor } from "./editor";
import { savePost as mockSavePost } from "../api/api";

jest.mock("react-router", () => {
  return {
    Redirect: jest.fn(() => null),
  };
});

jest.mock("../api/api");

afterEach(() => {
  jest.clearAllMocks();
});

test("renders a form with title, content, tags, and a submit button", async () => {
  (mockSavePost as jest.Mock).mockResolvedValueOnce(undefined);

  render(<Editor />);

  const titleInput = screen.getByLabelText(/title/i);
  userEvent.type(titleInput, "Test Title");
  const contentInput = screen.getByLabelText(/content/i);
  userEvent.type(contentInput, "Test Content");
  const tagsInput = screen.getByLabelText(/tags/i);
  userEvent.type(tagsInput, "tag1, tag2");
  const submitButton = screen.getByText(/submit/i);

  const preDate = +new Date();

  userEvent.click(submitButton);

  expect(submitButton).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledWith({
    title: "Test Title",
    content: "Test Content",
    tags: ["tag1", "tag2"],
    date: expect.any(String),
  });

  const postDate = +new Date();
  const date = +new Date((mockSavePost as jest.Mock).mock.calls[0][0].date);

  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(Redirect).toHaveBeenCalledWith({ to: "/" }, {}));
});

test("renders an error from the server", async () => {
  const testError = "Test Error";
  (mockSavePost as jest.Mock).mockRejectedValueOnce({
    data: { error: testError },
  });

  render(<Editor />);

  const titleInput = screen.getByLabelText(/title/i);
  userEvent.type(titleInput, "Test Title");
  const contentInput = screen.getByLabelText(/content/i);
  userEvent.type(contentInput, "Test Content");
  const tagsInput = screen.getByLabelText(/tags/i);
  userEvent.type(tagsInput, "tag1, tag2");
  const submitButton = screen.getByText(/submit/i);

  userEvent.click(submitButton);

  const postError = await screen.findByRole("alert");

  expect(postError).toHaveTextContent(testError);
  expect(submitButton).not.toBeDisabled();
});
