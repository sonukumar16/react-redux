import axios from "axios";
import { handleResponse, handleError } from "./utils";

const baseURL = process.env.API_URL + "/courses/";

const axiosInstance =  axios.create({
  baseURL,
  validateStatus: function (status) {
    return status >= 200 && status < 404; // default
  }});

export const saveCourse = course =>
axiosInstance
    .post("/", course)
    .then(handleResponse)
    .catch(handleError);

export const getCourses = () =>
  axios
    .get(baseURL)
    .then(handleResponse)
    .catch(handleError);

export const updateCourse = course =>{
 return  axios
    .put(`${baseURL}${course.id}`, course)
    .then(handleResponse)
    .catch(handleError);
  }

export const deleteCourses = courseId =>
  axios
    .delete(baseURL, courseId)
    .then(handleResponse)
    .catch(handleError);
