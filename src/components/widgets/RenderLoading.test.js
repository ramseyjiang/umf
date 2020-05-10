import React from "react";
import { mount } from "enzyme";
import RenderLoading from "./RenderLoading";

it("render correctly render loading component", () => {
  const RenderLoadingComponent = mount(<RenderLoading />);
  expect(RenderLoadingComponent).toMatchSnapshot();
  expect(RenderLoadingComponent.find("span").text()).toEqual("Loading...");
});
