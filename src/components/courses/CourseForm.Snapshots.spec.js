/* First way to test our component i.e. -->> 
   checking snapshot match or not by react-test-renderer 
*/

import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

describe('Course Form :- Using react-test-renderer', ()=> {
  it("sets submit button label 'Saving...' when saving is true", () => {
    const tree = renderer.create(
      <CourseForm
        course={courses[0]}
        authors={authors}
        onSave={jest.fn()}
        onChange={jest.fn()}
        saving
      />
    );
    expect(tree).toMatchSnapshot();
  });
  
  it("sets submit button label 'Saving...' when saving is false", () => {
    const tree = renderer.create(
      <CourseForm
        course={courses[0]}
        authors={authors}
        onSave={jest.fn()}
        onChange={jest.fn()}
        saving={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

})

