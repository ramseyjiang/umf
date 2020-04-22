import React from "react";
import renderer from "react-test-renderer";
import InputText from "./InputText";
import { render, screen } from "@testing-library/react";
import { mount } from "enzyme";

describe("Input Text component test", () => {
  it("render correctly input text component", () => {
    const InputTextComponent = renderer.create(<InputText />).toJSON();
    expect(InputTextComponent).toMatchSnapshot();
  });

  it("input fields correct", () => {
    const props = {
      name: "test name",
      label: "test label",
      placeholder: "test placeholder",
      value: "test input value",
    };

    const { getByText, getByPlaceholderText } = render(
      <InputText {...props} />
    );

    expect(getByText("test label")).toBeInTheDocument();
    expect(getByPlaceholderText("test placeholder")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("test input value", {
        exact: true,
      }).value
    ).toBe("test input value");
  });

  it("check the onChange callback", () => {
    const onChange = jest.fn();
    const props = {
      value: "input test",
      onChange,
    };
    const InputTextComponent = mount(<InputText {...props} />).find("input");

    InputTextComponent.simulate("change", { target: { value: "input test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
