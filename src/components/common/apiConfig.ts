import axios from "axios";

export const REACT_APP_MATTER_API_BASE_URL = process.env.REACT_APP_MATTER_API_BASE_URL;
console.log("REACT_MATTER_API_BASE_URL" + REACT_APP_MATTER_API_BASE_URL);
console.log("process.env.MATTER_API_BASE_URL" + process.env.REACT_APP_MATTER_API_BASE_URL);
export const api = axios.create({
  baseURL: REACT_APP_MATTER_API_BASE_URL,
});
