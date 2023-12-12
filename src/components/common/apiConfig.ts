import axios from "axios";

export const QUIZ_APP_URL = process.env.REACT_APP_QUIZ_APP_API_BASE_URL;
console.log("QUIZ_APP_URL" + QUIZ_APP_URL);
export const api = axios.create({
  baseURL: QUIZ_APP_URL,
});
