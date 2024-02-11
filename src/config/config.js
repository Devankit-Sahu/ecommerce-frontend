import axios from "axios";

const AXIOS = axios.create({
  baseURL: "http://localhost:4000",
});

AXIOS.defaults.withCredentials = true;

export default AXIOS;
