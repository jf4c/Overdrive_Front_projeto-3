import { useState, useEffect } from "react";
import axiosConfig from "axios";

export const useAddress = () => {
  const emptyAddress = {
    logradouro: "",
    bairro: "",
    localidade: "",
  };

  const [address, setAddress] = useState(emptyAddress);

  const axios = axiosConfig.create({
    baseURL: "https://viacep.com.br/ws/",
    // timeout: 1000,
  });

  const getAdrres = (cep) => {
    axios
      .get(`${cep}/json`)
      .then((res) => {
        setAddress(res.data);
      })
      .catch(() => {
        setAddress(emptyAddress);

        // return false;
      });
    // return true;
  };

  return { address, getAdrres };
};
