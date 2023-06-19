import { useContext, useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { PersonContext } from "../context/PersonContext";
import { addressInstance } from "../../../config/axios.config";

export const useInputChange = () => {
  const emptyAddress = {
    bairro: null,
    cep: null,
    complemento: null,
    ddd: null,
    gia: null,
    ibge: null,
    localidade: null,
    logradouro: null,
    siafi: null,
    uf: null,
  };
  const { emptyPerson, person, setPerson } = useContext(PersonContext);
  const [addressAPI, setAddressAPI] = useState(emptyAddress);
  const [cep, setCep] = useState(null);
  const [existCep, setExistCep] = useState(true);

  // useEffect(() => {
  //   if (cep) {
  //     getAdrres(cep);
  //   }
  // }, [cep]);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";

    let _person = { ...person };

    _person[`${name}`] = val;

    setPerson(_person);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _person = { ...person };

    _person[`${name}`] = val;

    setPerson(_person);
  };

  return {
    onInputChange,
    onInputNumberChange,
  };
};
