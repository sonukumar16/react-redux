import React from "react";
import { shallow } from "enzyme";
import CourseForm from "./CourseForm";

function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

describe("Course Form :- Using Enzyme", () => {
  it("renders form and header", () => {
    const wrapper = renderCourseForm();
    // console.log(wrapper.debug());
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h2").text()).toEqual("Add Course");
  });

  it('labels save buttons as "Save" when not saving', () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find("button").text()).toBe("Save");
  });

  it('labels saving buttons as "saving" when saving', () => {
    const wrapper = renderCourseForm({ saving: true });
    expect(wrapper.find("button").text()).toBe("Saving...");
  });
});
