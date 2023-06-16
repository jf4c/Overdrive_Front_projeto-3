import axiosConfig from "axios";

const companyInstance = axiosConfig.create({
  baseURL: "https://localhost:7134/api/v1/Company",
  // timeout: 1000,
});

export default companyInstance;
