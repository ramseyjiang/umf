import React from "react";
import renderer from "react-test-renderer";
import Register from "./Register";
import InputText from "../form/InputText";
import { useAuthContext } from "../../contexts/AuthContext";
import { render, screen } from "@testing-library/react";

describe("Register component test", () => {
  // it("render correctly Register component", () => {
  // 	const { authApi } = useAuthContext();
  //   const RegisterComponent = renderer.create(<Register />).toJSON();
  //   expect(RegisterComponent).toMatchSnapshot();
  // });
  // it("input fields correct", () => {
  // const { getByText, getByPlaceholderText } = render(<Register />);
  // expect(getByText("Username")).toBeInTheDocument();
  // expect(getByPlaceholderText("Please input username")).toBeInTheDocument();
  // expect(getByText("First Name")).toBeInTheDocument();
  // expect(getByPlaceholderText("Please input first name")).toBeInTheDocument();
  // expect(getByText("Last Name")).toBeInTheDocument();
  // expect(getByPlaceholderText("Please input last name")).toBeInTheDocument();
  // expect(getByText("Email")).toBeInTheDocument();
  // expect(getByPlaceholderText("Please input email")).toBeInTheDocument();
  // expect(getByText("Password")).toBeInTheDocument();
  // expect(getByPlaceholderText("Please input password")).toBeInTheDocument();
  // expect(getByText("Show password")).toBeInTheDocument();
  // });
});
