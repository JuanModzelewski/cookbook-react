import axios from "axios";

axios.defaults.baseURL = "https://cookbook-drf-api-7cc2409bcdd9.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;