import React from "react";
import renderer from "react-test-renderer";
import InputText from "./InputText";
import { render, screen, cleanup } from "@testing-library/react";
import { mount } from "enzyme";

describe("Input Text component test", () => {
  afterEach(cleanup);

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
      label: "First Name",
      name: "first_name",
      onChange,
    };
    const wrapper = mount(<InputText {...props} />);
    const label = wrapper.find("label");
    expect(label).toHaveLength(1);
    expect(label.text()).toEqual("First Name");

    const input = wrapper.find("input");
    expect(input).toHaveLength(1);
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("name")).toEqual("first_name");

    input.simulate("change", { target: { value: "input test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders email input with label given the type", () => {
    const props = {
      type: "email",
      label: "Email",
      name: "email",
    };

    const wrapper = mount(<InputText {...props} />);
    const label = wrapper.find("label");
    expect(label).toHaveLength(1);
    expect(label.prop("htmlFor")).toEqual("email");
    expect(label.text()).toEqual("Email");

    const input = wrapper.find("input");
    expect(input).toHaveLength(1);
    expect(input.prop("type")).toEqual("email");
    expect(input.prop("name")).toEqual("email");
  });

  it("test input error is correct", () => {
    const props = {
      type: "email",
      label: "Email",
      name: "email",
      error: "you input email is invalid",
    };

    const wrapper = mount(<InputText {...props} />);

    const invalidFb = wrapper.find(".invalid-feedback");
    expect(invalidFb.hasClass("invalid-feedback")).toBe(true);
    expect(invalidFb.text()).toEqual(props.error);
  });
});
