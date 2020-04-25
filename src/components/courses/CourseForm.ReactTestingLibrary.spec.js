import React from "react";
import { cleanup, render } from "@testing-library/react";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args) {
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

describe("Course From:- Using React Testing Library", () => {
  it("should render Add Course header", () => {
    const { getByText } = renderCourseForm();
    getByText("Add Course");
  });

  it('should label save button as "Save" when not saving', () => {
    const { getByText } = renderCourseForm();
    getByText("Save");
  });

  it('should label save button as "Saving..." when saving', () => {
    const { getByText, debug } = renderCourseForm({ saving: true });
    //debug();
    getByText("Saving...");
  });
});
