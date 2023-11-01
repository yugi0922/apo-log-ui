import axios from "axios";

export const QUIZ_APP_URL = process.env.QUIZ_APP_API_BASE_URL;

export const api = axios.create({
  baseURL: QUIZ_APP_URL,
});
