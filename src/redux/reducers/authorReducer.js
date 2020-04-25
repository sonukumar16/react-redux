import {LOAD_AUTHORS_SUCCESS} from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.courses, actions) {
  
  switch (actions.type) {
    case LOAD_AUTHORS_SUCCESS:
    return actions.authors;  
    default:
      return state;
  }
}


export const authorSelector = state => state.authors;