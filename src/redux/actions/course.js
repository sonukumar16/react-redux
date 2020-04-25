import {
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC
} from "./actionTypes";
import * as courseApi from "api/courseApis";

import { beginApiCall, apiCallError } from "./apiStatus";

export function loadCourseSuccess(courses) {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
  return dispatch => {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => dispatch(loadCourseSuccess(courses)))
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function saveCourse(course) {
  return (dispatch, getState) => {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => dispatch(createCourseSuccess(savedCourse)))
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function updateCourse(course) {
  return (dispatch, getState) => {
    dispatch(beginApiCall());
    return courseApi
      .updateCourse(course)
      .then(updatedCourse => dispatch(updateCourseSuccess(updatedCourse)))
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return dispatch => {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourses(course.id);
  };
}
