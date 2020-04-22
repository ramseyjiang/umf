import React from "react";
import renderer from "react-test-renderer";
import Footer from "./Footer";
import { render } from "@testing-library/react";

describe("Footer component test", () => {
  it("render correctly footer component", () => {
    const FooterComponent = renderer.create(<Footer />).toJSON();
    expect(FooterComponent).toMatchSnapshot();
  });

  it("check the Footer correct", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("Ramsey Jiang")).toBeInTheDocument();
  });
});