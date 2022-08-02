import axios from "axios";
import {api_key} from "../api_key";
export const API = axios.create({
  baseURL: "https://countryapi.io/api/"
});
//Sets authorization headers for all requests
API.defaults.headers.common["Authorization"] = `Bearer ${api_key}`;