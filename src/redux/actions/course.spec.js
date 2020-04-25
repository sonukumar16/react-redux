import thunk from "redux-thunk";
import axios from "axios";
import mockAxios from "jest-mock-axios";
import configureMockStore from "redux-mock-store";
import * as courseActions from "./course";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

jest.mock("axios");

describe("Async Actions", () => {
  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      const coursesMock = [
        {
          id: 5775,
          title: "Building a JavaScript Development Environment",
          slug: "javascript-development-environment",
          authorId: 1,
          category: "JavaScript"
        }
      ];

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: coursesMock, status: 200 })
      );

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses: coursesMock }
      ];
      const store = mockStore({ courses: [] });
      return store
        .dispatch(courseActions.loadCourses())
        .then(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    //arrange
    const course = courses[0];
    const expectedActions = { type: types.CREATE_COURSE_SUCCESS, course };
    //act
    const action = courseActions.createCourseSuccess(course);
    //assert
    expect(action).toEqual(expectedActions);
  });
});
