import { createSelector } from "reselect";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, actions) {
  switch (actions.type) {
    case CREATE_COURSE_SUCCESS:
      return [...state, { ...actions.course }];
    case LOAD_COURSES_SUCCESS:
      return actions.courses;
    case UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id == actions.course.id ? actions.course : course
      );
    case DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== actions.course.id);
    default:
      return state;
  }
}

export const courseSelector = state => get(state, "courses", []);
export const authorSelector = state => get(state, "authors", []);

export const courseAuthorSelector = createSelector(
  courseSelector,
  authorSelector,
  (courses, authors) =>
    courses.map(course => {
      return {
        ...course,
        authorName:
          !isEmpty(authors) && authors.find(a => a.id === course.authorId).name
      };
    })
);
