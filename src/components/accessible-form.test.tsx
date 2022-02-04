import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { AccessibleForm } from "./accessible-form";

test("accessible forms pass axe", async () => {
  const { container } = render(<AccessibleForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
