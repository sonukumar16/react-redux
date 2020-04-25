import axios from "axios";
import { handleResponse, handleError } from "./utils";

const baseUrl = process.env.API_URL + "/authors/";

export const getAuthors = () =>
  axios
    .get(baseUrl)
    .then(handleResponse)
    .catch(handleError);