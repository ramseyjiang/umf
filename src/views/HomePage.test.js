import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders homepage", () => {
  const { getByText } = render(<HomePage />);
  expect(getByText("User Stories")).toBeInTheDocument();
});
