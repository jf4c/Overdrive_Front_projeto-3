import axiosConfig from "axios";

const axios = axiosConfig.create({
  baseURL: "https://localhost:7134/api/v1/",
  // timeout: 1000,
});

export default axios;
