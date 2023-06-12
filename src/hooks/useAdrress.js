import axiosConfig from "axios";
import { useState } from "react";

export const useAddress = () => {
  const emptyAddress = {
    logradouro: null,
    bairro: null,
    localidade: null,
  };

  const [address, setAddress] = useState(null);

  const axios = axiosConfig.create({
    baseURL: "https://viacep.com.br/ws/",
  });

  const getAdrres = (cep) => {
    axios
      .get(`${cep}/json`)
      .then((res) => {
        if (res.data.erro) {
          console.log("cep. nao existe");
          setAddress({ erro: true });
        }
        console.log("cep. existe");
        setAddress(res.data);
      })
      .catch((error) => {
        if (error.response) {
          // A requisição foi feita e o servidor respondeu com um código de status
          // que sai do alcance de 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.log("erroooo");
          // A requisição foi feita mas nenhuma resposta foi recebida
          // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
          // http.ClientRequest no node.js
          console.error(error.request);
        } else {
          // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
          console.error("Error", error.message);
        }
        console.error(error.config);
      });
  };

  return { address, setAddress, getAdrres };
};
