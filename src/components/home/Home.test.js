import React from "react";
import renderer from "react-test-renderer";
import Home from "./Home";
import { render, screen } from "@testing-library/react";

describe("Home component test", () => {
  it("render correctly Home component", () => {
    const HomeComponent = renderer.create(<Home />).toJSON();
    expect(HomeComponent).toMatchSnapshot();
  });

  it("Home displays correct", () => {
    render(<Home />);
    expect(screen.getByText(/Allow User to Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Allow Signed Up Users to be able to login/i)).toBeInTheDocument();
    expect(screen.getByText(/Allow Logged in users to log out./i)).toBeInTheDocument();
    expect(screen.getByText(/List Users/i)).toBeInTheDocument();
    expect(screen.getByText(/Update a user/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete a user/i)).toBeInTheDocument();
    expect(screen.getByText(/Fields you should have against the User table are/i)).toBeInTheDocument();
    expect(screen.getByText(/The fields created_at, updated_at should record Date and time /i)).toBeInTheDocument();
    expect(screen.getByText(/Rebuild the Laravel auth default/i)).toBeInTheDocument();
    expect(screen.getByText(/Deploy codes on AWS for preview and upload codes to GitHub for review./i)).toBeInTheDocument();
  });
});
