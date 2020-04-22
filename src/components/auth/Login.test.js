import React from "react";
import renderer from "react-test-renderer";
import Login from "./Login";
import InputText from '../form/InputText';
import { useAuthContext } from "../../contexts/AuthContext";
import { render, screen } from "@testing-library/react";

describe("Login component test", () => {
  // it("render correctly Login component", () => {
	// 	const { authApi } = useAuthContext();
  //   const LoginComponent = renderer.create(<Login />).toJSON();
  //   expect(LoginComponent).toMatchSnapshot();
  // });

  // it("input fields correct", () => {

  //   const { getByText, getByPlaceholderText } = render(<Login />);

  //   expect(getByText("Username")).toBeInTheDocument();
	// 	expect(getByPlaceholderText("Please input username")).toBeInTheDocument();
	// 	expect(getByText("Password")).toBeInTheDocument();
	// 	expect(getByPlaceholderText("Please input password")).toBeInTheDocument();
	// 	expect(getByText("Show password")).toBeInTheDocument();
  // });
});
