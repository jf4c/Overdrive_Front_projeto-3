import axiosConfig from "axios";

const addressInstance = axiosConfig.create({
  baseURL: "https://viacep.com.br/ws/",
  // timeout: 1000,
});

const companyInstance = axiosConfig.create({
  baseURL: "https://localhost:7134/api/v1/Company",
  // timeout: 1000,
});

const personInstance = axiosConfig.create({
  baseURL: "https://localhost:7134/api/v1/People",
  // timeout: 1000,
});

export { addressInstance, companyInstance, personInstance };
