import { LOAD_AUTHORS_SUCCESS } from "./actionTypes";
import { getAuthors } from "api/authorApis";


export function loadAuthorsSuccess(authors) {
  return { type: LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return dispatch =>
    getAuthors()
      .then( authors => dispatch(loadAuthorsSuccess(authors)))
      .catch(error => {
        throw error;
      });
}
