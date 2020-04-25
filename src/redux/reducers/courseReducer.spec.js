import * as actions from "../actions/course";
import courseReducer from "./courseReducer";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [{ title: "A" }, { title: "B" }];

  const newCourse = { title: "C" };

  const action = actions.createCourseSuccess(newCourse);

  // act
  const newState = courseReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});
