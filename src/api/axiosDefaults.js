import axios from "axios";

axios.defaults.baseURL = "https://cookbook-drf-api-f6a1e9bf2c65.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();