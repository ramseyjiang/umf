import React from "react";
import { render } from "@testing-library/react";
import NotFound from "./NotFound";

test("renders NotFound page", () => {
  const { getByText } = render(<NotFound />);
  expect(getByText("Not found")).toBeInTheDocument();
});
